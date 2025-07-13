import { LevelIndicatorClockCard } from "./LevelIndicatorClockCard.js";
import './levelindicatorclockcard.styles.ts';

declare global {
    interface Window {
        customCards: Array<Object>;
    }
}
customElements.define(
    "level-indicator-clock",
    LevelIndicatorClockCard
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "level-indicator-clock",
    name: "LevelIndicatorClock",
    description: "Clock with level indicators",
    preview: true,
});
