import React from 'react';
import PropTypes from 'prop-types';
import {
    Sidebar,
    SidebarNav,
    Content,
    Header,
    Footer,
    // NavBreadcrumb, TitlePage
} from 'app/components/@layout';
import { routeAppConfig } from 'app/routes/routeConfig';

const PrivateLayout = ({ children }) => {
    return (
        <>
            <Sidebar className="left-side-menu mm-show">
                <SidebarNav navigation={routeAppConfig} />
            </Sidebar>
            <Content className="content-page">
                <div className="content">
                    <Header />
                    {/* <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <div className="page-title-right">
                                    <NavBreadcrumb router={router} appRoutes={routeAppConfig} />
                                </div>
                                <TitlePage appRoutes={routeAppConfig} />
                            </div>
                        </div>
                    </div> */}
                    <div className="mb-3" />
                    {children}
                </div>
            </Content>
            <Footer />
        </>
    );
};

PrivateLayout.propTypes = {
    children: PropTypes.node,
};

export default PrivateLayout;
