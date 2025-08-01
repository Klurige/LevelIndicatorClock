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
        rates: { cost: number, credit: number, end: string, level: string, rank: number, spot_price: number, start:string }[];
    };
}

interface LevelsResponse {
    level_length: number;
    levels: string;
    low_threshold: number;
    high_threshold: number;
}

export class LevelIndicatorClockCard extends LitElement {
    private tag = "LevelIndicatorClockCard";

    private _hass: HomeAssistant;

    private resizeObserver: ResizeObserver;
    private readonly NUMBER_OF_LEVELS = 240;
    private readonly HISTORY = (this.NUMBER_OF_LEVELS / 12) - 1;
    private readonly degreesPerLevel = 360 / this.NUMBER_OF_LEVELS;
    private readonly minutesPerLevel = 12 * 60 / this.NUMBER_OF_LEVELS;
    private levels: string[] = new Array(this.NUMBER_OF_LEVELS).fill('U');

    @state() private electricity_price: string;
    @state() private date_time_iso: string;
    @state() private _dependencyMet = false;

    static get properties() {
        return {
            electricity_price: {state: true},
            date_time_iso: {type: String},
        };
    }

    setConfig(config: Config) {
        this.electricity_price = config.electricity_price;
        this.date_time_iso = config.date_time_iso;
        if (this._hass) {
            this.hass = this._hass
        }
    }

    set hass(hass: HomeAssistant) {
        if (!hass) {
            return;
        }
        if (this._hass !== hass) {
            console.log(this.tag + ": hass has changed...");
            this._hass = hass;
            this.checkDependencies();
        }
    }

    private checkDependencies() {
        console.log(this.tag + ": Checking dependencies...");
        this._dependencyMet = this._hass?.config?.components?.includes('electricitypricelevels');
        if(this._dependencyMet === false) {
            console.error("HACS integration 'electricitypricelevels' is not installed or loaded.");
            console.error("Installed HACS integrations:", this._hass.config.components);
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

    private intervalId: number | undefined;
    private now = new Date();
    private isSimulating = false;
    private fakeLevels = "";

    private electricityPriceSensorUpdated() {
        //console.log(this.tag + "Electricity price entity changed: ", this.electricity_price);
        //console.log(this.tag + "Current electricity price: ", this._hass.states[this.electricity_price]);
        const prices = this._hass.states[this.electricity_price] as unknown as Prices;
        if (prices && prices.attributes && prices.attributes.rates) {
            //console.log(this.tag + "Electricity prices: ", prices.attributes.rates.length);
            let priceLevels = "";
            let rates: number[] = [];
            const firstRateStart = new Date(prices.attributes.rates[0].start);
            const midnight = new Date(firstRateStart);
            midnight.setHours(0, 0, 0, 0);

            for (const rate of prices.attributes.rates) {
                const start = new Date(rate.start);
                const end = new Date(rate.end);
                const cost = rate.cost;

                let millis = end.getTime() - start.getTime();
                while(millis > 0) {
                    rates.push(cost);
                    millis -= 60 * 1000;
                }
            }

            for (let i = 0; i < rates.length; i += this.minutesPerLevel) {
                const chunk = rates.slice(i, i + this.minutesPerLevel);
                // All entries must be below the thresholds to be considered low, medium or high.
                if (chunk.length === 0) {
                    priceLevels += 'E';
                } else if (chunk.every(rate => rate < prices.attributes.low_threshold)) {
                    priceLevels += 'L';
                } else if (chunk.every(rate => rate < prices.attributes.high_threshold)) {
                    priceLevels += 'M';
                } else {
                    priceLevels += 'H';
                }

            }

            //console.log(this.tag + "Electricity price levels: ", priceLevels.length);
            priceLevels = priceLevels.padEnd(this.NUMBER_OF_LEVELS * 4, 'U');
            this.updateLevels(priceLevels, this.now);
        }

    }

    private dateTimeUpdated() {
        console.log(this.tag + ": Date time entity changed: ", this.date_time_iso);
        const dateTimeSensor = this._hass.states[this.date_time_iso];
        if (dateTimeSensor) {
            const currentTime = new Date(dateTimeSensor.state);
            console.log(this.tag + ": Current time from date_time_iso sensor: ", currentTime);
            this.setClock(currentTime);
        } else {
            console.error(this.tag + " Date time sensor not found: ", this.date_time_iso);
        }
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        console.log(this.tag + ": Updated properties: ", changedProperties);
        if (!this.isSimulating) {
            if (changedProperties.has('electricity_price')) {
                this.electricityPriceSensorUpdated();
            }
            if(changedProperties.has('date_time_iso')) {
                this.dateTimeUpdated()
            }
        }
    }

    private updateLevels(priceLevels: string, currentTime: Date) {
        // The clock will show 12 hours at a time, so we need to know levels from midnight and 36 hours ahead. Or 3 revolutions.
        const clock = this.shadowRoot.querySelector('.clock');
        if (clock && priceLevels.length > 0) {
            const currentLevel = Math.floor((currentTime.getHours() * 60 + currentTime.getMinutes()) / this.minutesPerLevel);
            let startIndex = currentLevel - this.HISTORY;
            let endIndex = startIndex + this.NUMBER_OF_LEVELS - 1;
            if (startIndex < 0) {
                startIndex = 0;
            }
            for (let i = startIndex; i < endIndex; i++) {
                const slotIndex = i % this.NUMBER_OF_LEVELS;
                this.levels[slotIndex] = priceLevels[i];
            }
            this.levels[endIndex % this.NUMBER_OF_LEVELS] = 'E';

            const gradient = this.levels.map((level, index) => {
                const startAngle = index * this.degreesPerLevel;
                const endAngle = startAngle + this.degreesPerLevel;
                let color: string;
                switch (level) {
                    case "L":
                        color = "green";
                        break;
                    case "M":
                        color = "yellow";
                        break;
                    case "H":
                        color = "red";
                        break;
                    case "U":
                        color = "magenta";
                        break;
                    case "S":
                        color = "blue";
                        break;
                    case "E":
                        color = "white";
                        break;
                    default:
                        color = "grey";
                }
                return `${color} ${startAngle}deg ${endAngle}deg`;
            }).join(', ');
            (clock as HTMLElement).style.background = `conic-gradient(${gradient})`;
        }
    }

    private setAngle(hand, angle) {
        (this.shadowRoot.querySelector("." + hand) as HTMLElement).style.transform = "rotate(" + angle + "deg)";
    }

    private setClock(currentTime: Date) {
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const hrAngle = currentHour * 30 + (currentMinute * 6 / 12);
        const minAngle = currentMinute * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);
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

    // Retrieve levels from the electricitypricelevels service.
    // Returns a LevelsResponse object with level_length, levels, low_threshold, and high_threshold.
    // If the service call fails, returns a default LevelsResponse object with level_length 0
    private getLevels() {
        console.log(this.tag + ": Fetching levels from electricitypricelevels service...");
        if (this._hass) {
            this._hass.callWS<LevelsResponse>({
                type: 'call_service',
                domain: 'electricitypricelevels',
                service: 'get_levels',
                return_response: true
            })
                .then((response) => {
                    console.log(this.tag + " Service electricitypricelevels.get_levels called successfully.");
                    if (response) {
                        return response;
                    } else {
                        return {
                            level_length: 0,
                            levels: "",
                            low_threshold: 0,
                            high_threshold: 0
                        }
                    }
                })
                .catch((error) => {
                    console.error(this.tag + " Error calling service electricitypricelevels.get_levels:", error);
                });
        }
        return {
            level_length: 0,
            levels: "",
            low_threshold: 0,
            high_threshold: 0
        };

    }
    firstUpdated() {
        console.log(this.tag + " First updated, initializing clock...");


        let millisecondsUntilNextMinute = 0;
        if(this.isSimulating) {
            this.fakeLevels = "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS";
            this.now.setHours(23, 50, 0, 0);
        }
        const scheduleNextTick = () => {
            if(!this.isSimulating) {
                this.now = new Date();
                const nextMinute = new Date(this.now.getTime());
                nextMinute.setSeconds(0, 0);
                nextMinute.setMinutes(nextMinute.getMinutes() + 1);
                millisecondsUntilNextMinute = nextMinute.getMilliseconds() - this.now.getMilliseconds();
            } else {
                // Simulating: just add 1 minute to the current time.
                this.now.setMinutes(this.now.getMinutes() + 1);
                // Time flies when simulating, one minute every 1000 milliseconds.
                millisecondsUntilNextMinute = 50;
                if (this.now.getHours() === 0 && this.now.getMinutes() === 0) {
                    this.fakeLevels = this.fakeLevels.slice(120);
                    this.fakeLevels += 'U'.repeat(120);
                    console.log(this.tag + "New day: " + this.fakeLevels);
                } else if(this.now.getHours() === 15 && this.now.getMinutes() === 0) {
                    this.fakeLevels = this.fakeLevels.slice(0, -120);
                    let newLevels = '';
                    const levels = ['L', 'M', 'H'];
                    for (let i = 0; i < 24; i++) { // 24 hours, 120 levels
                        const level = levels[Math.floor(Math.random() * levels.length)];
                        newLevels += level.repeat(5); // 5 slots per hour
                    }
                    this.fakeLevels += newLevels;
                    console.log(this.tag + "New 24 hours: " + this.fakeLevels);
                }
            }
            this.updateLevels(this.fakeLevels, this.now);
            this.setClock(this.now);
            this.intervalId = window.setTimeout(() => {
                scheduleNextTick();
            }, millisecondsUntilNextMinute);
        };

        scheduleNextTick();

        const clock = this.shadowRoot.querySelector('.clock');
        if (clock) {
            this.resizeObserver = new ResizeObserver(() => {
                this.updateHoursFontSize();
            });
            this.resizeObserver.observe(clock);
        }
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
