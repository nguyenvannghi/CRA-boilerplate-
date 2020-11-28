import React, { memo, useEffect, useState, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import history from 'app/routes/history';

const NoInternet = memo(({ btnTitle, content }) => {
    const refreshPage = () => {
        const getStatusOnline = window.navigator.onLine;
        const { pathname } = history.location;
        getStatusOnline && window.location.assign(pathname);
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={12}>
                    <div className="text-center">
                        <h1 className="text-error mt-4">Lost Connection</h1>
                        <p className="text-danger mt-3">{content}</p>
                        <Button onClick={refreshPage} variant="secondary" className="pl-3 pr-3">
                            {btnTitle}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

NoInternet.defaultProps = {
    // eslint-disable-next-line quotes
    content: "Can't load this page. check your internet connection and try again",
    btnTitle: 'Retry',
};

NoInternet.propTypes = {
    btnTitle: PropTypes.string,
    content: PropTypes.string,
};

export default (ImportComponent) => {
    const LazyComp = lazy(ImportComponent);

    const AsyncComponent = (props) => {
        const getStatusOnline = window.navigator.onLine;
        const [isOnline, setOnline] = useState(getStatusOnline);

        useEffect(() => {
            setOnline(getStatusOnline);
        }, [getStatusOnline]);

        if (!isOnline) {
            return <NoInternet />;
        }

        return (
            <Suspense
                fallback={
                    <div className="progress">
                        <div className="indeterminate" />
                    </div>
                }>
                <LazyComp {...props} />
            </Suspense>
        );
    };

    return AsyncComponent;
};
