import React from 'react';
import ReactDom from 'react-dom';

import HomeStyle from '../stylesheets/style';

import PostsComponent from './posts';

ReactDom.render(<PostsComponent />, document.getElementById('gabba-posts-container'));
