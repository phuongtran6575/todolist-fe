import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../models/User";

const TodoRegisterPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User>(
      {
        id: 0,
        username: "",
        password: ""
      }
    )

  const handleRegister = () =>{
    axios.post(`http://localhost:8000/auth`, new URLSearchParams({
       username: user.username,
        password: user.password
    }), {headers: {
      "Content-Type": "application/x-www-form-urlencoded" 
    }}).then(() =>
    {
      setUser({
        id: 0,
        username: "",
        password: ""
      })
      navigate("/")
    }).catch(e => console.log(e))
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#f9fafb">
      {/* Title */}
      <Typography variant="h3" fontWeight="bold" color="text.primary" gutterBottom>
        Todo List
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Please login or register to continue.
      </Typography>

      {/* Register Card */}
      <Paper elevation={3}
        sx={{mt: 5,p: 4,borderRadius: 3,width: "100%",maxWidth: 400,}}>
        <Typography variant="h6" align="center" fontWeight="bold">
          Create Account
        </Typography>

        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField onChange={e => {setUser({...user, username: e.target.value})}} label="Email" type="email" fullWidth />
          <TextField onChange={e => {setUser({...user, password: e.target.value})}} label="Password" type="password" fullWidth />
          {/*<TextField label="Confirm Password" type="password" fullWidth />*/}

          <Button onClick={handleRegister} variant="contained" size="large" fullWidth sx={{ mt: 1, borderRadius: 2 }}>
            Register
          </Button>
        </Box>

        {/* Login link */}
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/"  >
            Login
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

export default TodoRegisterPage;
