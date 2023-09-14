import { useEffect, useRef } from "react";
import css from "./SignIn.module.css";

const SingIn = () => {
  const container = useRef();

  useEffect(() => {
    const header = document.querySelector("#header");
    const footer = document.querySelector("#footer");
    if (header && footer && container.current) {
      container.current.style.height =
        window.innerHeight - header.scrollHeight - footer.scrollHeight + "px";
    }
  }, []);
  return (
    <div ref={container} className={css.container}>
      <h2 className={css.title}>Please sign in to see your library</h2>
      <button className={css.btn}></button>
    </div>
  );
};

export default SingIn;
