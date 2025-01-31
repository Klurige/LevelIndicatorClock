import { html, LitElement, nothing } from "lit";
import { state } from "lit/decorators/state";
import styles from './levelindicatorclockcard.styles';
import { HomeAssistant } from "custom-card-helpers";
import { Config } from "./Config";

interface Timestamp {
    state: string;
    attributes: {
        level_clock_pattern: string;
    }
}

interface Prices {
    attributes: {
        rates: { start: string, cost: Number, credit:Number, level: string, rank: Number }[];
    };
}

export class LevelIndicatorClockCard extends LitElement {
    private tag = "LevelIndicatorClockCard";

    private _hass: HomeAssistant;

    private readonly NUMBER_OF_LEVELS = 60
    private readonly HISTORY = (this.NUMBER_OF_LEVELS / 12);
    private readonly degreesPerLevel = 360 / this.NUMBER_OF_LEVELS;
    private readonly secondsPerLevel = (12 * 60 * 60) / this.NUMBER_OF_LEVELS;
    private levels: string[] = new Array(this.NUMBER_OF_LEVELS).fill('U');

    @state() private header: string | typeof nothing;
    @state() private iso_formatted_time: string;
    @state() private electricity_price: string;
    @state() private timestamp: Timestamp;
    @state() private prices: Prices;

    static get properties() {
        return {
            header: {state: true},
            iso_formatted_time: {state: true},
            electricity_price: {state: true},
            timestamp: {state: true},
            prices: {state: true},
        };
    }

    setConfig(config:Config) {
        this.header = config.header === "" ? nothing : config.header;
        this.iso_formatted_time = config.datetimeiso;
        this.electricity_price = config.electricityprice;
        if (this._hass) {
            this.hass = this._hass
        }
    }

    set hass(hass:HomeAssistant) {
        this._hass = hass;
        this.timestamp = hass.states[this.iso_formatted_time];
        this.prices = hass.states[this.electricity_price] as unknown as Prices;
    }

    static styles = styles;

    private intervalId: number | undefined;
    private startSimulation() {
        const fakeTime = new Date();
        //let fakeLevels = "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS";
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
            const priceLevels = this.timestamp.attributes.level_clock_pattern
            // Comment these two lines and uncomment the if statement below to start the simulation.
           this.setClock(currentTime)
           this.updateLevels(priceLevels, currentTime);
//            if (!this.intervalId) {
//                this.startSimulation();
//            }

        }
    }

    private updateLevels(priceLevels: string, currentTime: Date) {
        // The clock will show 12 hours at a time, so we need to know levels from midnight and 36 hours ahead. Or 3 revolutions.
        console.log(`priceLevels: ${priceLevels}`);
        console.log(`currentTime: ${currentTime}`);
        const clock = this.shadowRoot.querySelector('.clock');
        if (clock && priceLevels.length > 0) {
            let currentLevel = Math.floor((currentTime.getHours() * 3600 + currentTime.getMinutes()*60 + currentTime.getSeconds()) / this.secondsPerLevel);

            if (this.levels.every(level => level === 'U')) {
                let levelIndex= (currentLevel >= this.HISTORY) ? currentLevel - this.HISTORY : currentLevel;
                let slotIndex = levelIndex % this.NUMBER_OF_LEVELS;
                for(let i = 0; i < this.NUMBER_OF_LEVELS; i++) {
                    slotIndex = (levelIndex) % this.NUMBER_OF_LEVELS;
                    this.levels[slotIndex] = priceLevels[levelIndex];
                    levelIndex++;
                }

            }

            let levelIndex= currentLevel - this.HISTORY + this.NUMBER_OF_LEVELS;
            let slotIndex = levelIndex % this.NUMBER_OF_LEVELS;
            console.log(`currentLevel: ${currentLevel}, levelIndex: ${levelIndex}, slotIndex: ${slotIndex} level: ${priceLevels[levelIndex]}`);
            this.levels[slotIndex] = priceLevels[levelIndex];
            let markerInd = slotIndex + 1;
            if(markerInd >= this.NUMBER_OF_LEVELS) {
                markerInd -= this.NUMBER_OF_LEVELS;
            }
            this.levels[markerInd] = 'E';


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
        if (!this.timestamp || !this.prices) {
            content = html`
                <div class="error">
                    <p>${!this.timestamp ? 'timedateiso is unavailable.' : ''}</p>
                    <p>${!this.prices ? 'electricity_price is unavailable.' : ''}</p>
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
            <ha-card header="${this.header}">
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
            electricity_price: "sensor.electricity_price",
            iso_formatted_time: "sensor.iso_formatted_time",
            header: "",
        };
    }
}
