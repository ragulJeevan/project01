import React from 'react'
import { Routes,Route } from 'react-router-dom';
import ProjectLayout from './ProjectLayout';
import TaskList from './Task/TaskList';
import AddTask from './Task/AddTask';

const ProjectRoute = () => {
    return (
        <Routes>
            <Route path='layout' element={<ProjectLayout/>}/>
            <Route path='create_task' element={<AddTask/>}/>
            <Route path='tasklist' element={<TaskList/>}/>
        </Routes>
    )
}

export default ProjectRoute