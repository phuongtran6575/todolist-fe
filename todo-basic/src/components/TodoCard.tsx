import { IconButton ,Box, Paper, Radio, Typography } from "@mui/material";
import type { Todo } from "../models/Todo";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface TodoCardProps {
    todo: Todo
    onDelete: () => void
    onEdit: () => void
}

const TodoCard = ({todo, onDelete, onEdit}: TodoCardProps ) => {
  const formatDate = (dateString?: string | null) => {
  if (!dateString) return "Không có hạn";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
    return (
        <Paper variant="outlined"
              sx={{ width:"100%", display: "flex", alignItems: "center", p: 2, borderRadius: 2,justifyContent: "space-between",}}>
              <Box display="flex" alignItems="flex-start" gap={1}>
                <Radio />
                <Box>
                  <Typography fontWeight="bold">
                    {todo.name}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5} gap={0.5}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(todo.due_at)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" >
                <IconButton onClick={onEdit} color="primary">
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
