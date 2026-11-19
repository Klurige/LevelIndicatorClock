import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {getLevelColor, LEVEL_COLOURS} from './utils';

const HEADER_PATH = process.env.ESPHOME_COLOURS_HEADER ?? [
    '../../esphome/devices/electricitypricelevelclock/colours.h',
    '../../esphome_devices/electricitypricelevelclock/colours.h',
].map(path => resolve(__dirname, path)).find(existsSync);

function toHex(channels: string[]): string {
    return '#' + channels.map(channel => {
        const value = Number(channel);
        expect(value).toBeLessThanOrEqual(255);
        return value.toString(16).padStart(2, '0');
    }).join('');
}

if (HEADER_PATH === undefined) {
    it.skip('matches ESPHome colours.h (set ESPHOME_COLOURS_HEADER if not checked out alongside this repository)', () => {});
} else {
    it('matches every ESPHome colour definition and the unknown-symbol fallback', () => {
        const header = readFileSync(HEADER_PATH, 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/[^\r\n]*/g, '');
        const definitions = /COLOUR_DEFINITIONS\s*\[\s*\]\s*=\s*\{([\s\S]*?)\}\s*;/.exec(header);
        const fallback = /UNKNOWN_COLOUR\s*=\s*\{\s*'\?'\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\}\s*;/.exec(header);
        if (!definitions || !fallback) {
            throw new Error(`Could not read COLOUR_DEFINITIONS and UNKNOWN_COLOUR from ${HEADER_PATH}`);
        }

        const expected: Record<string, string> = {};
        const remainder = definitions[1].replace(
            /\{\s*'([A-Za-z])'\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\}\s*(?:,|$)/g,
            (_entry, level: string, red: string, green: string, blue: string) => {
                expect(expected).not.toHaveProperty(level);
                expected[level] = toHex([red, green, blue]);
                return '';
            },
        );
        expect(remainder.trim()).toBe('');
        expect(Object.keys(LEVEL_COLOURS).sort()).toEqual(Object.keys(expected).sort());
        for (const [level, colour] of Object.entries(expected)) {
            expect({level, colour: getLevelColor(level)}).toEqual({level, colour});
        }
        expect(getLevelColor('?')).toBe(toHex(fallback.slice(1)));
    });
}
