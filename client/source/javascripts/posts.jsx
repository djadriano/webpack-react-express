import React from 'react';
import request from 'superagent';
import moment from 'moment';

export default class PostsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      posts: [],
      currentPage: 0,
      loading: false
    });
  }

  componentDidMount() {
    this.getPostsByApi();
  }

  getPostsByApi() {
    let apiUrl = (this.state.currentPage === 0 ? `/posts` : `/posts/page/${this.state.currentPage}`);

    request
     .get(apiUrl)
     .end((err, res) => {
        let currentPosts = this.state.posts;
        let currentPostsUpdated = currentPosts.concat(res.body.posts);

        this.setState({
          posts: currentPostsUpdated,
          loading: false
        });
     });
  }

  nextPage() {
    let currentPage = this.state.currentPage;

    this.setState({
      currentPage: (currentPage + 1),
      loading: true
    }, () => {
      this.getPostsByApi();
    });

  }

  selectPostItem(evt) {
    this.props.setPlayerSelected(evt.currentTarget.getAttribute('data-video-id'));
  }

  render() {
    let buttonText = (this.state.loading ? 'Loading...' : 'Load more');

    if(!this.state.posts.length) {
      return (<span>Carregando...</span>);
    }

    return(
      <div>
        <ul className="gabba-posts">
        {
          this.state.posts.map((item, index) => {
            let itemMap = item.data.items[ 0 ];
            let postTime = moment(itemMap.snippet.publishedAt).format('DD/M/Y h:mm:ss a');
            let downloadUrl = `http://1gabba.net${item.download}`;

            return (
              <li className="gabba-posts-item" key={index}>
                <figure>
                  <img src={itemMap.snippet.thumbnails.medium.url} data-video-id={itemMap.id.videoId} onClick={this.selectPostItem.bind(this)} />
                  <h2>{itemMap.snippet.title}</h2>
                  <h3>{postTime}</h3>
                  <a href={downloadUrl} target="_blank">Download</a>
                </figure>
              </li>
            )
          })
        }
        </ul>
        <nav className="gabba-posts-nav">
          <button onClick={this.nextPage.bind(this)}>{buttonText}</button>
        </nav>
      </div>
    );
  }
}
