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
    end: Date,
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
        fakeTime.setHours(0, 0, 0, 0);

        this.intervalId = window.setInterval(() => {
            fakeTime.setMinutes(fakeTime.getMinutes() + 1);

            this.setClock(fakeTime);
            this.updatePrices(fakeTime);
        }, 100); // Adjust the interval as needed
    }

    fakePrices = {
        "entity_id": "sensor.elpris",
        "state": "1.36285",
        "attributes": {
            "cost_now": 1.36285,
            "credit_now": 0.50218,
            "cost_today": [
                {
                    "start": "2025-01-13T00:00:00+0100",
                    "value": 1.39291,
                    "level": "medium"
                }, {
                    "start": "2025-01-13T01:00:00+0100",
                    "value": 1.35364,
                    "level": "high"
                }, {
                    "start": "2025-01-13T02:00:00+0100",
                    "value": 1.35771,
                    "level": "high"
                }, {
                    "start": "2025-01-13T03:00:00+0100",
                    "value": 1.34169,
                    "level": "high"
                }, {
                    "start": "2025-01-13T04:00:00+0100",
                    "value": 1.33474,
                    "level": "high"
                }, {
                    "start": "2025-01-13T05:00:00+0100",
                    "value": 1.3207,
                    "level": "high"
                }, {
                    "start": "2025-01-13T06:00:00+0100",
                    "value": 1.33641,
                    "level": "high"
                }, {
                    "start": "2025-01-13T07:00:00+0100",
                    "value": 1.82361,
                    "level": "high"
                }, {
                    "start": "2025-01-13T08:00:00+0100",
                    "value": 2.31655,
                    "level": "high"
                }, {
                    "start": "2025-01-13T09:00:00+0100",
                    "value": 1.62556,
                    "level": "high"
                }, {
                    "start": "2025-01-13T10:00:00+0100",
                    "value": 1.36285,
                    "level": "high"
                }, {
                    "start": "2025-01-13T11:00:00+0100",
                    "value": 1.34518,
                    "level": "high"
                }, {
                    "start": "2025-01-13T12:00:00+0100",
                    "value": 1.33505,
                    "level": "low"
                }, {
                    "start": "2025-01-13T13:00:00+0100",
                    "value": 1.32493,
                    "level": "low"
                }, {
                    "start": "2025-01-13T14:00:00+0100",
                    "value": 1.30484,
                    "level": "low"
                }, {
                    "start": "2025-01-13T15:00:00+0100",
                    "value": 1.29003,
                    "level": "low"
                }, {
                    "start": "2025-01-13T16:00:00+0100",
                    "value": 1.29426,
                    "level": "low"
                }, {
                    "start": "2025-01-13T17:00:00+0100",
                    "value": 1.29351,
                    "level": "low"
                }, {
                    "start": "2025-01-13T18:00:00+0100",
                    "value": 1.2639,
                    "level": "low"
                }, {
                    "start": "2025-01-13T19:00:00+0100",
                    "value": 1.2225,
                    "level": "low"
                }, {
                    "start": "2025-01-13T20:00:00+0100",
                    "value": 0.85359,
                    "level": "low"
                }, {
                    "start": "2025-01-13T21:00:00+0100",
                    "value": 0.79665,
                    "level": "low"
                }, {
                    "start": "2025-01-13T22:00:00+0100",
                    "value": 0.7903,
                    "level": "low"
                }, {
                    "start": "2025-01-13T23:00:00+0100",
                    "value": 0.76612,
                    "level": "low"}
            ],
            "cost_tomorrow": [
                {
                    "start": "2025-01-14T00:00:00+0100",
                    "value": 1.39291,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T01:00:00+0100",
                    "value": 1.35364,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T02:00:00+0100",
                    "value": 1.35771,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T03:00:00+0100",
                    "value": 1.34169,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T04:00:00+0100",
                    "value": 1.33474,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T05:00:00+0100",
                    "value": 1.3207,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T06:00:00+0100",
                    "value": 1.33641,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T07:00:00+0100",
                    "value": 1.82361,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T08:00:00+0100",
                    "value": 2.31655,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T09:00:00+0100",
                    "value": 1.62556,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T10:00:00+0100",
                    "value": 1.36285,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T11:00:00+0100",
                    "value": 1.34518,
                    "level": "medium"
                }, {
                    "start": "2025-01-14T12:00:00+0100",
                    "value": 1.33505,
                    "level": "low"
                }, {
                    "start": "2025-01-14T13:00:00+0100",
                    "value": 1.32493,
                    "level": "low"
                }, {
                    "start": "2025-01-14T14:00:00+0100",
                    "value": 1.30484,
                    "level": "low"
                }, {
                    "start": "2025-01-14T15:00:00+0100",
                    "value": 1.29003,
                    "level": "low"
                }, {
                    "start": "2025-01-14T16:00:00+0100",
                    "value": 1.29426,
                    "level": "low"
                }, {
                    "start": "2025-01-14T17:00:00+0100",
                    "value": 1.29351,
                    "level": "low"
                }, {
                    "start": "2025-01-14T18:00:00+0100",
                    "value": 1.2639,
                    "level": "low"
                }, {
                    "start": "2025-01-14T19:00:00+0100",
                    "value": 1.2225,
                    "level": "low"
                }, {
                    "start": "2025-01-14T20:00:00+0100",
                    "value": 0.85359,
                    "level": "low"
                }, {
                    "start": "2025-01-14T21:00:00+0100",
                    "value": 0.79665,
                    "level": "low"
                }, {
                    "start": "2025-01-14T22:00:00+0100",
                    "value": 0.7903,
                    "level": "low"
                }, {
                    "start": "2025-01-14T23:00:00+0100",
                    "value": 0.76612,
                    "level": "low"}
            ],
            "credit_today": null,
            "credit_tomorrow": null,
            "unit_of_measurement": "kr/kWh",
            "device_class": "monetary",
            "friendly_name": "Elpris"
        },
        "context": {"id": "01JHFECYT0QYN8742KKJ8E6SGG", "parent_id": null, "user_id": null},
        "last_changed": "2025-01-13T09:02:30.720Z",
        "last_updated": "2025-01-13T09:02:30.720Z"
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
            // Comment these two lines and uncomment the following two lines to use fake prices.
            const cost_today = this.prices.attributes.cost_today;
            const cost_tomorrow = this.prices.attributes.cost_tomorrow;
//            const cost_today = this.fakePrices.attributes.cost_today;
//            const cost_tomorrow = this.fakePrices.attributes.cost_tomorrow;

            const all_costs:costEntry[] = [
                ...(cost_today ? cost_today.map((entry: { start: string | number | Date; level: any; value: any; }, index): costEntry => {
                    let end = new Date(cost_today[0].start);
                    if(cost_today[index + 1]) {
                        end = new Date(cost_today[index + 1].start);
                        end.setMinutes(end.getMinutes() - 1);
                        end.setSeconds(59);
                        end.setMilliseconds(999);
                    } else {
                        end.setHours(23, 59, 59, 999);
                    }
                    return { start: new Date(entry.start), end: end, level: entry.level }
                }) : []),
                ...(cost_tomorrow ? cost_tomorrow.map((entry: { start: string | number | Date; level: any; value: any; }, index): costEntry => {
                    let end = new Date(cost_tomorrow[0].start);
                    if(cost_tomorrow[index + 1]) {
                        end = new Date(cost_tomorrow[index + 1].start);
                        end.setMinutes(end.getMinutes() - 1);
                        end.setSeconds(59);
                        end.setMilliseconds(999);
                    } else {
                        end.setHours(23, 59, 59, 999);
                    }
                    return { start: new Date(entry.start), end: end, level: entry.level }
                }) : [])
            ];

            const midnight = new Date(currentTime);
            midnight.setHours(0, 0, 0, 0);
            const currentLevel = Math.floor((currentTime.getHours() * 3600 + currentTime.getMinutes()*60 + currentTime.getSeconds()) / this.secondsPerLevel);

            if (this.levels.every(level => level === "uninitialized")) {
                const startLevel = (currentLevel > 5) ? currentLevel - 5 : currentLevel;
                const startSeconds = startLevel * this.secondsPerLevel;
                const costTime = new Date(midnight.getTime() + startSeconds * 1000);
                for (let i = 0; i < this.levels.length; i++) {
                    const levelIndex = (startLevel + i) % this.levels.length;
                    const costIndex = all_costs.findIndex(entry => entry.start <= costTime && entry.end >= costTime);
                    if(costIndex === -1) {
                        this.levels[levelIndex] = "unknown";
                    } else {
                        this.levels[levelIndex] = all_costs[costIndex].level;
                    }
                    costTime.setSeconds(costTime.getSeconds() + this.secondsPerLevel);
                }
            } else {
                const startLevel = currentLevel + this.NUMBER_OF_LEVELS - 6;
                const startSeconds = startLevel * this.secondsPerLevel;
                const costTime = new Date(midnight.getTime() + startSeconds * 1000);
                const levelIndex = (startLevel) % this.levels.length;
                const costIndex = all_costs.findIndex(entry => entry.start <= costTime && entry.end >= costTime);
                if(costIndex === -1) {
                    this.levels[levelIndex] = "unknown";
                } else {
                    this.levels[levelIndex] = all_costs[costIndex].level;
                }
                this.levels[(levelIndex+1)%this.levels.length] = "empty";
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
                    case "unknown":
                        color = "magenta";
                        break;
                    case "solar":
                        color = "blue";
                        break;
                    case "empty":
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
