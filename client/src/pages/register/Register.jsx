import "./register.scss";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const navigate = useNavigate();

    const handleStart = () => {
        setEmail(emailRef.current.value)
    };

    const handleFinish = async (e) => {
        e.preventDefault();
        setPassword(passwordRef.current.value);
        setUsername(usernameRef.current.value);
        try {
            await axios.post("http://localhost:8800/api/auth/register", { email, password, username });
            navigate("/login")
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                        className="logo" />
                    <Link className="link" to="/login" replace>
                        <button className="loginButton">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime. </h2>
                <p>
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                {!email ? (
                    <div className="input">
                        <input type="email" placeholder="email address" ref={emailRef} />
                        <button className="registerButton" onClick={handleStart}>
                            Get Started
                        </button>
                    </div>
                ) : (
                    <form className="input">
                        <input type="username" placeholder="username" ref={usernameRef} />
                        <input type="password" placeholder="password" ref={passwordRef} />
                        <button className="registerButton" onClick={handleFinish}>
                            Start
                        </button>
                    </form>
                )}
            </div>
        </div >
    )
}
