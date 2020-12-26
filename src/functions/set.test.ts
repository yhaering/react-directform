import { set } from './set';

describe('test', () => {
  it('should create the desired path', function () {
    expect(set({}, 'a.b.c', 'test')).toEqual({
      a: {
        b: {
          c: 'test',
        },
      },
    });
  });

  it('should create the desired path', function () {
    expect(set({}, 'a', 'test')).toEqual({
      a: 'test',
    });
  });

  it('should create the desired path', function () {
    expect(set([], '[0]', 'test')).toEqual(['test']);
  });

  it('should create the desired path', function () {
    expect(set([], '[0][0]', 'test')).toEqual([['test']]);
  });

  it('should create the desired path', function () {
    expect(set([], '[1][0]', 'test')).toEqual([, ['test']]);
  });

  it('should create the desired path', function () {
    expect(set({}, 'a[0].c', 'test')).toEqual({
      a: [
        {
          c: 'test',
        },
      ],
    });
  });

  it('should create the desired path', function () {
    expect(set({}, 'a[0][0].b[1].c', 'test')).toEqual({
      a: [
        [
          {
            b: [
              ,
              {
                c: 'test',
              },
            ],
          },
        ],
      ],
    });
  });
});
