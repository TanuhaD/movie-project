import { useSelector } from "react-redux";
import { userTokenSelector } from "../../redux/users/usersSelectors";
import SignIn from "../SignIn/SignIn";

export const PrivateRoute = ({ component: Component }) => {
  const token = useSelector(userTokenSelector);

  return token ? Component : <SignIn />;
};
