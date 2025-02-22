import {html, LitElement} from "lit";
import {state} from "lit/decorators/state";
import styles from './levelindicatorclockcard.styles';
import {HomeAssistant} from "custom-card-helpers";
import {Config} from "./Config";

interface Timestamp {
    state: string;
    attributes: {
        level_clock_pattern: string;
    }
}

interface Prices {
    attributes: {
        rates: { start: string, cost: Number, credit: Number, level: string, rank: Number }[];
    };
}

export class LevelIndicatorClockCard extends LitElement {
    private tag = "LevelIndicatorClockCard";

    private _hass: HomeAssistant;

    private readonly NUMBER_OF_LEVELS = 60
    private readonly HISTORY = (this.NUMBER_OF_LEVELS / 12) - 1;
    private readonly degreesPerLevel = 360 / this.NUMBER_OF_LEVELS;
    private readonly secondsPerLevel = (12 * 60 * 60) / this.NUMBER_OF_LEVELS;
    private levels: string[] = new Array(this.NUMBER_OF_LEVELS).fill('U');

    @state() private iso_formatted_time: string;
    @state() private timestamp: Timestamp;

    static get properties() {
        return {
            iso_formatted_time: {state: true},
            timestamp: {state: true},
        };
    }

    setConfig(config: Config) {
        this.iso_formatted_time = config.iso_formatted_time;
        if (this._hass) {
            this.hass = this._hass
        }
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
        this.timestamp = hass.states[this.iso_formatted_time];
    }

    static styles = styles;

    public getLayoutOptions() {
        return {
            grid_rows: 8,
            grid_columns: 12,
        };
    }

    private intervalId: number | undefined;

    private startSimulation() {
        const fakeTime = new Date();
        let fakeLevels = "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
        fakeTime.setHours(23, 50, 0, 0);

        this.intervalId = window.setInterval(() => {
            fakeTime.setMinutes(fakeTime.getMinutes() + 1);
            if (fakeTime.getHours() === 0 && fakeTime.getMinutes() === 0) {
                fakeLevels = fakeLevels.slice(fakeLevels.length / 2);
            }

            this.setClock(fakeTime);
            this.updateLevels(fakeLevels, fakeTime);
        }, 1000); // Adjust the interval as needed
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('timestamp')) {
            const currentTime = new Date(this.timestamp.state);
            const priceLevels = this.timestamp.attributes.level_clock_pattern;
            // Comment these two lines and uncomment the if statement below to start the simulation.
           this.setClock(currentTime);
           this.updateLevels(priceLevels, currentTime);
//            if (!this.intervalId) {
//                this.startSimulation();
//            }

        }
    }

    private updateLevels(priceLevels: string, currentTime: Date) {
        // The clock will show 12 hours at a time, so we need to know levels from midnight and 36 hours ahead. Or 3 revolutions.
        const clock = this.shadowRoot.querySelector('.clock');
        if (clock && priceLevels.length > 0) {
            const currentLevel = Math.floor((currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds()) / this.secondsPerLevel);
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
        let content: ReturnType<typeof html>;
        if (!this.timestamp) {
            content = html`
                <div class="error">
                    <p>${!this.timestamp ? 'iso_formatted_time is unavailable.' : ''}</p>
                </div>
            `;
        } else {
            content = html`
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
                </div>
            `;
        }
        return html`
            <ha-card>
                <div class="card-content">
                    ${content}
                </div>
            </ha-card>
        `;
    }

    static getConfigElement() {
        return document.createElement("level-indicator-clock-editor");
    }

    static getStubConfig() {
        return {
            iso_formatted_time: "sensor.iso_formatted_time",
        };
    }

    firstUpdated() {
        this.updateHoursFontSize();
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('resize', this.updateHoursFontSize.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.updateHoursFontSize.bind(this));
        super.disconnectedCallback();
    }

    private updateHoursFontSize() {
        const cover = this.shadowRoot.querySelector('.gradient-cover');
        const clock = this.shadowRoot.querySelector('.clock');
        const hours = this.shadowRoot.querySelector('.hours');
        if (cover && clock && hours) {
            const clockWidth = clock.getBoundingClientRect().width;
            const coverWidth = cover.getBoundingClientRect().width;
            const sizeDiff = clockWidth - coverWidth;

            if (sizeDiff > 0) {
                const minFontSize = 8;
                const maxFontSize = 30;
                const minSizeDiff = 40;
                const maxSizeDiff = 100;

                if (sizeDiff > maxSizeDiff) {
                    hours.style.fontSize = `${maxFontSize}px`;
                } else if (sizeDiff < minSizeDiff) {
                    hours.style.fontSize = `${minFontSize}px`;
                } else {
                    const fontSize = minFontSize + (sizeDiff - minSizeDiff) * (maxFontSize - minFontSize) / (maxSizeDiff - minSizeDiff);
                    hours.style.fontSize = `${fontSize}px`;
                }
            }
        }
    }

}
