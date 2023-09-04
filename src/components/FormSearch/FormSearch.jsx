import { useDispatch } from "react-redux";
import css from "./FormSearch.module.css";
import Search from "./Search/Search";

import { useState } from "react";
import { getSearch } from "../../redux/operrations";

const FormSearch = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const handleClickSearch = (e) => {
    e.preventDefault();
    dispatch(getSearch(input));
  };
  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <form className={css.form} onSubmit={handleClickSearch}>
      <input
        type="text"
        className={css.input}
        placeholder="Movie search"
        onChange={handleChangeInput}
        value={input}
      />
      <button className={css.btnSearh}>
        <Search />
      </button>
    </form>
  );
};

export default FormSearch;
