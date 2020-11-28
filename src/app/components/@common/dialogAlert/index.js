import React, { memo, useEffect, useCallback, useRef, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

const DialogAlertStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);
    outline: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    -webkit-box-align: center;
    -webkit-flex-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    .alert-box {
        -webkit-transition: -webkit-transform 0.3s ease-out;
        transition: -webkit-transform 0.3s ease-out;
        transition: transform 0.3s ease-out;
        transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
        -webkit-transform: translate(0, -50px);
        transform: translate(0, -50px);
        max-width: 300px;
        position: relative;
        width: auto;
        pointer-events: none;
        margin: 1.75rem auto;
        .alert-box__content {
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            width: 100%;
            pointer-events: auto;
            background-color: #fff;
            background-clip: padding-box;
            border: 0 solid transparent;
            border-radius: 0.2rem;
            outline: 0;
        }
    }
`;

export const DIALOG_TYPE = {
    CONFIRM: 'CONFIRM',
    REASON: 'REASON',
};

export const DIALOG_ACTION = {
    CANCEL: 'CANCEL',
    CONFIRM: 'CONFIRM',
};

const DialogAlert = memo(({ children, className, onCallback, targetId, type, form }) => {
    const reasonRefValue = useRef('');
    const [error, setError] = useState(false);
    useEffect(() => {
        return () => {
            unmountComponentAtNode(document.getElementById(targetId));
        };
    }, [targetId]);

    const onUnmountComponent = useCallback(
        (typeAction) => {
            unmountComponentAtNode(document.getElementById(targetId));
            if (onCallback && typeAction === DIALOG_ACTION.CONFIRM) {
                onCallback({ data: { reason: reasonRefValue.current, data: form?.data } });
            }
        },
        [onCallback, form, targetId],
    );

    const onHandelConfirm = useCallback(() => {
        if (type === DIALOG_TYPE.REASON && reasonRefValue.current.length === 0) {
            setError(true);
            return false;
        }
        return onUnmountComponent(DIALOG_ACTION.CONFIRM);
    }, [onUnmountComponent, type]);

    const onHandleClose = useCallback(() => {
        onUnmountComponent(DIALOG_ACTION.CANCEL);
    }, [onUnmountComponent]);

    const onGetReason = (event) => {
        const {
            target: { value },
        } = event;
        setError(value.length === 0);
        reasonRefValue.current = value;
    };

    const classes = classNames('alert-box', className);
    return (
        <DialogAlertStyled>
            <div className={classes}>
                <div className="alert-box__content p-3">
                    <div className="alert-box__body text-center">
                        {children}
                        <h4 className="mt-2 mb-0">{form?.title}</h4>
                        <p>{form?.description}</p>
                        {type === DIALOG_TYPE.REASON && (
                            <div className="mb-2 text-left">
                                <textarea onChange={onGetReason} name="reason" className="form-control mb-1" placeholder={form?.titleReason || '...'} maxLength="150" />
                                {error && <span className="invalid-feedback d-block">Dữ liệu đúng đúng. Vui lòng thử lại</span>}
                            </div>
                        )}
                    </div>
                    <div className="alert-box__actions text-right">
                        <button type="button" className="btn btn-default action__cancel mr-2" onClick={onHandleClose}>
                            {form?.titleCancel}
                        </button>
                        <button type="button" className="btn btn-primary action__confirm" onClick={onHandelConfirm}>
                            {form?.titleConfirm}
                        </button>
                    </div>
                </div>
            </div>
        </DialogAlertStyled>
    );
});

DialogAlert.propTypes = {
    className: PropTypes.string,
    targetId: PropTypes.string,
    children: PropTypes.node,
    onCallback: PropTypes.func,
    type: PropTypes.oneOf([DIALOG_TYPE.CONFIRM, DIALOG_TYPE.REASON]),
    form: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        titleConfirm: PropTypes.string,
        titleCancel: PropTypes.string,
        titleReason: PropTypes.string,
        data: PropTypes.any,
    }),
};

const dialogAlert = {
    close: (id) => {
        const comId = id || 'dialog-container';
        const doc = document.getElementById(comId);
        if (doc) unmountComponentAtNode(doc);
    },
    open: ({ children, options = null, cb }) => {
        const targetId = options?.targetId || 'dialog-container';
        const type = options?.type || DIALOG_TYPE.CONFIRM;
        const defaultForm = {
            title: 'Bạn có muốn xóa thông tin này?',
            description: 'Quá trình này không thể được hoàn tác.',
            titleConfirm: 'Xác nhận',
            titleCancel: 'Hủy',
        };
        const paramsForms = { ...defaultForm, ...options?.form };
        return render(
            <DialogAlert className={options?.className || ''} targetId={targetId} type={type} form={paramsForms} onCallback={cb}>
                {children}
            </DialogAlert>,
            document.getElementById(targetId),
        );
    },
};

export const DialogAlerContainer = ({ id }) => <div id={id || 'dialog-container'} className="dialog-container" />;

DialogAlerContainer.propTypes = {
    id: PropTypes.string,
};

export default dialogAlert;
