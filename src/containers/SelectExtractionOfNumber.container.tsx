import React, {Component} from 'react';
import {connect} from 'react-redux';
import { switchExtractionOfNumber, otherPrize } from '../actions'
import { PRIZE_OTHER } from '../constants';
interface SelectExtractionNumberInterface {
  extractionsList: number[];
  numberOfExtraction: number;
  prizeType: string;
  prizeList: prizeItemInterface[];
  inTheLottery: boolean;
  switchExtractionOfNumber(prizeType: string, number: number, prizeList: prizeItemInterface[]): void;
  otherPrize(prizeType: string, number: number, ): void;
}

class SelectExtractionOfNumberContainer extends Component<SelectExtractionNumberInterface> {
  constructor(props: SelectExtractionNumberInterface) {
    super(props)
  }
  dropdownChanged(e) {
    if (this.props.prizeType !== PRIZE_OTHER) {
      this.props.switchExtractionOfNumber(this.props.prizeType, +e.target.value, this.props.prizeList);
    } else {
      let name = prompt(`请输入${PRIZE_OTHER}奖品名：`);
      if (name) {
        this.props.otherPrize(name, this.props.numberOfExtraction)
      }
    }
  }
  render () {
    return(
      <div className="selectPrize">
        <div>单次抽取：</div>
        <select className="selectClass" value={this.props.numberOfExtraction} onChange={this.dropdownChanged.bind(this)} disabled={this.props.inTheLottery}>
          {this.props.extractionsList.map((val, index) => (
            < option value={val} key={index}> {val}</option >
          ))}
        </select>
      </div>
    )
  }
}

const mapStateToProps = (state: mitLotteryInterface) => ({
  prizeList: state.optionsReducers.prizeList,
  extractionsList: state.optionsReducers.extractionsList,
  numberOfExtraction: state.lotteryReducers.currentPrize.num,
  prizeType: state.lotteryReducers.currentPrize.type,
  inTheLottery: state.lotteryReducers.inTheLottery
})

export default connect(
  mapStateToProps,
  { switchExtractionOfNumber, otherPrize }
)(SelectExtractionOfNumberContainer)