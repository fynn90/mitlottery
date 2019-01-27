import React, { Component } from 'react';
import { findDOMNode} from 'react-dom';
import { connect } from 'react-redux';
import { startLottery, stopLottery, nextTime } from '../actions'
import { LotteryTitle } from '.'
const music = require('../assets/shiji.mp3')
import classnames from 'classnames';
interface LotteryBodyContainerPropsInterface {
  currentPrize: currentPrizeInterface;
  extracting: lotteryPeopleInterface[];
  drawListLength: number;
  inTheLottery: boolean;
  nextBtnStatus: boolean;
  lotteryBtnStatus: boolean;
  prizeList: prizeItemInterface[];
  startLottery(max: number, randomQuantity: number): void;
  stopLottery(max: number, randomQuantity: number, lotteryType: string): void;
  nextTime(prizeList: prizeItemInterface[]): void;
}

interface LotteryBodyContainerStateInterface {
  playMusic: boolean;
  playMusicNow: boolean;
}

class LotteryBodyContainer extends Component<LotteryBodyContainerPropsInterface, LotteryBodyContainerStateInterface> {
  constructor(props: LotteryBodyContainerPropsInterface) {
    super(props)
    this.state = {
      playMusic: true,
      playMusicNow: false
    }
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
    this.props.nextTime(this.props.prizeList)
  }
  toggleMusic = (e)=> {
    let audio = findDOMNode(this.refs.music) as HTMLAudioElement;
    if (this.state.playMusic) {
      this.setState({
        playMusic: false,
        playMusicNow: false
      })
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.currentTime = 0;
      audio.play();
      this.setState({
        playMusic: true,
        playMusicNow: true
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.inTheLottery !== prevProps.inTheLottery) {
      let audio = findDOMNode(this.refs.music) as HTMLAudioElement;
      if (this.props.inTheLottery && this.state.playMusic) {
        this.setState({
          playMusicNow: true
        });
        audio.currentTime = 0;
        audio.play();
      } else {
        this.setState({
          playMusicNow: false
        });
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }
  render() {
    var lotteryItem: any = [];
    var lotteryItemClass = classnames({
      item1: this.props.currentPrize.num === 1,
      item2: this.props.currentPrize.num === 2,
      item3: this.props.currentPrize.num === 3,
      item6: this.props.currentPrize.num === 6,
    });
    let musicStop = classnames({
      "music-stop": !this.state.playMusicNow
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
      let emptyItemStyle = { backgroundColor: '#6b0505' };
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
        <div onClick={this.toggleMusic} className={musicStop}>
          <div className="music-btn"></div>
          <audio ref='music' preload="auto">
            <source src={music} type="audio/mpeg" />
            您的浏览器不支持 audio 标签。
          </audio>
        </div>
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
  prizeList: state.optionsReducers.prizeList,
  nextBtnStatus: !!state.lotteryReducers.lotteryOrder.length && !state.lotteryReducers.inTheLottery && !!state.lotteryReducers.extracting.length,
  lotteryBtnStatus: (!!state.lotteryReducers.extracting.length && state.lotteryReducers.inTheLottery) || (!state.lotteryReducers.inTheLottery && !state.lotteryReducers.extracting.length)
})

export default connect(
  mapStateToProps,
  { startLottery, stopLottery, nextTime }
)(LotteryBodyContainer)
