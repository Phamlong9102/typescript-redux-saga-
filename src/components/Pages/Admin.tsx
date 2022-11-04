import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { logoutStart } from "../../redux/auth/authSlice";

export function Admin() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutStart())
  }

  return (
    <>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="primary"
      >
        Logout
      </Button>
    </>
  );
}
