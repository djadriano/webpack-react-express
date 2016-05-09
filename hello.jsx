import React from 'react';
import request from 'superagent';

class PostComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <p>Post Component</p>
    )
  }
}

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      posts: []
    });
  }

  componentDidMount() {
    this.getPostsByApi();
  }

  getPostsByApi() {
    request
     .get('/posts')
     .end((err, res) => {
        console.log(res);
        this.setState({
          posts: res.body.posts
        });
     });
  }

  renderPosts(){
    if(!this.state.posts.length) {
      return (<span>Carregando...</span>);
    }

    return (
      <ul>
      {
        this.state.posts
          .filter( (item) => {
            if(item.items.length) return item;
          } )
          .map( (item, index) => {
            return ( <li key={index}>
              {this.renderItems(item)}
            </li> )
          } )
      }
      </ul>
    );
  }

  renderItems( item ){
    return (
      <ul>
        {item.items.map( (_item) => {
          var yt_url = `https://www.youtube.com/embed/${_item.id.videoId}`;
          return (
            <li>
              {_item.snippet.title}
              <p><iframe width="560" height="315" src={yt_url} frameborder="0" allowfullscreen></iframe></p>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return(
      this.renderPosts()
    );
  }
}