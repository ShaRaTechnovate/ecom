import React, { useState } from 'react';
import './index.css';

const ImageSlider = ({ images }) => {
    const defaultImage = images && images.length > 0 ? images[0] : null;
    const [selectedImage, setSelectedImage] = useState(defaultImage);

    if (!images || images.length === 0) {
        return null;
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div className="image-slider">
            <div className="main-image-container">
                <img src={selectedImage} alt="main" className="main-image" />
            </div>
            <div className="thumbnail-container">
                {images?.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`thumbnail-${index}`}
                        className={selectedImage === image ? 'selected-thumbnail' : ''}
                        onClick={() => handleImageClick(image)}
                    />
                ))}
            </div>

        </div>
    );
};

export default ImageSlider;
