import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'

const AddDesignation = ({ open, onClose, edit, onAdd }) => {

    const [designationName, setDesignationName] = useState('');

    useEffect(() => {
        setDesignationName(edit?.designation_name || '')
    }, [edit]);

    function submitForm() {
        onAdd(designationName);
        setDesignationName('');
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle> {edit ? 'Edit Designation' : 'Add Designation'} </DialogTitle>
            <DialogContent>
                <TextField
                    type='text'
                    label='Designation Name'
                    variant='outlined'
                    autoFocus
                    margin='dense'
                    fullWidth
                    value={designationName}
                    onChange={(e) => setDesignationName(e?.target?.value)}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant='outlined' color='primary' > Cancel</Button>
                <Button onClick={submitForm} variant='contained' color='primary' > {edit ? 'Edit' : 'Add'}</Button>
            </DialogActions>

        </Dialog>
    )
}

export default AddDesignation