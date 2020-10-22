import "./app.css";
import Header from "./components/Header";
import { createElement } from "./utils/elements";
import Character from "./components/character";
import Characters from "./components/characters";
import { loadCharacters } from "./utils/api";

function App() {
  const header = Header();

  const characterContainer = Characters();

  const main = createElement("main", {
    className: "main",
    children: [characterContainer],
  });

  async function getCharacters(name) {
    const characters = await loadCharacters(name);
    const characterElements = characters.map((character) =>
      Character({
        name: character.name,
        imgSrc: character.image,
      })
    );
    characterContainer.innerHTML = "";
    characterContainer.append(...characterElements);
  }
  const searchBar = createElement("input", {
    className: "searchbar",
    onchange: (event) => getCharacters(event.target.value),
  });

  getCharacters();

  const container = createElement("div", {
    className: "container",
    children: [header, searchBar, main],
  });
  return container;
}

export default App;
