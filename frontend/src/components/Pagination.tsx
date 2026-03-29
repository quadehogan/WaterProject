interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }: PaginationProps) => {

    return(
    <>
        <div className="container d-flex align-items-center gap-2 my-3 flex-wrap">
        <button
            className="btn btn-outline-primary"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
        >
            &laquo; Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
            <button
            key={i}
            className={`btn ${i === currentPage ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onPageChange(i)}
            >
            {i + 1}
            </button>
        ))}

        <button
            className="btn btn-outline-primary"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
        >
            Next &raquo;
        </button>

        <label className="d-flex align-items-center gap-2 ms-auto mb-0">
            Results per page:
            <select
            className="form-select form-select-sm w-auto"
            value={pageSize}
            onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(0); }}
            >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            </select>
        </label>
        </div>
    </>
    );
}

export default Pagination;