jest.mock('lit', () => {
    const template = (strings: TemplateStringsArray, ...values: unknown[]) =>
        strings.reduce((result, part, index) => {
            const value = values[index];
            return result + part + (Array.isArray(value) ? value.join('') : value ?? '');
        }, '');
    return {
        LitElement: class MockLitElement extends HTMLElement {
            requestUpdate = jest.fn();
        },
        html: template,
        svg: template,
        css: template,
    };
});

jest.mock('lit/decorators.js', () => ({
    property: () => () => {},
    state: () => () => {},
}));

import {LevelIndicatorClockCard} from './LevelIndicatorClockCard';
import {batteryModesToLevels, getLevelColor} from './utils';

customElements.define('test-level-indicator-clock', LevelIndicatorClockCard);

describe('colour legend', () => {
    it('is hidden by default and can be toggled without changing the sensor', () => {
        const card = new LevelIndicatorClockCard();
        card.setConfig({type: 'custom:level-indicator-clock', compact_levels: 'sensor.levels'});
        expect(String(card.render())).not.toContain('Electricity prices');
        expect(card.getLayoutOptions().grid_rows).toBe(8);

        card.setConfig({type: 'custom:level-indicator-clock', compact_levels: 'sensor.levels', show_legend: true});
        expect(String(card.render())).toContain('Electricity prices');
        expect(card.getLayoutOptions().grid_rows).toBe(13);
        expect(card.requestUpdate).toHaveBeenCalledTimes(1);

        card.setConfig({type: 'custom:level-indicator-clock', compact_levels: 'sensor.levels', show_legend: false});
        expect(String(card.render())).not.toContain('Electricity prices');
        expect(card.requestUpdate).toHaveBeenCalledTimes(2);
    });

    it.each([
        ['sensor.compact_levels', 'Electricity prices', 'LMHSEUP', ['Low', 'Medium', 'High', 'Solar'], 'Battery modes', 'Charging'],
        ['sensor.compact_battery_modes', 'Battery modes', 'BCDFTXEUP', ['Standby', 'Charging', 'Discharging', 'PV charging', 'Selling', 'Maxuse'], 'Electricity prices', 'Low'],
    ])('shows the relevant and common groups for %s', (entity, title, levels, labels, otherTitle, otherLabel) => {
        const card = new LevelIndicatorClockCard();
        card.setConfig({type: 'custom:level-indicator-clock', compact_levels: entity, show_legend: true});
        const rendered = String(card.render());
        expect(rendered).toContain(title);
        expect(rendered).toContain('Other colours');
        expect(rendered).not.toContain(otherTitle);
        expect(rendered).not.toContain(otherLabel);
        expect(rendered).not.toContain('Minutes indicator');
        expect(rendered).not.toContain('Seconds indicator');
        expect(rendered).not.toContain('Hours indicator');
        expect(rendered).not.toContain('>Off<');
        expect((rendered.match(/class="legend-swatch"/g) || [])).toHaveLength(levels.length);
        for (const level of levels) {
            expect(rendered).toContain(`background-color: ${getLevelColor(level)}`);
        }
        for (const label of labels) {
            expect(rendered).toContain(`<span>${label}</span>`);
        }
        expect(rendered).toContain('Past levels are shown in darker shades.');
    });

    it('updates the legend when switching sensors with the same option', () => {
        const card = new LevelIndicatorClockCard();
        card.setConfig({type: 'custom:level-indicator-clock', compact_levels: 'sensor.prices', show_legend: true});
        card.setConfig({type: 'custom:level-indicator-clock', compact_levels: 'sensor.BATTERY_modes', show_legend: true});
        expect(String(card.render())).toContain('Battery modes');
        expect(String(card.render())).not.toContain('Electricity prices');
        expect(card.requestUpdate).toHaveBeenCalledTimes(2);
    });

    it('translates battery payload symbols without changing common symbols or case', () => {
        expect(batteryModesToLevels('SCPDEMUsCpDeM')).toBe('BCFDTXUbCfDtX');
    });

    it('renders battery data with dedicated colours but leaves the clock marker white', () => {
        jest.useFakeTimers().setSystemTime(new Date(2026, 0, 1, 8, 50));
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        try {
            const card = new LevelIndicatorClockCard();
            card.setConfig({type: 'custom:level-indicator-clock', compact_levels: 'sensor.battery_modes'});
            card['updateLevels']({
                minutes_since_midnight: 530,
                level_length: 15,
                passed_levels: 'SSSS',
                future_levels: 'SCPDEM'.repeat(8),
            });
            const rendered = String(card.render());
            for (const level of 'BCFDTXP') {
                expect(rendered).toContain(`stroke="${getLevelColor(level)}"`);
            }
        } finally {
            jest.clearAllTimers();
            jest.useRealTimers();
            consoleError.mockRestore();
        }
    });

    it('offers the option in the visual editor', () => {
        expect(LevelIndicatorClockCard.getConfigForm().schema).toContainEqual({
            name: 'show_legend',
            label: 'Show colour legend',
            selector: {boolean: {}},
        });
    });
});
