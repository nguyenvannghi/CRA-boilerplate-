export const NSP_COMMON = 'NSP_COMMON/';
export const NSP_AUTH = 'NSP_AUTH/';

export const AUTH_USER = {
    ACCESS_TOKEN: 'accessToken',
    TOKEN_TYPE: 'tokenType',
    REFRESH_TOKEN: 'refreshType',
    CURRENT_USER: 'currentUser',
};

export const MSG = {
    LOADING: 'Đang tải...',
    NETWORK_ERROR: 'Đã có lỗi xảy ra. Vui lòng thử lại',
    NODATA: 'Không có dữ liệu',
    USER_EXISTS: 'Tài khoản đã tồn tại',
    DEL_SUCCESS: 'Xoá thành công!',
    DEL_FAILED: 'Xoá thất bại',
    DUP_SUCCESS: 'Nhân bản thành công!',
    DUP_FAILED: 'Nhân bản thất bại',
    UPDATE_SUCCESS: 'Cập nhật thành công!',
    UPDATE_FAILED: 'Cập nhật thất bại',
    CREATE_SUCCESS: 'Tạo mới thành công',
    CREATE_FAILED: 'Tạo mới thất bại',
    LIST_SUCCESS: 'Tải danh sách thành công',
    LIST_FAILED: 'Tải danh sách thất bại',
    SYNC_CANCELLED: 'Đồng bộ thất bại',
};

export const STATUS_DEFAULT = {
    ACTIVE: 'ACTIVE',
    DEACTIVE: 'DEACTIVE',
};

export const COMMON_FIELD_DATA_LIST = {
    DATA: 'docs',
    TOTAL: 'total',
    LIMIT: 'limit',
    PAGE: 'page',
    PAGES: 'pages',
};

export const FILE_TYPE = {
    EXPORT_FILE_EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
    EXPORT_FILE_PDF: 'application/pdf',
};

export const INITIAL_PAGE = 1;
export const PAGE_SIZE = 20;

export const DATE_FORMAT_PICKER = {
    YYYYMMDD: 'yyyy/MM/dd',
    DDMMYYYY: 'dd/MM/yyyy',
    DDMMYYYY_HHss: 'dd/MM/yyyy HH:mm',
};

export const DATE_FORMAT_MOMENT = {
    DDMMYYYY: 'DD/MM/YYYY',
    DDMMYYYY_HHss: 'DD/MM/YYYY HH:mm',
};

export const ACTION_CONFIRM_DIALOG = {
    OK: 'ok',
    CANCEL: 'cancel',
};

export const INITIAL_DEFAULT_STATE = {
    created: null,
    createLoading: false,
    createFailed: null,
    updated: null,
    updateLoading: false,
    updateFailed: null,
    deleted: null,
    deleteLoading: false,
    deleteFailed: null,
};

export const LOST_CONNECT = 'Trying to reconnect... please check your internet connection';

export const ARRAY_FIELD_NAME = 'fitlers';
export const ARRAY_FIELD_METHOD = 'method';

export const COMPARISON_OPERATORS_FILTER = {
    GREATER_THAN: 'GREATER_THAN',
    LESS_THAN: 'LESS_THAN',
    GREATER_THAN_OR_EQUAL: 'GREATER_THAN_OR_EQUAL',
    LESS_THAN_OR_EQUAL: 'LESS_THAN_OR_EQUAL',
    EQUAL: 'EQUAL',
    NOT_EQUAL: 'NOT_EQUAL',
    IN: 'IN',
    NOT_IN: 'NOT_IN',
    LIKE: 'LIKE',
};

export const COMPARISON_OPERATORS_FILTER_LABEL = {
    SELECT_OPERATOR: 'Operator',
    GREATER_THAN: '>',
    LESS_THAN: '<',
    GREATER_THAN_OR_EQUAL: '>=',
    LESS_THAN_OR_EQUAL: '<=',
    EQUAL: '=',
    NOT_EQUAL: '≠',
    IN: 'In',
    NOT_IN: 'Not in',
    LIKE: 'Like',
};

export const LOGICAL_OPERATORS_FILTER = {
    AND: 'AND',
    OR: 'OR',
};

export const LOGICAL_DATA_TYPE_FILTER = {
    BOOLEAN: 'BOOLEAN',
    SELECT: 'SELECT',
    TEXT: 'TEXT',
    NUMBER: 'NUMBER',
    DATE: 'DATE',
    DATE_RANGE: 'DATE_RANGE',
};

export const LOGICAL_CASE_FILTER = {
    SINGLE: 'SINGLE',
    MULTIPLE: 'MULTIPLE',
};

export const PARAMS_MAP_SERVER = {
    ID: 'id',
    KEY: 'key',
    LABEL: 'label',
    OP: 'op',
    DATA_TYPE: 'dataType',
    DATA_CASE: 'dataCase',
    VALUE: 'value',
};

export const BOOLEAN_DATA_DEFAULT = [
    {
        key: true,
        value: 'Active',
    },
    {
        key: false,
        value: 'Deactive',
    },
];

export const REACT_SELECT_ACTIONS = {
    CLEAR: 'clear',
    CREATE_OPTION: 'create-option',
    DESELECT_OPTION: 'deselect-option',
    POP_VALUE: 'pop-value',
    REMOVE_VALUE: 'remove-value',
    SELECT_OPTION: 'select-option',
    SET_VALUE: 'set-value',
};

export const FORM_TYPE_ACTION = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
};

export const LAYOUT_TYPE = {
    PRIVATE: 'private',
    PUBLIC: 'public',
};
