import { Box, Button, TextField, Typography, Paper} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TodoRegisterPage from "./TodoRegisterPage";
import { useState } from "react";
import type { User } from "../models/User";


const TodoLoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<String | null>(null)
  const [user, setUser] = useState<User>(
    {
      id: 0,
      username: "",
      password: ""
    }
  )

  const handleLogin = () => {
  axios.post(
    "http://localhost:8000/auth/token",
    new URLSearchParams({
      username: user.username,
      password: user.password,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  )
  .then((response) => {
    console.log("Login response:", response.data); // 👈 debug ở đây

    const access_token = response.data.access_token;
    if (access_token) {
      localStorage.setItem("token", access_token);
      navigate("/todolist");
      alert("Login Successfull")
    } else {
      console.error("No access_token in response:", response.data);
    }
  })
  .catch((err) => {
    if(err.response)
    {
      switch(err.response.status){
        case 401: 
          setError("Sai mật khẩu hoặc tài khoản")
          break;
        case 402:
          setError("Bạn không có quyền truy cập")
          break;
        case 409:
          setError("Tên đăng nhập đã tồn tại")
          break
        default:
          setError(err.response.data?.detail || "Có lỗi xảy ra");
      }
    } else {
      setError("Không thể kết nối tới server");
    }
  });
};

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#f9fafb">
      {/* Title */}
      <Typography variant="h3" fontWeight="bold" color="text.primary" gutterBottom>
        Todo List
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Please login or register to continue.
      </Typography>

      {/* Login Card */}
      <Paper elevation={3}
        sx={{mt: 5, p: 4, borderRadius: 3, width: "100%", maxWidth: 400,}}>
        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
          Login
        </Typography>

        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField onChange={e => setUser({...user, username: e.target.value})} label="Email" type="email" fullWidth />
          <TextField onChange={e => setUser({...user, password: e.target.value})} label="Password" type="password" fullWidth />

          <Button onClick={handleLogin} variant="contained" size="large" fullWidth sx={{ mt: 1, borderRadius: 2 }}>
            Login
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Box>

        {/* Register link */}
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
          Don&apos;t have an account?{" "}
          <Link to="/register" >
            Register
          </Link>
        </Typography>
      </Paper>

      {/* Footer */}
      <Typography variant="caption" color="text.secondary" sx={{ mt: 4 }} align="center">
        Built with React, TypeScript, and Material UI.
      </Typography>
    </Box>
  );
};

export default TodoLoginPage;
