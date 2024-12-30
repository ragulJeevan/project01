import { AppBar, Avatar, IconButton, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import DrawerComponent from "./Drawer";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {

    let headerName = localStorage.getItem('Header') || 'Home'; 

    const navigatTo = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    function handleOPen(event) {
        setAnchorEl(event?.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null);
        localStorage.removeItem('loggedIn');
        navigatTo('/login');
    }
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge='start'>
                        <DrawerComponent />
                    </IconButton>
                    <Typography variant="h5" component='h2' sx={{ flexGrow: 1 }} > {headerName} </Typography>

                    
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
                        <MenuItem onClick={handleClose} >Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>

    )
}

export default Header