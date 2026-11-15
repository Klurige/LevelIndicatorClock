import {getLevelColor} from './utils';
import {LevelArcs} from './LevelArcs';

describe('level colours', () => {
    it.each([
        ['A', '#0080ff'], ['B', '#00665e'], ['C', '#00d9ff'],
        ['D', '#c2185b'], ['E', '#ff00ff'], ['F', '#00a88f'],
        ['H', '#ff0000'], ['I', '#ffb000'], ['L', '#00c853'],
        ['M', '#ffd600'], ['O', 'black'], ['P', 'white'],
        ['S', '#0066ff'], ['T', '#9370db'], ['U', '#808080'],
        ['V', '#8000ff'], ['X', '#ff8c00']
    ])('maps %s to %s', (level, color) => {
        expect(getLevelColor(level)).toBe(color);
    });

    it.each([
        ['a', '#001e3c'], ['b', '#001816'], ['c', '#00333c'],
        ['d', '#2e0615'], ['e', '#3c003c'], ['f', '#002822'],
        ['h', '#3c0000'], ['i', '#3c2900'], ['l', '#002f14'],
        ['m', '#3c3200'], ['s', '#00183c'], ['u', '#202020'],
        ['o', 'black'], ['p', '#3c3c3c'], ['t', '#231a34'],
        ['v', '#1e003c'], ['x', '#3c2100']
    ])('renders historical %s as %s', (level, color) => {
        const arcs = new LevelArcs();
        arcs.insertLevelAtMinute(0, 60, level);
        expect(arcs.getArcs().some(arc => arc.color === color && arc.start === 0 && arc.end === 30)).toBe(true);
    });
});
