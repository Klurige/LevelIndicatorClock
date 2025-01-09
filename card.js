import { ElprisklockaCard } from "./ElprisklockaCard.js";
import { ElprisklockaCardEditor } from "./ElprisklockaCardEditor.js";

customElements.define(
    "elprisklocka-card",
    ElprisklockaCard
);
customElements.define(
    "elprisklocka-card-editor",
    ElprisklockaCardEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "elprisklocka-card",
    name: "Elprisklocka",
    description: "Klocka med prisindikatorer",
});
