import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ValueWithTooltip = ({ value, values, prefix }) => {
    const result = value || (values && values[prefix]) || '--';
    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip>{result}</Tooltip>}>
            <span>{result}</span>
        </OverlayTrigger>
    );
};

ValueWithTooltip.propTypes = {
    value: PropTypes.any,
    values: PropTypes.object,
    prefix: PropTypes.string,
};

export default ValueWithTooltip;
