# Naming Conventions Guide

This document describes the standardized naming conventions used in the LevelIndicatorClock project.

## 📋 Quick Reference

| Element Type | Convention | Example |
|-------------|-----------|---------|
| Variables & Properties | camelCase | `currentTimeMinutes` |
| Boolean Variables | camelCase with prefix | `isSimulating`, `hasData`, `shouldUpdate` |
| Private Properties | camelCase (no underscore) | `levelArcs`, `minuteTickerId` |
| Lit @property | camelCase | `compactLevels` |
| Lit @state | camelCase | `dependencyMet` |
| Constants (readonly) | UPPER_SNAKE_CASE | `HISTORY_LENGTH_MINUTES` |
| Static Constants | UPPER_SNAKE_CASE | `CENTER_X`, `ARC_RADIUS` |
| Functions/Methods | camelCase | `updateLevels()`, `setCurrentMinute()` |
| Private Methods | camelCase (no underscore) | `stopMinuteTicker()`, `generateCompactLevels()` |
| Classes | PascalCase | `LevelIndicatorClockCard`, `LevelArcs` |
| Interfaces | PascalCase | `Config`, `LevelsResponse` |
| Files - Components | PascalCase.ts | `LevelIndicatorClockCard.ts` |
| Files - Utilities | camelCase.ts | `utils.ts` |

## 🎯 Detailed Guidelines

### 1. Variables and Properties

**Use camelCase for all variables and instance properties:**

```typescript
// ✅ Good
private currentTimeMinutes = 0;
private levelLength: number;
private hourHandEnd = {x: 100, y: 55};

// ❌ Bad
private current_time_minutes = 0;  // snake_case
private _levelLength: number;       // unnecessary underscore
private HourHandEnd = {x: 100, y: 55};  // PascalCase
```

**Boolean variables should start with a descriptive prefix:**

```typescript
// ✅ Good
private isSimulating = false;
private isFirstUpdate = true;
private dependencyMet = false;

// ❌ Bad
private simulating = false;  // unclear type
private firstUpdate = true;  // could be data or flag
```

### 2. Constants

**Use UPPER_SNAKE_CASE for all constants:**

```typescript
// ✅ Good
private static readonly CENTER_X = 100;
private static readonly HISTORY_LENGTH_MINUTES = 60;
private readonly SIMULATION_STEP_MINUTES = 1;

// ❌ Bad
private static readonly centerX = 100;        // camelCase
private static readonly HistoryLengthMinutes = 60;  // PascalCase
```

### 3. Methods and Functions

**Use camelCase for all methods:**

```typescript
// ✅ Good
private updateLevels(levels: LevelsResponse) { }
private setCurrentMinute(currentMinutes: number) { }
private generateCompactLevels(currentMinutes: number) { }

// ❌ Bad
private _updateLevels(levels: LevelsResponse) { }  // underscore prefix
private set_current_minute(currentMinutes: number) { }  // snake_case
private UpdateLevels(levels: LevelsResponse) { }  // PascalCase
```

**Lifecycle methods follow Lit conventions:**

```typescript
// ✅ Good - Lit framework methods
firstUpdated() { }
connectedCallback() { }
disconnectedCallback() { }
updated(changedProperties) { }
```

### 4. Classes and Interfaces

**Use PascalCase:**

```typescript
// ✅ Good
export class LevelIndicatorClockCard extends LitElement { }
export class LevelArcs { }
export interface LevelsResponse { }

// ❌ Bad
export class levelIndicatorClockCard { }  // camelCase
export class level_arcs { }  // snake_case
```

### 5. Function Parameters

**Use camelCase and descriptive names:**

```typescript
// ✅ Good
private setAngle(hand: string, angle: number) { }
private startMinuteTicker(startMinutes: number) { }

// ❌ Bad
private setAngle(h: string, a: number) { }  // single letters
private startMinuteTicker(start_minutes: number) { }  // snake_case
```

### 6. Local Variables in Functions

**Use camelCase with descriptive names:**

```typescript
// ✅ Good
const startOfCurrentLevel = Math.floor(minutes / levelLength) * levelLength;
const historyLengthLevels = Math.ceil(HISTORY_LENGTH_MINUTES / levelLength);
let slotIndex = 0;

// ❌ Bad
const start_of_current_level = ...;  // snake_case
const histLenLvls = ...;  // too abbreviated
const i = 0;  // non-descriptive for non-loop variable
```

### 7. Loop Variables

**Short names are acceptable for simple loops:**

```typescript
// ✅ Good - Simple loop
for (let i = 0; i < array.length; i++) { }

// ✅ Good - Descriptive when needed
for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) { }
```

### 8. Interface Properties

**Use snake_case only when matching external APIs (e.g., Home Assistant):**

```typescript
// ✅ Good - External API format
export interface LevelsResponse {
    minutes_since_midnight: number;  // Matches sensor format
    level_length: number;
    passed_levels: string;
    future_levels: string;
}

// ✅ Good - Internal interface
export interface Config extends LovelaceCardConfig {
    compact_levels: string;  // Matches HA convention
}
```

### 9. Decorator Properties

**Follow Lit conventions:**

```typescript
// ✅ Good
@property({type: String}) compactLevels = '';
@state() private dependencyMet = false;

// ❌ Bad
@property({type: String}) compact_levels = '';  // snake_case
@state() private _dependencyMet = false;  // underscore prefix
```

### 10. CSS Classes and IDs

**Use kebab-case for HTML/CSS selectors:**

```typescript
// ✅ Good
const handElement = this.shadowRoot?.querySelector(".hour-hand");
const minuteHand = this.shadowRoot?.querySelector(".minute-hand");

// ❌ Bad
const handElement = this.shadowRoot?.querySelector(".hourHand");  // camelCase
const minuteHand = this.shadowRoot?.querySelector(".minute_hand");  // snake_case
```

## 🔄 Migration Notes

### Recently Changed Names

- `current_time_minutes` → `currentTimeMinutes`
- `_dependencyMet` → `dependencyMet`
- `compact_levels` → `compactLevels`
- `centerX`, `centerY` → `CENTER_X`, `CENTER_Y`
- `hourDigitsRadius` → `HOUR_DIGITS_RADIUS`
- `arcRadius` → `ARC_RADIUS`
- `arcStrokeWidth` → `ARC_STROKE_WIDTH`
- `_updateLevels()` → `updateLevels()`
- `_generateCompactLevels()` → `generateCompactLevels()`

## 📝 Rationale

### Why camelCase for variables?
- Standard TypeScript/JavaScript convention
- Matches Lit Element framework conventions
- Better readability in modern IDEs

### Why UPPER_SNAKE_CASE for constants?
- Clear visual distinction from variables
- Industry standard for constants
- Prevents accidental reassignment confusion

### Why no underscore prefix for private?
- TypeScript `private` keyword already indicates scope
- Cleaner, more modern appearance
- Underscore prefix is outdated convention from pre-TypeScript era

### Why snake_case for external API interfaces?
- Matches Home Assistant sensor attribute naming
- Maintains compatibility with external systems
- Clear mapping between external and internal data

## ✅ Checklist for New Code

Before committing new code, verify:

- [ ] All variables use camelCase
- [ ] All constants use UPPER_SNAKE_CASE
- [ ] All functions use camelCase
- [ ] Boolean variables have descriptive prefixes (is/has/should)
- [ ] No underscore prefixes on private members
- [ ] Class names use PascalCase
- [ ] CSS classes use kebab-case
- [ ] Variable names are descriptive (no single letters except loop counters)

---

*Last updated: October 8, 2025*

