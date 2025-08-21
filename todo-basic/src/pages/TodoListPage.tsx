import { Box, Typography, TextField, Button, Paper, List, ListItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import type { Todo } from "../models/Todo";
import TodoCard from "../components/TodoCard";
import axios from "axios";

const TodoListPage = () => {

  const[todo, setTodo] = useState<Todo>({id:0, name:""})
  const[todos, setTodos] = useState<Todo[]>([])
  
  

  const fetchTodos = () =>{
    axios.get(`http://localhost:8000/todos`).then(response => setTodos(response.data)).catch(e => console.log(e))
  }
  useEffect(() =>{
    fetchTodos()
  },[])

  const handleAddTodo = () =>{
    axios.post(`http://localhost:8000/todos`, {name: todo.name}).then(response =>
    {
      setTodos([...todos, response.data])
      setTodo({id:0, name:""})      
    }
    ).catch(e => console.log(e))
  }
  const handleDeleteTodo = (id: number) => {
    axios.delete(`http://localhost:8000/todo/${id}`)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      })
      .catch(err => console.error(err));
  };

  

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f7fb">
      <Box maxWidth={500} width="100%">
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Todo List
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={3}>
          A simple and elegant way to manage your tasks.
        </Typography>

        {/* Todo Container */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          {/* Input */}
          <Box display="flex" gap={1} mb={3}>
            <TextField onChange={e=>setTodo({...todo, name: e.target.value})} value={todo.name} fullWidth placeholder="Add a new task..." variant="outlined" size="small"/>
            <Button onClick={handleAddTodo} variant="contained" sx={{ minWidth: 48, borderRadius: 2, bgcolor: "#9c8cff" }}>
              <AddIcon />
            </Button>
          </Box>

          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Your Tasks
            </Typography>
            <Typography variant="body2" sx={{px: 1.5, py: 0.5, bgcolor: "#f1f3f9", borderRadius: 2, fontSize: "0.8rem",}}>
              0 / 3 Done
            </Typography>
          </Box>

          {/* Task List */}
          <Box display="flex" flexDirection="column" gap={1.5}>
            <List>
              {
                todos.map(todo=>(
                  <ListItem key={todo.id}>
                    <TodoCard todo={todo} onDelete={() => handleDeleteTodo(todo.id)}/>
                  </ListItem>
                ))
              }
            </List>
          </Box>
        </Paper>

        {/* Footer */}
        <Typography textAlign="center" mt={3} fontSize="0.8rem" color="text.secondary">
          Built with React, TypeScript, and MUI.
        </Typography>
      </Box>
    </Box>
  );
};

export default TodoListPage;
