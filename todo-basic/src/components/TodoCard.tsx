import { IconButton ,Box, Paper, Radio, Typography } from "@mui/material";
import type { Todo } from "../models/Todo";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface TodoCardProps {
    todo: Todo
    onDelete: () => void
}

const TodoCard = ({todo, onDelete}: TodoCardProps ) => {
    return (
        <Paper variant="outlined"
              sx={{ width:"100%", display: "flex", alignItems: "center", p: 2, borderRadius: 2,justifyContent: "space-between",}}>
              <Box display="flex" alignItems="flex-start" gap={1}>
                <Radio />
                <Box>
                  <Typography fontWeight="bold">
                    {todo.name}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5} color="error.main">
                    <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption">{todo.due_at}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" >
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={onDelete} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
    );
};
export default TodoCard;
