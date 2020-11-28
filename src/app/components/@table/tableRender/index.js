/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEqual, isEmpty } from 'lodash';
import classNames from 'classnames';
import { useTable, useBlockLayout, useRowSelect } from 'react-table';
import { useSticky } from 'react-table-sticky';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { randomAlphabets } from 'app/utils';
import { usePrevious } from 'app/hooks';
import IndeterminateCheckbox from '../indeterminateCheckbox';
import IndeterminateSelection from '../indeterminateSelection';

const TableRender = ({ columns, data, options, onDeleteRows }) => {
    const elementID = randomAlphabets();
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 30,
            width: 130,
            maxWidth: 400,
        }),
        [],
    );
    const tableProps = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useSticky,
        useBlockLayout,
        useRowSelect,
        (hooks) => {
            options.isSelectionColumns &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        // eslint-disable-next-line react/prop-types
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <IndeterminateSelection {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        // eslint-disable-next-line react/prop-types
                        Cell: ({ row: { getToggleRowSelectedProps } }) => (
                            <div>
                                <IndeterminateSelection {...getToggleRowSelectedProps()} />
                            </div>
                        ),
                        width: 40,
                        sticky: 'left',
                    },
                    ...columns,
                ]);
        },
    );

    const { allColumns, getToggleHideAllColumnsProps, getTableProps, headerGroups, getTableBodyProps, rows, prepareRow, selectedFlatRows } = tableProps;

    const selected = usePrevious(selectedFlatRows);

    const onDeleteAction = () => {
        if (!isEqual(selected, selectedFlatRows) && typeof onDeleteRows === 'function') {
            onDeleteRows(selectedFlatRows);
        }
    };

    return (
        <>
            {!options.isHidingColumn && (
                <div className="action-hiding-column">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <OverlayTrigger placement="bottom-start" overlay={<Tooltip id="tooltip-bottom-column-hidding">Điều chỉnh cột</Tooltip>}>
                                <i className="dripicons-gear" />
                            </OverlayTrigger>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-default-expand">
                            <Dropdown.Header>
                                <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                            </Dropdown.Header>
                            <div style={{ maxHeight: '230px', overflow: 'auto' }}>
                                <PerfectScrollbar>
                                    {allColumns.map((column) => (
                                        <Dropdown.Item key={column.id} as="li">
                                            <div className="custom-checkbox custom-control">
                                                <input id={column.id} className="custom-control-input" type="checkbox" {...column.getToggleHiddenProps()} />
                                                <label className="custom-control-label d-block" htmlFor={column.id}>
                                                    {column.Header}
                                                </label>
                                            </div>
                                        </Dropdown.Item>
                                    ))}
                                </PerfectScrollbar>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )}
            <div className="table-responsive">
                <PerfectScrollbar>
                    <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                        <Row>
                            <Col sm={12}>
                                <Table
                                    bordered
                                    className="table-centered w-100 dt-responsive nowrap dataTable no-footer dtr-inline"
                                    role="grid"
                                    aria-describedby={`${elementID}-datatable_info`}
                                    id={`${elementID}-datatable`}
                                    {...getTableProps()}>
                                    <thead className={classNames('head-actions', { active: !isEmpty(selectedFlatRows) })}>
                                        {headerGroups.map((headerGroup, groupIdx) => (
                                            <tr key={groupIdx} {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map((column, idx) => {
                                                    if (idx === 0) {
                                                        return (
                                                            <th key={idx} {...column.getHeaderProps()}>
                                                                {column.render('Header')}
                                                            </th>
                                                        );
                                                    }
                                                    if (idx === 1) {
                                                        return (
                                                            <th key={idx}>
                                                                <ul className="reset-ul">
                                                                    <li className="d-inline-block mr-2">
                                                                        <span className="btn-action pointer" title="Xóa" onClick={onDeleteAction}>
                                                                            <i className="mdi mdi-delete mr-1" />
                                                                            Xóa
                                                                        </span>
                                                                    </li>
                                                                </ul>
                                                            </th>
                                                        );
                                                    }
                                                    return <Fragment key={idx} />;
                                                })}
                                            </tr>
                                        ))}
                                    </thead>
                                    <thead className={classNames('head-title', isEmpty(selectedFlatRows))}>
                                        {headerGroups.map((headerGroup, groupIdx) => (
                                            <tr key={groupIdx} {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map((column, idx) => (
                                                    <th key={idx} {...column.getHeaderProps()}>
                                                        {column.render('Header')}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {rows.map((row, idx) => {
                                            prepareRow(row);
                                            return (
                                                <tr key={idx} {...row.getRowProps()}>
                                                    {row.cells.map((cell, cellIdx) => {
                                                        return (
                                                            <td
                                                                key={cellIdx}
                                                                {...cell.getCellProps({
                                                                    className: cell?.column?.className,
                                                                })}>
                                                                {cell.render('Cell')}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                </PerfectScrollbar>
            </div>
        </>
    );
};

TableRender.defaultProps = {
    options: { isHidingColumn: false, isSelectionColumns: false },
};

TableRender.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    onDeleteRows: PropTypes.func,
    options: PropTypes.shape({
        isHidingColumn: PropTypes.bool,
        isSelectionColumns: PropTypes.bool,
    }),
};

export default memo(TableRender);
