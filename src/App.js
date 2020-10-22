import "./app.css";
import Header from "./components/Header";
import { createElement } from "./utils/elements";
import Character from "./components/character";
import Characters from "./components/characters";
import { loadCharacters } from "./utils/api";
import Search from "./components/searchbar";

function App() {
  const header = Header();

  let nextPage = null;
  let lastName = null;

  const characterContainer = Characters();

  const loadMoreButton = createElement("button", {
    className: "button",
    innerText: "Load more characters",
    onclick: () => {
      getCharacters(lastName, nextPage);
    },
  });

  const main = createElement("main", {
    className: "main",
    children: [characterContainer, loadMoreButton],
  });

  async function getCharacters(name, page) {
    const characters = await loadCharacters(name, page);
    const characterElements = characters.results.map((character) =>
      Character({
        name: character.name,
        imgSrc: character.image,
      })
    );

    characterContainer.append(...characterElements);

    nextPage = characters.info.next?.match(/\d+/)[0];
    loadMoreButton.disabled = !characters.info.next;
    lastName = name;

    main.append(loadMoreButton);
  }

  const search = Search({
    onchange: (value) => {
      characterContainer.innerHTML = "";
      getCharacters(value);
    },
  });

  getCharacters();

  const container = createElement("div", {
    className: "container",
    children: [header, search, main],
  });

  window.addEventListener("scroll", () => {
    const offsetY =
      loadMoreButton.offsetParent.offsetHeight - window.innerHeight - 200;
    if (offsetY < window.pageYOffset) {
      loadMoreButton.click();
    }
  });

  return container;
}

export default App;
