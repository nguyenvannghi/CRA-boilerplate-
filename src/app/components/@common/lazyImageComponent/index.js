import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import assetLoading from './loading.png';
import assetError from './error.png';

const Image = styled.img`
    display: block;
    height: ${(props) => `${props.height}px`};
    width: ${(props) => `${props.width}px`};
    @keyframes loaded {
        0% {
            opacity: 0.1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
    &.loaded:not(.has-error) {
        animation: loaded 8000ms ease-in-out;
        animation: ${(props) => `loaded ${props?.options?.speed || 300}ms ${props?.options?.animation}`};
    }
    &.has-error {
        content: ${(props) => `url(${props?.options?.assetError || assetError})`};
    }
`;

const LazyImage = ({ src, alt, width, height, options }) => {
    const [imageSrc, setImageSrc] = useState(options?.assetLoading || assetLoading);
    const [imageRef, setImageRef] = useState();

    const onLoad = (event) => {
        event.target.classList.add('loaded');
    };

    const onError = (event) => {
        event.target.classList.add('has-error');
    };

    useEffect(() => {
        let observer;
        let didCancel = false;

        if (imageRef && imageSrc !== src) {
            if (IntersectionObserver) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                                setImageSrc(src);
                                observer.unobserve(imageRef);
                            }
                        });
                    },
                    {
                        threshold: 0.01,
                        rootMargin: '75%',
                    },
                );
                observer.observe(imageRef);
            } else {
                // Old browsers fallback
                setImageSrc(src);
            }
        }
        return () => {
            didCancel = true;
            // on component cleanup, we remove the listner
            if (observer && observer.unobserve) {
                observer.unobserve(imageRef);
            }
        };
    }, [src, imageSrc, imageRef]);

    return <Image width={width} height={height} ref={setImageRef} src={imageSrc} alt={alt} onLoad={onLoad} onError={onError} options={options} />;
};

LazyImage.defaultProps = {
    width: 200,
    height: 200,
    options: {
        speed: 300,
        animation: 'ease-in-out',
    },
};

LazyImage.propTypes = {
    src: PropTypes.any,
    alt: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.shape({
        speed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        style: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out']),
        assetLoading: PropTypes.string,
        assetError: PropTypes.string,
    }),
};

export default LazyImage;
