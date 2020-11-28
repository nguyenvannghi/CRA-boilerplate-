import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { INITIAL_PAGE } from 'app/consts';

const PaginationComponent = ({ pager, onChangePage }) => {
    const setPage = useCallback(
        (page) => {
            if (typeof onChangePage === 'function') {
                onChangePage(page);
            }
        },
        [onChangePage],
    );

    if (!pager?.pages || pager?.pages.length <= 1) {
        return null;
    }

    return (
        <Row>
            <Col sm={12} md={5}>
                <div className="dataTables_info" id="products-datatable_info" role="status" aria-live="polite">
                    Hiển thị {pager?.startPage} đến {pager?.endPage} của {pager?.totalPages} trang
                </div>
            </Col>
            <Col sm={12} md={7}>
                <div className="dataTables_paginate paging_simple_numbers">
                    <Pagination className="pagination-rounded">
                        <Pagination.First onClick={() => setPage(INITIAL_PAGE)} />
                        <Pagination.Prev onClick={() => setPage(pager.currentPage - 1)} />
                        {pager?.pages.map((page) => (
                            <Pagination.Item key={page} active={page === pager?.currentPage} className="paginate_button" onClick={() => page !== pager?.currentPage && setPage(page)}>
                                {page}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setPage(pager.currentPage + 1)} />
                        <Pagination.Last onClick={() => setPage(pager.totalPages)} />
                    </Pagination>
                </div>
            </Col>
        </Row>
    );
};

PaginationComponent.propTypes = {
    pager: PropTypes.object,
    onChangePage: PropTypes.func,
};

export default memo(PaginationComponent);
