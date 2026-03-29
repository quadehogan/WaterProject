import './Pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }: PaginationProps) => {

    return (
        <div className="pagination">
            <button
                className="pagination__btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                &laquo; Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    className={`pagination__btn ${i === currentPage ? 'pagination__btn--active' : ''}`}
                    onClick={() => onPageChange(i)}
                >
                    {i + 1}
                </button>
            ))}

            <button
                className="pagination__btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
            >
                Next &raquo;
            </button>

            <label className="pagination__page-size">
                Results per page:
                <select
                    className="pagination__select"
                    value={pageSize}
                    onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(0); }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </div>
    );
}

export default Pagination;
