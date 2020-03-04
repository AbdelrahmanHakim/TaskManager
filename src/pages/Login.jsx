import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Spinner from "../components/UI/Spinner";

const keeeeey = "aa80e1124c140657";
function Login() {
  const [name, setName] = useState();

  const [apiKey, setKey] = useState("");

  const [loading, setLoading] = useState(false);


  const user = {
    name: name,
    apiKey: apiKey
  };

  let history = useHistory();

  function handleClick(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post("https://dev.teledirectasia.com:3092/login", user)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token.token);
        localStorage.setItem("name", res.data.token.name);
        
        //another way to pass data through url
        let queryparams = [];
        queryparams.push(
          "token" + "=" + encodeURIComponent(res.data.token.token)
        );
        queryparams.push(
          "userName" + "=" + encodeURIComponent(res.data.token.name)
        );
        const queryString = queryparams.join("&");

        history.push({
          pathname: "/Dashboard",
          search: "?" + queryString
        });
      })
      .catch(err => {
        alert("Try again");
        setLoading(false);
        console.log(err);
      });
  }
  const idHandler = event => {
    setKey(event.target.value);
  };

  const nameHandler = event => {
    setName(event.target.value);
  };

  let com = (
    <div className="container">
      <form>
        <label>Login</label>
        <input className="input"
          placeholder="Id"
          name="id"
          onChange={event => idHandler(event)}
        />
        <input className="input"
          placeholder="Name"
          name="name"
          onChange={event => nameHandler(event)}
        />
        <button onClick={handleClick}>Login</button>
      </form>
    </div>
  );

  return !loading ? com : <Spinner />;
}

export default Login;
