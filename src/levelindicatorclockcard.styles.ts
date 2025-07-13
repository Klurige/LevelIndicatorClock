import { css } from 'lit';

export default css`
    .error {
        color: red;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.7);
        padding: 1em;
        border-radius: 1em;
    }
    
    ha-card {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        font-family: Helvetica, sans-serif;
        aspect-ratio: 1 / 1;
}

ul {
    list-style: none;
    top: 50%;
    left: 50%;
    margin: 0;
    padding: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
}

li {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
}

.hours {
    font-size: 30px;
    color: black;
    z-index: 2;
}

.hours li {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hours span {
    display: block;
    transform: translate(-50%, -50%);
}

.hours li:nth-of-type(1) {
    transform: rotate(30deg) translate(0, -45%);
}

.hours li:nth-of-type(1) span {
    transform: rotate(-30deg);
}

.hours li:nth-of-type(2) {
    transform: rotate(60deg) translate(0, -45%);
}

.hours li:nth-of-type(2) span {
    transform: rotate(-60deg);
}

.hours li:nth-of-type(3) {
    transform: rotate(90deg) translate(0, -45%);
}

.hours li:nth-of-type(3) span {
    transform: rotate(-90deg);
}

.hours li:nth-of-type(4) {
    transform: rotate(120deg) translate(0, -45%);
}

.hours li:nth-of-type(4) span {
    transform: rotate(-120deg);
}

.hours li:nth-of-type(5) {
    transform: rotate(150deg) translate(0, -45%);
}

.hours li:nth-of-type(5) span {
    transform: rotate(-150deg);
}

.hours li:nth-of-type(6) {
    transform: rotate(180deg) translate(0, -45%);
}

.hours li:nth-of-type(6) span {
    transform: rotate(-180deg);
}

.hours li:nth-of-type(7) {
    transform: rotate(210deg) translate(0, -45%);
}

.hours li:nth-of-type(7) span {
    transform: rotate(-210deg);
}

.hours li:nth-of-type(8) {
    transform: rotate(240deg) translate(0, -45%);
}

.hours li:nth-of-type(8) span {
    transform: rotate(-240deg);
}

.hours li:nth-of-type(9) {
    transform: rotate(270deg) translate(0, -45%);
}

.hours li:nth-of-type(9) span {
    transform: rotate(-270deg);
}

.hours li:nth-of-type(10) {
    transform: rotate(300deg) translate(0, -45%);
}

.hours li:nth-of-type(10) span {
    transform: rotate(-300deg);
}

.hours li:nth-of-type(11) {
    transform: rotate(330deg) translate(0, -45%);
}

.hours li:nth-of-type(11) span {
    transform: rotate(-330deg);
}

.hours li:nth-of-type(12) {
    transform: rotate(360deg) translate(0, -45%);
}

.hours li:nth-of-type(12) span {
    transform: rotate(-360deg);
}

.clock {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background-color: grey;
    border: 0.5em solid black;
    transform: translate(-50%, -50%);
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

.hour-hand {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
    z-index: 2;
}

.minute-hand {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
    z-index: 2;
}

.hour-hand::before {
    content: '';
    position: absolute;
    bottom: 47.5%;
    left: 50%;
    width: 5%;
    height: 33%;
    background: black;
    transform: translateX(-50%);
    border-radius: 100em;
}

.minute-hand::before {
    content: '';
    position: absolute;
    bottom: 48.5%;
    left: 50%;
    width: 3%;
    height: 39%;
    background: black;
    transform: translateX(-50%);
    border-radius: 100em;
}
`;