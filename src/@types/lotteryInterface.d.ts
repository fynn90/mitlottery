/**
 *抽奖 state
 *
 * @author Fan
 * @date 2019-01-21
 * @interface lotteryPeopleStateInterface
 */
interface lotteryPeopleStateInterface {
  lotteryPeopleList: lotteryPeopleInterface[];
  winnerList: winnerListInterface[];
  extracting: lotteryPeopleInterface[];
  drawList: lotteryPeopleInterface[];
  inTheLottery: boolean;
}
/**
 *参与抽奖人员
 *
 * @author Fan
 * @date 2019-01-21
 * @interface lotteryPeopleInterface
 */
interface lotteryPeopleInterface {
  name: string;
  department: string;
  winner: boolean;
}
/**
 *中奖名单
 *
 * @author Fan
 * @date 2019-01-21
 * @interface winnerListInterface
 */
interface winnerListInterface {
  type: string;
  data: lotteryPeopleInterface[];
}
/**
 * 抽奖 actions接口
 *
 * @author Fan
 * @date 2019-01-21
 * @interface lotteryPeopleActions
 */
interface lotteryPeopleActions {
  type: string;
  randoms: number[];
  lotteryType: string;
}