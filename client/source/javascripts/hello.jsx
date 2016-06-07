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
      posts: [],
      currentPage: 0
    });
  }

  componentDidMount() {
    this.getPostsByApi();
  }

  getPostsByApi() {
    let arrPosts = [];
    let currentArrPosts = [];
    let nextPage = this.state.currentPage;

    console.log(nextPage);

    request
     .get(`/posts/`)
     .end((err, res) => {

        if(nextPage === '') {
          arrPosts = res.body.posts;
        } else {
          currentArrPosts = this.state.posts;
          arrPosts = currentArrPosts.push(res.body.posts);
        }

        this.setState({
          posts: arrPosts
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
        <button onClick={this.nextPage}>Next Page</button>
      </div>
    );
  }

  nextPage() {
    this.setState({
      currentPage: this.state.currentPage++
    });

    this.getPostsByApi();
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
