export class SeededRandom {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0 || 0x6d2b79f5;
  }

  next() {
    let value = (this.state += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  }

  number(min: number, max: number) {
    return min + this.next() * (max - min);
  }

  integer(min: number, max: number) {
    return Math.floor(this.number(min, max + 1));
  }

  boolean(probability = 0.5) {
    return this.next() < probability;
  }

  pick<T>(items: readonly T[]): T {
    return items[this.integer(0, items.length - 1)];
  }

  shuffle<T>(items: readonly T[]) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const other = this.integer(0, index);
      [copy[index], copy[other]] = [copy[other], copy[index]];
    }
    return copy;
  }
}

export function createSessionSeed() {
  const values = new Uint32Array(1);
  window.crypto.getRandomValues(values);
  return values[0] || 1;
}
