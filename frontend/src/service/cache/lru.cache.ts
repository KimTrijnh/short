import { Cache } from './cache';

export class LRUCache implements Cache {
  private size: number;
  private readonly ref: { [key: string]: Buffer };
  private readonly head: Buffer;
  private readonly tail: Buffer;

  constructor(private capacity: number) {
    this.size = 0;
    this.ref = {};

    this.head = new Buffer('', null);
    this.tail = new Buffer('', null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get<Data>(key: string): Data | null {
    if (this.capacity == 0) {
      return null;
    }

    const buffer = this.ref[key];
    if (!buffer) {
      return null;
    }
    this.remove(buffer);
    this.addToHead(buffer);
    return buffer.value;
  }

  set<Data>(key: string, value: Data): void {
    if (this.capacity == 0) {
      return;
    }

    let buffer = this.ref[key];
    if (buffer) {
      buffer.value = value;
      this.remove(buffer);
      this.addToHead(buffer);
      return;
    }

    if (this.size >= this.capacity) {
      this.evict();
    }

    buffer = new Buffer(key, value);
    this.addToHead(buffer);
  }

  private remove(buffer: Buffer): void {
    buffer.prev!.next = buffer.next;
    buffer.next!.prev = buffer.prev;
    delete this.ref[buffer.key];
    this.size--;
  }

  private addToHead(buffer: Buffer) {
    this.head.next!.prev = buffer;
    buffer.next = this.head.next;
    buffer.prev = this.head;
    this.head.next = buffer;

    this.ref[buffer.key] = buffer;
    this.size++;
  }

  private evict() {
    this.remove(this.tail.prev!);
  }
}

class Buffer {
  public prev?: Buffer;
  public next?: Buffer;

  constructor(public key: string, public value: any) {}
}
