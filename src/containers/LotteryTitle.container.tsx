import React, { Component } from 'react';
import { connect } from 'react-redux';

interface LotteryHeaderContainerInterface {
  currentPrize: currentPrizeInterface
}

class LotteryHeaderContainer extends Component<LotteryHeaderContainerInterface> {
  constructor(props: LotteryHeaderContainerInterface) {
    super(props)
  }
  render () {
    return (
      <div className="lotteryHeader">
        <div className="lotteryHeader-title_div">{this.props.currentPrize.type}{this.props.currentPrize.name}</div>
        <div className="lotteryHeader-prompt_div">
          每次抽取：{this.props.currentPrize.num}名&nbsp;&nbsp;&nbsp;&nbsp;
          数量：{this.props.currentPrize.quantity}&nbsp;&nbsp;&nbsp;&nbsp;
          剩余：{this.props.currentPrize.quantity - this.props.currentPrize.received}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: mitLotteryInterface) => ({
  currentPrize: state.lotteryReducers.currentPrize
});
export default connect(
  mapStateToProps,
  {}
)(LotteryHeaderContainer)