import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AddItem = ({ label, open, onClose, onAdd, edit }) => {

    const [formData, setformData] = useState({
        name: '',
        description: ''
    })

    useEffect(() => {
        setformData(edit || {
            name: '',
            description: ''
        })
    }, [edit])

    function handleChange(e) {
        const { name, value } = e?.target;
        setformData((prevValue) => ({ ...prevValue, [name]: value }));
    }

    function submitForm() {
        onAdd(formData);
        setformData({
            name: '',
            description: ''
        })
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle> {edit ? 'Edit' : 'Add'}  {label} </DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    label='Name'
                    value={formData.name}
                    name='name'
                    onChange={handleChange}
                    required
                />

                <TextField
                    autoFocus
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    label='Description'
                    value={formData.description}
                    name='description'
                    onChange={handleChange}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant='outlined' color='error'>Cancel</Button>
                <Button onClick={submitForm} variant='contained' color='primary'>{edit ? 'Edit' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddItem