import {html, LitElement, PropertyValueMap, svg} from "lit";
import {property, state} from "lit/decorators.js";
import styles from './levelindicatorclockcard.styles';
import {HomeAssistant} from "custom-card-helpers";
import {Config} from "./Config";
import {LevelArcs} from './LevelArcs';
import {compactToLevels, LevelsResponse} from './utils';

export class LevelIndicatorClockCard extends LitElement {
    private intervalId: number | undefined;
    private isSimulating = false;
    private SIMULATE_LEVEL_LENGTH = 60;
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

    private static MARKER_WIDTH_MINUTES: number = 3;
    private static HISTORY_LENGTH_MINUTES = 60;
    private levelLength: number;
    private currentLevels: string;
    private currentStartMinute: number;
    private futureLevels: string;
    private futureStartMinute: number;

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
        const now_minutes = now.getHours() * 60 + now.getMinutes();
        if (now_minutes != this.current_time_minutes) {
            this.current_time_minutes = now_minutes;
            this.setCurrentMinute(this.current_time_minutes);
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

    // Level to show for passed and future levels. requestUpdate() must be called to display any changes.
    private levelArcs: LevelArcs = new LevelArcs('U');

    /**
     * Update levels based on new data from electricitypricelevels.
     *
     * When extracting the levels, there is always one level overlap since time could be in the middle of a level.
     * The current level is included in both passed_levels and future_levels. The first char of future_levels is at the end of current levels.
     * @param levels
     * @private
     */
    private _updateLevels(levels: LevelsResponse) {
        this.levelLength = levels.level_length;
        const startOfCurrentSlot = Math.floor(levels.minutes_since_midnight / this.levelLength) * this.levelLength;
        const currentLevel = (levels.future_levels.length > 0) ? levels.future_levels.charAt(0) : 'U';
        const passedLevelsMinutes = levels.passed_levels.length * this.levelLength;
        const passedLevels = levels.passed_levels.toLowerCase() + currentLevel.toLowerCase();
        const passedStartMinute = startOfCurrentSlot - passedLevelsMinutes;
        const historyLengthLevels = Math.ceil(LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES / this.levelLength);
        this.currentLevels = levels.future_levels.substring(0, historyLengthLevels);
        this.currentStartMinute = startOfCurrentSlot;
        const currentLengthLevels = Math.floor(12*60/this.levelLength) - historyLengthLevels;
        const current = levels.future_levels.substring(0, currentLengthLevels+1);
        this.futureLevels = levels.future_levels.substring(currentLengthLevels, currentLengthLevels + historyLengthLevels);
        this.futureStartMinute = startOfCurrentSlot + currentLengthLevels * this.levelLength;

        // Part of current level that has passed.
        let slotIndex = passedLevels.length-1;
        const historyStartMinute = this.current_time_minutes - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        let currentMinute = this.current_time_minutes;
        if(currentMinute > startOfCurrentSlot) {
            this.levelArcs.insertLevelAtMinute(startOfCurrentSlot, currentMinute - startOfCurrentSlot, passedLevels.charAt(slotIndex));
        }
        currentMinute = startOfCurrentSlot - 1;
        slotIndex--;
        // Fill in all passed levels, until we reach historyStartMinute. This will occasionally fill in a few minutes too much,
        // but that will be corrected when filling in future levels.
        while (currentMinute >= historyStartMinute && slotIndex >= 0) {
            const levelChar = passedLevels.charAt(slotIndex);
            this.levelArcs.insertLevelAtMinute(currentMinute - this.levelLength + 1, this.levelLength, levelChar);
            currentMinute -= this.levelLength;
            slotIndex--;
        }

        // Part of current level that has not yet passed.
        this.levelArcs.insertLevelAtMinute(this.current_time_minutes, startOfCurrentSlot + this.levelLength - this.current_time_minutes, currentLevel);

        // Fill in all currently visible levels, until we reach currentMinute + 12 hours - history length.
        slotIndex = 1;
        currentMinute = startOfCurrentSlot + this.levelLength;
        const currentEndMinute = this.current_time_minutes + 12 * 60 - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        while(currentMinute <= currentEndMinute- this.levelLength) {
            const levelChar = current.charAt(slotIndex);
            this.levelArcs.insertLevelAtMinute(currentMinute, this.levelLength, levelChar);
            currentMinute += this.levelLength;
            slotIndex++;
        }
        // Fill in remaining part to reach currentEndMinute
        if(currentMinute < currentEndMinute) {
            const levelChar = (slotIndex < current.length) ? current.charAt(slotIndex) : 'U';
            const minutesLeft = currentEndMinute - currentMinute;
            console.debug("[ClockCard] Filling remaining part:", currentMinute, "length:", minutesLeft, "level:", levelChar);
            this.levelArcs.insertLevelAtMinute(currentMinute, minutesLeft, levelChar);
        }

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
        this.current_time_minutes = currentMinutes;
        const currentHour = this.current_time_minutes % 60;
        const currentMinute = this.current_time_minutes - currentHour * 60;
        const hrAngle = currentHour * 30 + (currentMinute * 6 / 12);
        const minAngle = currentMinute * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);

        const passedMinutes = this.current_time_minutes - previousCurrentTime;
        let passedStart = previousCurrentTime;
        let passedEnd = this.current_time_minutes;
        let slotIndex = Math.floor((passedStart - this.currentStartMinute) / this.levelLength);
        let slotStart = this.currentStartMinute + slotIndex * this.levelLength;
        let slotEnd = slotStart + this.levelLength;
        while(passedStart < passedEnd) {
            const newEnd = slotEnd < passedEnd ? slotEnd : passedEnd;
            const levelChar = (slotIndex < this.currentLevels.length)?this.currentLevels.charAt(slotIndex).toLowerCase():'u';
            this.levelArcs.insertLevelAtMinute(passedStart, newEnd - passedStart, levelChar);
            passedStart = newEnd;
            slotStart = slotEnd;
            slotEnd = slotStart + this.levelLength;
            slotIndex++;
        }

        let futureStart = previousCurrentTime + 12 * 60 - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        let futureEnd = futureStart + passedMinutes;
        slotIndex = Math.floor((futureStart - this.futureStartMinute) / this.levelLength);
        slotStart = this.futureStartMinute + slotIndex * this.levelLength;
        slotEnd = slotStart + this.levelLength;
        while(futureStart < futureEnd) {
            const newEnd = slotEnd < futureEnd ? slotEnd : futureEnd;
            const levelChar = (slotIndex < this.futureLevels.length)?this.futureLevels.charAt(slotIndex):'U';
            this.levelArcs.insertLevelAtMinute(futureStart, newEnd - futureStart, levelChar);
            futureStart = newEnd;
            slotStart = slotEnd;
            slotEnd = slotStart + this.levelLength;
            slotIndex++;
        }

        this.levelArcs.insertLevelAtMinute(futureEnd, LevelIndicatorClockCard.MARKER_WIDTH_MINUTES, 'P');
        this.requestUpdate();
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
        // Each char in passed_levels represents level_length minutes, total length should be at least one hour.
        // Each char in future_levels represents level_length minutes, total length should be at least 12 hours.
        const level_length = this.SIMULATE_LEVEL_LENGTH;
//        const static_data = "LMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMH";
        const static_data = "LLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMM";
        const current_level_index = Math.floor(currentMinutes / level_length);
        const numPassed = Math.ceil(60 / level_length);
        let passed_start = Math.max(0, current_level_index - numPassed);
        let passed_levels = static_data.substring(passed_start, current_level_index);
        // Pad with 'U' if not enough data (e.g., at midnight)
        if (passed_levels.length < numPassed) {
            passed_levels = 'U'.repeat(numPassed - passed_levels.length) + passed_levels;
        }
        const numFuture = Math.ceil(12 * 60 / level_length);
        let future_levels = static_data.substring(current_level_index, current_level_index + numFuture);
        // Pad with 'U' if not enough data (e.g., near end of day)
        if (future_levels.length < numFuture) {
            future_levels = future_levels + 'U'.repeat(numFuture - future_levels.length);
        }
        return `${currentMinutes}:${level_length}:${passed_levels}:${future_levels}`;
    }

    firstUpdated() {
        console.log("[ClockCard] First updated, initializing clock...");

        if (this.isSimulating) {
            console.debug("[ClockCard] Starting in simulation mode.");
            const startTime = new Date();
            startTime.setHours(0, 0, 0, 0);
            this.current_time_minutes = startTime.getHours() * 60 + startTime.getMinutes();
            const levels = this._generateCompactLevels(this.current_time_minutes)
            const result = compactToLevels(levels);
            this._updateLevels(result);
            const scheduleNextTick = () => {
                this.setCurrentMinute(this.current_time_minutes + this.SIMULATION_STEP_MINUTES);
                //if (this.current_time_minutes % this.SIMULATE_LEVEL_LENGTH === 0) { // New data every level length
                if (this.current_time_minutes % 60 === 0) { // New data every hour, regardless of level length
                    const levels = this._generateCompactLevels(this.current_time_minutes)
                    const result = compactToLevels(levels);
                    this._updateLevels(result);
                }

                this.intervalId = window.setTimeout(() => {
                    scheduleNextTick();
                }, this.SIMULATION_UPDATE_PERIOD_MS);
            };

            scheduleNextTick();
        } else {
            this.setCurrentMinute(this.current_time_minutes);
        }
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
