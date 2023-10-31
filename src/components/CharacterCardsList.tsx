import "./CharacterCardsList.css";
import {ChangeEvent, useState} from "react";
import CharacterCard from "./CharacterCard.tsx";
import RickAndMortyCharacter from "../interfaces/RickAndMortyCharacter.ts";
import SearchInput from "./SearchInput.tsx";
import ErrorMessage from "./ErrorMessage.tsx";
import {Link} from "react-router-dom";
import allCharacters from "../data/allCharacters.ts";
//import Pagination from "./Pagination.tsx";
import axios from "axios";

type Props = {
    characters: RickAndMortyCharacter[],
    setCharacters: (value:RickAndMortyCharacter[]) => void
}

function CharacterCardsList(props:Props) {
    const [count , setCount] = useState<number>(0);
    //console.log("Card list characters: "+props.characters.length);
    const [actualSite,setActualSite] = useState<number>(1);

    function getSide (newSite:number){
        axios.get('https://rickandmortyapi.com/api/character?page=' + newSite)
            .then(response => {
                props.setCharacters(response.data.results)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function onChangeHandler(event:ChangeEvent<HTMLInputElement>):void{
        const searchedCharacters:RickAndMortyCharacter[] = allCharacters
            .filter((character:RickAndMortyCharacter) =>
                character.name.includes(event.target.value) ||
                character.gender.includes(event.target.value) ||
                character.species.includes(event.target.value) ||
                character.status.includes(event.target.value)
            )
        props.setCharacters(searchedCharacters);
    }

    function onClickHandler() {
        const initialCount:number = count;
        const searchedCharacters:RickAndMortyCharacter[] = [];
        for (let i = initialCount; i < initialCount+5; i++) {
            searchedCharacters.push(allCharacters[i])
        }
        count<allCharacters.length-5 ? setCount(initialCount+5) : setCount(0);
        props.setCharacters(searchedCharacters);
    }



    return (
        <section className={"characters-list"}>
            <Link to={"/characters/add"}>Add</Link>
            <h1>Rick and morty</h1>
            <SearchInput onChangeFunction={onChangeHandler} onClickFunction={onClickHandler} total={props.characters.length}/>
            <br/>
            <div>
                <button onClick={() => {
                    if(actualSite>=1) {
                        let newSite = actualSite;
                        newSite--;
                        setActualSite(newSite);
                        getSide(newSite);
                    }
                }}>Previous</button>
                <button onClick={() => {
                    let newSite = actualSite;
                    newSite++;
                    setActualSite(newSite);
                    getSide(newSite);
                }}>Next</button>
            </div>
            <div className={"characters-list-grid"}>
                {props.characters.length === 0 ? <ErrorMessage /> :props.characters.map((character:RickAndMortyCharacter) => {
                    return (<CharacterCard
                        key={character.id}
                        id={character.id}
                        name={character.name}
                        status={character.status}
                        species={character.species}
                        gender={character.gender}
                        imageUrl={character.image}
                    />)
                })}
            </div>
            <div>
                <button onClick={() => {
                    if(actualSite>=1) {
                        let newSite = actualSite;
                        newSite--;
                        setActualSite(newSite);
                        getSide(newSite);
                    }
                }}>Previous</button>
                <button onClick={() => {
                    let newSite = actualSite;
                    newSite++;
                    setActualSite(newSite);
                    getSide(newSite);
                }}>Next</button>
            </div>
        </section>
    )
}

export default CharacterCardsList;
