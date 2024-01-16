import axios from "axios";
import { useEffect, useState } from "react";

function GitInfoCard() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");

  const accessToken = "personal_access_token"; //added to fix axios 403 error

  useEffect(() => {
    if (username.trim() !== "") {
      axios
        .get(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => setUserData(response.data));
    }
  }, [username]);

  function putUsername(e) {
    setUsername(e.target.value);
  }

  const cardStyle = {
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)",
  };

  const avatarStyle = {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    margin: "8px 0",
    boxSizing: "border-box",
    border: "0px",
    borderRadius: "20px",
    backgroundColor: "#5AC69F",
  };

  return (
    <div style={cardStyle}>
      <input
        placeholder="Username"
        style={inputStyle}
        type="text"
        value={username}
        onChange={putUsername}
      />{" "}
      <br />
      <br />
      {userData && (
        <div>
          <img
            src={userData.avatar_url}
            alt="DP"
            width="100"
            style={avatarStyle}
          />
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <p>Location: {userData.location}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following:{userData.following}</p>
          <p>Public Repo: {userData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default GitInfoCard;
