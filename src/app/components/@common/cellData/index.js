import React from 'react';
import PropTypes from 'prop-types';
import ValueWithTooltip from 'app/components/@common/valueWithTooltip';

const CellData = ({ props, indexIncrement, prefix }) => {
    if (!props) return '--';
    const {
        // eslint-disable-next-line react/prop-types
        row: { values, id },
    } = props;
    if (indexIncrement) {
        return <span>{Number(id) + 1}</span>;
    }
    return <ValueWithTooltip prefix={prefix} values={values} />;
};

CellData.propTypes = {
    props: PropTypes.object,
    indexIncrement: PropTypes.bool,
    prefix: PropTypes.string.isRequired,
};

export default CellData;
