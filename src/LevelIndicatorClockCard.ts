import {html, LitElement} from "lit";
import {state} from "lit/decorators/state";
import styles from './levelindicatorclockcard.styles';
import {HomeAssistant} from "custom-card-helpers";
import {Config} from "./Config";

interface Prices {
    attributes: {
        spot_price: number;
        cost: number;
        credit: number;
        unit: string;
        currency: string;
        level: string;
        rank: number;
        low_threshold: number;
        high_threshold: number;
        rates: {
            cost: number,
            credit: number,
            end: string,
            level: string,
            rank: number,
            spot_price: number,
            start: string
        }[];
    };
}

interface LevelsResponse {
    level_length: number;
    levels: string;
    low_threshold: number;
    high_threshold: number;
}

interface Timestamp {
    state: string;
}

export class LevelIndicatorClockCard extends LitElement {
    private tag = "LevelIndicatorClockCard";


    private intervalId: number | undefined;
    private isSimulating = false;
    private fakeLevels: LevelsResponse | undefined;
    private readonly SIMULATION_STEP_MINUTES = 1;
    private readonly SIMULATION_UPDATE_PERIOD_MS = 1000;

    private resizeObserver: ResizeObserver;
    private readonly NUMBER_OF_LEVELS = 240;
    private readonly HISTORY = (this.NUMBER_OF_LEVELS / 12) - 1;
    private readonly degreesPerLevel = 360 / this.NUMBER_OF_LEVELS;
    private readonly minutesPerLevel = 12 * 60 / this.NUMBER_OF_LEVELS;
    private levels: string[] = new Array(this.NUMBER_OF_LEVELS).fill('U');

    private minuteLevels: string[] = new Array(1440).fill('U');
    private minuteIndex = 0;

    @state() private electricity_price: string;
    @state() private date_time_iso: string;
    @state() private _dependencyMet = false;

    private now = new Date();

    static get properties() {
        return {
            electricity_price: {state: true},
            date_time_iso: {type: String},
        };
    }

    setConfig(config: Config) {
        this.electricity_price = config.electricity_price;
        this.date_time_iso = config.date_time_iso;
    }

    set hass(hass: HomeAssistant) {
        if (this.isSimulating || !hass) {
            return;
        }
        const timestamp = hass.states[this.date_time_iso] as Timestamp;
        this.now = new Date(timestamp.state);
        console.log(this.tag + ": Current time: ", this.now);
        this.setClock(this.now);

        this._dependencyMet = hass?.config?.components?.includes('electricitypricelevels');
        if (this._dependencyMet === false) {
            console.error("HACS integration 'electricitypricelevels' is not installed or loaded.");
        } else {
            this.getLevels(hass)
            console.debug(this.tag + ": Called getLevels");
        }
    }

    getCardSize() {
        return 5;
    }

    static styles = styles;

    public getLayoutOptions() {
        return {
            grid_rows: 8,
            grid_columns: 12,
        };
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        console.log(this.tag + ": Updated properties: ", changedProperties);
    }

    private updateLevels(priceLevelLength: number, priceLevels: string, currentTime: Date) {
        const clock = this.shadowRoot.querySelector('.clock');
        if (clock && priceLevels.length > 0) {
            for (let minute = 0; minute < 1440; minute++) {
                const levelIndex = Math.floor(minute / priceLevelLength);
                if (levelIndex < priceLevels.length) {
                    this.minuteLevels[minute] = priceLevels[levelIndex];
                }
            }

            const levels: string[] = [];
            for(let i = 0; i < 3; i++) {
              levels.push('E');
            }
            for (let i = 3; i < 720; i++) {
                levels.push(this.minuteLevels[(this.minuteIndex + i) % 1440]);
            }

            const degreesPerLevel = 360 / levels.length;
            const gradient = levels.map((level, index) => {
                const startAngle = index * degreesPerLevel;
                const endAngle = startAngle + degreesPerLevel;
                let color = this.getLevelColor(level);
                return `${color} ${startAngle}deg ${endAngle}deg`;
            }).join(', ');
            (clock as HTMLElement).style.background = `conic-gradient(from ${this.minuteIndex * 0.5}deg, ${gradient})`;
        }
    }

    private isPrime(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i = i + 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }

    private generateFakeLevels(levelLength: number): LevelsResponse {
        const levels: string[] = [];
        const numberOfLevels = (48 * this.MINUTES_IN_HOUR) / levelLength;
        const possibleLevels = ['L', 'M', 'H'];
        let levelIndex = 0;

        for (let i = 0; i < numberOfLevels; i++) {
            if (this.isPrime(i)) {
                levelIndex++;
            }
            levels.push(possibleLevels[levelIndex % possibleLevels.length]);
        }
        return {
            level_length: levelLength,
            levels: levels.join(''),
            low_threshold: 0,
            high_threshold: 0
        };
    }

    private getLevelColor(level: string): string {
        switch (level) {
            case "L":
                return "green";
            case "M":
                return "yellow";
            case "H":
                return "red";
            case "U":
                return "magenta";
            case "S":
                return "blue";
            case "E":
                return "white";
            default:
                return "grey";
        }
    }

    private setAngle(hand, angle) {
        const handElement = this.shadowRoot?.querySelector("." + hand) as HTMLElement;
        if (handElement) {
            handElement.style.transform = "rotate(" + angle + "deg)";
        } else {
            console.debug(`${this.tag}: Hand element '${hand}' not found.`);
        }
    }

    private setClock(currentTime: Date) {
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const hrAngle = currentHour * 30 + (currentMinute * 6 / 12);
        const minAngle = currentMinute * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);
        this.minuteIndex = (currentHour * 60 + currentMinute - 60);
        if( this.minuteIndex < 0) {
            this.minuteIndex += 1440;
        } else if (this.minuteIndex >= 1440) {
            this.minuteIndex -= 1440;
        }
    }

    render() {
        return html`
            <ha-card>
                <div class="card-content">
                    <div class="clock">
                        <ul class='hours'>
                            <li><span>1</span></li>
                            <li><span>2</span></li>
                            <li><span>3</span></li>
                            <li><span>4</span></li>
                            <li><span>5</span></li>
                            <li><span>6</span></li>
                            <li><span>7</span></li>
                            <li><span>8</span></li>
                            <li><span>9</span></li>
                            <li><span>10</span></li>
                            <li><span>11</span></li>
                            <li><span>12</span></li>
                        </ul>
                        <div class="gradient-cover"></div>
                        <div class='hour-hand'></div>
                        <div class='minute-hand'></div>
                        ${!this._dependencyMet ?
                                html`
                                    <div class="error">
                                        <p>HACS integration 'electricitypricelevels' is not installed or loaded.</p>
                                    </div>
                                ` : ''
                        }
                            <!--
                        ${this._dependencyMet && !this.electricity_price ?
                                html`
                                    <div class="error">
                                        <p>electricity_price is not set.</p>
                                    </div>
                                ` : ''
                        }
                        -->
                    </div>
                </div>
            </ha-card>
        `;
    }

    static getConfigForm() {
        return {
            schema: [
                {
                    name: 'electricity_price',
                    selector: {
                        entity: {
                            domain: 'sensor',
                        },
                    },
                },
                {
                    name: 'date_time_iso',
                    selector: {
                        entity: {
                            domain: 'sensor',
                        },
                    },
                },
            ],
        };
    }

    private getLevels(hass: HomeAssistant) {
        (async () => {
            console.debug(this.tag + ": Fetching levels...");
            const result = await this.fetchLevels(hass);
            console.debug(this.tag + ": Levels fetched: ", result);
            console.debug(this.tag + ": Levels fetched successfully: ", result);
            this.updateLevels(result.level_length, result.levels);
        })();
    }

    // Retrieve levels from the electricitypricelevels service.
    // Returns a LevelsResponse object with level_length, levels, low_threshold, and high_threshold.
    // If the service call fails, returns a default LevelsResponse object with level_length 0
    private async fetchLevels(hass: HomeAssistant): Promise<LevelsResponse> {
        //console.debug(this.tag + ": Fetching levels from electricitypricelevels service...");
        if (hass) {
            try {
                const response = await hass.callWS<{ response: LevelsResponse }>({
                    type: 'call_service',
                    domain: 'electricitypricelevels',
                    service: 'get_levels',
                    return_response: true
                });

                if (response && response.response) {
                    //console.debug(this.tag + " Service electricitypricelevels.get_levels called successfully.");
                    return response.response;
                } else {
                    console.error(this.tag + " No response from electricitypricelevels.get_levels service.");
                    return {
                        level_length: 0,
                        levels: "",
                        low_threshold: 0,
                        high_threshold: 0
                    };
                }
            } catch (error) {
                console.error(this.tag + " Error calling service electricitypricelevels.get_levels:", error);
                return {
                    level_length: 0,
                    levels: "",
                    low_threshold: 0,
                    high_threshold: 0
                };
            }
        } else {
            console.error(this.tag + " Home Assistant object not available when fetching levels.");
            return {
                level_length: 0,
                levels: "",
                low_threshold: 0,
                high_threshold: 0
            };
        }
    }

    firstUpdated() {
        console.log(this.tag + " First updated, initializing clock...");

        if (this.isSimulating) {
            this.now = new Date();
            this.now.setHours(0, 0, 0, 0);
            this.fakeLevels = this.generateFakeLevels(this.MINUTES_IN_HOUR);

            const scheduleNextTick = () => {
                this.now.setMinutes(this.now.getMinutes() + this.SIMULATION_STEP_MINUTES);

                if (this.now.getHours() === 0 && this.now.getMinutes() === 0) {
                    this.fakeLevels = this.generateFakeLevels(this.MINUTES_IN_HOUR);
                }

                this.setClock(this.now);
                this.updateLevels(this.fakeLevels.level_length, this.fakeLevels.levels);

                this.intervalId = window.setTimeout(() => {
                    scheduleNextTick();
                }, this.SIMULATION_UPDATE_PERIOD_MS);
            };

            scheduleNextTick();
        }

        const clock = this.shadowRoot.querySelector('.clock');
        if (clock) {
            this.resizeObserver = new ResizeObserver(() => {
                this.updateHoursFontSize();
            });
            this.resizeObserver.observe(clock);
        }
        this.setClock(this.now);

    }

    connectedCallback() {
        super.connectedCallback();
        requestAnimationFrame(() => {
            this.updateHoursFontSize();
        });
    }

    disconnectedCallback() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.intervalId) {
            clearTimeout(this.intervalId);
        }
        super.disconnectedCallback();
    }

    private updateHoursFontSize() {
        const cover = this.shadowRoot.querySelector('.gradient-cover');
        const clock = this.shadowRoot.querySelector('.clock');
        const hours = this.shadowRoot.querySelector('.hours') as HTMLElement;
        if (cover && clock && hours) {
            const clockRadius = clock.getBoundingClientRect().width / 2;
            const coverRadius = cover.getBoundingClientRect().width / 2;
            const sizeDiff = clockRadius - coverRadius;

            if (sizeDiff > 0) {
                const fontSize = Math.max(22, sizeDiff * 0.6);
                hours.style.setProperty('font-size', `${fontSize}px`, 'important');
            }
        }
    }

}
