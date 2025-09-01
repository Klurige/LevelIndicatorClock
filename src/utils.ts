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
    const minutes_since_midnight = parseInt(parts[0], 10);
    const level_length = parseInt(parts[1], 10);
    const passed_levels = parts[2];
    const future_levels = parts[3];
    return {
        minutes_since_midnight: minutes_since_midnight,
        level_length: level_length,
        passed_levels: passed_levels,
        future_levels: future_levels
    };
}

function extractFunctionName(line: string): string {
    const atIndex = line.indexOf('at ');
    if (atIndex === -1) return 'unknown';
    let afterAt = line.substring(atIndex + 3);
    const parenIndex = afterAt.indexOf('(');
    const spaceIndex = afterAt.indexOf(' ');
    let endIndex = parenIndex !== -1 ? parenIndex : (spaceIndex !== -1 ? spaceIndex : afterAt.length);
    return afterAt.substring(0, endIndex).trim() + "()";
}

export function getCaller(): string {
    const stack = new Error().stack;
    if (stack) {
        const lines = stack.split('\n');
        const functionName = lines[2] ? extractFunctionName(lines[2]) : 'unknown';
        const callerLine = lines[3] ? extractFunctionName(lines[3]) : 'unknown';
        return functionName + " called from " + callerLine;
    }
    return 'unknown caller';
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
            return "white"; // White for passed
        case "p":
            return "gray"; // Dark grey for passed
        default:
            console.debug(`Unknown level character '${level}', defaulting to black.`);
            return "black"; // Black for other
    }
}
