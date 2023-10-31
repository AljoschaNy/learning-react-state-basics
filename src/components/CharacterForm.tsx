import {useState} from "react";
import {Link} from "react-router-dom";
import RickAndMortyCharacter from "../interfaces/RickAndMortyCharacter.ts";

type Props = {
    characters: RickAndMortyCharacter[],
    setCharacters: (value:RickAndMortyCharacter[]) => void
}

function CharacterForm(props:Props) {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [species, setSpecies] = useState("");
    const [status, setStatus] = useState("");


    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newCharacters = props.characters.map(elem => elem);
        console.log(newCharacters);
        newCharacters.push({
            created: "",
            episode: [],
            image: "",
            location: {name: "", url: ""},
            origin: {name: "", url: ""},
            type: "",
            url: "",
            id: props.characters.length+1,
            name,
            status,
            species,
            gender
        });
        props.setCharacters(newCharacters)


    }

    return (
        <div>
            <Link to={"/"}>Home</Link>
            <h2>Add Character</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type={"text"}
                        value={name}
                        onChange={event => setName(event.target.value)}
                        required={true}
                    />
                </label>
                <label>
                    Gender
                    <input
                        type={"text"}
                        value={gender}
                        onChange={event => setGender(event.target.value)}
                    />
                </label>
                <label>
                    Specie
                    <input
                        type={"text"}
                        value={species}
                        onChange={event => setSpecies(event.target.value)}
                    />
                </label>
                <label>
                    Status
                    <input
                        type={"text"}
                        value={status}
                        onChange={event => setStatus(event.target.value)}
                    />
                </label>
                <br/>
                <button>Add</button>
            </form>
        </div>

    )
}

export default CharacterForm;