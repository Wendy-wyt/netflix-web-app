import { Add, PlayArrow, ThumbUpAltOutlined, ThumbDownAltOutlined } from "@material-ui/icons";
import "./listitem.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Listitem({ index, itemId }) {
    const [isHovered, setIsHovered] = useState(false);
    const [item, setItem] = useState();
    useEffect(() => {
        const getItem = async () => {
            try {
                const newItem = await axios.get(`http://localhost:8800/api/movies/get/${itemId}`, {
                    headers: {
                        token: "abc eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmYwMDQzOWYwYjc0YjEzMzJiM2NmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNzEwMTI3OSwiZXhwIjoxNzA3NTMzMjc5fQ.0xTtMzlniwlmvR6OpvGuY-kvfVtud3B-vKqc-ftUDdA"
                    }
                });
                setItem(newItem.data);
            } catch (err) {
                console.log(err);
            }
        }
        getItem();

    }, [itemId]);

    return (
        <div
            className="listItem"
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link className="link" to="/watch" state={item} >
                <img
                    src={item?.imgSM}
                    alt=""
                />
                {isHovered &&
                    <>
                        <video src={item?.trailer} autoPlay={true} loop />
                        <div className='itemInfo'>
                            <div className='icons'>
                                <PlayArrow className='icon' />
                                <Add className='icon' />
                                <ThumbUpAltOutlined className='icon' />
                                <ThumbDownAltOutlined className='icon' />
                            </div>
                            <div className="itemInfoPop">
                                <span>{item?.duration}</span>
                                <span className="limit">{item?.limit}+</span>
                                <span>{item?.year}</span>
                            </div>
                            <div className="desc">{item?.desc}</div>
                            <div className="genre">{item?.genre}</div>
                        </div>
                    </>
                }
            </Link>
        </div>
    )
}
