import { log } from "./log.js";

export class ElprisklockaCardEditor extends HTMLElement {
    // private properties
    _tag = "elprisklocka-card-editor";
    _config;
    _hass;
    _elements = {};

    // lifecycle
    constructor() {
        super();
        log(this._tag,"constructor()");
        this.doEditor();
        this.doStyle();
        this.doAttach();
        this.doQueryElements();
        this.doListen();
    }

    setConfig(config) {
        log(this._tag,"setConfig()");
        this._config = config;
        this.doUpdateConfig();
    }

    set hass(hass) {
        log(this._tag,"hass()");
        this._hass = hass;
        this.doUpdateHass();
    }

    onChanged(event) {
        log(this._tag,"onChanged()");
        this.doMessageForUpdate(event);
    }

    // jobs
    doEditor() {
        this._elements.editor = document.createElement("form");
        this._elements.editor.innerHTML = `
            <div class="row"><label class="label" for="header">Rubrik:</label><input class="value" id="header"></input></div>
            <div class="row"><label class="label" for="electricityprice">Elpris:</label><input class="value" id="elpris"></input></div>
            <div class="row"><label class="label" for="datetimeiso">Tid:</label><input class="value" id="Datum och Tid (iso)"></input></div>
        `;
    }

    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = `
            form {
                display: table;
            }
            .row {
                display: table-row;
            }
            .label, .value {
                display: table-cell;
                padding: 0.5em;
            }
        `;
    }

    doAttach() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this._elements.style, this._elements.editor);
    }

    doQueryElements() {
        this._elements.header = this._elements.editor.querySelector("#header");
        this._elements.entity = this._elements.editor.querySelector("#electricityprice");
        this._elements.entity = this._elements.editor.querySelector("#datetimeiso");
    }

    doListen() {
        this._elements.header.addEventListener(
            "focusout",
            this.onChanged.bind(this)
        );
        this._elements.electricityprice.addEventListener(
            "focusout",
            this.onChanged.bind(this)
        );
        this._elements.datetimeiso.addEventListener(
            "focusout",
            this.onChanged.bind(this)
        );
    }

    doUpdateConfig() {
        this._elements.header.value = this._config.header;
        this._elements.electricityprice.value = this._config.electricityprice;
        this._elements.datetimeiso.value = this._config.datetimeiso;
    }

    doUpdateHass() { }

    doMessageForUpdate(changedEvent) {
        // this._config is readonly, copy needed
        const newConfig = Object.assign({}, this._config);
        switch (changedEvent.target.id) {
            case "header":
                newConfig.header = changedEvent.target.value;
                break;
            case "electricityprice":
                newConfig.electricityprice = changedEvent.target.value;
                break;
            case "datetimeiso":
                newConfig.datetimeiso = changedEvent.target.value;
                break;
            default:
                log(this._tag,"doMessageForUpdate() - unknown event target id");
                return;
        }
        const messageEvent = new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
}
