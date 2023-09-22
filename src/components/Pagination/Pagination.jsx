import PropTypes from "prop-types";
import css from "./Pagination.module.css";
import BackArrow from "./BackArrow";
import NextArrow from "./NextArrow";
import clsx from "clsx";

const Pagination = ({
  total,
  page,
  setPage,
  limit,
  pagesBetween = 3,
  maxPagesLimit,
}) => {
  let pageCount = Math.ceil(total / limit);
  if (maxPagesLimit && pageCount > maxPagesLimit) {
    pageCount = maxPagesLimit;
  }

  let startDots = false;
  let endDots = false;
  let endPage = false;

  if (pageCount > 1) {
    endPage = true;
  }

  const pagesBetweenArray = [];
  if (pageCount > 2) {
    const y = Math.floor(pagesBetween / 2);
    let start = page - y > 2 ? page - y : 2;
    if (start > pageCount - pagesBetween) {
      start = pageCount - pagesBetween;
    }
    const end =
      start + pagesBetween - 1 < pageCount - 1
        ? start + pagesBetween - 1
        : pageCount - 1;
    if (start > 2) {
      startDots = true;
    }
    if (end < pageCount - 1) {
      endDots = true;
    }
    for (let i = start; i <= end; i++) {
      pagesBetweenArray.push(i);
    }
  }

  const handleBtn = (num) => {
    setPage(num);
  };
  const handleRightBtn = () => {
    setPage(page + 1);
  };
  const handleLefttBtn = () => {
    setPage(page - 1);
  };

  return (
    <div className={css.wrapper}>
      <button
        onClick={handleLefttBtn}
        disabled={page === 1}
        className={css.directionBtn}
      >
        <BackArrow />
      </button>
      <button
        onClick={() => handleBtn(1)}
        className={clsx(css.numBtn, {
          [css.activePage]: page === 1,
        })}
      >
        1
      </button>
      {startDots && <span>...</span>}

      {pagesBetweenArray.map((num) => (
        <button
          key={num}
          onClick={() => handleBtn(num)}
          className={clsx(css.numBtn, {
            [css.activePage]: page === num,
          })}
        >
          {num}
        </button>
      ))}
      {endDots && <span>...</span>}
      {endPage && (
        <button
          onClick={() => handleBtn(pageCount)}
          className={clsx(css.numBtn, {
            [css.activePage]: page === pageCount,
          })}
        >
          {pageCount}
        </button>
      )}
      <button
        onClick={handleRightBtn}
        disabled={page === pageCount}
        className={css.directionBtn}
      >
        <NextArrow />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  setPage: PropTypes.func,
  total: PropTypes.number,
};
export default Pagination;
