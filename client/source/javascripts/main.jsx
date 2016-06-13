import React from 'react';

import PostsComponent from './posts';
import PlayerComponent from './player';

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      player: {
        url: null
      }
    });
  }

  setPlayerSelected( id ) {
    this.setState({
      player: {
        url: `https://www.youtube.com/embed/${id}`
      }
    })
  }

  componentDidMount() {}

  render() {
    return(
      <div className="gabba-main-content">
        <h1>1Gabba.net Crawler</h1>
        <PostsComponent setPlayerSelected={this.setPlayerSelected.bind(this)} />
        <PlayerComponent playerData={this.state.player} />
      </div>
    );
  }
}
