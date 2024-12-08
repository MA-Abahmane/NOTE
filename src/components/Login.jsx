import axios from "axios";
import React, { useState } from "react";

function Login(props) {
    const [cin, setCin] = useState("");
    const [password, setPassword] = useState("");

    const [Forgeted, setForgeted] = useState(false);

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post("https://notes.devlop.tech/api/login", {
                cin,
                password,
            });
            console.log(resp.data);
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("first", resp.data.user.first_name);
            localStorage.setItem("last", resp.data.user.last_name);
            props.setisConect(true);
        } catch (err) {
            console.error("Login error:", err.response ? err.response.data : err.message);
            alert("Login failed. Please check your credentials.");
        }
    };

    const setForget = () => {
        !Forgeted ? setForgeted(true) : setForgeted(false);
    };


    return (
        <>

            <div className="container   d-flex justify-content-center align-items-center vh-100">
                {/* Background video */}
                    <video autoPlay muted loop  className="background-video">
                        <source src="/sea.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                <div 
                    className="card p-4 shadow" 
                    style={{ width: "30rem" }}
                >
                
                    <h3 className="text-center mb-4">LOGIN</h3>
                    <br/>
                    <form onSubmit={Submit}>
                        <div className="mb-3">
                            <label htmlFor="cin" className="form-label">
                            &nbsp; CIN
                            </label>
                            <input
                                type="text"
                                id="cin"
                                className="form-control"
                                value={cin}
                                onChange={(e) => setCin(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                            &nbsp; Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                    <a href="#" className="text-center mt-2 color-red" onClick={setForget}> Forgot Password? </a>
                    {
                        Forgeted ? alert('Try: 123456') : null
                    }
                </div>
            </div>

        </>
    );
}

export default Login;
