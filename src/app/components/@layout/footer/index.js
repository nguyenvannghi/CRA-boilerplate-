import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Footer = ({ tag: Element, className }) => {
    const classes = classNames('lt-footer footer', className);
    return (
        <Element className={classes}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">2018 - 2020 © DEMO CMS - v.{process.env.REACT_APP_VERSION}</div>
                    <div className="col-md-6">
                        <div className="text-md-right footer-links d-none d-md-block">
                            <Link to="/">About</Link>
                            <Link to="/">Support</Link>
                            <Link to="/">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Element>
    );
};

Footer.defaultProps = { tag: 'footer' };

Footer.propTypes = {
    tag: PropTypes.string,
    className: PropTypes.string,
};

export default memo(Footer);
