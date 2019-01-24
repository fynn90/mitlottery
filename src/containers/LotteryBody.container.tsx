import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLottery, stopLottery, nextTime } from '../actions'
import { LotteryTitle } from '.'
import classnames from 'classnames';
interface LotteryBodyContainerPropsInterface {
  currentPrize: currentPrizeInterface;
  extracting: lotteryPeopleInterface[];
  drawListLength: number;
  inTheLottery: boolean;
  nextBtnStatus: boolean;
  lotteryBtnStatus: boolean;
  startLottery(max: number, randomQuantity: number): void;
  stopLottery(max: number, randomQuantity: number, lotteryType: string): void;
  nextTime(): void;
}

class LotteryBodyContainer extends Component<LotteryBodyContainerPropsInterface> {
  constructor(props: LotteryBodyContainerPropsInterface) {
    super(props)
  }
  startLottery = (e) => {
    if (this.props.currentPrize.num > this.props.drawListLength) {
      alert("待抽人数必须大于抽奖人数");
      return;
    }
    this.props.startLottery(this.props.drawListLength - 1, this.props.currentPrize.num)
  }
  stopLottery = (e) => {
    this.props.stopLottery(this.props.drawListLength - 1, this.props.currentPrize.num, this.props.currentPrize.type)
  }
  nextTime = (e) => {
    this.props.nextTime()
  }
  render() {
    var lotteryItem: any = [];
    var lotteryItemClass = classnames({
      item1: this.props.currentPrize.num === 1,
      item2: this.props.currentPrize.num === 2,
      item3: this.props.currentPrize.num === 3,
      item6: this.props.currentPrize.num === 6,
    })
    if (this.props.extracting.length) {
      let lotteryItemStyle = { backgroundColor: '#ffd1ad' }
      if (this.props.currentPrize.num !== 1) {
        lotteryItem = this.props.extracting.map((val, index) => (
          <div key={index} className={lotteryItemClass} style={lotteryItemStyle}>
            <div className="lotteryItem-department_div">{val.department}</div>
            <div className="lotteryItem-name">{val.name}</div>
          </div>
        ))
      } else {
        let nameArr = this.props.extracting[0].name.split('');
        lotteryItem = [
          <div key={0} className={lotteryItemClass} style={lotteryItemStyle}>
            <div className="lotteryItem-department_div">{this.props.extracting[0].department}</div>
          </div>,
          <div key={1}  className={lotteryItemClass} style={lotteryItemStyle}>
            <div className="lotteryItem-name">{nameArr[0]}</div>
          </div>,
          <div key={2}  className={lotteryItemClass} style={lotteryItemStyle}>
            <div className="lotteryItem-name">{nameArr[1]}</div>
          </div>,
          <div key={3}  className={lotteryItemClass} style={lotteryItemStyle}>
            <div className="lotteryItem-name">{nameArr[2]}</div>
          </div>
        ]
      }
    } else {
      let emptyItemStyle = { backgroundColor: '#6b0505' }
      if (this.props.currentPrize.num !== 1) {
        for (let i = 0; i < this.props.currentPrize.num; i++) {
          lotteryItem.push(<div key={i} className={lotteryItemClass} style={emptyItemStyle}></div>)
        }
      } else {
        for (let i = 0; i < 4; i++) {
          lotteryItem.push(<div key={i} className={lotteryItemClass} style={emptyItemStyle}></div>)
        }
      }
    }
    return (
      <div className="lotteryBody">
        <LotteryTitle />
        <div className="displayPeople_div">
          {this.props.lotteryBtnStatus ? <div className="lotteryButton_div">
            {!this.props.inTheLottery ? <div className="start_btn" onClick={this.startLottery}></div> :
              <div className="stop_btn" onClick={this.stopLottery}></div>}
          </div> : null}
          {this.props.nextBtnStatus ? <div className="nextButton_div" onClick={this.nextTime}></div> : null}
          {lotteryItem}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: mitLotteryInterface) => ({
  currentPrize: state.lotteryReducers.currentPrize, // 本轮抽奖的信息
  extracting: state.lotteryReducers.extracting, // 实时抽取的人数
  drawListLength: state.lotteryReducers.drawList.length, // 待抽名单
  inTheLottery: state.lotteryReducers.inTheLottery, // 抽奖中状态
  nextBtnStatus: !!state.lotteryReducers.lotteryOrder.length && !state.lotteryReducers.inTheLottery && !!state.lotteryReducers.extracting.length,
  lotteryBtnStatus: (!!state.lotteryReducers.extracting.length && state.lotteryReducers.inTheLottery) || (!state.lotteryReducers.inTheLottery && !state.lotteryReducers.extracting.length)
})

export default connect(
  mapStateToProps,
  { startLottery, stopLottery, nextTime }
)(LotteryBodyContainer)
