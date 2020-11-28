/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    return (
        <div className="custom-checkbox custom-control">
            <input id="item-all" className="custom-control-input" type="checkbox" ref={resolvedRef} {...rest} />
            <label className="custom-control-label d-block" htmlFor="item-all">
                Tất cả
            </label>
        </div>
    );
});

IndeterminateCheckbox.propTypes = {
    indeterminate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default memo(IndeterminateCheckbox);
