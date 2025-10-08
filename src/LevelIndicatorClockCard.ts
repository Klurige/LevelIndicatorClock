import {html, LitElement, PropertyValueMap, svg} from "lit";
import {property, state} from "lit/decorators.js";
import styles from './levelindicatorclockcard.styles';
import {HomeAssistant} from "custom-card-helpers";
import {Config} from "./Config";
import {LevelArcs} from './LevelArcs';
import {compactToLevels, getCurrentMinutesSinceMidnight, LevelsResponse} from './utils';

export class LevelIndicatorClockCard extends LitElement {
    private intervalId: number | undefined;
    private isSimulating = false;
    private readonly SIMULATE_LEVEL_LENGTH = 60;
    private readonly SIMULATION_STEP_MINUTES = 1;
    private readonly SIMULATION_UPDATE_PERIOD_MS = 200;

    private currentTimeMinutes = 0;
    @property({type: String}) compactLevels = '';
    @state() private dependencyMet = false;
    @state() private hourHandEnd = {x: 100, y: 55};
    @state() private minuteHandEnd = {x: 100, y: 40};

    private static readonly CENTER_X = 100;
    private static readonly CENTER_Y = 100;
    private static readonly HOUR_DIGITS_RADIUS = 82;
    private static readonly hourDigits = Array.from({length: 12}, (_, i) => {
        const hour = i + 1;
        const angle = ((hour - 3) * Math.PI * 2) / 12;
        const x = LevelIndicatorClockCard.CENTER_X + LevelIndicatorClockCard.HOUR_DIGITS_RADIUS * Math.cos(angle);
        const y = LevelIndicatorClockCard.CENTER_Y + LevelIndicatorClockCard.HOUR_DIGITS_RADIUS * Math.sin(angle);
        return svg`<text x="${x}" y="${y}" font-weight="bold">${hour}</text>`;
    });

    private static readonly ARC_RADIUS = LevelIndicatorClockCard.HOUR_DIGITS_RADIUS + 1;
    private static readonly ARC_STROKE_WIDTH = 22;

    private static readonly MARKER_WIDTH_MINUTES = 3;
    private static readonly HISTORY_LENGTH_MINUTES = 60;
    private levelLength: number;
    private currentLevels: string;
    private currentStartMinute: number;
    private futureLevels: string;
    private futureStartMinute: number;
    private isFirstUpdate: boolean = true;

    // New: ticker for advancing the clock every minute (real mode)
    private minuteTickerId: number | undefined;

    static get properties() {
        return {
            compactlevels: {type: String},
        };
    }

    setConfig(config: Config) {
        this.compactLevels = config.compact_levels;
    }

    set hass(hass: HomeAssistant) {
        this.dependencyMet = hass?.config?.components?.includes('electricitypricelevels');
        if (this.isSimulating || !hass) {
            console.error("[ClockCard] Skipping update: simulating or hass not available.");
            return;
        }
        if (this.dependencyMet === false) {
            console.error("HACS integration 'electricitypricelevels' is not installed or loaded.");
        } else {
            const compactLevelsState = hass.states?.['sensor.compactlevels'];
            const compactLevels = compactLevelsState?.attributes?.compact ?? undefined;
            if (compactLevels !== this.compactLevels) {
                this.compactLevels = compactLevels ?? '';
                console.debug('[ClockCard] sensor.compactlevels state:', this.compactLevels);
                const result = compactToLevels(compactLevels);
                this.updateLevels(result);
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

    // Helper to stop the minute ticker
    private stopMinuteTicker() {
        if (this.minuteTickerId !== undefined) {
            console.debug('[ClockCard] Stopping existing minute ticker:', this.minuteTickerId);
            clearInterval(this.minuteTickerId);
            this.minuteTickerId = undefined;
        }
    }

    // Helper to start the minute ticker. Immediately sets the current minute and then increments once per real minute.
    private startMinuteTicker(startMinutes: number) {
        if (this.isSimulating) {
            console.debug('[ClockCard] Simulation mode active; skipping startMinuteTicker.');
            return;
        }
        this.stopMinuteTicker();
        console.debug('[ClockCard] Starting minute ticker at', startMinutes);
        // Immediately render the provided start minute
        this.setCurrentMinute(startMinutes);
        // Then advance once every real minute
        this.minuteTickerId = window.setInterval(() => {
            // Use the existing current_time_minutes so it continues from the last value
            this.setCurrentMinute(this.currentTimeMinutes + 1);
        }, 60 * 1000);
    }

    /**
     * Update levels based on new data from electricitypricelevels.
     *
     * When extracting the levels, there is always one level overlap since time could be in the middle of a level.
     * The current level is included in both passed_levels and future_levels. The first char of future_levels is at the end of current levels.
     * @param levels
     * @private
     */
    private updateLevels(levels: LevelsResponse) {
        this.currentTimeMinutes = this.isFirstUpdate ? getCurrentMinutesSinceMidnight() : levels.minutes_since_midnight;
        if (this.isFirstUpdate) {
            console.debug('[ClockCard] First update - using actual current time:', this.currentTimeMinutes, 'instead of levels time:', levels.minutes_since_midnight);
            this.isFirstUpdate = false;
        }

        // Set the current time FIRST, before calculating any arcs
        //this.current_time_minutes = levels.minutes_since_midnight;

        this.levelLength = levels.level_length;
        const startOfCurrentLevel = Math.floor(levels.minutes_since_midnight / this.levelLength) * this.levelLength;
        const currentLevel = (levels.future_levels.length > 0) ? levels.future_levels.charAt(0) : 'U';
        const passedLevels = levels.passed_levels.toLowerCase() + currentLevel.toLowerCase();
        const historyLengthLevels = Math.ceil(LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES / this.levelLength);
        this.currentLevels = levels.future_levels.substring(0, historyLengthLevels);
        this.currentStartMinute = startOfCurrentLevel;
        const currentLengthLevels = Math.floor(12 * 60 / this.levelLength) - historyLengthLevels;
        const current = levels.future_levels.substring(0, currentLengthLevels + 1);
        this.futureLevels = levels.future_levels.substring(currentLengthLevels, currentLengthLevels + historyLengthLevels);
        this.futureStartMinute = startOfCurrentLevel + currentLengthLevels * this.levelLength;

        // Part of current level that has passed.
        let slotIndex = passedLevels.length - 1;
        const historyStartMinute = this.currentTimeMinutes - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        let currentMinute = this.currentTimeMinutes;
        if (currentMinute > startOfCurrentLevel) {
            this.levelArcs.insertLevelAtMinute(startOfCurrentLevel, currentMinute - startOfCurrentLevel, passedLevels.charAt(slotIndex));
        }
        currentMinute = startOfCurrentLevel - 1;
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
        this.levelArcs.insertLevelAtMinute(this.currentTimeMinutes, startOfCurrentLevel + this.levelLength - this.currentTimeMinutes, currentLevel);

        // Fill in all currently visible levels, until we reach currentMinute + 12 hours - history length.
        slotIndex = 1;
        currentMinute = startOfCurrentLevel + this.levelLength;
        const currentEndMinute = this.currentTimeMinutes + 12 * 60 - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        while (currentMinute <= currentEndMinute - this.levelLength) {
            const levelChar = current.charAt(slotIndex);
            this.levelArcs.insertLevelAtMinute(currentMinute, this.levelLength, levelChar);
            currentMinute += this.levelLength;
            slotIndex++;
        }
        // Fill in remaining part to reach currentEndMinute
        if (currentMinute < currentEndMinute) {
            const levelChar = (slotIndex < current.length) ? current.charAt(slotIndex) : 'U';
            const minutesLeft = currentEndMinute - currentMinute;
            console.debug("[ClockCard] Filling remaining part:", currentMinute, "length:", minutesLeft, "level:", levelChar);
            this.levelArcs.insertLevelAtMinute(currentMinute, minutesLeft, levelChar);
        }

        // Start the cyclic task that advances the displayed minute once per real minute.
        // This will immediately set the clock to this.current_time_minutes and then increment every minute.
        this.startMinuteTicker(this.currentTimeMinutes);
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
        const previousCurrentTime = this.currentTimeMinutes;
        this.currentTimeMinutes = currentMinutes;
        const hours = Math.floor(this.currentTimeMinutes / 60);
        const minutes = this.currentTimeMinutes % 60;
        const hrAngle = (hours % 12) * 30 + minutes * 0.5;
        const minAngle = minutes * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);

        if (this.currentLevels === undefined) {
            console.debug("[ClockCard] No current levels defined yet, skipping level update.");
            return;
        }
        console.debug(`[ClockCard] Time updated: ${hours}:${minutes < 10 ? '0' + minutes : minutes} (${this.currentTimeMinutes} minutes since midnight)`);
        console.debug("[ClockCard] Current levels:", this.currentLevels);

        const passedMinutes = this.currentTimeMinutes - previousCurrentTime;
        let passedStart = previousCurrentTime;
        let passedEnd = this.currentTimeMinutes;
        console.debug("[ClockCard] passed: ", passedStart, "->", passedEnd, "current:", this.currentTimeMinutes);
        let passedIndex = 0;
        while (passedStart < passedEnd) {
            const minutes = (passedEnd - passedStart < this.levelLength) ? (passedEnd - passedStart) : this.levelLength;
            const levelChar = (passedIndex < this.currentLevels.length) ? this.currentLevels.charAt(passedIndex).toLowerCase() : 'u';
            this.levelArcs.insertLevelAtMinute(passedStart, minutes, levelChar);
            passedStart += minutes;
            passedIndex++;
        }

        let futureStart = previousCurrentTime + 12 * 60 - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        let futureEnd = futureStart + passedMinutes;
        console.debug("[ClockCard] Filling future levels from", futureStart, "to", futureEnd);
        let futureIndex = 0;
        while (futureStart < futureEnd) {
            const minutes = (futureEnd - futureStart < this.levelLength) ? (futureEnd - futureStart) : this.levelLength;
            const levelChar = (futureIndex < this.futureLevels.length) ? this.futureLevels.charAt(futureIndex) : 'U';
            this.levelArcs.insertLevelAtMinute(futureStart, minutes, levelChar);
            futureStart += minutes;
            futureIndex++;
        }

        console.debug("[ClockCard] Inserting marker at", this.currentTimeMinutes);
        this.levelArcs.insertLevelAtMinute(futureEnd, LevelIndicatorClockCard.MARKER_WIDTH_MINUTES, 'P');

        this.requestUpdate();
    }

    render() {
        const arcPaths = this.levelArcs.getArcs().map(levelArc => {
            const path = levelArc.arcToPath(
                LevelIndicatorClockCard.CENTER_X,
                LevelIndicatorClockCard.CENTER_Y,
                LevelIndicatorClockCard.ARC_RADIUS
            );
            return svg`<path d="${path}" stroke="${levelArc.color}" stroke-width="${LevelIndicatorClockCard.ARC_STROKE_WIDTH}" fill="none" />`;
        });
        return html`
            <ha-card>
                ${!this.dependencyMet ?
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

    private generateCompactLevels(currentMinutes: number): string {
        // Should generate a string of format minutes_since_midnight:level_length:passed_levels:future_levels
        // Each char in passed_levels represents level_length minutes, total length should be at least one hour.
        // Each char in future_levels represents level_length minutes, total length should be at least 12 hours.
        const levelLength = this.SIMULATE_LEVEL_LENGTH;
//        const staticData = "LMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMH";
        const staticData = "LLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMM";
        const currentLevelIndex = Math.floor(currentMinutes / levelLength);
        const numPassed = Math.ceil(60 / levelLength);
        let passedStart = Math.max(0, currentLevelIndex - numPassed);
        let passedLevels = staticData.substring(passedStart, currentLevelIndex);
        // Pad with 'U' if not enough data (e.g., at midnight)
        if (passedLevels.length < numPassed) {
            passedLevels = 'U'.repeat(numPassed - passedLevels.length) + passedLevels;
        }
        const numFuture = Math.ceil(12 * 60 / levelLength);
        let futureLevels = staticData.substring(currentLevelIndex, currentLevelIndex + numFuture);
        // Pad with 'U' if not enough data (e.g., near end of day)
        if (futureLevels.length < numFuture) {
            futureLevels = futureLevels + 'U'.repeat(numFuture - futureLevels.length);
        }
        return `${currentMinutes}:${levelLength}:${passedLevels}:${futureLevels}`;
    }

    firstUpdated() {
        console.log("[ClockCard] First updated, initializing clock...");

        if (this.isSimulating) {
            console.debug("[ClockCard] Starting in simulation mode.");
            const startTime = new Date();
            startTime.setHours(0, 0, 0, 0);
            this.currentTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
            const levels = this.generateCompactLevels(this.currentTimeMinutes)
            const result = compactToLevels(levels);
            this.updateLevels(result);
            const scheduleNextTick = () => {
                this.setCurrentMinute(this.currentTimeMinutes + this.SIMULATION_STEP_MINUTES);
                if (this.currentTimeMinutes % 60 === 0) {
                    const levels = this.generateCompactLevels(this.currentTimeMinutes)
                    const result = compactToLevels(levels);
                    this.updateLevels(result);
                }

                this.intervalId = window.setTimeout(() => {
                    scheduleNextTick();
                }, this.SIMULATION_UPDATE_PERIOD_MS);
            };

            scheduleNextTick();
        } else {
            this.setCurrentMinute(this.currentTimeMinutes);
        }
    }

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        if (this.intervalId) {
            clearTimeout(this.intervalId);
        }
        // Ensure minute ticker is stopped too
        this.stopMinuteTicker();
        super.disconnectedCallback();
    }

}
