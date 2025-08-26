import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";

const TodoRegisterPage = () => {
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
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <TextField label="Confirm Password" type="password" fullWidth />

          <Button variant="contained" size="large" fullWidth sx={{ mt: 1, borderRadius: 2 }}>
            Register
          </Button>
        </Box>

        {/* Login link */}
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="#" underline="hover">
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
