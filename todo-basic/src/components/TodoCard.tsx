import { IconButton ,Box, Paper, Radio, Typography } from "@mui/material";
import type { Todo } from "../models/Todo";
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoCardProps {
    todo: Todo
    onDelete: () => void
}

const TodoCard = ({todo, onDelete}: TodoCardProps ) => {
    return (
        <Paper variant="outlined" sx={{ display: "flex", justifyContent:"space-between", alignItems: "center", p: 1.5, borderRadius: 2,width: "100%"}}>
            <Box sx={{display: "flex", alignItems: "center", gap: 2}} >
                <Typography>{todo.id}</Typography>
                <Typography>{todo.name}</Typography>
            </Box>
            <Box>
                <Radio />
                <IconButton onClick={onDelete} ><DeleteIcon/></IconButton>
            </Box>
        </Paper>
    );
};
export default TodoCard;
