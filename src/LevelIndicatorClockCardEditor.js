import { css, html, LitElement } from 'lit';
import { log } from "./log.js";

export class LevelIndicatorClockCardEditor extends LitElement {
    _tag = "LevelIndicatorClockCardEditor";

    static get properties() {
        return {
            _config: { state: true },
        };
    }

    setConfig(config) {
        this._config = config;
    }

    static styles = css`
    .table {
        display: table;
    }
    .row {
        display: table-row;
    }
    .cell {
        display: table-cell;
        padding: 0.5em;
    }
`;

render() {
    return html`
        <form class="table">
            <div class="row">
                <label class="label cell" for="header">Header:</label>
                <input
                    @change="${this.handleChangedEvent}"
                    class="value cell" id="header" value="${this._config.header}"></input>
            </div>
            <div class="row">
                <label class="label cell" for="electricityprice">Electricity Price entity:</label>
                <input
                    @change="${this.handleChangedEvent}"
                    class="value cell" id="electricityprice" value="${this._config.electricityprice}"></input>
            </div>
           <div class="row">
                <label class="label cell" for="datetimeiso">Date and Time (ISO) entity:</label>
                <input
                    @change="${this.handleChangedEvent}"
                    class="value cell" id="datetimeiso" value="${this._config.datetimeiso}"></input>
            </div>
        </form>
    `;
}

handleChangedEvent(changedEvent) {
    // this._config is readonly, copy needed
    var newConfig = Object.assign({}, this._config);
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
            log(this._tag,"handleChangedEvent() - unknown event target id");
    }

    const messageEvent = new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
    });
    this.dispatchEvent(messageEvent);
}

}
