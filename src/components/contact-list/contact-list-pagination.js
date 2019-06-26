import React from 'react';

const customTotal = (from, to, size) => (
    <span className="pagination-showing-page">
        Showing { from } to { to } of { size } Results
      </span>
);

const pageButtonRenderer = ({
                                page,
                                active,
                                disable,
                                title,
                                onPageChange
                            }) => {
    const handleClick = (e) => {
        e.preventDefault();
        onPageChange(page);
        //move to global top scroll
        window.scrollTo(0, 0);
    };

    const activeStyle = {};
    if (active) {
        activeStyle.color = 'white';
        activeStyle.background = '#6699cc';
    } else {
        activeStyle.color = 'black';
    }
    if (typeof page === 'string') {
        activeStyle.color = 'black';
    }
    return (
        <li key={page} className="page-item">
            <a href="#" onClick={ handleClick } style={ activeStyle }>{ page }</a>
        </li>
    );
};

export default function getPaginationOptions(data) {
    const paginationOptions = {
        paginationSize: 5,
        pageStartIndex: 1,
        // alwaysShowAllBtns: true, // Always show next and previous button
        withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next',
        lastPageTitle: 'Last',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [
          {
            key: 0, text: '100', value: 100
          }
        ],
        pageButtonRenderer
    };
    return paginationOptions;
}
