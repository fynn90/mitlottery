import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLottery, stopLottery } from '../actions'

interface LotteryBodyContainerPropsInterface {
  numberOfExtraction: number;
  currentPrize: prizeItemInterface;
  extracting: lotteryPeopleInterface[];
  drawListLength: number;
  inTheLottery: boolean;
  startLottery(max: number, randomQuantity: number): void;
  stopLottery(max: number, randomQuantity: number, lotteryType: string): void;
}

class LotteryBodyContainer extends Component<LotteryBodyContainerPropsInterface> {
  constructor(props: LotteryBodyContainerPropsInterface) {
    super(props)
  }
  startLottery (e) {
    if (this.props.numberOfExtraction > this.props.drawListLength) {
      alert("待抽人数必须大于抽奖人数");
      return;
    }
    this.props.startLottery(this.props.drawListLength - 1, this.props.numberOfExtraction)
  }
  stopLottery(e) {
    this.props.stopLottery(this.props.drawListLength - 1, this.props.numberOfExtraction, this.props.currentPrize.type)
  }
  render () {
    return (
      <div className="lotteryBody">
        <div className="displayPeople_div">
          {this.props.extracting.map((val, index) => (
            <div className="peopleItem" key={index}>{val.name}({val.department})</div>
          ))}
        </div>
        <div className="lotteryButton_div">
          {!this.props.inTheLottery?<button onClick={(e)=>this.startLottery(e)}>开始</button>:
          <button onClick={(e)=>this.stopLottery(e)}>停</button>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: mitLotteryInterface) => ({
  numberOfExtraction: state.optionsReducers.numberOfExtraction,
  currentPrize: state.optionsReducers.currentPrize,
  extracting: state.lotteryReducers.extracting,
  drawListLength: state.lotteryReducers.drawList.length,
  inTheLottery: state.lotteryReducers.inTheLottery
})

export default connect(
  mapStateToProps,
  { startLottery, stopLottery }
)(LotteryBodyContainer)
