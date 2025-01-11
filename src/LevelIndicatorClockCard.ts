import { html, LitElement, nothing } from "lit";
import { state } from "lit/decorators/state";
import styles from './levelindicatorclockcard.styles';
import { HomeAssistant } from "custom-card-helpers";
import { Config } from "./Config";

interface Timestamp {
    state: string;
}

interface costEntry {
    start: Date,
    level:string
}

interface Prices {
    attributes: {
        cost_today: { start: string, level: string, value:Number }[];
        cost_tomorrow: { start: string, level: string, value:Number }[];
    };
}

export class LevelIndicatorClockCard extends LitElement {
    private tag = "LevelIndicatorClockCard";

    private _hass: HomeAssistant;

    private readonly NUMBER_OF_LEVELS = 60
    private readonly degreesPerLevel = 360 / this.NUMBER_OF_LEVELS;
    private readonly secondsPerLevel = (12 * 60 * 60) / this.NUMBER_OF_LEVELS;
    private levels: string[] = new Array(this.NUMBER_OF_LEVELS).fill("uninitialized");

    @state() private header: string | typeof nothing;
    @state() private datetimeiso: string;
    @state() private electricityprice: string;
    @state() private timestamp: Timestamp;
    @state() private prices: Prices;

    static get properties() {
        return {
            header: {state: true},
            datetimeiso: {state: true},
            electricityprice: {state: true},
            timestamp: {state: true},
            prices: {state: true},
        };
    }

    setConfig(config:Config) {
        this.header = config.header === "" ? nothing : config.header;
        this.datetimeiso = config.datetimeiso;
        this.electricityprice = config.electricityprice;
        if (this._hass) {
            this.hass = this._hass
        }
    }

    set hass(hass:HomeAssistant) {
        this._hass = hass;
        this.timestamp = hass.states[this.datetimeiso];
        this.prices = hass.states[this.electricityprice] as unknown as Prices;
    }

    static styles = styles;

    private intervalId: number | undefined;
    private startSimulation() {
        const fakeTime = new Date();

        this.intervalId = window.setInterval(() => {
            console.log(this.tag, "Simulating time...");
            fakeTime.setMinutes(fakeTime.getMinutes() + 1);

            this.setClock(fakeTime);
            this.updatePrices(fakeTime);
        }, 1000); // Adjust the interval as needed
    }


    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('timestamp')) {
            const currentTime = new Date(this.timestamp.state);
            // Comment these two lines and uncomment the if statement below to start the simulation.
            this.setClock(currentTime);
            this.updatePrices(currentTime);
//            if (!this.intervalId) {
//                this.startSimulation();
//            }

        }
    }

    private updatePrices(currentTime: Date) {
        const clock = this.shadowRoot.querySelector('.clock');
        if (clock && currentTime && this.prices) {
            const cost_today = this.prices.attributes.cost_today;
            const cost_tomorrow = this.prices.attributes.cost_tomorrow;

            const all_costs:costEntry[] = [
                ...(cost_today ? cost_today.map((entry: { start: string | number | Date; level: any; value: any; }): costEntry => {
                    return { start: new Date(entry.start), level: entry.level }
                }) : []),
                ...(cost_tomorrow ? cost_tomorrow.map((entry: { start: string | number | Date; level: any; value: any; }): costEntry => {
                    return { start: new Date(entry.start), level: entry.level }
                }) : [])
            ];

            const midnight = new Date(currentTime);
            midnight.setHours(0, 0, 0, 0);
            const levelsSinceMidnight = Math.floor((currentTime.getHours() * 3600 + currentTime.getMinutes()*60 + currentTime.getSeconds()) / this.secondsPerLevel);
            const startLevel = (levelsSinceMidnight > 10) ? levelsSinceMidnight - 10 : levelsSinceMidnight;
            const startSeconds = startLevel * this.secondsPerLevel;
            const costTime = new Date(midnight.getTime() + startSeconds * 1000);

            if (this.levels.every(level => level === "uninitialized")) {
                for (let i = 0; i < this.levels.length; i++) {
                    const levelIndex = (startLevel + i) % this.levels.length;
                    costTime.setSeconds(costTime.getSeconds() + this.secondsPerLevel);
                    const costIndex = all_costs.findIndex(entry => entry.start >= currentTime);
                    this.levels[levelIndex] = all_costs[costIndex].level;
                }
            } else {
                const levelIndex = (startLevel) % this.levels.length;
                costTime.setSeconds(costTime.getSeconds() + this.secondsPerLevel);
                const costIndex = all_costs.findIndex(entry => entry.start >= currentTime);
                this.levels[levelIndex] = all_costs[costIndex].level;
            }

            const gradient = this.levels.map((level, index) => {
                const startAngle = index * this.degreesPerLevel;
                const endAngle = startAngle + this.degreesPerLevel;
                let color: string;
                switch (level) {
                    case "low":
                        color = "green";
                        break;
                    case "medium":
                        color = "yellow";
                        break;
                    case "high":
                        color = "red";
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
                    <p>${!this.prices ? 'electricityprices is unavailable.' : ''}</p>
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
            electricityprice: "sensor.elpris",
            datetimeiso: "sensor.date_time_iso",
            header: "",
        };
    }
}
