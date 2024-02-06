import { ArrowBackIosOutlined } from "@material-ui/icons";
import "./watch.scss";
import { useLocation, Link } from "react-router-dom";

export default function Watch() {
    const location = useLocation();

    return (
        <div className="watch">
            <Link className="link" to={-1}>
                <div className="back">
                    <ArrowBackIosOutlined />
                    Back
                </div>
            </Link>
            <video
                src={location.state.video}
                autoPlay
                progress
                controls
                className="video" />

        </div>
    )
}
