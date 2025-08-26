import {Box,Typography,TextField,Button,Paper,List,ListItem,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import type { Todo } from "../models/Todo";
import axios from "axios";
import TodoCard from "../components/TodoCard";
import TodoModal from "../components/TodoModal";

const TodoListPage = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"add" | "edit">("add")
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  
  const fetchTodos = () =>{
    axios.get(`http://localhost:8000/todos`).then(response => 
      setTodos(response.data)
    ).catch(e => console.error(e))
  }

  useEffect(() =>
  {
    fetchTodos()
  }, [])

  const handleOpenAddModal = () =>{
    setSelectedTodo(null)
    setMode("add")
    setOpen(true)
  }

  const handleOpenEditModal = (todo:Todo) => {
    setSelectedTodo(todo)
    setMode("edit")
    setOpen(true)
  }
  
  const handleClose= () =>{
    setOpen(false)
    
  }

  const handleDeleteTodo = (id:number) =>{
    axios.delete(`http://localhost:8000/todos/${id}`).then(() =>
       setTodos(prev => prev.filter(todo => todo.id !== id))
    ).catch(e => console.error(e))
  }

  return (
    <Box display="flex"  justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f7fb">
      <Box maxWidth={700} width="100%">
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Todo List
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={3}>
          A simple and elegant way to manage your tasks.
        </Typography>
        <TodoModal open={open} mode={mode} handleClose={handleClose} fetchTodos={fetchTodos} initalData={selectedTodo}/>

        {/* Todo Container */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          {/* Search + Add */}
          <Box display="flex" gap={1} mb={3}>
            <TextField fullWidth placeholder="Filter tasks by name or content..." variant="outlined" size="small"/>
            <Button onClick={handleOpenAddModal}  variant="contained" startIcon={<AddIcon />}
              sx={{ width:"30%", borderRadius: 2, bgcolor: "purple", textTransform: "none", fontWeight: "bold",}}>
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
                    <TodoCard todo={todo} onDelete={() =>handleDeleteTodo(todo.id)} onEdit={() => handleOpenEditModal(todo)}/>
                  </ListItem>
                ))
              }
            </List>
          </Box>
        </Paper>

        {/* Footer */}
        <Typography textAlign="center" mt={3} fontSize="0.8rem" color="text.secondary">
          Task List
        </Typography>
      </Box>
    </Box>
  );
};

export default TodoListPage;
