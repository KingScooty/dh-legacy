var chai = require('chai');
var expect = chai.expect;

import React from 'react';
import { shallow } from 'enzyme';

import Stream from '../';
import Post from '../../Post';

describe('<Stream />', function() {

  function mockPost(overrides) {
    var mock = {
      title: "This is a dummy tweet",
      date: "5 months ago",
      text: 'This is some text'
    }

    return overrides || mock;
  }

  it('renders the correct number of posts based on data', function() {
    const posts = [mockPost(), mockPost(), mockPost(), mockPost()];
    const wrapper = shallow(<Stream posts={posts} />);
    expect(wrapper.find(Post)).to.have.length(posts.length);
  });

});
