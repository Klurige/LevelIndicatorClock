import { LevelIndicatorClockCard } from "./LevelIndicatorClockCard.js";
import { LevelIndicatorClockCardEditor } from "./LevelIndicatorClockCardEditor.js";

customElements.define(
    "level-indicator-clock",
    LevelIndicatorClockCard
);
customElements.define(
    "level-indicator-clock-editor",
    LevelIndicatorClockCardEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "level-indicator-clock",
    name: "LevelIndicatorClock",
    description: "Clock with level indicators",
});
