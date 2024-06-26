import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../API/api";
// import { useHistory } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle error here
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};


export default LogoutButton;
