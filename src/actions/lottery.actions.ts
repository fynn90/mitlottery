import { Dispatch } from 'redux';
import { STOP_LOTTERY, START_LOTTERY, IN_THE_LOTTERY } from '../constants';
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
  }, 100)
};

export const stopLottery = (max: number, randomQuantity: number, lotteryType: string) => (dispatch, Dispatch) => {
  clearInterval(setTimeOutHandle);
  let randomNumbers = generate(max, randomQuantity);
  dispatch({
    type: STOP_LOTTERY,
    randoms: randomNumbers,
    lotteryType
  })
}

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