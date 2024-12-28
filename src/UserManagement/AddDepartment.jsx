import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'

const AddDepartment = ({ open, onClose, onAdd }) => {
    const [departmentName, setDepartmentName] = useState('')

    function handelChange(event) {
        setDepartmentName(event?.target?.value);
    }

    function submitForm(event) {
        if (departmentName && departmentName !== '' && departmentName !== null) {
            onAdd(departmentName);
            setDepartmentName('');
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Add Department</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Department Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={departmentName}
                    onChange={handelChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant='outlined' color='secondary' >Cancel</Button>
                <Button onClick={submitForm} variant='contained' color='primary' >Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddDepartment