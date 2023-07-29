import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = (props) => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            onChange={onChange}
            type="email"
            class="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
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
            required
            minLength={5}
            onChange={onChange}
            type="password"
            class="form-control"
            id="password"
            name="password"
          />
        </div>
        <div class="mb-3">
          <label for="cpassword" class="form-label">
            Confirm Password
          </label>
          <input
            required
            minLength={5}
            onChange={onChange}
            type="password"
            class="form-control"
            id="cpassword"
            name="cpassword"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
