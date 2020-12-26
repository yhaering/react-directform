import { get } from './get';

describe('get', () => {
  it('should return first level property value', function () {
    expect(get({ a: 'test' }, 'a')).toBe('test');
  });

  it('should return second level property value', function () {
    expect(get({ a: { b: 'test' } }, 'a.b')).toBe('test');
  });

  it('should return value at array index', function () {
    expect(get({ a: ['test'] }, 'a[0]')).toBe('test');
  });

  it('should return nested value with array index', function () {
    expect(get({ a: [{ b: 'test' }] }, 'a[0].b')).toBe('test');
  });

  it('should return first level array index value', function () {
    expect(get(['test'], '[0]')).toBe('test');
  });

  it('should return undefined if path could not be found', function () {
    expect(get({}, 'a.b')).toBeUndefined();
  });

  it('should return undefined array index could not be found', function () {
    expect(get({ a: [] }, 'a[1]')).toBeUndefined();
  });

  it('should return undefined if first level array index could not be found', function () {
    expect(get(['test'], '[3]')).toBeUndefined();
  });
});
