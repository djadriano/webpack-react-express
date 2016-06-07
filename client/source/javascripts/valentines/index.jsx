import React from 'react';
import request from 'superagent';

class PostComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <p>Post Components</p>
    )
  }
}

export default class ValentinesComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      fbLogin: {
        logged: false,
        userId: null
      }
    });
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId      : '968089863312103',
        xfbml      : true,
        version    : 'v2.6'
      });

      FB.getLoginStatus((response) => {
        if( response.status === 'connected' ) {
          console.log('eu');
        }
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  handleLogin() {
    FB.getLoginStatus((response) => {
      console.log(response);
      if(response.status === 'unknown') {
        FB.login((response) => {
          if (response.status === 'connected') {
            console.log('connected');
          }
        },{
          scope: 'public_profile,email,user_friends,user_posts'
        });
      } else {
        FB.api(
          '/me/friends',
          { fields: 'name,id,location,birthday' },
          (response) => {
            if (response && !response.error) {
              console.log(response);
            }
          }
        );
      }
    });
  }

  render() {
    return(
      <button onClick={this.handleLogin}>Facebook Login</button>
    );
  }
}