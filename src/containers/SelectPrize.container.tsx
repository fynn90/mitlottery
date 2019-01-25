import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchPrize, otherPrize } from '../actions'
import { PRIZE_OTHER } from '../constants';
interface SelectPrizeContainerPropsInterface {
  prizeList: prizeItemInterface[];
  numberOfExtraction: number;
  prizeType: string;
  inTheLottery: boolean;
  switchPrize(prizeType: string, number: number, prizeList: prizeItemInterface[]): void;
  otherPrize(prizeType: string, number: number, ): void;
}

class SelectPrizeContainer extends Component<SelectPrizeContainerPropsInterface> {
  constructor(props: SelectPrizeContainerPropsInterface) {
    super(props)
  }
  dropdownChanged(e) {
    if (e.target.value !== PRIZE_OTHER) {
      this.props.switchPrize(e.target.value, this.props.numberOfExtraction, this.props.prizeList);
    } else {
      let name = prompt(`请输入${PRIZE_OTHER}奖品名：`);
      if (name) {
        this.props.otherPrize(name, this.props.numberOfExtraction,)
      }
    }
  }
  render() {
    return (
      <div className="selectPrize">
        <div>本轮奖项：</div>
        <select className="selectClass" value={this.props.prizeType} onChange={this.dropdownChanged.bind(this)} disabled={this.props.inTheLottery}>
          {this.props.prizeList.map((val, index) => (
            < option value={val.type} key={index}>{val.type}</option >
          ))}
        </select>
      </div>
    )
  }
}

const mapStateToProps = (state: mitLotteryInterface) => ({
  prizeList: state.optionsReducers.prizeList,
  numberOfExtraction: state.lotteryReducers.currentPrize.num,
  prizeType: state.lotteryReducers.currentPrize.type,
  inTheLottery: state.lotteryReducers.inTheLottery
});

export default connect(
  mapStateToProps,
  { switchPrize, otherPrize }
)(SelectPrizeContainer)