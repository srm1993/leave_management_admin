import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://leave-management-backend-6nqt.onrender.com/admin/login", formData)
      .then((res) => {
        localStorage.setItem("userType", res.data[0].role);

        if (onLogin) {
          onLogin(res.data[0].role);
        }

        if (res.data) {
          navigate("/adminHome");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <section className="main-section">
        <div className="container">
          <div className="login-card">
            <div className="card-body">
              <h3 className="text-center mb-4">🔮 Welcome Back, Admin!</h3>
              <form onSubmit={handleSubmit}>
                <p className="form-label text-center mb-4">
                  Please login to your account
                </p>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>

                <div className="text-center pt-1 mb-5 pb-1">
                  <button className="btn btn-primary btn-block" type="submit">
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Login;
