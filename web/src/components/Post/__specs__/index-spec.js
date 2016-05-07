var chai = require('chai');
var expect = chai.expect;

import React from 'react';
import { shallow } from 'enzyme';

import Post from '../';

describe('<Post />', function() {

  function mockPost(overrides) {
    var mock = {
      title: "This is a dummy tweet",
      date: "5 months ago"
    }

    return overrides || mock;
  }

  it('renders a timestamp', function() {
    const post = mockPost();
    const wrapper = shallow(<Post {...post} />);
    expect(wrapper.text()).to.contain(post.date);
  });

  it('renders a title', function() {
    const post = mockPost();
    const wrapper = shallow(<Post {...post} />);
    expect(wrapper.text()).to.contain(post.title);
  });

  // it('renders a title', function() {
  //
  // });

});
