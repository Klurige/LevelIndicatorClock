import { log } from "./log.js";

export class ElprisklockaCard extends HTMLElement {
    // private properties
    tag = "elprisklocka-card";
    _config;
    _hass;
    _elements = {};
    _isStarted = false;

    // lifecycle
    constructor() {
        super();
        this.doCard();
        this.doStyle();
        this.doAttach();
        this.doQueryElements();
        this.updateSizes();
        window.addEventListener('resize', () => this.updateSizes());
    }

    setConfig(config) {
        this._config = config;
        this.doCheckConfig();
        this.doUpdateConfig();
        this.updateSizes();
    }

    set hass(hass) {
        this._hass = hass;
        this.doUpdateHass();
        this.updateSizes();
    }

    getCurrentPrice() {
        return this._hass.states[this._config.electricityprice];
    }

    getCurrentTime() {
        return this._hass.states[this._config.datetimeiso];
    }

    getAttributes() {
        return this.getCurrentPrice().attributes;
    }

    getName() {
        const friendlyName = this.getAttributes().friendly_name;
        return friendlyName ? friendlyName : this._config.electricityprice;
    }

    doCheckConfig() {
        if (!this._config.electricityprice) {
            throw new Error("Please define electricity price!");
        }
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
        <div class='hr'></div>
        <div class='min'></div>
    <div class="center-cover"></div>

            </div>
        </div>
        `;
    }

    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = `
        ha-card {
            display: flex;
            position: relative;
            flex-direction: column;
            align-items: center;
                font-family: Helvetica, sans-serif;
    }
        ul {
            list-style: none;
            top: 50%;
            left: 50%;
            margin: 0;
            padding: 0;
            position: absolute;
            transform: translate(-1.5%, -48%);
            width: 100%;
            height: 100%;
        }

        li {
            position: absolute;
            transform-origin: 50% 100%;
            height: 48%;
        }

        .hours {
            font-size: 2vw;
            color: black;
            letter-spacing: -0.1vw;
            line-height: 1.5vw;
            z-index: 2;
        }

        .hours li {width: 10vw;}
        .hours span {display: block;}

        .hours li:nth-of-type(1) {transform: rotate(30deg);}
        .hours li:nth-of-type(1) span {transform: rotate(-30deg);}
        .hours li:nth-of-type(2) {transform: rotate(60deg);}
        .hours li:nth-of-type(2) span {transform: rotate(-60deg);}
        .hours li:nth-of-type(3) {transform: rotate(90deg);}
        .hours li:nth-of-type(3) span {transform: rotate(-90deg);}
        .hours li:nth-of-type(4) {transform: rotate(120deg);}
        .hours li:nth-of-type(4) span {transform: rotate(-120deg);}
        .hours li:nth-of-type(5) {transform: rotate(150deg);}
        .hours li:nth-of-type(5) span {transform: rotate(-150deg);}
        .hours li:nth-of-type(6) {transform: rotate(180deg);}
        .hours li:nth-of-type(6) span {transform: rotate(-180deg);}
        .hours li:nth-of-type(7) {transform: rotate(210deg);}
        .hours li:nth-of-type(7) span {transform: rotate(-210deg);}
        .hours li:nth-of-type(8) {transform: rotate(240deg);}
        .hours li:nth-of-type(8) span {transform: rotate(-240deg);}
        .hours li:nth-of-type(9) {transform: rotate(270deg);}
        .hours li:nth-of-type(9) span {transform: rotate(-270deg);}
        .hours li:nth-of-type(10) {transform: rotate(300deg);}
        .hours li:nth-of-type(10) span {transform: rotate(-300deg);}
        .hours li:nth-of-type(11) {transform: rotate(330deg);}
        .hours li:nth-of-type(11) span {transform: rotate(-330deg);}
        .hours li:nth-of-type(12) {transform: rotate(360deg);}
        .hours li:nth-of-type(12) span {transform: rotate(-360deg);}

        .clock {
            position: relative;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-color: grey;
            border: 0.5vw solid black;
        }

        .gradient-cover {
            background: white;
            border-radius: 50%;
            position: absolute;
            width: 80%;
            height: 80%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
        }
        .center-cover {
            background: white;
            border-radius: 50%;
            position: absolute;
            width: 2px;
            height: 2px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
        }

.hr {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
    z-index: 2;
}

.hr::before {
    content: '';
    position: absolute;
    bottom: 47.5%;
    left: 50%;
    width: 5%;
    height: 33%;
    background: red;
    transform: translateX(-50%);
    border-radius: 1cap;
}

.min {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
    z-index: 2;
}

.min::before {
    content: '';
    position: absolute;
    bottom: 48.5%;
    left: 50%;
    width: 3%;
    height: 39%;
    background: blue;
    transform: translateX(-50%);
    border-radius: 1cap;
}
`;
    }

    doAttach() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this._elements.style, this._elements.card);
    }

    doQueryElements() {
        const card = this._elements.card;
        this._elements.error = card.querySelector(".error");
    }

    doUpdateConfig() {
        if (this._config.header) {
            this._elements.card.setAttribute("header", this._config.header);
        } else {
            this._elements.card.removeAttribute("header");
        }
    }

    setAngle(hand, angle) {
        const card = this._elements.card;
        card.querySelector("." + hand).style.transform = "rotate(" + angle + "deg)";
    }

    setClock(currentTime) {
        const time = currentTime.split("T")[1].split(":");
        const hr = time[0];
        const min = time[1];
        const sec = 0;
        const hrAngle = hr * 30 + (min * 6 / 12);
        const minAngle = min * 6 + (sec * 6 / 60);
        this.setAngle("hr", hrAngle);
        this.setAngle("min", minAngle);
        log(this.tag, "setClock: Angles: hr=" + hrAngle + ", min=" + minAngle);
    }

    _hr = 0;
    _min = -1;

    doUpdateHass() {
        const currentPrice = this.getCurrentPrice();
        const currentTime = this.getCurrentTime();
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
        }
        if (currentTime) {
            log(this.tag, "doUpdateHass: Current time: " + currentTime.state);
            if (true) {
                this.setClock(currentTime.state);
            } else {
                const datetime = currentTime.state.split("T");
                if (!this._isStarted) {
                    const datetime = currentTime.state.split("T");
                    const date = datetime[0];
                    setInterval(() => {
                        this._min++;
                        if (this._min === 60) {
                            this._min = 0;
                            this._hr++;
                            if (this._hr === 12) {
                                this._hr = 0;
                            }
                        }

                        const dt = date + "T" + this._hr + ":" + this._min + ":00";
                        log(this.tag, "Interval: Current time: " + dt);
                        this.setClock(dt)
                    }, 100);
                    this._isStarted = true;
                }
            }
        } else {
            log(this.tag, "doUpdateHass: Current time: null");
        }
        this.getCurrentTime()
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


    // card configuration
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