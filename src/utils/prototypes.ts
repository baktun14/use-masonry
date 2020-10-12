declare global {
  interface Array<T> {
    minBy: (lambda: (args: T) => any) => any;
    maxBy: (lambda: (args: T) => any) => any;
    extremumBy: any;
  }
}

export const setupPrototypes = () => {

  if (!Array.prototype.minBy) {
    // eslint-disable-next-line
    Array.prototype.minBy = function (fn) { return this.extremumBy(fn, Math.min); };
  }

  if (!Array.prototype.maxBy) {
    // eslint-disable-next-line
    Array.prototype.maxBy = function (fn) { return this.extremumBy(fn, Math.max); };
  }

  if (!Array.prototype.extremumBy) {
    // eslint-disable-next-line
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