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

/**
 *返回当前 参与抽奖的对象
 *
 * @author Fan
 * @date 2019-01-23
 * @export
 * @param {prizeItemInterface[]} prizeList 奖品信息
 * @param {string} lotteryType 当前抽奖类型
 * @param {number} num 当前抽取数量
 * @returns {currentPrizeInterface}
 */
export function getCurrentLottery(prizeList: prizeItemInterface[], lotteryType: string, num: number): currentPrizeInterface {
  let d = prizeList.filter((val) => (val.type == lotteryType))[0]
  return {
    ...d,
    num
  }
}