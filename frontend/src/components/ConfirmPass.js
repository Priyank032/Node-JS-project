import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const ConfirmPass = () => {
  const naavigate = useNavigate();
  const location = useLocation();
  const { token, id } = queryString.parse(location.search);
  console.log(token);
  console.log(id);

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  //   const { password, showPassword } = user;

  const handleChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("Password doesnt match");
    } else {
      try {
        const data = await fetch(`http://localhost:3001/reset-password?token=${token}&id=${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password
          })
        });
        console.log(data);
        if (data.status == 200) {
          window.alert("password reset sucessfully Now you can login");
          naavigate("/login")
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
            <img src="./assets/resetpassword.jpg" />
          </div>
          <div className="col-md-6 p-5">
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Update Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1s"
                  name="password"
                  value={password}
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
                  name="password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">
                Update Date
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ConfirmPass;
