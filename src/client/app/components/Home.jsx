/* eslint linebreak-style: ["error", "windows"] */

import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';
import Script from 'react-load-script';

import GroupIcon from 'react-icons/lib/fa/group';
import UserIcon from 'react-icons/lib/fa/user';
import EyeIcon from 'react-icons/lib/fa/eye';
import GameIcon from 'react-icons/lib/fa/puzzle-piece';

// import Twitch from 'http://player.twitch.tv/js/embed/v1.js';
import Player from './Player.jsx';

const propTypes = {};

const defaultProps = {};

const API = 'https://api.twitch.tv/kraken/';
const USER = 'imsoff';
const CLIENT_ID = 'client_id=7qwohzwpz52fs8wcu6tqxsmvr96n70';
const API_VERSION = 'api_version=5';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      channel: {},
      stream: {},
    };

    // this.getUser = debounce(this.getUser, 750, { leading: true }).bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getChannelInfo = debounce(this.getChannelInfo, 750, { trailing: true }).bind(this);
    this.getStreamInfo = debounce(this.getStreamInfo, 750, { trailing: true }).bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
    this.getChannelInfo();
    this.getStreamInfo();
  }

  getUserInfo() {
    fetch(`${API}users?login=${USER}&${API_VERSION}&${CLIENT_ID}`)
    .then(res => res.json())
    .then(({ users }) => {
      this.setState({
        user: users[0],
      });
    });
  }

  getChannelInfo() {
    fetch(`${API}channels/${this.state.user._id}?${API_VERSION}&${CLIENT_ID}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({
        channel: data,
      });
    });
  }

  getStreamInfo() {
    fetch(`${API}streams/${this.state.user._id}?${API_VERSION}&${CLIENT_ID}`)
    .then(res => res.json())
    .then(({ stream }) => {
      this.setState({
        stream: stream,
      });
    });
  }

  calculateShortNumberString(number) {
    if (number < 1000) {
      return number;
    } else if (number > 1000 && number < 10000) {
      return `${number.toString()[0]}.${number.toString()[1]}K`;
    } else if (number > 10000 && number < 100000) {
      return `${number.toString()[0]}${number.toString()[1]}.${number.toString()[2]}K`;
    } else if (number > 100000 && number < 1000000) {
      return `${number.toString()[0]}${number.toString()[1]}${number.toString()[2]}.${number.toString()[3]}K`;
    } else if (number > 1000000 && number < 10000000) {
      return `${number.toString()[0]}.${number.toString()[1]}M`;
    } else if (number > 10000000 && number < 100000000) {
      return `${number.toString()[0]}${number.toString()[1]}.${number.toString()[2]}M`;
    } else if (number > 100000000) {
      return `${number.toString()[0]}${number.toString()[1]}${number.toString()[2]}.${number.toString()[3]}M`;
    }
    return null;
  }

  render() {
    // console.log(this.state.user);
    if (this.state.user.length === 0) {
      return null;
    }
    console.log('stream ->', this.state.stream);
    console.log('channel ->', this.state.channel);

    return (
      <div className="container">

        <div className="content-left">
          <div className="chat-container">
            <iframe frameBorder="5" height="650" width="300" scrolling="yes" id={this.state.user.display_name} src={`http://www.twitch.tv/${this.state.user.display_name}/chat`} />
          </div>
        </div>
        <div className="content-center">
          <div className="stream-title-container">
            <img src="../../icons/twitch-icon.svg" width="50" height="50" />
            <a href={`https://www.twitch.tv/${this.state.user.display_name}`}><h1 className="viewer-count" style={{ fontSize: '24px', paddingRight: '15%' }}>{this.state.user.display_name}</h1></a>
            <h1 className="stream-title-text">{this.state.channel.status}</h1>
          </div>
          <div className="player-container">
            <Player channel={USER} />
          </div>
          <div className="channel-info-container">
            <div className="game-info-container">
              <GameIcon style={{ height: '30', width: '30', marginRight: '5px', verticalAlign: 'baseline' }} />
              <a href={`https://www.twitch.tv/directory/game/${this.state.channel.game}`}><h4 className="viewer-count" style={{ fontSize: '24px' }}>{this.state.channel.game}</h4></a>
            </div>
            <div className="viewer-info-container">
              <div className="live-viewers">
                <UserIcon style={{ height: '30', width: '30', marginRight: '5px', verticalAlign: 'baseline' }} />
                <h1 className="viewer-count">{this.state.stream === null ? '0' : this.state.stream.viewers}</h1>
              </div>
              <div className="total-views">
                <EyeIcon style={{ height: '30', width: '30', marginRight: '5px', verticalAlign: 'baseline' }} />
                <h1 className="viewer-count">{this.calculateShortNumberString(this.state.channel.views)}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="content-right">
          <div className="bio-container">
            <h1 className="bio-text">{`User registered at: ${this.state.channel.created_at.substr(0, 10)}`}</h1>
            <h1 className="bio-text">{`Mature content: ${this.state.channel.mature === true ? 'Yes' : 'No'}`}</h1>
            <h1 className="bio-text">{`Followers: ${this.calculateShortNumberString(this.state.channel.followers)}`}</h1>
            <h1 className="bio-text">{`Partnered: ${this.state.channel.partner === true ? 'Yes' : 'No'}`}</h1>
          </div>
        </div>

        <style jsx>{`
          .container {
            width: 85%;
            display: flex;
            flex-direction: row;
          }

          .stream-title-container {
            border-left: 2px solid #2c2c2c;
            border-right: 2px solid #2c2c2c;
            border-top: 2px solid #2c2c2c;
            width: 800px;
            margin: auto;
            text-align: left;
          }

          .stream-title-text {
            margin-top: 0px;
            padding-top: 5px;
            display: inline-block;
          }

          .chat-container {
            padding-top: 69px;
          }

          .bio-container {
            margin-top: 69px;
            border: 2px solid #2c2c2c;
            padding: 5px 5px 5px 5px;
            text-align: left;
          }

          .bio-text {
            font-size: 24px;
          }

          .content-left {
            display: flex;
            flex-direction: column;
            text-align: left;

          }

          .content-center {
            text-align: center;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }

          .content-right {
            text-align: right;
            display: flex;
            flex-direction: column;

          }

          .channel-info-container {
            display: inline;
            text-align: left;
            width: 800px;
            margin: auto;
            border-left: 2px solid #2c2c2c;
            border-right: 2px solid #2c2c2c;
            border-bottom: 2px solid #2c2c2c;
          }

          .viewer-info-container {
            display: inline-block;
            text-align: right;
            padding-left: 5px;
            padding-right: 5px;
            padding-bottom: 5px;
            width: 30%;
          }

          .game-info-container {
            display: inline-block;
            text-align: left;
            padding-left: 5px;
            padding-right: 5px;
            padding-bottom: 5px;
            width: 70%;
          }

          .viewer-count {
            display: inline;
          }

          .live-viewers {
            display: inline;
            padding-right: 5%;
          }

          .total-views {
            display: inline;
          }

          game-info-content {
            text-align: left;
          }

          game-info {

          }


        `}</style>
      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
