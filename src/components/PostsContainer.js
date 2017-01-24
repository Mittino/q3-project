'use strict';

import React from 'react';
import request from 'superagent';

const PostsContainer = React.createClass({

  getInitialState() {
    request
    .get('localhost:5000/api/posts')
    .then((data) => {
      console.log(data);
    })
    return null
  },

  render() {
    return(
      <div className="postsContainer">
        <p>Hello World I am in the post container</p>
      </div>
    );
  }
});

export default PostsContainer;
