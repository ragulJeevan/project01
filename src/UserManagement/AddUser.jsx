import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSnackbar } from '../Components/ShowMessage';

const AddUser = ({ open, onClose, edit, onAdd,designation,department }) => {
   
    const showMessage = useSnackbar();
    const [users, setUsers] = useState({
        user_name: '',
        email: '',
        department: '',
        designation: ''
    });

    useEffect(()=>{
        setUsers(edit||{
            user_name: '',
            email: '',
            department: '',
            designation: ''
        })
    },[edit])

    function handleChange(event) {
        const { name, value } = event?.target;
        setUsers((prevValue) => ({ ...prevValue, [name]: value }));
    }

    function handleSubmit() {
        if(users && users!== null && users?.user_name && users?.email && users?.designation && users?.department){
            onAdd(users);
            onClose();
            setUsers({
                user_name: '',
                email: '',
                department: '',
                designation: ''
            })
        }
        else{
            showMessage('Please fill all fields')
        }
    }

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>{edit ? 'Edit User' : 'Add USer'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    type='text'
                    label='User Name'
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    value={users?.user_name}
                    name='user_name'
                    onChange={handleChange}
                    required
                />

                <TextField
                    autoFocus
                    type='email'
                    label='Email'
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    value={users?.email}
                    name='email'
                    onChange={handleChange}
                    required
                />

                <TextField
                 label='Select Department'
                 select
                 fullWidth
                 value={users?.department}
                 name='department'
                 onChange={handleChange}
                >
                    {department?.map((dep,index)=>{
                        return(
                            <MenuItem key={index} value={dep?.id} >{dep?.department_name}</MenuItem>
                        )
                    })}
                </TextField>
                <TextField
                 label='Select Designation'
                 select
                 fullWidth
                 value={users?.designation}
                 name='designation'
                 onChange={handleChange}>
                    {designation?.map((des,index)=>{
                        return(
                            <MenuItem key={index} value={des?.id}>{des?.designation_name}</MenuItem>
                        )
                    })}

                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant='outlined' color='primary' >Cancel</Button>
                <Button onClick={handleSubmit} variant='contained' color='primary'>{edit ? 'Edit' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUser