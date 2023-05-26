import React from "react";
import logo from "../../images/logo.png";
import profile from "../../images/profile.png";
import "./Header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    const storedToken = sessionStorage.getItem("accessToken");
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const accessToken = JSON.parse(storedToken);

    axios
      .post(`http://127.0.0.1:8000/api/logout/id=${storedUser.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="sub-container">
          <div className="logo">
            <img src={logo} className="logo-image" />
          </div>
          <div className="menu">
            <div className="profile">
              <ul>
                <li>
                  <img src={profile} className="profile" />
                  <ul>
                    <li className="sub-item">
                      <p onClick={logout}>Logout</p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
