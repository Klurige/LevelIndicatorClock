import {html, LitElement, PropertyValueMap, svg} from "lit";
import {property, state} from "lit/decorators.js";
import styles from './levelindicatorclockcard.styles';
import {HomeAssistant} from "custom-card-helpers";
import {Config} from "./Config";

interface LevelsResponse {
    minutes_since_midnight: number;
    level_length: number;
    passed_levels: string;
    future_levels: string;
}

interface Timestamp {
    state: string;
}

const DEFAULT_LEVELS_RESPONSE: LevelsResponse = {
    minutes_since_midnight: 0,
    level_length: 0,
    passed_levels: '',
    future_levels: ''
};

export class LevelIndicatorClockCard extends LitElement {
    private tag = "LevelIndicatorClockCard";


    private intervalId: number | undefined;
    private isSimulating = false;
    private readonly SIMULATION_STEP_MINUTES = 1;
    private readonly SIMULATION_UPDATE_PERIOD_MS = 1000;

    private current_time_minutes = 0;
    @property({type: String}) electricity_price = '';
    @property({type: String}) date_time_iso = '';
    @property({type: String}) _compactlevels = '';
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

    private currentTime = new Date();

    static get properties() {
        return {
            electricity_price: {state: true},
            compactlevels: {type: String},
            date_time_iso: {type: String},
        };
    }

    setConfig(config: Config) {
        this.electricity_price = config.electricity_price;
        this.date_time_iso = config.date_time_iso;
        this._compactlevels = config.compactlevels;
    }

    set hass(hass: HomeAssistant) {
        if (this.isSimulating || !hass) {
            console.debug("[ClockCard] Skipping update: simulating or hass not available.");
            return;
        }
        const timestamp = hass.states[this.date_time_iso] as Timestamp;
        const now = new Date(timestamp.state);
        if (now.getTime() !== this.currentTime.getTime()) {
            this.currentTime = now;
            console.debug('[ClockCard] Current time: ', this.currentTime);
            this.setClock(this.currentTime);
        }
        this._dependencyMet = hass?.config?.components?.includes('electricitypricelevels');
        if (this._dependencyMet === false) {
            console.error("HACS integration 'electricitypricelevels' is not installed or loaded.");
        } else {
            const compactLevelsState = hass.states?.['sensor.compactlevels'];
            const compactLevels = compactLevelsState?.attributes?.compact ?? undefined;
            if (compactLevels !== this._compactlevels) {
                this._compactlevels = compactLevels ?? '';
                console.debug('[ClockCard] sensor.compactlevels state:', this._compactlevels);
                const result = this._compactToLevels(compactLevels);
                console.debug("[ClockCard] Levels data:", result);
            }
        }
    }

    private _compactToLevels(compactLevels: string | undefined): LevelsResponse {
        // Expecting format: "minutes_since_midnight:level_length:passed_levels:future_levels"
        if (!compactLevels) {
            return DEFAULT_LEVELS_RESPONSE;
        }
        const parts = compactLevels.split(":");
        if (parts.length < 4) {
            console.error('[ClockCard] Invalid compactLevels format:', compactLevels);
            return DEFAULT_LEVELS_RESPONSE;
        }
        const minutes_since_midnight = parseInt(parts[0], 10);
        const level_length = parseInt(parts[1], 10);
        const passed_levels = parts[2];
        const future_levels = parts[3];
        return {
            minutes_since_midnight: minutes_since_midnight,
            level_length: level_length,
            passed_levels: passed_levels,
            future_levels: future_levels
        };
    }

    getCardSize() {
        console.debug("[ClockCard] getCardSize()");
        return 5;
    }

    static styles = styles;

    public getLayoutOptions() {
        console.debug("[ClockCard] getLayoutOptions");
        return {
            grid_rows: 8,
            grid_columns: 12,
        };
    }

    updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
        super.updated(changedProperties);
        console.debug('[ClockCard] Updated: ', changedProperties);
    }


    private setAngle(hand, angle) {
        const handElement = this.shadowRoot?.querySelector("." + hand) as HTMLElement;
        if (handElement) {
            console.debug(this.tag + ": Setting angle of " + hand + " to " + angle + " degrees.");
            handElement.style.transform = "rotate(" + angle + "deg)";
        } else {
            console.error(`${this.tag}: Hand element '${hand}' not found.`);
        }
    }

    private setClock(currentTime: Date) {
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const hrAngle = currentHour * 30 + (currentMinute * 6 / 12);
        const minAngle = currentMinute * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);
        this.current_time_minutes = (currentHour * 60 + currentMinute) % 1440;
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
                    name: 'compactlevels',
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
            this.currentTime = new Date();
            this.currentTime.setHours(0, 0, 0, 0);

            const scheduleNextTick = () => {
                this.currentTime.setMinutes(this.currentTime.getMinutes() + this.SIMULATION_STEP_MINUTES);

                this.setClock(this.currentTime);

                this.intervalId = window.setTimeout(() => {
                    scheduleNextTick();
                }, this.SIMULATION_UPDATE_PERIOD_MS);
            };

            scheduleNextTick();
        }

        this.setClock(this.currentTime);

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
