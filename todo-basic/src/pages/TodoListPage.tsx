import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Radio,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import type { Todo } from "../models/Todo";
import axios from "axios";
import TodoCard from "../components/TodoCard";
import { Filter } from "@mui/icons-material";

const TodoListPage = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    description: "",
    name: "",
    created_ad: "",
    due_at: "",
    isDone: false,
  })

  const fetchTodos = () =>{
    axios.get(``).then(response => 
      setTodos(response.data)
    ).catch(e => console.error(e))
  }

  useEffect(() =>
  {
    fetchTodos()
  }, [])

  const handleDeleteTodo = (id:number) =>{
    axios.delete(``).then(() =>
       setTodos(prev => prev.filter(todo => todo.id ==id))
    ).catch(e => console.error(e))
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f7fb">
      <Box maxWidth={650} width="100%">
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Todo List
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={3}>
          A simple and elegant way to manage your tasks.
        </Typography>

        {/* Todo Container */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          {/* Search + Add */}
          <Box display="flex" gap={1} mb={3}>
            <TextField fullWidth placeholder="Filter tasks by name or content..." variant="outlined" size="small"/>
            <Button variant="contained" startIcon={<AddIcon />}
              sx={{ borderRadius: 2, bgcolor: "purple", textTransform: "none", fontWeight: "bold",}}>
              Add New Task
            </Button>
          </Box>

          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Your Tasks
            </Typography>
            <Typography variant="body2"
              sx={{ px: 1.5, py: 0.5, bgcolor: "#f1f3f9", borderRadius: 2, fontSize: "0.8rem",}}>
              1 / 3 Done
            </Typography>
          </Box>

          {/* Task List */}
          <Box display="flex" flexDirection="column" gap={2}>
            <List>
              {
                todos.map(todo => (
                  <ListItem key={todo.id}>
                    <TodoCard todo={todo} onDelete={() =>handleDeleteTodo(todo.id)}/>
                  </ListItem>
                ))
              }
            </List>
          </Box>
        </Paper>

        {/* Footer */}
        <Typography
          textAlign="center"
          mt={3}
          fontSize="0.8rem"
          color="text.secondary"
        >
          Built with React, TypeScript, and MUI.
        </Typography>
      </Box>
    </Box>
  );
};

export default TodoListPage;
