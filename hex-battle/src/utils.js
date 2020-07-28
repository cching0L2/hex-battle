import tinycolor from 'tinycolor2';
import * as Constants from './constants';

/* Returns a randomly generated hex color */
export const getRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

/* 
 * Returns distance between two colors in RGB space
 * Returns -1 if inputs are not valid
 */
export const calcColorDistance = (color, otherColor) => {
  const color1 = tinycolor(color);
  const color2 = tinycolor(otherColor);

  if (!color1.isValid() || !color2.isValid()) {
    return -1;
  }

  const color1Rgb = color1.toRgb();
  const color2Rgb = color2.toRgb();

  return Math.hypot(color1Rgb.r - color2Rgb.r, color1Rgb.g - color2Rgb.g, color1Rgb.b - color2Rgb.b)
}

/*
 * Map score from [0,441.6] to [ROUND_MAX_SCORE,0]
 */
export const mapColorDistToRoundScore = (colorDist) => {
  const ratio = colorDist / Constants.MAX_COLOR_DIST;
  const penalty = Constants.ROUND_MAX_SCORE * ratio;
  
  return Constants.ROUND_MAX_SCORE - penalty;
}