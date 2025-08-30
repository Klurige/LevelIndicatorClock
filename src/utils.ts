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
