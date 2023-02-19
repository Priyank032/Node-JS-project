import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom";
const ForgotPass = () => {

  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch('http://localhost:3001/api/forgot_password', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email
        })
      });
      if (data.status == 200) {
        window.alert("reset password link set to your gmail Check your mail");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <img src="./assets/forgotpassword.jpg" />

          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Forgot Password?</h1>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email your registered Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)}

                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">
                Send Email
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>




















  );

};
export default ForgotPass;
