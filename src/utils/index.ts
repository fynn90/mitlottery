/**
 *
 *
 * @author Fan
 * @date 2019-01-20
 * @export
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getRandomInt(min: number, max: number):number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};