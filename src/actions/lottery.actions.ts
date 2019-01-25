import { Dispatch } from 'redux';
import { STOP_LOTTERY, START_LOTTERY, IN_THE_LOTTERY, NEXT_TIME, UPDATE_PRIZE_RECEIVED_NUMBER } from '../constants';
import { getRandomInt } from '../utils';
var setTimeOutHandle;

export const startLottery = (max: number, randomQuantity: number) => (dispatch: Dispatch) => {
  dispatch({
    type: START_LOTTERY
  });
  inTheLottery(dispatch, max, randomQuantity)
};

const inTheLottery = (dispatch: Dispatch, max: number, randomQuantity: number) => {
  setTimeOutHandle = setInterval(() => {
    let randomNumbers = generate(max, randomQuantity);
    dispatch({
      type: IN_THE_LOTTERY,
      randoms: randomNumbers
    })
  }, 50)
};

export const stopLottery = (max: number, randomQuantity: number, prizeType: string) => (dispatch, Dispatch) => {
  clearInterval(setTimeOutHandle);
  let randomNumbers = generate(max, randomQuantity);
  dispatch({
    type: STOP_LOTTERY,
    randoms: randomNumbers,
    prizeType
  });
  dispatch({
    type: UPDATE_PRIZE_RECEIVED_NUMBER,
    number: randomQuantity,
    prizeType
  });
}

export const nextTime = (prizeList: prizeItemInterface[]) => (dispatch: Dispatch) => {
  dispatch({
    type: NEXT_TIME,
    prizeList
  })
}

/**
 * 生成获奖的随机数
 *
 * @author Fan
 * @date 2019-01-24
 * @param {number} max
 * @param {number} randomQuantity
 * @returns {number[]}
 */
function generate(max: number, randomQuantity: number):number[] {
  let randomArr:number[] = [];
  for (let i = 0; i < randomQuantity; i++) {
    let s = false;
    while (!s) {
      let random = getRandomInt(0, max);
      if (!randomArr.includes(random)) {
        randomArr.push(random);
        s = true;
      };
    };
  };
  return randomArr;
}