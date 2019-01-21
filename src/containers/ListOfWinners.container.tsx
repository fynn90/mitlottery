import React, { Component } from 'react';
import { connect } from 'react-redux';

interface ListOfWinnersContainerPropsInterface {
  winnerList: winnerListInterface[];
}

class ListOfWinnersContainer extends Component<ListOfWinnersContainerPropsInterface> {
  constructor(props: ListOfWinnersContainerPropsInterface) {
    super(props)
  }
  render () {
    return(
      <div>
        {this.props.winnerList.map((val) => (
          <div>
            <h3>{val.type}</h3>
            {val.data.map((item) => (
              <div>{item.name}({item.department})</div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: mitLotteryInterface) => ({
  winnerList: state.lotteryReducers.winnerList
})
export default connect(
  mapStateToProps,
  {}
)(ListOfWinnersContainer)