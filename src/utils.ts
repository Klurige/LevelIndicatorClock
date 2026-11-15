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


export function getLevelColor(level: string): string {
     switch (level) {
        case "A":
            return "#0080ff";
        case "a":
            return "#001e3c";
        case "B":
            return "#00665e";
        case "b":
            return "#001816";
        case "C":
            return "#00d9ff";
        case "c":
            return "#00333c";
        case "D":
            return "#c2185b";
        case "d":
            return "#2e0615";
        case "F":
            return "#00a88f";
        case "f":
            return "#002822";
        case "I":
            return "#ffb000";
        case "i":
            return "#3c2900";
        case "L":
            return "#00c853";
        case "l":
            return "#002f14";
        case "M":
            return "#ffd600";
        case "m":
            return "#3c3200";
        case "H":
            return "#ff0000";
        case "h":
            return "#3c0000";
        case "S":
            return "#0066ff";
        case "s":
            return "#00183c";
        case "U":
            return "#808080";
        case "u":
            return "#202020";
        case "E":
            return "#ff00ff";
        case "e":
            return "#3c003c";
        case "O":
        case "o":
            return "black";
        case "P":
            return "white";
        case "p":
            return "#3c3c3c";
        case "T":
            return "#9370db";
        case "t":
            return "#231a34";
        case "V":
            return "#8000ff";
        case "v":
            return "#1e003c";
        case "X":
            return "#ff8c00";
        case "x":
            return "#3c2100";
        default:
            console.debug(`Unknown level character '${level}', defaulting to black.`);
            return "black"; // Black for other
    }
}
