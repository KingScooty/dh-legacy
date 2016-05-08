var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

import React from 'react';
import { shallow } from 'enzyme';

import PostMedia from '../PostMedia';

var legacyMedia = require('./mocks/tweet_with_media--simple.json');
var media2014 = require('./mocks/tweet_2014_with_media.json');
var mediaModern = require('./mocks/tweet_2015_with_media.json');
var mediaModernMultiple = require('./mocks/tweet_2015_with_multiple_media.json');


function removeMedia(mediaType) {
  var noMedia = JSON.parse(JSON.stringify(mediaType));

  if (noMedia.extended_entities && noMedia.extended_entities.media) {
    delete noMedia.entities.media;
    delete noMedia.extended_entities.media;
  } else if (noMedia.entities && noMedia.entities.media) {
    delete noMedia.entities.media;
  } else {
    noMedia.media = "";
  }

  return noMedia;
}

describe('<PostMedia />', function() {

  it('renders an anchor wrapper with correct props if media is present', function() {
    const href = "https://twitter.com/kingscooty/status/123";
    const wrapper = shallow(<PostMedia {...mediaModern} href={href} />);
    const media = wrapper.find('.stream-post__media');
    const anchor = media.find('a');

    expect(anchor).to.have.length.of(1);
    expect(anchor.prop('href')).to.equal(href);
  });

  describe('<= 2013 data format', function() {
    it('renders no media object if no media present', function() {
      const noMedia = removeMedia(legacyMedia);
      const wrapper = shallow(<PostMedia {...noMedia} />);
      const imageWrapper = wrapper.find('.stream-post__media');

      expect(imageWrapper).to.have.length.of(0);
    });

    it('renders a single media object', function() {
      const wrapper = shallow(<PostMedia {...legacyMedia} />);
      const image = wrapper.find('.stream-post__media-item');

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
    it('renders no media object if no media present', function() {
      const noMedia = removeMedia(media2014);
      const wrapper = shallow(<PostMedia {...noMedia} />);
      const imageWrapper = wrapper.find('.stream-post__media');

      expect(imageWrapper).to.have.length.of(0);
    });

    it('renders a single media object if media present', function() {
      const wrapper = shallow(<PostMedia {...media2014} />);
      const image = wrapper.find('.stream-post__media-item');

      expect(image).to.have.length.of(1);
    });

    it('renders the media object with correct props', function() {
      const wrapper = shallow(<PostMedia {...media2014 } />);
      const image = wrapper.find('.stream-post__media-item');
      const expectedSrc = media2014.entities.media[0].media_url;

      expect(image.prop('src')).to.equal(expectedSrc);
    });
  });

  describe('>= 2015 (modern data format)', function() {
    it('renders no media object if no media present', function() {
      const noMedia = removeMedia(mediaModern);
      const wrapper = shallow(<PostMedia {...noMedia} />);
      const imageWrapper = wrapper.find('.stream-post__media');

      expect(imageWrapper).to.have.length.of(0);
    });

    it('renders a single media object if media present', function() {
      const wrapper = shallow(<PostMedia {...mediaModern} />);
      const image = wrapper.find('.stream-post__media-item');

      expect(image).to.have.length.of(1);
    });

    it('renders the media object with correct props', function() {
      const wrapper = shallow(<PostMedia {...mediaModern } />);
      const image = wrapper.find('.stream-post__media-item');
      const expectedSrc = mediaModern.extended_entities.media[0].media_url;

      expect(image.prop('src')).to.equal(expectedSrc);
    });

    it('renders multiple media objects if multiple media present', function() {
      const wrapper = shallow(<PostMedia {...mediaModernMultiple} />);
      const images = wrapper.find('.stream-post__media-item');

      expect(images).to.have.length.of(3);
    });

    it('renders multiple media objects with correct props', function() {
      const wrapper = shallow(<PostMedia {...mediaModernMultiple } />);
      const images = wrapper.find('.stream-post__media-item');
      const expectedSrc = mediaModernMultiple.extended_entities.media;

      images.forEach(function(image, index) {
        expect(image.prop('src')).to.equal(expectedSrc[index].media_url);
      });
    });
  });

});
