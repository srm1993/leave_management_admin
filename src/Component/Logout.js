import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("useType");
    navigate("/");
  }, [navigate]);
  return null;
}
export default Logout;
