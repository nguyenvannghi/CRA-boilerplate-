import React, { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { render, unmountComponentAtNode } from 'react-dom';
import ProgressBarContainer from 'app/components/@common/progressBarComponent/progressBarContainer';

const PercentLoaderStyled = styled.div`
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    background-clip: padding-box;
    position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%;
    z-index: 999999;
`;

const ProgressLoader = memo(({ targetId, percentage, speed }) => {
    const onUnmountComponent = useCallback(() => {
        unmountComponentAtNode(document.getElementById(targetId));
    }, [targetId]);

    useEffect(() => {
        return () => {
            onUnmountComponent();
        };
    }, [onUnmountComponent]);

    useEffect(() => {
        if (percentage === 100) {
            onUnmountComponent();
        }
    }, [percentage, onUnmountComponent]);

    return (
        <PercentLoaderStyled>
            <ProgressBarContainer percentage={percentage} speed={speed} />
        </PercentLoaderStyled>
    );
});

ProgressLoader.propTypes = {
    percentage: PropTypes.number,
    speed: PropTypes.number,
    targetId: PropTypes.string,
};

const progressLoader = {
    close: (id) => {
        const comId = id || 'progress-container';
        const doc = document.getElementById(comId);
        if (doc) unmountComponentAtNode(doc);
    },
    open: ({ children, percentage, speed, options }) => {
        const targetId = options?.targetId || 'progress-container';
        const speedData = speed || 50;
        return render(
            <ProgressLoader targetId={targetId} percentage={percentage} speed={speedData}>
                {children}
            </ProgressLoader>,
            document.getElementById(targetId),
        );
    },
};
export const LoaderPercentProgressContainer = ({ id }) => <div id={id || 'progress-container'} className="progress-container" />;

LoaderPercentProgressContainer.propTypes = {
    id: PropTypes.string,
};

export default progressLoader;
