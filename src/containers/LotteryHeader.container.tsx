import React, { Component } from 'react';
import { connect } from 'react-redux';

interface LotteryHeaderContainerInterface {
  currentPrize: prizeItemInterface
}

class LotteryHeaderContainer extends Component<LotteryHeaderContainerInterface> {
  constructor(props: LotteryHeaderContainerInterface) {
    super(props)
  }
  render () {
    return (
      <div className="lotteryHeader">{this.props.currentPrize.type}</div>
    )
  }
}

const mapStateToProps = (state: mitLotteryInterface) => ({
  currentPrize: state.optionsReducers.currentPrize
});
export default connect(
  mapStateToProps,
  {}
)(LotteryHeaderContainer)