var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

import React from 'react';
import { shallow, render } from 'enzyme';
import twitter from 'twitter-text';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Post from '../';

var tweetSimple = require('./mocks/tweet--simple.json');
var tweetMediaSimple = require('./mocks/tweet_with_media--simple.json');

var tweetFull = require('./mocks/tweet--full.json');
var tweetMediaFull = require('./mocks/tweet_with_media--full.json');

chai.use(sinonChai);

describe('<Post />', function() {

  function mockPost(type, overrides) {
    var mockType = type || tweetFull;
    return _.merge(mockType, overrides);
  }

  describe('getTimeStamp()', function() {
    it('returns the timestamp when using old data format', function() {
      const timestamp = Post.prototype.getTimeStamp(tweetSimple);
      const expectedTimeStamp = tweetSimple.timestamp;

      expect(timestamp).to.equal(expectedTimeStamp);
    });

    it('returns the timestamp when using new data format', function() {
      const timestamp = Post.prototype.getTimeStamp(tweetFull);
      const expectedTimeStamp = tweetFull.created_at;

      expect(timestamp).to.equal(expectedTimeStamp);
    });
  });

  describe('formatTimeStamp()', function() {
    it('returns a formatted timestamp', function() {
      const formattedTimestamp = Post.prototype.formatTimeStamp(tweetFull.created_at);
      var expectedFormattedTimestamp = '05:07 am, 1st Nov';

      expect(formattedTimestamp).to.equal(expectedFormattedTimestamp);
    });
  });

  describe('getScreenName()', function() {
    it('returns a screen name object when using old data format', function() {
      const screenNameObject = Post.prototype.getScreenName(tweetSimple);
      var expectedScreeNameObject = {
        text: 'KingScooty',
        url: 'https://twitter.com/KingScooty'
      }

      expect(screenNameObject).to.deep.equal(expectedScreeNameObject);
    });

    it('returns a screen name object when using new data format', function() {
      const screenNameObject = Post.prototype.getScreenName(tweetFull);
      var expectedScreeNameObject = {
        text: 'KingScooty',
        url: 'https://twitter.com/KingScooty'
      }

      expect(screenNameObject).to.deep.equal(expectedScreeNameObject);
    });
  });

  describe('getStatusUrl()', function() {
    it('returns a status url when using old data format', function() {
      const statusUrl = Post.prototype.getStatusUrl(tweetSimple);
      var expectedStatusUrl = `https://twitter.com/statuses/${tweetSimple.tweet_id}`;

      expect(statusUrl).to.equal(expectedStatusUrl);
    });

    it('returns a status url when using new data format', function() {
      const statusUrl = Post.prototype.getStatusUrl(tweetFull);
      var expectedStatusUrl = `https://twitter.com/statuses/${tweetFull.id_str}`;

      expect(statusUrl).to.equal(expectedStatusUrl);
    });
  });

  describe('getProfileImage()', function() {
    it('returns a profile image url based on a screen name', function() {
      const getProfileImage = Post.prototype.getProfileImage('KingScooty');
      var expectedProfileImage = 'https://twitter.com/KingScooty/profile_image?size=bigger'

      expect(getProfileImage).to.equal(expectedProfileImage);
    });
  });

  describe('getPostText()', function() {
    it('calls twitter-text with the correct props', function() {
      let sandbox = sinon.sandbox.create();

      let htmlEscapeSpy = sandbox.spy(twitter, 'htmlEscape');
      let autoLinkSpy = sandbox.spy(twitter, 'autoLink');

      Post.prototype.getPostText(tweetFull);

      expect(htmlEscapeSpy).to.have.been.calledWith(tweetFull.text);
      expect(autoLinkSpy).to.have.been.called;

      sandbox.restore();
    });
  });

  describe('render()', function() {
    describe('simple data format', function() {
      it('calls <TimeAgo /> with correct props', function() {
        const post = mockPost(tweetSimple);
        const wrapper = shallow(<Post {...post} />);
        const timeAgo = wrapper.find('.stream-post__timeago');

        expect(timeAgo.prop('date')).to.equal(post.timestamp);
      });

      it('renders post text', function() {
        const post = mockPost(tweetSimple);
        const wrapper = render(<Post {...post} />);

        const postText = wrapper.find('.stream-post__text');
        expect(postText.text()).to.contain(post.text);
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
        const expectedProfileImage = `https://twitter.com/${post.screen_name}/profile_image?size=bigger`;

        expect(image.prop('src')).to.equal(expectedProfileImage);
      });

      it('renders a formatted timestamp', function() {
        const post = mockPost(tweetSimple);
        const wrapper = shallow(<Post {...post} />);

        const timestamp = wrapper.find('.stream-post__timestamp');

        expect(timestamp.text()).to.equal('21:35 pm, 30th May');
      });

    });


    describe('full data format', function() {
      it('calls <TimeAgo /> with correct props', function() {
        const post = mockPost();
        const wrapper = shallow(<Post {...post} />);
        const timeAgo = wrapper.find('.stream-post__timeago');

        expect(timeAgo.prop('date')).to.equal(post.created_at);
      });


      it('renders post text', function() {
        const post = mockPost();
        const wrapper = render(<Post {...post} />);
        const postText = wrapper.find('.stream-post__text');

        expect(postText.text()).to.contain(post.text);
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
        const expectedProfileImage = `https://twitter.com/${post.user.screen_name}/profile_image?size=bigger`;

        expect(image.prop('src')).to.equal(expectedProfileImage);
      });

      it('renders a formatted timestamp', function() {
        const post = mockPost();
        const wrapper = shallow(<Post {...post} />);

        const timestamp = wrapper.find('.stream-post__timestamp');

        expect(timestamp.text()).to.equal('05:07 am, 1st Nov');
      });
    });

  });
});
