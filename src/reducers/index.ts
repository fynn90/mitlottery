import { data as people } from '../people.json';
import { data as prize } from '../prize.json';
import { combineReducers } from 'redux';
import * as constants from '../constants';

const optionsInitialState = {
  prizeList: prize.concat({ type: '其它', name: 'other', quantity: 1, imgUrl: '' }),
  currentPrize: prize.slice(-1)[0],
  extractionsList: [1, 2, 3, 6],
  numberOfExtraction: 6
}

const lotteryPeoplesInitialState = {
  lotteryPeopleList: people,
  winnerList: [], // 中奖名单
  extracting: [], // 抽奖中的名单
  drawList: people, // 待抽取的名单
  inTheLottery: false, // 抽奖的状态
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
        currentPrize: state.prizeList.filter((v) => v.type === actions.prizeType)[0]
      };
    case constants.SWITCH_EXTRACTION_OF_NUMBER:
      return {
        ...state,
        numberOfExtraction: actions.number
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
      let newExtracting = actions.randoms.map((v) => (state.drawList[v]))
      return {
        ...state,
        inTheLottery: false,
        extracting: newExtracting,
        drawList: state.drawList.filter((v, i) => (!actions.randoms.includes(i))),
        winnerList: state.winnerList.concat({ type: actions.lotteryType, data: newExtracting})
      };
    case constants.IN_THE_LOTTERY:
      return {
        ...state,
        inTheLottery: true,
        extracting: actions.randoms.map((v) => (state.drawList[v]))
      }
    default: return state
  }
}

export default combineReducers({
  optionsReducers,
  lotteryReducers
});