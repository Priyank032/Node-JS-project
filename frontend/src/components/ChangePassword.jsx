import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const naavigate = useNavigate();
  const USERI = localStorage.getItem("userid");
  const initialValue = {
    oldpassword: "",
    password: "",
    _id: USERI,
  };

  const [user, setUser] = useState(initialValue);
  const [cpassword, setCpassword] = useState("");
  const { password, oldpassword } = user;

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("new Password and confirm password doesnt match");
    } else {
      try {
        const res = await fetch("http://localhost:3001/update-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
          }),
        });

        if (res.status === 400 || !res) {
          window.alert("failed");
        } else {
          window.alert("password updated sucessfully ");
          naavigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <img src="./assets/changepassword.jpg" />
          </div>
          <div className="col-md-6 p-5">
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Current Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="oldpassword"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="cpassword"
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 mt-4 rounded-pill"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
