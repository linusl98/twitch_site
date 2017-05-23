import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';
import Script from 'react-load-script';
import FaGroup from 'react-icons/lib/fa/group';
// import Twitch from 'http://player.twitch.tv/js/embed/v1.js';
import Player from './Player.jsx';
const propTypes = {};

const defaultProps = {};

const API = 'https://api.twitch.tv/kraken/';
const USER = 'dakotaz';
const CLIENT_ID = 'client_id=7qwohzwpz52fs8wcu6tqxsmvr96n70';
const API_VERSION = 'api_version=5';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      channel: {},
    };

    // this.getUser = debounce(this.getUser, 750, { leading: true }).bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
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
    fetch(`${API}channels/${this.state.user._id}&${API_VERSION}&${CLIENT_ID}`)
    .then(res => res.json())
    .then(({ users }) => {
      this.setState({
        user: users,
      });
    });
  }

  render() {
    console.log(this.state.user);
    return (
      <div className="container">

        <div className="content-left">
          <div className="chat-container">
            <iframe frameBorder="5" height="768" width="450" scrolling="yes" id="dakotaz" src="http://www.twitch.tv/dakotaz/chat" />
          </div>
        </div>
        <div className="content-center">
          <div>
            <h1 className="header-text">{`Welcome to ${this.state.user.display_name} streaming site!`}</h1>
          </div>
          <div className="player-container">
            <Player channel="dakotaz" />
          </div>
          <div className="follower-info">
            <FaGroup style={{ height: '50', width: '50' }} />
            <h1 className="follower-count">{'Followers: '}</h1>
          </div>
        </div>
        <div className="content-right">
          <div className="bio-container" />
        </div>

        <style jsx>{`
          .container {
            width: 85%;
            display: flex;
            flex-direction: row;
          }

          .header-text {

          }

          .chat-container {
            padding-top: 69px;
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

          .follower-info {
            display: inline;
            text-align: left;
            width: 100%;
          }

          .follower-count {
          
          }



        `}</style>
      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
