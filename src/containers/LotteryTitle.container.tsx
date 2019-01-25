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
        <div className="lotteryHeader-title_div">{this.props.currentPrize.type}{this.props.currentPrize.name}({this.props.currentPrize.num}名)</div>
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