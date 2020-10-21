import "./app.css";
import Header from "./components/Header";
import { createElement } from "./utils/elements";
import Character from "./components/character";
import Characters from "./components/characters";
import { getCharacterById } from "./utils/api";

function waitFor(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

function App() {
  const header = Header();

  const characters = Characters();
  const main = createElement("main", {
    className: "main",
    children: [characters],
  });

  async function getCharacters() {
    await waitFor(100);
    const firstCharacter = await getCharacterById(1);
    const secondCharacter = await getCharacterById(2);
    characters.append(
      Character({
        name: firstCharacter.name,
        imgSrc: secondCharacter.image,
      }),
      Character({
        name: secondCharacter.name,
        imgSrc: secondCharacter.image,
      })
    );
  }

  getCharacters();
  const container = createElement("div", { children: [header, main] });
  return container;
}

export default App;
