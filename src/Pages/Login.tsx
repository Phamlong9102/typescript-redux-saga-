import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { dataLoginSuccess, loginStart } from "../components/auth/authSlice";
import { CircularProgress } from "@mui/material";

export function Login() {
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(dataLoginSuccess)

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
            {isLogging && <CircularProgress size={16} color="secondary" />} &nbsp;
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
