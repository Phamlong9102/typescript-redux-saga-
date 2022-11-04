import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { loginStart } from "../../redux/auth/authSlice";

export function Login() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      loginStart({
        username: "",
        password: "",
      })
    );
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen	">
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Typography variant="h5" component="h1">
            Student Management
          </Typography>
          <Box mt={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}
