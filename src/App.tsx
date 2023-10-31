import './App.css';
import CharacterCardsList from "./components/CharacterCardsList.tsx";
import {Route, Routes} from "react-router-dom";
import CharacterForm from "./components/CharacterForm.tsx";
import {useEffect, useState} from "react";
import RickAndMortyCharacter from "./interfaces/RickAndMortyCharacter.ts";
//import allCharacters from "./data/allCharacters.ts";
import axios from "axios";

function App() {
    const [characters , setCharacters] = useState<RickAndMortyCharacter[]>([]);

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character')
            .then(response => {
                setCharacters(response.data.results);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    console.log(characters.length);
    return (
        <Routes>
            <Route path={""} element={<CharacterCardsList characters={characters} setCharacters={setCharacters} />}/>
            <Route path={"/characters/add"} element={<CharacterForm characters={characters} setCharacters={setCharacters} />}/>
        </Routes>
    )
}

export default App
