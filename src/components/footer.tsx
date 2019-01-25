import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PRIZE_IMG_TO_CLASS_NAME} from '../constants'

interface FooterInterface {
  currentPrize: currentPrizeInterface
}
class Footer extends Component<FooterInterface> {
  render() {
    console.log(this.props.currentPrize.type)
    let imgName = PRIZE_IMG_TO_CLASS_NAME[this.props.currentPrize.type]
    return (
      <div id="footer">
        <div className="lamplight"></div>
        <div className={imgName}></div>
      </div>
    )
  }
}
const mapStateToProps = (state: mitLotteryInterface) => ({
  currentPrize: state.lotteryReducers.currentPrize,
})
export default connect(
  mapStateToProps,
  {}
)(Footer)