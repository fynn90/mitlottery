import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

interface LotteryHeaderContainerPropsInterface {
  currentPrize: currentPrizeInterface
}
interface LotteryHeaderContainerStateInterface {
  catchType: string;
  changeStatus: boolean;
}

class LotteryHeaderContainer extends Component<LotteryHeaderContainerPropsInterface, LotteryHeaderContainerStateInterface> {
  constructor(props: LotteryHeaderContainerPropsInterface) {
    super(props)
    console.log(this.props.currentPrize.type)
    this.state = {
      catchType: this.props.currentPrize.type,
      changeStatus: false,
    }
  }
  render () {
    if (this.state.catchType !== this.props.currentPrize.type) {
      this.setState({
        catchType: this.props.currentPrize.type,
        changeStatus: true
      })
    }
    const {
      changeStatus
    } = this.state;
    return (
      <div className="lotteryHeader">
        <CSSTransition
          in={changeStatus}
          timeout={300}
          classNames="lotteryHeader-transition"
          onEntered={() => {
            this.setState({ changeStatus: false})
          }}
        >
          <div className="lotteryHeader-title_div">
          {this.props.currentPrize.type}
          {this.props.currentPrize.name}
          ({this.props.currentPrize.num}名)
          </div>
        </CSSTransition>
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