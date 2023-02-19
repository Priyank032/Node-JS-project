import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../App";
const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401 || !res) {
        window.alert("Please Logout Later");
      } else {
        dispatch({ type: "USER", payload: false });
        navigate("/");
        //window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return <div></div>;
};

export default Logout;
