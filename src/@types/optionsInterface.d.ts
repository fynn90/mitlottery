/**
 *抽奖state
 *
 * @author Fan
 * @date 2019-01-21
 * @interface optionStateInterface
 */
interface optionStateInterface {
  prizeList: prizeItemInterface[];
  extractionsList: number[];
}
/**
 *奖品项
 *
 * @author Fan
 * @date 2019-01-21
 * @interface prizeItemInterface
 */
interface prizeItemInterface {
  type: string; // 抽奖类型
  name: string; // 奖品名称
  quantity: number; // 奖品数量
  imgUrl: string; // 奖品图片
  received: number; // 已领取数量
  remoteImgUrl: string;
}

interface lotteryOrderInterface {
  type: string;
  num: number;
}

interface currentPrizeInterface extends prizeItemInterface {
  num: number; // 每次抽取数量
}

/**
 * 抽奖类型选项
 *
 * @author Fan
 * @date 2019-01-21
 * @interface optionsActionsInterface
 */
interface optionsActionsInterface {
  type: string;
  prizeType: string;
  number: number;
}