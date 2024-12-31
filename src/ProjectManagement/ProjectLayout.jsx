import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react';
import ProjectList from './Project/ProjectList';
import SolutionList from './Solution/SolutionList';
import FeatureList from './Feature/FeatureList';
import UsecaseList from './Usecase/UsecaseList';
import TaskList from './Task/TaskList';

function TabPanel({children,value,index}){
  return(
    <div
    role='tabpanel'
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    >
      {
        value === index &&
        <Box sx={{p:3}} >{children}</Box>
      }
    </div>
  )
}

const ProjectLayout = () => {
  const [activeTab, setActiveTab] = useState(0); // Active tab index
  
    const handleChange = (event, newValue) => {
      setActiveTab(newValue);
    };
  return (
    <Box sx={{width:"100%"}} >
        <Box sx={{ borderBottom: 1, borderColor: "divider",display:'flex',justifyContent:'end',background:'linear-gradient(360deg, #8da7ad, #679fcf26, #8c98af 150%);' }} >
          <Tabs
          value={activeTab} 
          onChange={handleChange} 
          aria-label="project tabs"
          >
            <Tab label="Project" ></Tab>
            <Tab label="Solution" ></Tab>
            <Tab label="Feature" ></Tab>
            <Tab label="Usecase" ></Tab>
            <Tab label="Task" ></Tab>
          </Tabs>
        </Box>
    <TabPanel value={activeTab} index={0} >
        <ProjectList/>
    </TabPanel>
    <TabPanel value={activeTab} index={1} >
      <SolutionList/>
    </TabPanel>
    <TabPanel value={activeTab} index={2} >
      <FeatureList/>
    </TabPanel>
    <TabPanel value={activeTab} index={3} >
      <UsecaseList/>
    </TabPanel>
    <TabPanel value={activeTab} index={4} >
      <TaskList/>
    </TabPanel>
    </Box>
  )
}

export default ProjectLayout