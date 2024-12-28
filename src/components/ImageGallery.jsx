import React from 'react';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageGallery = ({ images }) => {
  const formattedImages = images.map(image => ({
    original: image,
    thumbnail: image
  }));

  return (
    <ReactImageGallery
      items={formattedImages}
      showPlayButton={false}
      showFullscreenButton={true}
      showNav={true}
    />
  );
};

export default ImageGallery;