import { css } from 'lit';

export default css`
    .error {
        color: var(--error-color, crimson);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        text-align: center;
        background-color: var(--card-background-color, rgba(255, 255, 255, 0.7));
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

    /* Light mode (default) */
    .clock-face {
        fill: var(--card-background-color, whitesmoke);
        stroke: var(--secondary-text-color, darkslategray);
        stroke-width: 2.5;
    }

    .hour-digits {
        fill: var(--primary-text-color, black);
    }

    .hour-hand {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-origin: center;
        z-index: 2;
        stroke: #333;
    }

    .minute-hand {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-origin: center;
        z-index: 2;
        stroke: #333;
    }

    .center-dot {
        fill: #333;
    }

    /* Dark mode overrides */
    :host(.dark) .clock-face {
        fill: var(--secondary-text-color, gray);
        stroke: #333;
    }

    :host(.dark) .hour-digits {
        fill: #222;
    }

    :host(.dark) .hour-hand {
        stroke: var(--card-background-color, whitesmoke);
    }

    :host(.dark) .minute-hand {
        stroke: var(--card-background-color, whitesmoke);
    }

    :host(.dark) .center-dot {
        fill: var(--card-background-color, whitesmoke);
    }
`;