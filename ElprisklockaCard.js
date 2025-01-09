import { log } from "./log.js";

export class ElprisklockaCard extends HTMLElement {
    // private properties
    tag = "elprisklocka-card";
    _config;
    _hass;
    _elements = {};

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

    getState() {
        return this._hass.states[this._config.electricityprice];
    }

    getAttributes() {
        return this.getState().attributes;
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
            background: grey;
            border-radius: 50%;
            position: absolute;
            width: 15%;
            height: 15%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
        }
        .hr {
            position: relative;
            border-radius: 1cap;
            transform-origin: 50% 100%;
            background: #222;
            left: 48.5%;
            width: 4%;
            height: 33%;
            animation: rotateHand 43200s linear infinite;
            z-index: 2;
        }

        .min {
            position: relative;
            bottom: 50%;
            border-radius: 1cap;
            transform-origin: 50% 100%;
            background: #222;
            left: 49%;
            width: 3%;
            height: 39%;
            animation: rotateHand 3600s linear infinite;
            z-index: 2;
        }
        @keyframes rotateHand {
            to {
                transform: rotate(1turn);
            }
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

    doUpdateHass() {
        if (!this.getState()) {
            this._elements.error.textContent = `${this._config.electricityprice} is unavailable.`;
            this._elements.error.classList.remove("hidden");
        } else {
            this._elements.error.textContent = "";
            this._elements.error.classList.add("hidden");
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


    // card configuration
    static getConfigElement() {
        return document.createElement("elprisklocka-card-editor");
    }

    static getStubConfig() {
        return {
            electricityprice: "sensor.elpris",
            datetimeiso: "sensor.datetimeiso",
            header: "",
        };
    }
}