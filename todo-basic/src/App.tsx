
import { Box } from '@mui/material'
import './App.css'
import TodoListPage from './pages/TodoListPage'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import TodoLoginPage from './pages/TodoLoginPage'
import TodoRegisterPage from './pages/TodoRegisterPage'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='todolist' element={<TodoListPage/>}></Route>
        <Route path='/' element={<TodoLoginPage/>}></Route>
        <Route path='/register' element={<TodoRegisterPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
