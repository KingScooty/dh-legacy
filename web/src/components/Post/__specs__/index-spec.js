var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

import React from 'react';
import { shallow } from 'enzyme';

import Post from '../';

var tweetSimple = require('./mocks/tweet--simple.json');
var tweetMediaSimple = require('./mocks/tweet_with_media--simple.json');

var tweetFull = require('./mocks/tweet--full.json');
var tweetMediaFull = require('./mocks/tweet_with_media--full.json');

describe('<Post />', function() {

  function mockPost(type, overrides) {
    var mockType = type || tweetFull;
    return _.merge(mockType, overrides);
  }

  describe('simple data format', function() {
    it('renders a timestamp', function() {
      const post = mockPost(tweetSimple);
      const wrapper = shallow(<Post {...post} />);
      expect(wrapper.text()).to.contain(post.timestamp);
    });

    it('renders body text', function() {
      const post = mockPost(tweetSimple);
      const wrapper = shallow(<Post {...post} />);
      expect(wrapper.text()).to.contain(post.text);
    });

    it('renders a profile image', function() {
      const post = mockPost(tweetSimple);
      const wrapper = shallow(<Post {...post} />);

      const imageContainer = wrapper.find('.stream-post__profile-image');
      const image = imageContainer.find('img');

      expect(image.prop('src')).to.equal(post.profile_image_url);
    });

  });

  describe('full data format', function() {
    it('renders a timestamp', function() {
      const post = mockPost();
      const wrapper = shallow(<Post {...post} />);
      expect(wrapper.text()).to.contain(post.created_at);
    });

    it('renders body text', function() {
      const post = mockPost();
      const wrapper = shallow(<Post {...post} />);
      expect(wrapper.text()).to.contain(post.text);
    });

    it('renders a profile image', function() {
      const post = mockPost();
      const wrapper = shallow(<Post {...post} />);

      const imageContainer = wrapper.find('.stream-post__profile-image');
      const image = imageContainer.find('img');

      expect(image.prop('src')).to.equal(post.user.profile_image_url);
    });
  });


});
