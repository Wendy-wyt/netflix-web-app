import Featured from "../../components/featured/Featured"
import Navbar from "../../components/navbar/Navbar"
import List from "../../components/list/List"
import "./home.scss"
import axios from "axios"
import { useState, useEffect } from "react"

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/lists${type ? "?type=" + type + (genre ? "&genre=" + genre : "") : ""}`, {
                    headers: {
                        token: "abc eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmYwMDQzOWYwYjc0YjEzMzJiM2NmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNzEwMTI3OSwiZXhwIjoxNzA3NTMzMjc5fQ.0xTtMzlniwlmvR6OpvGuY-kvfVtud3B-vKqc-ftUDdA"
                    }
                });
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getRandomLists();
    }, [type, genre]);

    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            {lists.map((list, i) => (<List list={list} key={i} />))}
        </div>
    )
}

export default Home