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
        this.setState({
          posts: res.body.posts
        });
     });
  }

  renderPosts(){
    if(!this.state.posts.length) {
      return (<span>Carregando...</span>);
    }

    let foo = this.state.posts
      .filter((item) => {
        if(item.items.length) return item;
      })
      .map((item, index) => {
        return this.renderItems(item);
      })

    return (
      <div className="columns is-desktop">
        {foo}
      </div>
    );
  }

  renderItems( item ) {
    return (
      <div className="column is2">
        {
          item.items.map((_item) => {
            var yt_url = `http://www.youtube.com/embed/${_item.id.videoId}`;
            return(
              <div className="card">
                <div className="content">
                  <span>{_item.snippet.title}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    return(
      this.renderPosts()
    );
  }
}
