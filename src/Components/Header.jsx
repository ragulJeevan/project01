import { AppBar, Avatar, Toolbar, Typography, Button, Menu, MenuItem, Stack } from "@mui/material";
import DrawerComponent from "./Drawer";
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const Header = () => {

    const data = useLocation();

    const [headerName, setHeaderName] = useState('Home');

    const navigatTo = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [userAnchor, setuserAnchor] = useState(null);
    const userOPen = Boolean(userAnchor);

    useEffect(() => {
        const route = JSON.parse(localStorage.getItem('routes'));
        const header = route?.find((_r) => _r?.url === data?.pathname);
        setHeaderName(header?.menu || 'Home')
    }, [data])


    function handleOPen(event) {
        setAnchorEl(event?.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleUserOPen(event) {
        setuserAnchor(event?.currentTarget)
    }

    function handleUserClose() {
        setuserAnchor(null);
    }

    function handleLogout() {
        setAnchorEl(null);
        localStorage.clear();
        navigateToPath('/login');
    }

    function navigateToPath(path){
        navigatTo(path);
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge='start'>
                    </IconButton> */}
                    <DrawerComponent />
                    <Typography variant="h5" component='h2' sx={{ flexGrow: 1 }} > {headerName} </Typography>

                    <Stack direction='row' spacing={2} sx={{padding:'15px'}} >
                        <Button sx={{fontWeight:'bold'}}  onClick={()=>navigateToPath('/home')} color='inherit' >Home</Button>
                        <Button sx={{fontWeight:'bold'}} onClick={()=>navigateToPath('/foundation/layout')} color='inherit' >Foundation</Button>
                       
                        <Button sx={{fontWeight:'bold'}} id='resources-button' color='inherit' 
                            onClick={handleUserOPen}
                            aria-controls={userAnchor ? 'resources-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={userAnchor ? 'true' : undefined} 
                            endIcon={<ExpandMoreIcon/>}>User Management
                        </Button>
                        <Button sx={{fontWeight:'bold'}} onClick={()=>navigateToPath('/project_management/layout')} color='inherit' >Project Management</Button>
                        <Button sx={{fontWeight:'bold'}} onClick={()=>navigateToPath('/project_management/tasklist')} color='inherit' >Task</Button>
                    </Stack>
                    <Menu 
                        id='resources-menu' 
                        anchorEl={userAnchor} 
                        open={userOPen}
                        onClose={handleUserClose}
                        MenuListProps={{
                            "aria-labelledby": 'resources-button'
                        }} >
                        <MenuItem sx={{fontWeight:'bold'}} onClick={()=>{
                             navigateToPath('/user_management/department'); 
                             handleUserClose(); 
                        }} >Departmet</MenuItem>
                        <MenuItem sx={{fontWeight:'bold'}} onClick={()=>{
                             navigateToPath('/user_management/designation'); 
                             handleUserClose(); 
                        }} >Designation</MenuItem>
                        <MenuItem sx={{fontWeight:'bold'}} onClick={()=>{
                             navigateToPath('/user_management/user'); 
                             handleUserClose(); 
                        }} >User</MenuItem>
                    </Menu>

                    <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} >
                        <div>
                            <Button onClick={()=>navigateToPath('/project_management/create_task')} sx={{color: '#0070ffd6',backgroundColor: 'aliceblue',fontWeight: 'bold'}} variant="contained" color='primary'>Create Task</Button>
                        </div>
                        <div>
                            <Button
                                color="inherit"
                                id="avatar-button"
                                aria-controls={open ? 'logout-button' : undefined}
                                aria-haspopup='true'
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleOPen}
                            >
                                <Avatar
                                    alt='profile avatar'
                                    src="https://fastly.picsum.photos/id/362/536/354.jpg?hmac=80yPo_BYwdjdsODBOssublEURlS5Wqy9qscadE8R0qg"
                                />
                            </Button>
                            <Menu
                                id="logout-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": 'avatar-button'
                                }}
                            >
                                <MenuItem onClick={handleLogout} >Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </>

    )
}

export default Header