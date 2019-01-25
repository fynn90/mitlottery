import { Dispatch } from 'redux';
import { SWITCH_PRIZE, SWITCH_EXTRACTION_OF_NUMBER, PRIZE_OTHER } from '../constants'

// 切换抽奖类型
export const switchPrize = (prizeType: string, number: number, prizeList: prizeItemInterface[]) => (dispatch: Dispatch) => {
  dispatch({
    type: SWITCH_PRIZE,
    prizeType,
    number,
    prizeList
  })
};

// 切换单次抽取人数数量
export const switchExtractionOfNumber = (prizeType: string, number: number, prizeList: prizeItemInterface[]) => (dispatch: Dispatch) => {
  dispatch({
    type: SWITCH_EXTRACTION_OF_NUMBER,
    number,
    prizeType,
    prizeList
  })
}

export const otherPrize = (prizeType: string, number: number) => (dispatch: Dispatch) => {
  dispatch({
    type: PRIZE_OTHER,
    prizeType,
    number
  })
}