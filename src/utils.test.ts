import {getLevelColor} from './utils';
import {LevelArcs} from './LevelArcs';

describe('level colours', () => {
    it.each([...'abcdefhilmopstuvx'])('renders historical %s without changing its case', level => {
        const arcs = new LevelArcs();
        arcs.insertLevelAtMinute(0, 60, level);
        expect(arcs.getArcs()).toContainEqual({color: getLevelColor(level), start: 0, end: 30});
    });
});
