var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

import React from 'react';
import { shallow } from 'enzyme';

import PostMedia from '../PostMedia';

var legacyMedia = require('./mocks/tweet_with_media--simple.json');
var media2014 = require('./mocks/tweet_2014_with_media.json');
var mediaModern = require('./mocks/tweet_2015_with_media.json');

// function mockMedia(mediaType) {
  // var mediaObject = {};
  // if (mediaType.extended_entities && mediaType.extended_entities.media) {
  //   mediaObject.extended_entities = mediaType.extended_entities
  // }

  // var mockType = type || tweetFull;
  // return _.merge(mockType, overrides);
// }

describe('<PostMedia />', function() {

  describe('<= 2013 data format', function() {
    it('renders a single media object', function() {
      const wrapper = shallow(<PostMedia {...legacyMedia} />);
      const image = wrapper.find('.stream-post__media-item');

      // expect(image.prop('src')).to.equal(post.profile_image_url);
      expect(image).to.have.length.of(1);
    });

    it('renders the media object with correct props', function() {
      const wrapper = shallow(<PostMedia {...legacyMedia} />);
      const image = wrapper.find('.stream-post__media-item');
      const expectedSrc = legacyMedia.media;

      expect(image.prop('src')).to.equal(expectedSrc);
    });
  });

  describe('2014 data format', function() {
  });

  describe('>= 2015 (modern data format)', function() {
  });

});
