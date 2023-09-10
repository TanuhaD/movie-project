import PropTypes from "prop-types";
import css from "./Pagination.module.css";
import BackArrow from "./BackArrow";
import NextArrow from "./NextArrow";
const Pagination = ({ total, page, setPage, limit }) => {
  let start = 0;
  let end = 0;
  const pageCount = Math.ceil(total / limit);
  let startDots = false;
  let endDots = false;
  let startPage = false;
  let endPage = false;

  if (pageCount <= 3) {
    start = 1;
    end = pageCount;
  } else if (page <= 2) {
    start = 1;
    end = 3;
    endDots = true;
    endPage = true;
  } else if (pageCount - page >= 2) {
    startPage = true;
    startDots = true;
    endDots = true;
    endPage = true;
    start = page - 1;
    end = page + 1;
  } else {
    startPage = true;
    startDots = true;
    start = pageCount - 2;
    end = pageCount;
  }

  const totalPage = [];
  for (let i = start; i <= end; i += 1) {
    totalPage.push(i);
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
      {startPage && (
        <button onClick={() => handleBtn(1)} className={css.numBtn}>
          1
        </button>
      )}
      {startDots && <span>...</span>}

      {totalPage.map((num) => (
        <button
          key={num}
          style={page === num ? { background: " #FF6B08 " } : {}}
          onClick={() => handleBtn(num)}
          className={css.numBtn}
        >
          {num}
        </button>
      ))}
      {endDots && <span>...</span>}
      {endPage && (
        <button onClick={() => handleBtn(pageCount)} className={css.numBtn}>
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
