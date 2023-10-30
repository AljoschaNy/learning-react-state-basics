import './App.css';
import CharacterCardsList from "./components/CharacterCardsList.tsx";
import {Route, Routes} from "react-router-dom";
import CharacterForm from "./components/CharacterForm.tsx";

function App() {
    return (
        <Routes>
            <Route path={""} element={<CharacterCardsList />}/>
            <Route path={"/add"} element={<CharacterForm />}/>

        </Routes>
    )
}

export default App
