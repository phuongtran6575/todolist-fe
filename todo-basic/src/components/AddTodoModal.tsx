import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react';
import type { Todo } from '../models/Todo';
import axios from 'axios';

interface AddTodoModalProps{
    open: boolean
    handleClose: () => void
    fetchTodos: () => void 
    mode: boolean
  }

const AddTodoModal = ({open, mode, handleClose, fetchTodos}:AddTodoModalProps) => {
  const[todo, setTodo] = useState<Todo>(
    {
      id: 0,
      description: "",
      name: "",
      created_at: "",
      due_at: "",
      isDone: false
    }
  )
  // true = add modal, false = edit modal

  const handleAddTodo = () =>{ 
    axios.post(`http://localhost:8000/todos`, {
    description: todo.description,
    name: todo.name,
    due_at: todo.due_at ? new Date(todo.due_at).toISOString() : null,
    isDone: todo.isDone
  })
  .then(() => {
    setTodo({
      id: 0,
      description: "",
      name: "",
      created_at: "", // chỉ để form hiển thị, backend không dùng
      due_at: "",     // reset input cho người dùng nhập tiếp
      isDone: false
    })
    handleClose();
    fetchTodos()
  })
  .catch(e => console.log(e));
  }

  const handleEditTodo = (id: number) =>{
    axios.put(`http://localhost:8000/todos/${id}`,{
      description: todo.description,
      name: todo.name,
      due_at: todo.due_at ? new Date(todo.due_at).toISOString() : null,
      isDone: todo.isDone
    }).then(() =>{
      setTodo({
        id: todo.id,
        description: todo.description,
        name: todo.name,
        created_at: todo.created_at, // chỉ để form hiển thị, backend không dùng
        due_at: todo.due_at,     // reset input cho người dùng nhập tiếp
        isDone: todo.isDone
        })
      handleClose()
    }).catch(e =>console.log(e))
  }

  const handleSaveTodo = () => {
    if(mode == true)
    {
      handleAddTodo()
    } else {
      handleEditTodo(todo.id)
    }
  
  }

  return (
    <Box>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm"
        slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}>
        <DialogTitle sx={{ fontWeight: "bold" }}>{mode == true ? "Add New Task" : "Edit Task"}</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {/* Task Name */}
            <TextField onChange={e => setTodo({...todo, name: e.target.value})} fullWidth label="Task Name" placeholder="e.g., Finish project proposal"/>

            {/* Content */}
            <TextField onChange={e => setTodo({...todo, description: e.target.value})} fullWidth multiline minRows={3} label="Content (Optional)" placeholder="Add more details about the task..."/>

            {/* Due Date */}
            <TextField onChange={e => setTodo({...todo, due_at:e.target.value})} fullWidth type="date" label="Due Date (Optional)"
              slotProps={{ inputLabel: { shrink: true } }}/>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleSaveTodo} variant="contained"
            sx={{ borderRadius: 2, bgcolor: "purple", textTransform: "none", fontWeight: "bold",}}>
            {mode == true? "Add Task" : "Edit Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AddTodoModal
