import React from 'react';
import request from 'superagent';

export default class PostsComponent extends React.Component {
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
    request
     .get(`/posts/`)
     .end((err, res) => {
        this.setState({
          posts: res.body.posts
        });
     });
  }

  nextPage() {
    this.setState({
      currentPage: this.state.currentPage++
    });

    this.getPostsByApi();
  }

  render() {
    if(!this.state.posts.length) {
      return (<span>Carregando...</span>);
    }

    return(
      <ul className="gabba-posts">
      {
        this.state.posts.map((item, index) => {
          let itemMap = item.items[ 0 ];
          return (
            <li className="gabba-posts-item">
              <figure>
                <img src={itemMap.snippet.thumbnails.medium.url} />
                <h2>{itemMap.snippet.title}</h2>
                <h3>{itemMap.snippet.publishedAt}</h3>
                <a href="#">download</a>
              </figure>
            </li>
          )
        })
      }
      </ul>
    );
  }
}
