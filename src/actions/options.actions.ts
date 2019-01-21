import { Dispatch } from 'redux';
import { SWITCH_PRIZE, SWITCH_EXTRACTION_OF_NUMBER } from '../constants'

// 切换抽奖类型
export const switchPrize = (prizeType: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SWITCH_PRIZE,
    prizeType,
    number: 0
  })
};

// 切换单次抽取人数数量
export const switchExtractionOfNumber = (number: number) => (dispatch: Dispatch) => {
  dispatch({
    type: SWITCH_EXTRACTION_OF_NUMBER,
    number
  })
}