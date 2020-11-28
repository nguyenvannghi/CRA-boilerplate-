import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Nav from 'react-bootstrap/Nav';
import AccountDropdown from '../accountDropdown';

const Header = ({ tag: Element, className }) => {
    const classes = classNames('navbar-custom', className);
    return (
        <Element className={classes}>
            <Nav as="ul" className="float-right mb-0">
                <AccountDropdown />
            </Nav>
        </Element>
    );
};

Header.defaultProps = { tag: 'header' };

Header.propTypes = {
    tag: PropTypes.string,
    className: PropTypes.string,
};

export default memo(Header);
