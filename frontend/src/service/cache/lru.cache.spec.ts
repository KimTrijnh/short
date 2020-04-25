import { LRUCache } from './lru.cache';

describe('LRU cache', () => {
  it('should return null when key not found', function() {
    const cache = new LRUCache(2);
    expect(cache.get<string>('1')).toBeFalsy();
  });

  it('should ignore setting value when cache size = 0', function() {
    const cache = new LRUCache(0);
    cache.set<string>('1', 'a');
    expect(cache.get<string>('1')).toBeFalsy();
  });

  it('should set and get key value pairs correctly', function() {
    const cache = new LRUCache(3);
    cache.set<string>('1', 'a');
    cache.set<string>('2', 'b');
    cache.set<string>('3', 'c');

    expect(cache.get<string>('1')).toBe('a');
    expect(cache.get<string>('2')).toBe('b');
    expect(cache.get<string>('3')).toBe('c');
  });

  it('should not evict newly added K-V pair', function() {
    const cache = new LRUCache(3);

    cache.set<string>('1', 'a');
    cache.set<string>('2', 'b');
    cache.set<string>('3', 'c');
    cache.set<string>('4', 'd');

    expect(cache.get<string>('1')).toBeFalsy();
    expect(cache.get<string>('2')).toBe('b');
    expect(cache.get<string>('3')).toBe('c');
    expect(cache.get<string>('4')).toBe('d');
  });

  it('should evict the least recently used K-V pair', function() {
    const cache = new LRUCache(3);
    cache.set<string>('1', 'a');
    cache.set<string>('2', 'b');
    cache.set<string>('3', 'c');
    cache.set<string>('4', 'd');

    expect(cache.get<string>('1')).toBeFalsy();
    expect(cache.get<string>('2')).toBe('b');
    expect(cache.get<string>('3')).toBe('c');
    expect(cache.get<string>('4')).toBe('d');

    cache.set<string>('5', 'e');
    expect(cache.get<string>('2')).toBeFalsy();
  });

  it('should not evict recently referenced K-V pair', function() {
    const cache = new LRUCache(3);
    cache.set<string>('1', 'a');
    cache.set<string>('2', 'b');
    cache.set<string>('3', 'c');
    cache.get<string>('1');
    cache.set<string>('4', 'd');

    // [4:d, 1:a, 3:c]
    expect(cache.get<string>('1')).toBe('a');
    expect(cache.get<string>('2')).toBeFalsy();
    expect(cache.get<string>('3')).toBe('c');
    expect(cache.get<string>('4')).toBe('d');

    cache.set<string>('3', 'f');
    cache.set<string>('5', 'g');

    // [5:g, 3:f, 4:d]
    expect(cache.get<string>('1')).toBeFalsy();
    expect(cache.get<string>('2')).toBeFalsy();
    expect(cache.get<string>('3')).toBe('f');
    expect(cache.get<string>('4')).toBe('d');
    expect(cache.get<string>('5')).toBe('g');
  });
});
