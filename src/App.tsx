import './App.css';
import CharacterCardsList from "./components/CharacterCardsList.tsx";
import {Route, Routes} from "react-router-dom";
import CharacterForm from "./components/CharacterForm.tsx";
import {useState} from "react";
import RickAndMortyCharacter from "./interfaces/RickAndMortyCharacter.ts";
import allCharacters from "./data/allCharacters.ts";

function App() {
    const [characters , setCharacters] = useState<RickAndMortyCharacter[]>(allCharacters);

    return (
        <Routes>
            <Route path={""} element={<CharacterCardsList characters={characters} setCharacters={setCharacters} />}/>
            <Route path={"/characters/add"} element={<CharacterForm characters={characters} setCharacters={characters => setCharacters(characters)} />}/>
        </Routes>
    )
}

export default App
