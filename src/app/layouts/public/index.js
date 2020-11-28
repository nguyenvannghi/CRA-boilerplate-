import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const PublicLayout = ({ children }) => {
    useEffect(() => {
        document.body.classList.add('authentication-bg');
        return () => {
            document.body.classList.remove('authentication-bg');
        };
    }, []);

    return <div className="auth-fluid">{children}</div>;
};

PublicLayout.propTypes = {
    children: PropTypes.node,
};

export default PublicLayout;
