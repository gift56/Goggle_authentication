import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const responseCallback = (res) => {
    console.log("Encoded jwt token" + res.credential);
    const userData = jwtDecode(res.credential);
    setCurrentUser(userData);
    document.getElementById("signinDiv").hidden = true;
  };

  useEffect(() => {
    /* Google initailization */
    google.accounts.id.initialize({
      client_id: process.env.AUTH_KEY,
      callback: responseCallback,
    });
    google.accounts.id.renderButton(document.getElementById("signinDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div>
      <div id="signinDiv"></div>
      {currentUser && (
        <div>
          <img src={currentUser.picture} alt="" />
          <h3>{currentUser.name}</h3>
        </div>
      )}
    </div>
  );
}
