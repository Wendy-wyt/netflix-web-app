import { useContext, useState } from "react"
import "./login.scss"
import { Link, useNavigate } from "react-router-dom"
import { loginStart, loginFailure, loginSuccess } from "../../context/authContext/AuthActions";
import { AuthContext } from "../../context/authContext/AuthContext"
import axios from "axios";

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", { email, password });
            dispatch(loginSuccess(res.data));
            console.log(res.data)
            navigate("/");
        } catch (err) {
            dispatch(loginFailure());
            console.log("failed");
        }
        console.log(user);
    }

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                        className="logo" />
                </div>
            </div>
            <div className="container">
                <form action="">
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email or phone number" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="loginButton" onClick={(e) => handleLogin(e)}>Sign In</button>
                    <Link className="link" to="/register" replace><span>New to Netflix? <b>Sign up now</b></span></Link>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a
                        bot. <b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div >
    )
}
