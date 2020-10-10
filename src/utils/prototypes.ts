declare global {
  interface Array<T> {
    minBy: (lambda: (args: T) => any) => any;
    maxBy: (lambda: (args: T) => any) => any;
    extremumBy: any;
  }
}

export const setupPrototypes = () => {

  // Array<any>.reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any (+2 overloads)
  if (!Array.prototype.minBy) {
    Array.prototype.minBy = function (fn) { return this.extremumBy(fn, Math.min); };
  }

  if (!Array.prototype.maxBy) {
    Array.prototype.maxBy = function (fn) { return this.extremumBy(fn, Math.max); };
  }

  if (!Array.prototype.extremumBy) {
    Array.prototype.extremumBy = function (pluck, extremum) {
      return this.reduce(function (best, next) {
        var pair = [pluck(next), next];
        if (!best) {
          return pair;
        } else if (extremum.apply(null, [best[0], pair[0]]) === best[0]) {
          return best;
        } else {
          return pair;
        }
      }, null)[1];
    }
  }
};