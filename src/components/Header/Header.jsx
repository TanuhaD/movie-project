import { NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import css from "./Header.module.css";
import FormSearch from "../FormSearch/FormSearch";
import clsx from "clsx";
import Registration from "../Registration/Registration";
import { useSelector } from "react-redux";
import { userTokenSelector } from "../../redux/users/usersSelectors";

const Header = () => {
  const userToken = useSelector(userTokenSelector);
  const location = useLocation();
  const isLibrary = location.pathname.split("/").includes("library");

  return (
    <div
      id="header"
      className={clsx(css.container, "container", {
        [css.containerLibrary]: isLibrary,
      })}
    >
      <div className={css.wrapper}>
        <NavLink to="/" className={css.boxLogo}>
          <Logo className={css.logo} />
          <h1 className={css.title}>Filmoteka</h1>
        </NavLink>
        <nav className={css.wrapperNav}>
          <NavLink to="/" className={css.navLink}>
            Home
          </NavLink>

          {userToken && (
            <NavLink
              to="library/queue"
              className={clsx(css.navLink, {
                actived: isLibrary,
              })}
            >
              My Library
            </NavLink>
          )}
          <Registration />
        </nav>
      </div>
      {!isLibrary && <FormSearch />}

      {isLibrary && (
        <div className={css.wrapperheaderLibrary}>
          <NavLink to="library/watched" data-link className={css.btnLibrary}>
            Watched
          </NavLink>

          <NavLink to="library/queue" data-link className={css.btnLibrary}>
            Queue
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
