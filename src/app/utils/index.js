import Resizer from 'react-image-file-resizer';
import isEmpty from 'lodash/isEmpty';
import isNaN from 'lodash/isNaN';
import isNull from 'lodash/isNull';
import { FILE_TYPE } from 'app/consts';

const resizeFile = (file) => {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            200,
            200,
            'JPEG',
            70,
            0,
            (uri) => {
                resolve(uri);
            },
            'base64',
            200,
            200,
        );
    });
};

const randomAlphabets = () => Math.random().toString(36).substring(7);

const saveFile = (blobFile, fileName = randomAlphabets(), type = FILE_TYPE.EXPORT_FILE_PDF) => {
    const data = new Blob([blobFile], { type });
    const fileURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = fileURL;
    tempLink.setAttribute('download', fileName);
    tempLink.click();
};

const openFile = (blobFile, type = FILE_TYPE.EXPORT_FILE_PDF) => {
    const data = new Blob([blobFile], { type });
    const fileURL = window.URL.createObjectURL(data);
    window.open(fileURL);
};

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const formatMoney = (amount, prefix = '') => {
    if (!amount) {
        return `0 ${prefix}`;
    }
    const currency = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${currency} ${prefix}`;
};

const formatNumberWithCommas = (value) => (value ? value.toLocaleString('en-US') : '');

const formatNumberFixed = (value, n) => {
    if (isNaN(value) || isNull(value)) {
        return 0;
    }
    if (Number.isInteger(Number(value))) {
        return value;
    }
    return Number(value).toFixed(n);
};

const formatAddressInfo = (countryCode, city, district, ward, address1, address2, address3, address4) => {
    let detail = '';
    const slug = ' - ';
    // if (countryCode === COUNTRY_VIETNAM.code) {
    if (address1) detail += `${address1}`;
    if (address2) detail += `${slug}${address2}`;
    if (address3) detail += `${slug}${address3}`;
    if (address4) detail += `${slug}${address4}`;
    // }
    // if (address1) detail += `${address1}`;
    if (ward) detail += `${slug}${ward}`;
    if (district) detail += `${slug}${district}`;
    if (city) detail += `${slug}${city}`;
    if (countryCode) detail += `${slug}${countryCode}`;
    return detail;
};

const patchInitialValue = (data, paramKey, paramCode, keyValues) => {
    const { keyCode, keyName } = {
        keyCode: 'code',
        keyName: 'name',
        ...keyValues,
    };
    if (!data) {
        return {
            [keyCode]: '',
            [keyName]: '',
        };
    }
    return {
        [keyCode]: data[paramKey] || '',
        [keyName]: data[paramCode] || '',
    };
};

const formatDataBeforeSave = (data, parentKey, schema) => {
    if (isEmpty(data) || isEmpty(parentKey) || isEmpty(schema)) {
        return null;
    }
    const newData = {};
    Object.keys(schema).forEach((item) => {
        Object.assign(newData, { [schema[item]]: data[`${parentKey}_${schema[item]}`] || null });
    });
    return newData;
};

const truncateToDecimals = (num, dec = 1) => {
    const calcDec = 10 ** dec;
    return Math.trunc(num * calcDec) / calcDec;
};

const roundToExchangeFee = (inputValue) => {
    const decimals = Number(inputValue) - Math.floor(inputValue);

    const percentile = Math.trunc(decimals.toFixed(1) * 10);
    if (Number(inputValue) > 20) {
        const outputValue = percentile > 0 ? 1 : 0;
        return Math.trunc(inputValue) + outputValue;
    }
    if (percentile === 0) {
        return Number(inputValue);
    }
    if (percentile === 0) {
        return Math.trunc(inputValue) + 0.5;
    }
    if (percentile > 0 && percentile <= 4) {
        return Math.trunc(inputValue) + 0.5;
    }
    if (percentile > 5) {
        return Math.trunc(inputValue) + 1;
    }
    return Number(inputValue);
};

export {
    saveFile,
    openFile,
    getBase64,
    randomAlphabets,
    formatMoney,
    formatNumberWithCommas,
    truncateToDecimals,
    formatNumberFixed,
    formatAddressInfo,
    patchInitialValue,
    formatDataBeforeSave,
    roundToExchangeFee,
    resizeFile,
};
