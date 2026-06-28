import clsx from "clsx";
import { useEffect, useState } from "react";

const Pagination = ({ items, setItems, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage; // 4
    const endIndex = startIndex + itemsPerPage; // 8
    const paginatedItems = [...items].reverse().slice(startIndex, endIndex);

    setItems(paginatedItems);
  }, [currentPage, items]);

  const changePageHandler = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumber = () => {
    const pageNumbers = [];

    for (let i = 1; i <= pagesCount; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => changePageHandler(i)}
          className={clsx("pagination-button", {
            "active-tab": currentPage === i,
            "non-active-tab": currentPage !== i,
          })}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination bg-zinc-50/40" dir="rtl">
      <button
        disabled={currentPage === 1}
        onClick={() => changePageHandler(currentPage - 1)}
        className={clsx("pagination-prev-button", {
          "pages-ended active-tab": currentPage === 1,
        })}
      >
        قبلی
      </button>

      {renderPageNumber()}

      <button
        disabled={currentPage === pagesCount}
        onClick={() => changePageHandler(currentPage + 1)}
        className={clsx("pagination-next-button", {
          "pages-ended active-tab": currentPage === pagesCount,
        })}
      >
        بعدی
      </button>
    </div>
  );
};

export default Pagination;
