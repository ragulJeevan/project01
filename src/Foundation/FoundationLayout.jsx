import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Status from "./Status";
import Stage from "./Stage";
import Complexity from "./Complexity";
import Priority from "./Priority";
import Type from "./Type";
import SDLC from "./SDLC";

// TabPanel Component to Render Tab Content
function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// FoundationLayout Component
const FoundationLayout = () => {
  const [activeTab, setActiveTab] = useState(0); // Active tab index

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Material-UI Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider",display:'flex',justifyContent:'end' }}>
        <Tabs 
        value={activeTab} 
        onChange={handleChange} 
        aria-label="foundation tabs">
          <Tab label="Status" />
          <Tab label="Stage" />
          <Tab label="Complexity" />
          <Tab label="Priority" />
          <Tab label="Type" />
          <Tab label="SDLC" />
        </Tabs>
      </Box>

      {/* TabPanels */}
      <TabPanel value={activeTab} index={0}>
        <Status/>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Stage/>
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <Complexity/>
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
          <Priority/>
      </TabPanel>
      <TabPanel value={activeTab} index={4}>
        <Type/>
      </TabPanel>
      <TabPanel value={activeTab} index={5}>
        <SDLC/>
      </TabPanel>
    </Box>
  );
};

export default FoundationLayout;
