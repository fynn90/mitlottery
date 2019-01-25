import { data as people } from '../people.json';
import { data as prize } from '../prize.json';
import { data as lotteryOrder } from '../order.json';
import { combineReducers } from 'redux';
import * as constants from '../constants';
import { singleExtractionOfList } from "../config"
import { getCurrentLottery } from '../utils'

let catchLotteryOrder = <lotteryOrderInterface[]>(!!sessionStorage.getItem('lotteryOrder') ? JSON.parse(<string>sessionStorage.getItem('lotteryOrder')) : lotteryOrder)
let catchPrizeList = <prizeItemInterface[]>(!!sessionStorage.getItem('prizeList') ? JSON.parse(<string>sessionStorage.getItem('prizeList')) : prize.concat({ type: constants.PRIZE_OTHER, name: '', quantity: 1, imgUrl: '', received: 0, remoteImgUrl: '' }))


const firstLotteryOrder = <lotteryOrderInterface>(catchLotteryOrder.shift())
const optionsInitialState = {
  prizeList: catchPrizeList, //奖品数据
  extractionsList: singleExtractionOfList, // 单次抽取数量数据
}

let drawListInit = <lotteryPeopleInterface[]>(!!sessionStorage.getItem('drawList') ? JSON.parse(<string>sessionStorage.getItem('drawList')) : people);
const lotteryPeoplesInitialState = {
  lotteryPeopleList: people, // 参会完整名单
  winnerList: [], // 中奖名单
  extracting: [], // 实时显示名单
  drawList: drawListInit, // 待抽取的名单
  inTheLottery: false, // 抽奖的状态
  lotteryOrder: catchLotteryOrder, // 抽奖顺序
  currentPrize: getCurrentLottery(catchPrizeList, firstLotteryOrder.type, firstLotteryOrder.num), // 当前抽奖的信息
}



/**
 *抽奖类型和抽奖数量 reducers
 *
 * @author Fan
 * @date 2019-01-19
 * @param {*} [state=optionsInitialState]
 * @param {*} actions
 * @returns
 */
function optionsReducers(state: optionStateInterface = optionsInitialState, actions: optionsActionsInterface): optionStateInterface {
  switch (actions.type) {
    case constants.UPDATE_PRIZE_RECEIVED_NUMBER:
      let temp = state.prizeList.map((val) => {
        if (val.type !== actions.prizeType) {
          return val;
        } else {
          val.received += actions.number;
          return val;
        }
      });
      sessionStorage.setItem('prizeList', JSON.stringify(temp))
      return {
        ...state,
        prizeList: temp
      }
    default: return state
  }
};

function lotteryReducers(state: lotteryPeopleStateInterface = lotteryPeoplesInitialState, actions: lotteryPeopleActions): lotteryPeopleStateInterface {
  switch (actions.type) {
    case constants.START_LOTTERY:
      return {
        ...state,
        inTheLottery: true,
        extracting: []
      };
    case constants.STOP_LOTTERY:
      let newExtracting = actions.randoms.map((v) => (state.drawList[v]));
      let tempDrawList = state.drawList.filter((v, i) => (!actions.randoms.includes(i)));
      if (tempDrawList.length) {
        sessionStorage.setItem('drawList', JSON.stringify(tempDrawList))
      } else {
        sessionStorage.removeItem('drawList')
      }
      if (state.lotteryOrder.length) {
        sessionStorage.setItem('lotteryOrder', JSON.stringify(state.lotteryOrder))
      } else {
        sessionStorage.removeItem('lotteryOrder')
        sessionStorage.removeItem('prizeList')
      }
      return {
        ...state,
        inTheLottery: false,
        extracting: newExtracting,
        drawList: tempDrawList,
        winnerList: state.winnerList.concat({ type: actions.prizeType, data: newExtracting }),
        currentPrize: { ...state.currentPrize, received: state.currentPrize.received + state.currentPrize.num }
      };
    case constants.IN_THE_LOTTERY:
      return {
        ...state,
        inTheLottery: true,
        extracting: actions.randoms.map((v) => (state.drawList[v]))
      }
    case constants.NEXT_TIME:
      let tempNextLottery = <lotteryOrderInterface>state.lotteryOrder.shift()
      return {
        ...state,
        extracting: [],
        lotteryOrder: state.lotteryOrder,
        currentPrize: getCurrentLottery(actions.prizeList, tempNextLottery.type, tempNextLottery.num)
      }
    case constants.SWITCH_PRIZE:
      return {
        ...state,
        extracting: [],
        inTheLottery: false,
        currentPrize: getCurrentLottery(actions.prizeList, actions.prizeType, actions.number)
      }
    case constants.SWITCH_EXTRACTION_OF_NUMBER:
      return {
        ...state,
        extracting: [],
        inTheLottery: false,
        currentPrize: getCurrentLottery(actions.prizeList, actions.prizeType, actions.number)
      }
    case constants.PRIZE_OTHER:
      return {
        ...state,
        extracting: [],
        inTheLottery: false,
        currentPrize: {
          type: constants.PRIZE_OTHER,
          num: actions.number,
          imgUrl: '',
          name: actions.prizeType,
          received: 0,
          quantity: 0,
          remoteImgUrl: ''
        }
      }
    default: return state
  }
}

export default combineReducers({
  optionsReducers,
  lotteryReducers
});