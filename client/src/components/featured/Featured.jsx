import { InfoOutlined, PlayArrow } from "@material-ui/icons"
import "./featured.scss";

import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Featured({ type, setGenre }) {
    const [featured, setFeatured] = useState(null);

    useEffect(() => {
        const getFeatured = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/movies/random${type ? "?type=" + type : ""}`, {
                    headers: {
                        token: "abc eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmYwMDQzOWYwYjc0YjEzMzJiM2NmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNzEwMTI3OSwiZXhwIjoxNzA3NTMzMjc5fQ.0xTtMzlniwlmvR6OpvGuY-kvfVtud3B-vKqc-ftUDdA"
                    }
                });
                setFeatured(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        }
        getFeatured();
    }, [type]);

    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movie" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" onChange={e => { setGenre(e.target.value) }}>
                        <option value="">Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}
            <img src={featured?.img} alt="" />
            <div className="info">
                <img
                    src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
                    alt=""
                />
                <span className="desc">{featured?.desc}</span>
                <div className="buttons">
                    <Link className="link" to="/watch" state={featured} >
                        <button className="play">
                            <PlayArrow />
                            <span>Play</span>
                        </button>
                    </Link>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}