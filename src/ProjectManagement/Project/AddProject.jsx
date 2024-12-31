import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AddProject = ({label, open, onClose, onAdd, edit }) => {

    const [formData, setformData] = useState({
        project_name: '',
        description:'',
        project_id:''
    })

    useEffect(() => {
        setformData(edit || {
            project_name: '',
            description:''
        })
    }, [edit])

    function handleChange(e) {
        const { name, value } = e?.target;
        setformData((prevValue) => ({ ...prevValue, [name]: value }));
    }

    function submitForm() {
        onAdd(formData);
        setformData({
            project_name: '',
            description:''
        })
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle> {edit ? 'Edit' : 'Add'} {label} </DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    label='Project Name'
                    value={formData.project_name || ''}
                    name='project_name'
                    onChange={handleChange}
                    required
                />

                <TextField
                    autoFocus
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    label='Description'
                    value={formData.description || ''}
                    name='description'
                    onChange={handleChange}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button  onClick={onClose} variant='outlined' color='error'sx={{ margin: 1 }}>Cancel</Button>
                <Button  onClick={submitForm} variant='contained' color='primary' sx={{ margin: 1 }}>{edit ? 'Edit' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddProject