import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';


const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = "RIGHT";


/**
 * Helper method for creating a range of numbers 
 * range(1,5) => [1,2,3,4,5]
 */
const range = (from, to, step = 1) => {
    let range = [];
    for (let i = from; i <= to; i += step)
        range.push(i);
    return range;
}

class Paginator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1
        }
    }

    setupProps = () => {
        const { totalItems, pageSize, totalPages } = this.props;

        this.pageSize = typeof pageSize === 'number' ? pageSize : 20;
        this.totalItems = typeof totalItems === 'number' ? totalItems : 0;
        this.pageItemPads = 2;
        this.totalPages = typeof totalPages === 'number' ? totalPages : Math.ceil(this.totalItems / this.pageSize);

    }

    gotoPage = (page) => {
        const { onPageChanged = (f) => f } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));

        this.setState({ currentPage }, () => onPageChanged(currentPage));
    }
    componentDidMount() {
    }

    handleClick = (page) => evt => {
        evt.preventDefault();
        this.gotoPage(page);
    }

    handleMoveLeft = (evt) => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage - (this.pageNeighbours * 2) - 1);
    }

    handleMoveRight = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage + (this.pageNeighbours * 2) + 1);
    }


    fetchPages = () => {

        const currentPage = this.state.currentPage;

        const totalNumbers = (this.pageItemPads * 2) + 3; // total page numbers to show on the control
        const totalBlocks = totalNumbers + 2; // totalNumber +2 to cover for the left(<) and right(>) controls

        if (this.totalPages > totalBlocks) {

            const startPage = Math.max(2, currentPage - this.pageItemPads);
            const endPage = Math.min(this.totalPages - 1, currentPage + this.pageItemPads);

            let pages = range(startPage, endPage);

            /**
            * hasLeftSpill: has hidden pages to the left
            * hasRightSpill: has hidden pages to the right
            * spillOffset: number of hidden pages either to the left or to the right
            */
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (this.totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }
                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }
                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }
            return [1, ...pages, this.totalPages];
        }
        return range(1, this.totalPages);
    }

    render() {
        this.setupProps();
        if (!this.totalItems || this.totalPages === 1)
            return null;
        const { currentPage } = this.state;
        const pages = this.fetchPages();

        return (
            <Fragment>
                <div className="w-100 pt-2 d-flex flex-row flex-wrap align-items-center justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        {currentPage && (
                            <span className="current-page pl-3 d-inline-block h-100 text-secondary">
                                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{this.totalPages}</span>
                            </span>
                        )}
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <nav aria-label="navigation">
                            <ul className="pagination">
                                {pages.map((page, index) => {
                                    if (page === LEFT_PAGE) return (
                                        <li key={index} className="page-item">
                                            <a href="#" className="page-link" aria-label="Previous" onClick={this.handleMoveLeft()}>
                                                <span aria-hidden="true">&laquo;</span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                        </li>
                                    );

                                    if (page === RIGHT_PAGE) return (
                                        <li key={index} className="page-item">
                                            <a href="#" className="page-link" aria-label="Next" onClick={this.handleMoveRight()}>
                                                <span aria-hidden="true">&raquo;</span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </li>
                                    );
                                    return (
                                        <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                                            <a className="page-link" href="#" onClick={this.handleClick(page)}>{page}</a>
                                        </li>
                                    );
                                })}
                                <li className="page-item">
                                    <a href="#" className="page-link" aria-label="Previous"></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Fragment>
        )
    }
}

Paginator.propTypes = {
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    totalPages: PropTypes.number,
    onPageChanged: PropTypes.func,
}

export default Paginator;
