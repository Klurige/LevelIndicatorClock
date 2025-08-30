import {LevelArcs} from './LevelArcs';
import {LevelArc} from './LevelArcs';

describe('LevelArcs', () => {
    let arcs: LevelArcs;

    beforeEach(() => {
        arcs = new LevelArcs('magenta');
    });

    it('should insert a new arc when there is no overlap', () => {
        arcs.insertLevelArc('green', 10, 20);
        expect(arcs.getArcs().some(arc => arc.color === 'green' && arc.start === 10 && arc.end === 20)).toBe(true);
    });

    it('should not insert arc if start and end angles are the same', () => {
        arcs.insertLevelArc('red', 30, 30);
        expect(arcs.getArcs().filter(arc => arc.color === 'red')).toHaveLength(0);
    });

    it('should split and insert arc when overlapping existing arc', () => {
        arcs.insertLevelArc('yellow', 0, 180);
        expect(arcs.getArcs().some(arc => arc.color === 'yellow' && arc.start === 0 && arc.end === 180)).toBe(true);
    });

    it('should merge adjacent arcs of the same color', () => {
        arcs.insertLevelArc('green', 10, 20);
        arcs.insertLevelArc('green', 20, 30);
        expect(arcs.getArcs().some(arc => arc.color === 'green' && arc.start === 10 && arc.end === 30)).toBe(true);
    });

    it('should handle arcs that wrap around 360 degrees', () => {
        arcs.insertLevelArc('blue', 350, 10);
        expect(arcs.getArcs().some(arc => arc.color === 'blue')).toBe(true);
    });

    it('should add a full circle', () => {
        function logArcs(step: string) {
            // eslint-disable-next-line no-console
            console.log(step, JSON.stringify(arcs.getArcs()));
        }
        arcs.insertLevelArc('darkgreen', 150, 151.5);
        logArcs('after darkgreen 150-151.5');
        arcs.insertLevelArc('green', 150, 180);
        logArcs('after green 150-180');
        arcs.insertLevelArc('green', 180, 210);
        logArcs('after green 180-210');
        arcs.insertLevelArc('green', 210, 240);
        logArcs('after green 210-240');
        arcs.insertLevelArc('green', 240, 270);
        logArcs('after green 240-270');
        arcs.insertLevelArc('green', 270, 300);
        logArcs('after green 270-300');
        arcs.insertLevelArc('green', 300, 330);
        logArcs('after green 300-330');
        arcs.insertLevelArc('green', 330, 360);
        logArcs('after green 330-360');
        arcs.insertLevelArc('green', 360, 30);
        logArcs('after green 360-30');
        arcs.insertLevelArc('green', 30, 60);
        logArcs('after green 30-60');
        arcs.insertLevelArc('green', 60, 90);
        logArcs('after green 60-90');
        arcs.insertLevelArc('green', 90, 120);
        logArcs('after green 90-120');
        arcs.insertLevelArc('green', 120, 150);
        logArcs('after green 120-150');

        expect(arcs.getArcs().length).toBe(1);
    });

});

describe('LevelArc', () => {
    it('arcToPath should return correct SVG path for a simple arc', () => {
        const arc = new LevelArc('red', 0, 90);
        const path = arc.arcToPath(100, 100, 50);
        // Should start with 'M' and contain 'A' for SVG arc
        expect(path).toMatch(/^M [\d.]+ [\d.]+ A 50 50 0 [01] 0 [\d.]+ [\d.]+$/);
    });

    it('arcToPath should return two arcs for a full circle', () => {
        const arc = new LevelArc('blue', 0, 360);
        const path = arc.arcToPath(100, 100, 50);
        // Should contain two 'A' commands
        expect((path.match(/A/g) || []).length).toBe(2);
    });

    it('arcToPath should handle zero-length arc', () => {
        const arc = new LevelArc('green', 45, 45);
        const path = arc.arcToPath(100, 100, 50);
        // Should contain two 'A' commands (full circle logic)
        expect((path.match(/A/g) || []).length).toBe(2);
    });
});