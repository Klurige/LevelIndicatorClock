import {log} from "./log.js";
import { html, LitElement, nothing } from "lit";
import { state } from "lit/decorators/state";
import styles from './levelindicatorclockcard.styles';
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { Config } from "./Config";

export class LevelIndicatorClockCard extends LitElement {
    tag = "LevelIndicatorClockCard";

    _hass;

    _currentHour = 0;
    _currentMinute = 0;
    _hourLevels: string[] = new Array(12).fill("uninitialized");

    @state() private _header: string | typeof nothing;
    @state() private _datetimeiso: string;
    @state() private _electricityprice: string;
    @state() private _timestamp: HassEntity;
    @state() private _prices: HassEntity;

    static get properties() {
        return {
            _header: {state: true},
            _datetimeiso: {state: true},
            _electricityprice: {state: true},
            _timestamp: {state: true},
            _prices: {state: true},
        };
    }

    setConfig(config:Config) {
        this._header = config.header === "" ? nothing : config.header;
        this._datetimeiso = config.datetimeiso;
        this._electricityprice = config.electricityprice;
        if (this._hass) {
            this.hass = this._hass
        }
    }

    set hass(hass:HomeAssistant) {
        this._hass = hass;
        this._timestamp = hass.states[this._datetimeiso];
        this._prices = hass.states[this._electricityprice];
    }

    static styles = styles;

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('_timestamp')) {
            const timestamp = this._timestamp.state;
            this._setClock(timestamp);
        }

        if (changedProperties.has('_prices')) {
            const currentPrice = this._prices.attributes;
            this._updatePrices(currentPrice);
        }
    }

    _updatePrices(currentPrice) {
        const clock = this.shadowRoot.querySelector('.clock');
        if (clock) {
            const cost_today = currentPrice.cost_today;
            const cost_tomorrow = currentPrice.cost_tomorrow;

            const levels = [];
            if (cost_today != null) {
                for (let i = 0; i < cost_today.length; i++) {
                    levels.push(cost_today[i].level);
                }
            } else {
                for (let i = 0; i < 24; i++) {
                    levels.push("unknown");
                }
            }

            if (cost_tomorrow != null) {
                for (let i = 0; i < cost_tomorrow.length; i++) {
                    levels.push(cost_tomorrow[i].level);
                }
            } else {
                for (let i = 0; i < 24; i++) {
                    levels.push("unknown");
                }
            }

            if (this._hourLevels.every(level => level === "uninitialized")) {
                for (let i = 0; i < 12; i++) {
                    const updateHour = (this._currentHour - 2 + i) % 12;
                    this._hourLevels[updateHour] = levels[this._currentHour - 2 + i];
                }
            }

            let startHour = this._currentHour + 12 - 2;
            let updateHour = startHour % 12;
            this._hourLevels[updateHour] = levels[startHour];

            const gradient = this._hourLevels.map((level, index) => {
                const startAngle = index * 30;
                const endAngle = startAngle + 30;
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

    _setAngle(hand, angle) {
        (this.shadowRoot.querySelector("." + hand) as HTMLElement).style.transform = "rotate(" + angle + "deg)";
    }

    _setClock(currentTime) {
        const time = currentTime.split("T")[1].split(":");
        this._currentHour = parseInt(time[0]);
        this._currentMinute = parseInt(time[1]);
        const hrAngle = this._currentHour * 30 + (this._currentMinute * 6 / 12);
        const minAngle = this._currentMinute * 6;
        this._setAngle("hour-hand", hrAngle);
        this._setAngle("minute-hand", minAngle);
    }

    render() {
        let content: ReturnType<typeof html>;
        if (!this._timestamp || !this._prices) {
            content = html`
                <div class="error">
                    <p>${!this._timestamp ? 'timedateiso is unavailable.' : ''}</p>
                    <p>${!this._prices ? 'electricityprices is unavailable.' : ''}</p>
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
            <ha-card header="${this._header}">
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
