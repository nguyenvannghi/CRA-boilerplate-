import React, { memo, useEffect, useCallback } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

const LightBoxStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);
    outline: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    -webkit-box-align: center;
    -webkit-flex-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    .viewer-box {
        -webkit-transition: -webkit-transform 0.3s ease-out;
        transition: -webkit-transform 0.3s ease-out;
        transition: transform 0.3s ease-out;
        transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
        -webkit-transform: translate(0, -50px);
        transform: translate(0, -50px);
        position: relative;
        width: auto;
        pointer-events: none;
        margin: 1.75rem auto;
        .viewer-box__close {
            position: absolute;
            right: -3.2rem;
            top: -2rem;
            font-size: 1.2rem;
            z-index: 1;
            border: none;
            outline: 0;
            border-radius: 50%;
            color: #ffffff;
            background: #454545;
            width: 2rem;
            height: 2rem;
            text-align: center;
            line-height: 1;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .viewer-box__content {
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            width: 100%;
            pointer-events: auto;
            background-color: #fff;
            background-clip: padding-box;
            border: 0.875rem solid #ffffff;
            border-radius: 0.2rem;
            border-radius: 0.2rem;
            outline: 0;
        }
    }
`;

const LightBox = memo(({ children, className, targetId, source }) => {
    useEffect(() => {
        return () => {
            unmountComponentAtNode(document.getElementById(targetId));
        };
    }, [targetId]);

    const onClose = useCallback(() => {
        unmountComponentAtNode(document.getElementById(targetId));
    }, [targetId]);

    const classes = classNames('viewer-box', className);
    return (
        <LightBoxStyled>
            <div className={classes}>
                <div className="viewer-box__content">
                    <button onClick={onClose} className="viewer-box__close" title="Close">
                        <i className="uil uil-times" />
                    </button>
                    <img src={source} alt="" />
                    {children}
                </div>
            </div>
        </LightBoxStyled>
    );
});

LightBox.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    source: PropTypes.string,
    targetId: PropTypes.string,
};

const lightViewer = {
    close: (id) => {
        const comId = id || 'light-viewer-container';
        const doc = document.getElementById(comId);
        if (doc) unmountComponentAtNode(doc);
    },
    open: ({ children, source, options = null }) => {
        const targetId = options?.targetId || 'light-viewer-container';
        return render(
            <LightBox className={options?.className || ''} targetId={targetId} source={source}>
                {children}
            </LightBox>,
            document.getElementById(targetId),
        );
    },
};

export const LightViewerContainer = ({ id }) => <div id={id || 'light-viewer-container'} className="light-viewer-container" />;

LightViewerContainer.propTypes = {
    id: PropTypes.string,
};

export default lightViewer;
