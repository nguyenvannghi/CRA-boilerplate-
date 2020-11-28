import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import logoLight from 'assets/images/logo.png';
import logoSmLight from 'assets/images/logo_sm.png';
import logoDark from 'assets/images/logo-dark.png';
import logoSmDark from 'assets/images/logo_sm_dark.png';

const Sidebar = ({ tag: Element, className, children }) => {
    const classes = classNames('lt-sidebar', className);
    return (
        <Element className={classes}>
            <Link to="/" className="logo text-center logo-light">
                <span className="logo-lg">
                    <img src={logoLight} alt="" height="16" />
                </span>
                <span className="logo-sm">
                    <img src={logoSmLight} alt="" height="16" />
                </span>
            </Link>

            <Link to="/" className="logo text-center logo-dark">
                <span className="logo-lg">
                    <img src={logoDark} alt="" height="16" />
                </span>
                <span className="logo-sm">
                    <img src={logoSmDark} alt="" height="16" />
                </span>
            </Link>
            {children}
        </Element>
    );
};

Sidebar.defaultProps = {
    tag: 'aside',
};

Sidebar.propTypes = {
    children: PropTypes.node,
    tag: PropTypes.string,
    className: PropTypes.string,
};

export default memo(Sidebar);
