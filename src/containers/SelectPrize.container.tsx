import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchPrize } from '../actions'

interface SelectPrizeContainerPropsInterface {
  prizeList: prizeItemInterface[];
  currentPrize: prizeItemInterface;
  switchPrize(prizeType: string): void;
}

class SelectPrizeContainer extends Component<SelectPrizeContainerPropsInterface> {
  constructor(props: SelectPrizeContainerPropsInterface) {
    super(props)
  }
  dropdownChanged (e) {
    this.props.switchPrize(e.target.value);
  }
  render() {
    return (
      <div className="selectPrize">
        <div>本轮奖项：</div>
        <select className="selectClass" value={this.props.currentPrize.type} onChange={this.dropdownChanged.bind(this)}>
          {this.props.prizeList.map((val, index) => (
            < option value={val.type} key={index}> {val.type}({val.quantity})</option >
          ))}
        </select>
      </div>
    )
  }
}

const mapStateToProps = (state: mitLotteryInterface) => ({
  prizeList: state.optionsReducers.prizeList,
  currentPrize: state.lotteryReducers.currentPrize
});

export default connect(
  mapStateToProps,
  { switchPrize }
)(SelectPrizeContainer)