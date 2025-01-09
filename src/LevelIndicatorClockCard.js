import { log } from "./log.js";
import css from "bundle-text:./levelindicatorclockcard.css";
import html from "bundle-text:./levelindicatorclockcard.html";

export class LevelIndicatorClockCard extends HTMLElement {
    // private properties
    tag = "LevelIndicatorClockCard";
    _config;
    _hass;
    _elements = {};
    _currentHour = 0;
    _currentMinute = 0;
    _hourLevels = [];

    // lifecycle
    constructor() {
        super();
        this.doHtml();
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = css;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this._elements.style, this._elements.card);        this.doQueryElements();
    }

    setConfig(config) {
        this._config = config;
        if (!this._config.electricityprice) {
            throw new Error("Please define electricity price!");
        }
        if (!this._config.datetimeiso) {
            throw new Error("Please define datetime iso!");
        }
        if (this._config.header) {
            this._elements.card.setAttribute("header", this._config.header);
        } else {
            this._elements.card.removeAttribute("header");
        }
    }

    _isStarted = false;
    _hr = 0;
    _min = 0;

    set hass(hass) {
        this._hass = hass;

        const currentPrice = this._hass.states[this._config.electricityprice];
        const currentTime = this._hass.states[this._config.datetimeiso];
        if (!currentPrice || !currentTime) {
            let errorMessage = "";
            if (!currentPrice) {
                errorMessage += `[${this._config.electricityprice} is unavailable.]`;
            }
            if (!currentTime) {
                errorMessage += `[${this._config.datetimeiso} is unavailable.]`;
            }
            this._elements.error.textContent = errorMessage;
            this._elements.error.classList.remove("hidden");
        } else {
            this._elements.error.textContent = "";
            this._elements.error.classList.add("hidden");
            if (true) {
                this.doUpdatePriceLevels(currentPrice);
                this.doUpdateTime(currentTime);
            } else {
                if (!this._isStarted) {
                    this._isStarted = true;
                    setInterval(() => {
                        const date = currentTime.state.split("T");
                        this._min += 10;
                        if (this._min == 60) {
                            this._min = 0;
                            this._hr++;
                            if (this._hr == 24) {
                                this._hr = 0;
                            }
                        }
                        const t = `${date[0]}T${this._hr}:${this._min}:00`;

                        this.doUpdatePriceLevels(currentPrice);
                        this.doUpdateTime({ state: t });
                    }, 1000);
                }
            }
        }
    }

    getCurrentPrice() {
        return this._hass.states[this._config.electricityprice];
    }

    getAttributes() {
        return this.getCurrentPrice().attributes;
    }

    doHtml() {
        const importBox = document.createElement("div");
        importBox.innerHTML = html;
        this._elements.card = importBox.firstElementChild;
    }

    doQueryElements() {
        const card = this._elements.card;
        this._elements.error = card.querySelector(".error");
    }

    setAngle(hand, angle) {
        const card = this._elements.card;
        card.querySelector("." + hand).style.transform = "rotate(" + angle + "deg)";
    }

    setClock(currentTime) {
        const time = currentTime.split("T")[1].split(":");
        this._currentHour = time[0];
        this._currentMinute = time[1];
        const hrAngle = this._currentHour * 30 + (this._currentMinute * 6 / 12);
        const minAngle = this._currentMinute * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);
    }

    doUpdatePriceLevels(currentPrice) {
        const attributes = currentPrice.attributes;
        const cost_today = attributes.cost_today;
        const cost_tomorrow = attributes.cost_tomorrow;

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

        let currentHour = parseInt(this._currentHour);

        if (this._hourLevels.length == 0) {
            log(this.tag, "doUpdatePriceLevels: Initializing hour levels");
            for (let i = 0; i < 12; i++) {
                this._hourLevels.push(levels[currentHour + i]);
            }
        }

        let startHour = currentHour + 10;
        let updateHour = startHour % 12;
        this._hourLevels[updateHour] = levels[startHour];

        const gradient = this._hourLevels.map((level, index) => {
            const startAngle = index * 30;
            const endAngle = startAngle + 30;
            let color = "grey";
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
        const card = this._elements.card;
        const clock = card.querySelector('.clock');
        clock.style.background = `conic-gradient(${gradient})`;

    }

    doUpdateTime(currentTime) {
        if (currentTime) {
            this.setClock(currentTime.state);
        } else {
            log(this.tag, "doUpdateTime: Current time: null");
        }
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
