import { log } from "./log.js";
import { css } from "./styles.js";

export class ElprisklockaCard extends HTMLElement {
    // private properties
    tag = "elprisklocka-card";
    _config;
    _hass;
    _elements = {};
    _currentHour = 0;
    _currentMinute = 0;
    _hourLevels = [];

    // lifecycle
    constructor() {
        super();
        for (let i = 0; i < 12; i++) {
            this._hourLevels.push({
                color: "grey"
            });
        }
        this.doCard();
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = css;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this._elements.style, this._elements.card);        this.doQueryElements();
        this.updateSizes();
        window.addEventListener('resize', () => this.updateSizes());
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
        this.updateSizes();
    }

    _isStarted = false;

    set hass(hass) {
        this._hass = hass;
        this.updateSizes();

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
            if (!this._isStarted) {
                this._isStarted = true;
                setInterval(() => {
                    this.doUpdatePriceLevels(currentPrice);
                    this.doUpdateTime(currentTime);
                }, 1000);
            }
        }
    }

    getCurrentPrice() {
        return this._hass.states[this._config.electricityprice];
    }

    getAttributes() {
        return this.getCurrentPrice().attributes;
    }

    doCard() {
        this._elements.card = document.createElement("ha-card");
        this._elements.card.innerHTML = `
        <div class="card-content">
            <p class="error error hidden">
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
        </div>
        `;
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
        const sec = 0;
        const hrAngle = this._currentHour * 30 + (this._currentMinute * 6 / 12);
        const minAngle = this._currentMinute * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);
    }

    doUpdatePriceLevels(currentPrice) {
        const attributes = currentPrice.attributes;
        const cost_today = attributes.cost_today;
        const cost_tomorrow = attributes.cost_tomorrow;

        const changeHour = this._currentHour + 10;
        const hourIndex = changeHour > 12 ? changeHour - 12 : changeHour;
        log(this.tag, `doUpdatePriceLevels: currentHour: ${this._currentHour} changeHour: ${changeHour} hourIndex: ${hourIndex}`);
        /*
        if(changeHour > 23)
        log(this.tag, "doUpdatePriceLevels: cost_today: ");
        cost_today.forEach((entry, index) => {
            log(this.tag, `doUpdatePriceLevels: cost_today[${index}]: ${entry.start}`);
        });



        const gradientColors = cost_today.map(entry => {
            switch (entry.level) {
            case 'low':
                return 'green';
            case 'medium':
                return 'yellow';
            case 'high':
                return 'red';
            default:
                return 'gray';
            }
        });

        gradientColors.forEach((color, index) => {
            log(this.tag, `doUpdatePriceLevels: color[${index}]: ${color}`);
        });
        const gradient = gradientColors.map((color, index) => {
            const startAngle = index * 30;
            const endAngle = startAngle + 30;
            return `${color} ${startAngle}deg ${endAngle}deg`;
        }).join(', ');
        const card = this._elements.card;
        const clock = card.querySelector('.clock');
clock.style.background = `conic-gradient(${gradient})`;
*/
    }

    doUpdateTime(currentTime) {
        if (currentTime) {
            this.setClock(currentTime.state);
        } else {
            log(this.tag, "doUpdateTime: Current time: null");
        }
    }

    updateSizes() {
        requestAnimationFrame(() => {
            const card = this._elements.card;
            const clock = card.querySelector('.clock');
            const width = card.offsetWidth;
            if (width > 0) {
                card.style.height = `${width}px`;
                clock.style.width = `${width * 0.8}px`;
                clock.style.height = `${width * 0.8}px`;
            }
        });
    }


    static getConfigElement() {
        return document.createElement("elprisklocka-card-editor");
    }

    static getStubConfig() {
        return {
            electricityprice: "sensor.elpris",
            datetimeiso: "sensor.date_time_iso",
            header: "",
        };
    }
}
