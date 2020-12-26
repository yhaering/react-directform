import { normalizeParts } from './normalizeParts';

describe('normalizeParts', () => {
  it('should normalize default object paths', function () {
    expect(normalizeParts('a.b.c')).toEqual([
      { isArray: false, value: 'a' },
      { isArray: false, value: 'b' },
      { isArray: false, value: 'c' },
    ]);
  });

  it('should normalize array paths', function () {
    expect(normalizeParts('a[0].c')).toEqual([
      { isArray: false, value: 'a' },
      { isArray: true, value: 0 },
      { isArray: false, value: 'c' },
    ]);
  });

  it('should normalize chained array paths', function () {
    expect(normalizeParts('a[0][1].c')).toEqual([
      { isArray: false, value: 'a' },
      { isArray: true, value: 0 },
      { isArray: true, value: 1 },
      { isArray: false, value: 'c' },
    ]);
  });

  it('should first level array paths', function () {
    expect(normalizeParts('[0]')).toEqual([{ isArray: true, value: 0 }]);
  });
});
