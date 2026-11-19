// Utility functions for LevelIndicatorClock

export function minutesToAngle(minutes: number): number {
    let angle = minutes / 2;
    while (angle < 0) {
        angle += 360;
    }
    while (angle > 360) {
        angle -= 360;
    }
    return angle;
}

export interface LevelsResponse {
    minutes_since_midnight: number;
    level_length: number;
    passed_levels: string;
    future_levels: string;
}

export const DEFAULT_LEVELS_RESPONSE: LevelsResponse = {
    minutes_since_midnight: 0,
    level_length: 0,
    passed_levels: '',
    future_levels: ''
};

export function compactToLevels(compactLevels: string | undefined): LevelsResponse {
    // Expecting format: "minutes_since_midnight:level_length:passed_levels:future_levels"
    if (!compactLevels) {
        return DEFAULT_LEVELS_RESPONSE;
    }
    const parts = compactLevels.split(":");
    if (parts.length < 4) {
        console.error('[ClockCard] Invalid compactLevels format:', compactLevels);
        return DEFAULT_LEVELS_RESPONSE;
    }
    const minutesSinceMidnight = parseInt(parts[0], 10);
    const levelLength = parseInt(parts[1], 10);
    if (isNaN(minutesSinceMidnight) || isNaN(levelLength)) {
        console.error('[ClockCard] Invalid numeric values in compactLevels:', compactLevels);
        return DEFAULT_LEVELS_RESPONSE;
    }
    const passedLevels = parts[2];
    const futureLevels = parts[3];
    return {
        minutes_since_midnight: minutesSinceMidnight,
        level_length: levelLength,
        passed_levels: passedLevels,
        future_levels: futureLevels
    };
}

export function getCurrentMinutesSinceMidnight(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

export function batteryModesToLevels(modes: string): string {
    const levels: Record<string, string> = {S: 'B', P: 'F', E: 'T', M: 'X'};
    return modes.replace(/[SPEM]/gi, mode => {
        const level = levels[mode.toUpperCase()];
        return mode === mode.toLowerCase() ? level.toLowerCase() : level;
    });
}


export const LEVEL_COLOURS: Readonly<Record<string, string>> = {
    A: '#4169e1', a: '#0f1935',
    B: '#008080', b: '#001e1e',
    C: '#87ceeb', c: '#203037',
    D: '#dc143c', d: '#34050e',
    E: '#ff00ff', e: '#3c003c',
    F: '#20b2aa', f: '#082a28',
    H: '#ff0000', h: '#3c0000',
    I: '#ffa500', i: '#3c2700',
    L: '#32cd32', l: '#0c300c',
    M: '#ffd700', m: '#3c3300',
    O: '#000000', o: '#000000',
    P: '#ffffff', p: '#3c3c3c',
    S: '#0000ff', s: '#00003c',
    T: '#9370db', t: '#231a34',
    U: '#808080', u: '#202020',
    V: '#7b68ee', v: '#1d1838',
    X: '#ff8c00', x: '#3c2100',
};

export function getLevelColor(level: string): string {
    if (Object.prototype.hasOwnProperty.call(LEVEL_COLOURS, level)) {
        return LEVEL_COLOURS[level];
    }
    console.debug(`Unknown level character '${level}', defaulting to dark gray.`);
    return '#1e1e1e';
}
