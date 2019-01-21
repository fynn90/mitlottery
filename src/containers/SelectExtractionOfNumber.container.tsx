import React, {Component} from 'react';
import {connect} from 'react-redux';
import { switchExtractionOfNumber } from '../actions'

interface SelectExtractionNumberInterface {
  extractionsList: number[];
  numberOfExtraction: number;
  switchExtractionOfNumber(number: number): void;
}

class SelectExtractionOfNumberContainer extends Component<SelectExtractionNumberInterface> {
  constructor(props: SelectExtractionNumberInterface) {
    super(props)
  }
  dropdownChanged(e) {
    this.props.switchExtractionOfNumber(e.target.value);
  }
  render () {
    return(
      <div className="selectPrize">
        <div>单次抽取</div>
        <select className="selectClass" value={this.props.numberOfExtraction} onChange={this.dropdownChanged.bind(this)}>
          {this.props.extractionsList.map((val, index) => (
            < option value={val} key={index}> {val}</option >
          ))}
        </select>
      </div>
    )
  }
}

const mapStateToProps = (state: mitLotteryInterface) => ({
  extractionsList: state.optionsReducers.extractionsList,
  numberOfExtraction: state.optionsReducers.numberOfExtraction
})

export default connect(
  mapStateToProps,
  { switchExtractionOfNumber }
)(SelectExtractionOfNumberContainer)