import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged In Successfully", "success");
      history("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            value={credentials.email}
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={credentials.password}
            type="password"
            class="form-control"
            id="password"
            name="password"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
