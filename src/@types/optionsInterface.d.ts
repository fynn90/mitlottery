/**
 *抽奖state
 *
 * @author Fan
 * @date 2019-01-21
 * @interface optionStateInterface
 */
interface optionStateInterface {
  prizeList: prizeItemInterface[];
  currentPrize: prizeItemInterface;
  extractionsList: number[];
  numberOfExtraction: number;
}
/**
 *奖品项
 *
 * @author Fan
 * @date 2019-01-21
 * @interface prizeItemInterface
 */
interface prizeItemInterface {
  type: string;
  name: string;
  quantity: number;
  imgUrl: string;
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