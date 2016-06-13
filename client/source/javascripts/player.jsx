import React from 'react';
import classNames from 'classnames';

export default class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      visible: false
    });
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {
    this.setState({
      visible: props.playerData.url ? true : false
    });
  }

  closePlayer() {
    this.setState({
      visible: false
    });
  }

  render() {
    let gabbaPlayerContentClass = classNames('gabba-player-content', {
      'is-opened': this.state.visible
    });

    return(
      <div className={gabbaPlayerContentClass} onClick={this.closePlayer.bind(this)}>
        <iframe src={this.props.playerData.url} frameborder="0" allowfullscreen></iframe>
      </div>
    );
  }
}
