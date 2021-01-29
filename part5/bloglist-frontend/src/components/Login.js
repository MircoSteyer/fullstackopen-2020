import React, {useState} from 'react';

const Login = ({handleLogin}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onLoginSubmit = (e) => {
        e.preventDefault()
        handleLogin(username, password)
        setUsername("")
        setPassword("")
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={(e) => onLoginSubmit(e)}>
                <div>
                    <input type="text" placeholder={"username"} value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div>
                    <input type="password" placeholder={"password"} value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button type={"submit"}>Login</button>
            </form>
        </div>
    );
};

export default Login;
