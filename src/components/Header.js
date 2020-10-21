import "./header.css";
import { createElement } from "../utils/elements";

function Header() {
  const theme = createElement("h1", {
    innerText: "Rick and Morty",
    className: "header",
  });

  return theme;
}

export default Header;
