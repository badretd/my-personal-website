import { SeededRandom } from "./random";
import { sceneFamilies } from "./registry";
import type { SceneFamilyId } from "./types";

export class ShuffledSceneBag {
  private bag: SceneFamilyId[] = [];

  constructor(
    private random: SeededRandom,
    private previous?: SceneFamilyId,
  ) {}

  next() {
    if (this.bag.length === 0) {
      this.bag = this.random.shuffle(sceneFamilies);
      if (this.previous === this.bag[0] && this.bag.length > 1) {
        [this.bag[0], this.bag[1]] = [this.bag[1], this.bag[0]];
      }
    }
    const family = this.bag.shift()!;
    this.previous = family;
    return family;
  }
}
