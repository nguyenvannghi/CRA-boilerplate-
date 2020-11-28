import { INITIAL_PAGE } from 'app/consts';

const PAGE_SIZE = 10;

const getPagination = (totalItems, current, totalPages) => {
    // default to first page
    const currentPage = current || INITIAL_PAGE;
    let startPage = 1;
    let endPage;
    if (totalPages <= PAGE_SIZE) {
        // less than PAGE_SIZE total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else if (currentPage <= 6) {
        startPage = 1;
        endPage = PAGE_SIZE;
    } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
    } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems,
        currentPage,
        totalPages,
        startPage,
        endPage,
        pages,
    };
};
export default getPagination;
