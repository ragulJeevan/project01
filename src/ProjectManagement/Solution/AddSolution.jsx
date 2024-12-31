import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AddSolution = ({label, open, onClose, onAdd, edit,project }) => {
  const [formData, setformData] = useState({
    solution_name: '',
    project_id: '',
    description:''
})

useEffect(() => {
    setformData(edit || {
        solution_name: '',
        description:'',
        project_id:''
    })
}, [edit])

function handleChange(e) {
    const { name, value } = e?.target;
    setformData((prevValue) => ({ ...prevValue, [name]: value }));
}

function submitForm() {
    onAdd(formData);
    setformData({
        solution_name:'',
        project_id: '',
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
             label='Select Project'
             select
             value={formData?.project_id}
             name='project_id'
             onChange={handleChange}
             >
                {project?.map((_p,index)=>{
                    return(
                        <MenuItem key={index} value={_p?.id} >{_p?.project_name}</MenuItem>
                    )
                })}
            </TextField>

            <TextField
                autoFocus
                fullWidth
                margin='dense'
                variant='outlined'
                label='Solution Name'
                value={formData.solution_name || ''}
                name='solution_name'
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

export default AddSolution