import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PRIZE_IMG_TO_CLASS_NAME} from '../constants'
import { CSSTransition } from 'react-transition-group';
interface FooterPropsInterface {
  currentPrize: currentPrizeInterface
}
interface FooterContainerStateInterface {
  catchType: string;
  changeStatus: boolean;
}
class Footer extends Component<FooterPropsInterface, FooterContainerStateInterface> {
  constructor(props: FooterPropsInterface) {
    super(props)
    console.log(this.props.currentPrize.type)
    this.state = {
      catchType: this.props.currentPrize.type,
      changeStatus: false,
    }
  }
  render() {
    if (this.state.catchType !== this.props.currentPrize.type) {
      this.setState({
        catchType: this.props.currentPrize.type,
        changeStatus: true
      })
    }
    const {
      changeStatus
    } = this.state;
    let imgName = PRIZE_IMG_TO_CLASS_NAME[this.props.currentPrize.type]
    return (
      <div id="footer">
        <CSSTransition
          in={changeStatus}
          timeout={300}
          classNames="lamplight-transition"
          onEntered={() => {
            this.setState({ changeStatus: false })
          }}
        >
          <div className="lamplight"></div>
        </CSSTransition>
        <CSSTransition
          in={changeStatus}
          timeout={300}
          classNames="prize-transition"
          onEntered={() => {
            this.setState({ changeStatus: false })
          }}
        >
          <div className={imgName}></div>
        </CSSTransition>
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