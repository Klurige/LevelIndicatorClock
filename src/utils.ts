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


export function getLevelColor(level: string): string {
     switch (level) {
        case "L":
            return "green"; // Green for low
        case "l":
            return "darkgreen"; // Dark green for low
        case "M":
            return "yellow"; // Yellow for medium
        case "m":
            return "olive"; // Dark yellow for medium
        case "H":
            return "red"; // Red for high
        case "h":
            return "maroon"; // Dark red for high
        case "S":
            return "blue"; // Blue for solar
        case "s":
            return "navy"; // Dark blue for solar
        case "U":
            return "magenta"; // Magenta for unknown
        case "u":
            return "purple"; // Dark magenta for unknown
        case "E":
            return "cyan"; // Cyan for error
        case "e":
            return "teal"; // Dark cyan for error
        case "P":
            return "transparent";
        case "p":
            return "transparent";
        default:
            console.debug(`Unknown level character '${level}', defaulting to black.`);
            return "black"; // Black for other
    }
}
