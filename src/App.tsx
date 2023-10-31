import './App.css';
import CharacterCardsList from "./components/CharacterCardsList.tsx";
import {Route, Routes} from "react-router-dom";
import CharacterForm from "./components/CharacterForm.tsx";
import {useEffect, useState} from "react";
import RickAndMortyCharacter from "./interfaces/RickAndMortyCharacter.ts";
import axios from "axios";

function App() {
    const [isLoading,setIsLoading] = useState(true)
    const [characters , setCharacters] = useState<RickAndMortyCharacter[]>([]);

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character')
            .then(response => {
                setCharacters(response.data.results);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false)
            });
    }, []);

    if(isLoading) {
        return <h2>Is loading</h2>
    }

    return (
        <Routes>
            <Route path={""} element={<CharacterCardsList characters={characters} setCharacters={setCharacters} />}/>
            <Route path={"/characters/add"} element={<CharacterForm characters={characters} setCharacters={setCharacters} />}/>
        </Routes>
    )
}

export default App
