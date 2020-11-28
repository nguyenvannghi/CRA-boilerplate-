import React, { memo } from 'react';
import PropTypes from 'prop-types';

const IndeterminateSelection = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
    );
});

IndeterminateSelection.propTypes = {
    indeterminate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default memo(IndeterminateSelection);
