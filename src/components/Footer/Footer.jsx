import css from "./Footer.module.css";
import FooterSvg from "./FooterSvg";

const Footer = () => {
  return (
    <div id="footer" className={css.container}>
      <div className={css.wrapper}>
        <p className={css.textFooter}>2023</p>
        <p className={css.textFooter}>All Rigths Reserved</p>
      </div>
      <div className={css.box}>
        <p className={css.text}>Developer</p>
        <FooterSvg className={css.svg} />
        <p className={css.text}>Demchenko Tetiana</p>
      </div>
    </div>
  );
};

export default Footer;
