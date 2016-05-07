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
      const meta = wrapper.find('.stream-post__meta');

      expect(meta.text()).to.contain(post.timestamp);
    });

    it('renders post text', function() {
      const post = mockPost(tweetSimple);
      const wrapper = shallow(<Post {...post} />);

      const postBody = wrapper.find('.stream-post__body');
      expect(postBody.text()).to.contain(post.text);
    });

    it('renders screen name', function() {
      const post = mockPost(tweetSimple);
      const wrapper = shallow(<Post {...post} />);
      const screenNameWrapper = wrapper.find('.stream-post__screen-name');
      const screenName = screenNameWrapper.find('a');

      expect(screenName.prop('href')).to.equal(`https://twitter.com/${post.screen_name}`);
      expect(screenName.text()).to.equal(`@${post.screen_name}`);
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
      const meta = wrapper.find('.stream-post__meta');

      expect(meta.text()).to.contain(post.created_at);
    });

    it('renders body text', function() {
      const post = mockPost();
      const wrapper = shallow(<Post {...post} />);
      const postBody = wrapper.find('.stream-post__body');
      expect(postBody.text()).to.contain(post.text);
    });

    it('renders screen name', function() {
      const post = mockPost();
      const wrapper = shallow(<Post {...post} />);
      const screenNameWrapper = wrapper.find('.stream-post__screen-name');
      const screenName = screenNameWrapper.find('a');

      expect(screenName.prop('href')).to.equal(`https://twitter.com/${post.user.screen_name}`);
      expect(screenName.text()).to.equal(`@${post.user.screen_name}`);
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
