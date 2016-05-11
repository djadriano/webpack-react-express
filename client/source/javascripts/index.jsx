import React from 'react';
import ReactDom from 'react-dom';

import HomeStyle from '../stylesheets/style.css';

import Hello from './hello';

ReactDom.render(<Hello />, document.getElementById('content'));