import { useEffect, useRef } from "react";
import ArrowUpSvg from "./ArrowUpSvg";
import css from "./UpBtn.module.css";
import throttle from "lodash.throttle";

const UpBtn = () => {
  const btnRef = useRef();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const addThrottledScrollEvent = throttle(() => {
    if (window.scrollY > 1000) {
      btnRef.current.classList.add(css.visible);
    } else {
      btnRef.current.classList.remove(css.visible);
    }
  }, 300);
  useEffect(() => {
    document.addEventListener("scroll", addThrottledScrollEvent);

    return () => {
      document.removeEventListener("scroll", addThrottledScrollEvent);
    };
  }, []);

  return (
    <button ref={btnRef} className={css.upBtn} onClick={scrollToTop}>
      Up
      <ArrowUpSvg className={css.arrowUpSvg} />
    </button>
  );
};

export default UpBtn;
