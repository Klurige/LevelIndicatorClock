import {html, LitElement, PropertyValueMap, svg} from "lit";
import {property, state} from "lit/decorators.js";
import styles from './levelindicatorclockcard.styles';
import {HomeAssistant} from "custom-card-helpers";
import {Config} from "./Config";
import {LevelArcs} from './LevelArcs';
import { compactToLevels, LevelsResponse } from './utils';

export class LevelIndicatorClockCard extends LitElement {
    private intervalId: number | undefined;
    private isSimulating = false;
    private readonly SIMULATION_STEP_MINUTES = 1;
    private readonly SIMULATION_UPDATE_PERIOD_MS = 200;

    private current_time_minutes = 0;
    @property({type: String}) electricity_price = '';
    @property({type: String}) date_time_iso = '';
    @property({type: String}) compactlevels = '';
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

    private static readonly arcRadius = LevelIndicatorClockCard.hourDigitsRadius + 1;
    private static readonly arcStrokeWidth = 22;

    private currentTime = new Date();
    private static MARKER_WIDTH_MINUTES: number = 3;
    private static HISTORY_LENGTH_MINUTES = 60;
    private passedColor: string;
    private futureColor: string;

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
        this.compactlevels = config.compactlevels;
    }

    set hass(hass: HomeAssistant) {
        this._dependencyMet = hass?.config?.components?.includes('electricitypricelevels');
        if (this.isSimulating || !hass) {
            console.error("[ClockCard] Skipping update: simulating or hass not available.");
            return;
        }
        const timestamp = hass.states[this.date_time_iso] as Timestamp;
        const now = new Date(timestamp.state);
        if (now.getTime() !== this.currentTime.getTime()) {
            this.currentTime = now;
            console.debug('[ClockCard] Current time: ', this.currentTime);
            const currentMinutes = this.currentTime.getHours() * 60 + this.currentTime.getMinutes();
            this.setCurrentMinute(currentMinutes);
        }
        if (this._dependencyMet === false) {
            console.error("HACS integration 'electricitypricelevels' is not installed or loaded.");
        } else {
            const compactLevelsState = hass.states?.['sensor.compactlevels'];
            const compactLevels = compactLevelsState?.attributes?.compact ?? undefined;
            if (compactLevels !== this.compactlevels) {
                this.compactlevels = compactLevels ?? '';
                console.debug('[ClockCard] sensor.compactlevels state:', this.compactlevels);
                const result = compactToLevels(compactLevels);
                this._updateLevels(result);
            }
        }
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
    }

    @state() private levelArcs: LevelArcs = new LevelArcs(this.getLevelColor('U'));

    private _updateLevels(levels: LevelsResponse) {
        //console.debug('[ClockCard] Updating levels: ', levels);
        const currentMinute = this.current_time_minutes;
        const startOfCurrentSlot = Math.floor(levels.minutes_since_midnight / levels.level_length) * levels.level_length;
        //console.debug("[ClockCard] Current minute:", currentMinute, "Start of current slot:", startOfCurrentSlot, "Minutes since midnight:", levels.minutes_since_midnight);
        const endOfCurrentSlot = startOfCurrentSlot + levels.level_length;
        const levelsHistoryLength = levels.passed_levels.length * levels.level_length
        const historyStartMinute = currentMinute - levelsHistoryLength;
        const futureEndMinute = historyStartMinute + 12 * 60;
        const startOfHistorySlot = Math.floor(historyStartMinute / levels.level_length) * levels.level_length;
        let endOfHistorySlot = startOfHistorySlot + levels.level_length;
        //console.debug("[ClockCard] Start of history slot:", startOfHistorySlot, "End of history slot:", endOfHistorySlot, "Future end minute:", futureEndMinute);

        // Fill in all passed levels
        let slotIndex = 0;
        let slotStartMinute = historyStartMinute;
        while (slotStartMinute < endOfHistorySlot) {
            const  levelChar = (slotIndex < levels.passed_levels.length)?levels.passed_levels.charAt(slotIndex):'U';
            const color = this.getLevelColor(levelChar.toLowerCase());
            slotIndex++;
            this.levelArcs.insertLevelAtMinute(slotStartMinute, levels.level_length, color);
            slotStartMinute += levels.level_length;
        }
        // Also fill in any remaining part of the current slot that has passed
        const currentLevelChar = (levels.future_levels.length > 0)?levels.future_levels.charAt(0):'U';
        this.passedColor = this.getLevelColor(currentLevelChar.toLowerCase());
        this.levelArcs.insertLevelAtMinute(startOfCurrentSlot, currentMinute - startOfCurrentSlot, this.passedColor);

        // Fill in part of current slot that has not passed
        const currentColor = this.getLevelColor(currentLevelChar);
        this.levelArcs.insertLevelAtMinute(currentMinute, endOfCurrentSlot - currentMinute, currentColor);
        // Fill in all future levels, until we reach currentMinute - HISTORY_LENGTH + 12*60
        slotIndex = 1; // First future slot is already handled above
        slotStartMinute = endOfCurrentSlot;
        const slotEndMinute = slotStartMinute + 11 * 60 -  LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES
        while (slotStartMinute < slotEndMinute) {
            const levelChar = (slotIndex < levels.future_levels.length)?levels.future_levels.charAt(slotIndex):'U';
            const color = this.getLevelColor(levelChar);
            slotIndex++;
            this.levelArcs.insertLevelAtMinute(slotStartMinute, levels.level_length, color);
            slotStartMinute += levels.level_length;
        }
        // Fill in remaining part to reach futureEndMinute
        const  futureLevelChar = (slotIndex < levels.future_levels.length)?levels.future_levels.charAt(slotIndex):'U';
        this.futureColor = this.getLevelColor(futureLevelChar);
        this.levelArcs.insertLevelAtMinute(slotStartMinute, futureEndMinute - slotStartMinute, this.futureColor);

        this.setCurrentMinute(this.current_time_minutes)
    }

    private setAngle(hand, angle) {
        const handElement = this.shadowRoot?.querySelector("." + hand) as HTMLElement;
        if (handElement) {
            handElement.style.transform = "rotate(" + angle + "deg)";
        } else {
            console.error(`[ClockCard]: Hand element '${hand}' not found.`);
        }
    }

    private setCurrentMinute(currentMinutes: number) {
        const previousCurrentTime = this.current_time_minutes;
        const currentHour = currentMinutes % 60;
        const currentMinute = currentMinutes - currentHour * 60;
        const hrAngle = currentHour * 30 + (currentMinute * 6 / 12);
        const minAngle = currentMinute * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);
        this.current_time_minutes = (currentHour * 60 + currentMinute) % 1440;


        const passedStart = previousCurrentTime - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        const passedMinutes = (this.current_time_minutes - previousCurrentTime + 1440) % 1440;

        // Change old minutes to future minutes.
        this.levelArcs.insertLevelAtMinute(passedStart, passedMinutes, this.futureColor);
        // Change passed minutes in current slot to passed color.
        this.levelArcs.insertLevelAtMinute(previousCurrentTime, passedMinutes, this.passedColor);
        // Add marker between past and future.
        this.levelArcs.insertLevelAtMinute(passedStart + passedMinutes, LevelIndicatorClockCard.MARKER_WIDTH_MINUTES, this.getLevelColor('P'));
        this.requestUpdate();
    }

    private getLevelColor(level: string): string {
        switch (level) {
            case "L":
                return "green"; // Green for low
            case "l":
                return "darkgreen"; // Dark green for low
            case "M":
                return "yellow"; // Yellow for medium
            case "m":
                return "olive"; // Dark yellow for medium
            case "H":
                return "red"; // Red for high
            case "h":
                return "maroon"; // Dark red for high
            case "S":
                return "blue"; // Blue for solar
            case "s":
                return "navy"; // Dark blue for solar
            case "U":
                return "magenta"; // Magenta for unknown
            case "u":
                return "purple"; // Dark magenta for unknown
            case "E":
                return "cyan"; // Cyan for error
            case "e":
                return "teal"; // Dark cyan for error
            case "P":
                return "white"; // White for passed
            case "p":
                return "gray"; // Dark grey for passed
            default:
                console.debug(`Unknown level character '${level}', defaulting to black.`);
                return "black"; // Black for other
        }
    }

    render() {
        const arcPaths = this.levelArcs.getArcs().map(levelArc => {
            const path = levelArc.arcToPath(
                LevelIndicatorClockCard.centerX,
                LevelIndicatorClockCard.centerY,
                LevelIndicatorClockCard.arcRadius
            );
            return svg`<path d="${path}" stroke="${levelArc.color}" stroke-width="${LevelIndicatorClockCard.arcStrokeWidth}" fill="none" />`;
        });
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

                    ${arcPaths}

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

    _generateCompactLevels(currentMinutes: number): string {
        // Should generate a string of format minutes_since_midnight:level_length:passed_levels:future_levels
        // from the static data string that covers two full days.
        // Result is for example 120:60:L:LLLLMMMMLLLL
        const level_length = 60;
        const static_data = "LMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMH"
        const current_level_index = Math.floor(currentMinutes / level_length);
        const passed_levels = (current_level_index > 0)?static_data.charAt(current_level_index-1):'U';
        const future_levels = static_data.substring(current_level_index, current_level_index + 12);
        return "" + currentMinutes + ":" + level_length + ":" + passed_levels + ":" + future_levels;

    }

    firstUpdated() {
        console.log("[ClockCard] First updated, initializing clock...");

        if (this.isSimulating) {
            console.debug("[ClockCard] Starting in simulation mode.");
            this.currentTime = new Date();
            this.currentTime.setHours(0, 0, 0, 0);
            const minutesPassed = this.currentTime.getHours() * 60 + this.currentTime.getMinutes();
                const levels = this._generateCompactLevels(minutesPassed)
                const result = compactToLevels(levels);
                console.debug("[ClockCard] Getting levels: ", levels, result);
                this._updateLevels(result);
                this.requestUpdate();
            const scheduleNextTick = () => {
                this.currentTime.setMinutes(this.currentTime.getMinutes() + this.SIMULATION_STEP_MINUTES);
                const currentMinutes = this.currentTime.getHours() * 60 + this.currentTime.getMinutes();
                this.setCurrentMinute(currentMinutes);
                if (this.currentTime.getMinutes() === 0) {
                    const minutesPassed = this.currentTime.getHours() * 60 + this.currentTime.getMinutes();
                    const levels = this._generateCompactLevels(minutesPassed)
                    const result = compactToLevels(levels);
                    console.debug("[ClockCard] Getting levels: ", levels, result);
                    this._updateLevels(result);
                    this.requestUpdate();
                }

                this.intervalId = window.setTimeout(() => {
                    scheduleNextTick();
                }, this.SIMULATION_UPDATE_PERIOD_MS);
            };

            scheduleNextTick();
        }

        const currentMinutes = this.currentTime.getHours() * 60 + this.currentTime.getMinutes();
        this.setCurrentMinute(currentMinutes);
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

interface Timestamp {
    state: string;
}
