
export function getPrefixedTranslate(x: number, y: number) {
  return {
    "transform": `translateX(${x}px) translateY(${y}px)`,
    "WebkitTransform": `translateX(${x}px) translateY(${y}px)`,
    //"MozTransform": `translateX(${x}px) translateY(${y}px)`,
    "msTransform": `translateX(${x}px) translateY(${y}px)`,
    "OTransform": `translateX(${x}px) translateY(${y}px)`,
  }
}

export function rgbToCss(red: number, green: number, blue: number) {
  return `rgb(${red}, ${green}, ${blue})`;
}