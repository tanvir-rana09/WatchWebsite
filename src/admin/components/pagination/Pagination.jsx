import ResponsivePagination from "react-responsive-pagination";

const Pagination = ({ currentPage, total, onPageChange, perPage }) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <nav
      className="flex items-center flex-col py-3 sm:flex-row justify-between space-y-3 md:items-center md:space-y-0"
      aria-label="Table navigation"
    >
      <span className="text-size font-normal ml-0.5 px-2 py-1.5 rounded-[4px] text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
        Showing
        <span className="mx-2  text-gray-900 ">
          {(currentPage - 1) * perPage + 1}
        </span>
        -
        <span className="mx-2  text-gray-900 ">
          {Math.min(currentPage * perPage, total)}
        </span>
        of{" "}
        <span className=" text-gray-900">
          {total}
        </span>
      </span>
      <div className="pb-1">
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={onPageChange}
        maxWidth={8} // This limits the number of visible page numbers
        previousLabel=""
        nextLabel=""
        pageItemClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="previous-item"
        nextClassName="next-item"
        activeClassName="active"
      />
      </div>
    </nav>
  );
};

export default Pagination;