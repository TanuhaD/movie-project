import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UpBtn from "../UpBtn/UpBtn";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <UpBtn />
      <Footer />
    </>
  );
};

export default SharedLayout;
