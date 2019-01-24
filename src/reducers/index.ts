import { data as people } from '../people.json';
import { data as prize } from '../prize.json';
import { data as lotteryOrder } from '../order.json';
import { combineReducers } from 'redux';
import * as constants from '../constants';
import { singleExtractionOfList } from "../config"
import { getCurrentLottery } from '../utils'

let catchLotteryOrder = <lotteryOrderInterface[]>(!!sessionStorage.getItem('lotteryOrder') ? JSON.parse(<string>sessionStorage.getItem('lotteryOrder')) : lotteryOrder)

const firstLotteryOrder = <lotteryOrderInterface>(catchLotteryOrder.length !== 0 ? catchLotteryOrder.shift(): {type:'', num: 0})
const optionsInitialState = {
  prizeList: prize.concat({ type: '其它', name: 'other', quantity: 1, imgUrl: '', received: 0 }),
  extractionsList: singleExtractionOfList,
}

let drawListInit = <lotteryPeopleInterface[]>(!!sessionStorage.getItem('drawList') ? JSON.parse(<string>sessionStorage.getItem('drawList')): people);
const lotteryPeoplesInitialState = {
  lotteryPeopleList: people,
  winnerList: [], // 中奖名单
  extracting: [], // 实时显示名单
  drawList: drawListInit, // 待抽取的名单
  inTheLottery: false, // 抽奖的状态
  lotteryOrder: catchLotteryOrder,
  currentPrize: getCurrentLottery(prize, firstLotteryOrder.type, firstLotteryOrder.num), // 当前 抽奖的轮次
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
    case constants.SWITCH_PRIZE:
      return {
        ...state,
      };
    case constants.SWITCH_EXTRACTION_OF_NUMBER:
      return {
        ...state,
      };
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
      }
      return {
        ...state,
        inTheLottery: false,
        extracting: newExtracting,
        drawList: tempDrawList,
        winnerList: state.winnerList.concat({ type: actions.lotteryType, data: newExtracting })
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
        lotteryOrder,
        currentPrize: getCurrentLottery(prize, tempNextLottery.type, tempNextLottery.num)
      }
    default: return state
  }
}

export default combineReducers({
  optionsReducers,
  lotteryReducers
});