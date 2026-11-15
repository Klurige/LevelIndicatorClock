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
    }

    .clock {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
    }

    .legend {
        box-sizing: border-box;
        width: 100%;
        padding: 0 16px 16px;
        color: var(--primary-text-color, black);
        font-size: 0.875rem;
    }

    .legend-title {
        font-weight: bold;
        margin-bottom: 8px;
    }

    .legend-group + .legend-group {
        margin-top: 12px;
    }

    .legend-items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
        gap: 6px 12px;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .legend-swatch {
        box-sizing: border-box;
        flex: 0 0 14px;
        height: 14px;
        border: 1px solid var(--secondary-text-color, gray);
        border-radius: 50%;
    }

    .legend-note {
        color: var(--secondary-text-color, gray);
        margin-top: 8px;
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