import {html, LitElement, PropertyValueMap, svg} from "lit";
import {property, state} from "lit/decorators.js";
import styles from './levelindicatorclockcard.styles';
import {HomeAssistant} from "custom-card-helpers";
import {Config} from "./Config";

interface Timestamp {
    state: string;
}

export class LevelIndicatorClockCard extends LitElement {
    private tag = "LevelIndicatorClockCard";


    private intervalId: number | undefined;
    private isSimulating = false;
    private readonly SIMULATION_STEP_MINUTES = 1;
    private readonly SIMULATION_UPDATE_PERIOD_MS = 1000;

    private minuteIndex = 0;

    @state() private electricity_price: string;
    @state() private date_time_iso: string;
    @state() private _dependencyMet = false;
    @state() private hourHandEnd = {x: 100, y: 55};
    @state() private minuteHandEnd = {x: 100, y: 40};

    private static readonly centerX = 100;
    private static readonly centerY = 100;
    private static readonly hourDigitsRadius = 82;
    private static readonly hourDigits = Array.from({length: 12}, (_, i) => {
        const hour = i + 1;
        const angle = ((hour - 3) * Math.PI * 2) / 12;
        const x = LevelIndicatorClockCard.centerX + LevelIndicatorClockCard.hourDigitsRadius * Math.cos(angle);
        const y = LevelIndicatorClockCard.centerY + LevelIndicatorClockCard.hourDigitsRadius * Math.sin(angle);
        return svg`<text x="${x}" y="${y}" font-weight="bold">${hour}</text>`;
    });

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
            console.debug("[ClockCard] Skipping update: simulating or hass not available.");
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
            console.info(this.tag + ": Called getLevels");
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

    updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
        super.updated(changedProperties);
        console.log(this.tag + ": Updated properties: ", changedProperties);
    }


    private setAngle(hand, angle) {
        const handElement = this.shadowRoot?.querySelector("." + hand) as HTMLElement;
        if (handElement) {
            console.debug(this.tag + ": Setting angle of " + hand + " to " + angle + " degrees.");
            handElement.style.transform = "rotate(" + angle + "deg)";
        } else {
            console.debug(`${this.tag}: Hand element '${hand}' not found.`);
        }
    }

    private static polarToCartesian(cx: number, cy: number, r: number, angleRad: number) {
        return {
            x: cx + r * Math.cos(angleRad - Math.PI / 2),
            y: cy + r * Math.sin(angleRad - Math.PI / 2)
        };
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
                ${!this._dependencyMet ?
                        html`
                            <div class="error">
                                <p>HACS integration 'electricitypricelevels' is not installed or loaded.</p>
                            </div>
                        ` : ''
                }
                ${svg`
                <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="95" fill="#f0f0f0" stroke="#333" stroke-width="2.5" />

                    <g font-family="Helvetica, sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">
                        ${LevelIndicatorClockCard.hourDigits}
                    </g>

                    <line class="hour-hand" x1="100" y1="100" x2="${this.hourHandEnd.x}" y2="${this.hourHandEnd.y}"
                          stroke="#000" stroke-width="5" stroke-linecap="round" />
                    <line class="minute-hand" x1="100" y1="100" x2="${this.minuteHandEnd.x}" y2="${this.minuteHandEnd.y}"
                          stroke="#000" stroke-width="3" stroke-linecap="round" />
                    <circle cx="100" cy="100" r="4" fill="#000" />
                </svg>
            `}
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

    firstUpdated() {
        console.log(this.tag + " First updated, initializing clock...");

        if (this.isSimulating) {
            this.now = new Date();
            this.now.setHours(0, 0, 0, 0);

            const scheduleNextTick = () => {
                this.now.setMinutes(this.now.getMinutes() + this.SIMULATION_STEP_MINUTES);

                this.setClock(this.now);

                this.intervalId = window.setTimeout(() => {
                    scheduleNextTick();
                }, this.SIMULATION_UPDATE_PERIOD_MS);
            };

            scheduleNextTick();
        }

        this.setClock(this.now);

    }

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        if (this.intervalId) {
            clearTimeout(this.intervalId);
        }
        super.disconnectedCallback();
    }

}
