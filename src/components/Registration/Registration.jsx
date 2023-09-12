import css from "./Registration.module.css";

import { useSelector } from "react-redux";

import { userTokenSelector } from "../../redux/users/usersSelectors";
import { onSignIn, onSignOut } from "../../googleAuth";

const Registration = () => {
  const userToken = useSelector(userTokenSelector);

  return (
    <>
      {!userToken && (
        <button type="submit" className={css.btn} onClick={onSignIn}>
          Sing in
        </button>
      )}
      {userToken && (
        <button type="submit" className={css.btn} onClick={onSignOut}>
          Sing out
        </button>
      )}
    </>
  );
};

export default Registration;
