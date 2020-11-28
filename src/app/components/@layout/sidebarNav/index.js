import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Nav from 'react-bootstrap/Nav';
import PerfectScrollbar from 'react-perfect-scrollbar';
import history from 'app/routes/history';

const SidebarNav = ({ tag: Element, navigation, className, children }) => {
    const classes = classNames('lt-sidebar-nav h-100', className);
    const handleClick = (e) => {
        e.preventDefault();
        e.currentTarget.parentElement.classList.toggle('open');
    };

    const activeDropdownRoute = (url) => {
        return history.location.pathname.indexOf(url) > -1 ? 'side-nav-item nav-dropdown open' : 'side-nav-item nav-dropdown';
    };

    const navList = (items) => {
        return items.map((item) => {
            const { path, children } = item;
            if (path) {
                return children ? navChildren(item) : navItem(item);
            }
            return navTitle(item);
        });
    };

    const navChildren = (item) => {
        const { title, path, icon, children } = item;
        const url = path || '';
        const classes = {
            icon: classNames('nav-link-icon', icon),
        };
        return (
            <Nav.Item key={Math.random()} as="li" bsPrefix={activeDropdownRoute(url)}>
                <Nav.Link onClick={handleClick} className="side-nav-link">
                    {icon && <i className={classes.icon} />}
                    <span>{title}</span>
                    <span className="menu-arrow" />
                </Nav.Link>
                <Nav as="ul" bsPrefix="nav-dropdown-items">
                    {navList(children)}
                </Nav>
            </Nav.Item>
        );
    };

    const navTitle = (item) => {
        const { title, icon } = item;
        const classes = {
            title: classNames('side-nav-title side-nav-item'),
            icon: classNames('nav-link-icon', icon),
        };
        return (
            <li key={Math.random()} className={classes.title}>
                {icon && <i className={classes.icon} />}
                {title}
            </li>
        );
    };

    const navItem = (item) => {
        const { title, path, icon, hidden } = item;
        const url = path || '';
        const classes = {
            link: classNames('nav-link', 'side-nav-link'),
            icon: classNames('nav-link-icon', icon),
        };
        if (hidden) {
            return null;
        }
        return (
            <Nav.Item key={Math.random()} as="li" bsPrefix="side-nav-item">
                <Nav.Link as={NavLink} to={url} bsPrefix={classes.link}>
                    {icon && <i className={classes.icon} />}
                    <span>{title}</span>
                </Nav.Link>
            </Nav.Item>
        );
    };

    return (
        <Element className={classes} id="left-side-menu-container" data-simplebar>
            <PerfectScrollbar>
                {navigation && (
                    <Nav as="ul" bsPrefix="metismenu side-nav">
                        {navList(navigation)}
                    </Nav>
                )}
                {children}
            </PerfectScrollbar>
        </Element>
    );
};

SidebarNav.defaultProps = {
    tag: 'div',
    navigation: [
        {
            title: 'Menu',
            icon: 'icon-grid',
            path: '/default',
            children: [
                {
                    title: 'Sub Menu',
                    path: '/default/detail',
                },
            ],
        },
    ],
};

SidebarNav.propTypes = {
    children: PropTypes.node,
    navigation: PropTypes.any,
    tag: PropTypes.string,
    className: PropTypes.string,
};

export default memo(SidebarNav);
