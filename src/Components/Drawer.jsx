import { IconButton,Drawer,Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom';

const DrawerComponent = () => {
    const [isDrawerOPen,setisDrawerOPen] = useState(false);
    const [menuItem,setMenuItem]=useState([]);

    const navigateTo = useNavigate();

    function navigate(menu){
        navigateTo(menu?.url);
        localStorage.setItem('Header',menu?.menu)
        setisDrawerOPen(false);
    }

    useEffect(()=>{
        const route = JSON.parse(localStorage.getItem('routes')); 
        setMenuItem(route);
    },[])

  return (
   <>
        <IconButton size='medium' color='imherit' onClick={() => setisDrawerOPen(true)} >
            <MenuIcon/>
        </IconButton>

        <Drawer anchor='left' open={isDrawerOPen} onClose={()=>setisDrawerOPen(false)} >

            <Box p={2} width='200px'  role='presentation' >
                <Box p={1} textAlign='center' className='fw-bold' >
                    React App
                </Box>
                <nav className='fw-bold nav'  >
                   {
                    menuItem?.map((menu)=>{
                        return(
                            <Box key={menu?.id} onClick={()=> navigate(menu)}  >{menu?.menu}</Box>
                        )
                    })
                   }
                </nav>
            </Box>

        </Drawer>
   </>
  )
}

export default DrawerComponent