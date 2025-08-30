import {LevelIndicatorClockCard} from "./LevelIndicatorClockCard";
import { minutesToAngle } from './utils';

export class LevelArc {
    color: string;
    start: number;
    end: number;

    constructor(color: string, start: number, end: number) {
        this.color = color;
        this.start = start;
        this.end = end;
    }

    arcToPath(cx: number, cy: number, r: number): string {
        let angleDiff = Math.abs(this.end - this.start);
        // If the arc is a full circle or nearly so, extend the end angle slightly
        if (angleDiff >= 360 || angleDiff === 0) {
            // Draw two arcs to make a full circle
            const path1 = LevelArc.describeArcSegment(cx, cy, r, this.start, this.start + 180);
            const path2 = LevelArc.describeArcSegment(cx, cy, r, this.start + 180, this.end);
            return `${path1} ${path2}`;
        } else {
            return LevelArc.describeArcSegment(cx, cy, r, this.start, this.end);
        }
    }

    static polarToCartesian(cx: number, cy: number, r: number, angleRad: number) {
        return {
            x: cx + r * Math.cos(angleRad - Math.PI / 2),
            y: cy + r * Math.sin(angleRad - Math.PI / 2)
        };
    }

    static describeArcSegment(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
        const OVERLAP = 0.12;
        const start = (startAngle == 0) ? -OVERLAP : startAngle;
        const end = (endAngle == 360) ? 360 + OVERLAP : endAngle;
        const arcStart = LevelArc.polarToCartesian(cx, cy, r, end * (Math.PI / 180));
        const arcEnd = LevelArc.polarToCartesian(cx, cy, r, start * (Math.PI / 180));
        const largeArcFlag = Math.abs(end - start) > 180 ? '1' : '0';
        return `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${arcEnd.x} ${arcEnd.y}`;
    }
}

export class LevelArcs {
    private readonly arcs: LevelArc[] = [];

    constructor(initialColor: string = 'magenta') {
        this.arcs = [new LevelArc(initialColor, 0, 360)];
    }

    getArcs(): LevelArc[] {
        return this.arcs;
    }

    insertLevelArc(color: string, startAngle: number, endAngle: number) {
//        console.debug(`Inserting level arc: color=${color}, startAngle=${startAngle}, endAngle=${endAngle}`);
        if (startAngle >= 0 && startAngle <= 360 && endAngle >= 0 && endAngle <= 360) {
            if (startAngle < endAngle) {
                this.insertAndMergeLevelArc(color, startAngle, endAngle);
            } else if (startAngle > endAngle) {
                if (startAngle < 360) {
                    this.insertAndMergeLevelArc(color, startAngle, 360);
                }
                if (endAngle > 0) {
                    this.insertAndMergeLevelArc(color, 0, endAngle);
                }
            }
        }
    }

    insertLevelAtMinute(startMinute: number, lengthMinutes: number, color: string) {
        const startAngle = minutesToAngle(startMinute);
        const endAngle = minutesToAngle(startMinute + lengthMinutes);
        this.insertLevelArc(color, startAngle, endAngle);
    }

    private insertAndMergeLevelArc(color: string, startAngle: number, endAngle: number) {
        let i = 0;
        while (i < this.arcs.length) {
            const arc = this.arcs[i];
            if (startAngle >= arc.end || endAngle <= arc.start) {
                i++;
                continue;
            }
            const originalEnd = arc.end;
            if (startAngle > arc.start && endAngle < originalEnd) {
                arc.end = startAngle;
                const newArc = new LevelArc(color, startAngle, endAngle);
                const afterArc = new LevelArc(arc.color, endAngle, originalEnd);
                this.arcs.splice(i + 1, 0, newArc, afterArc);
                break;
            }
            if (startAngle <= arc.start && endAngle < originalEnd && endAngle > arc.start) {
                arc.start = endAngle;
                const newArc = new LevelArc(color, startAngle, endAngle);
                this.arcs.splice(i, 0, newArc);
                break;
            }
            if (startAngle > arc.start && endAngle >= originalEnd) {
                arc.end = startAngle;
                const newArc = new LevelArc(color, startAngle, endAngle);
                this.arcs.splice(i + 1, 0, newArc);
                i++;
                continue;
            }
            if (startAngle <= arc.start && endAngle >= originalEnd) {
                this.arcs.splice(i, 1);
                continue;
            }
            throw new Error('Unreachable');
            //i++;
        }
        let inserted = this.arcs.some(g => g.start === startAngle && g.end === endAngle);
        if (!inserted) {
            let insertedInLoop = false;
            for (let j = 0; j < this.arcs.length; j++) {
                if (startAngle < this.arcs[j].start) {
                    this.arcs.splice(j, 0, new LevelArc(color, startAngle, endAngle));
                    insertedInLoop = true;
                    break;
                }
            }
            if (!insertedInLoop) {
                this.arcs.push(new LevelArc(color, startAngle, endAngle));
            }
        }
        i = 0;
        while (i < this.arcs.length - 1) {
            const current = this.arcs[i];
            const next = this.arcs[i + 1];
            if (current.color === next.color && current.end === next.start) {
                current.end = next.end;
                this.arcs.splice(i + 1, 1);
            } else {
                i++;
            }
        }
    }
}
