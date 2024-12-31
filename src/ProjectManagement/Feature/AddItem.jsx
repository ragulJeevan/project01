import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AddFeature = ({ label, open, onClose, onAdd, edit, project, solution }) => {
    const [formData, setformData] = useState({
        feature_name: '',
        project_id: '',
        solution_id: '',
        description: ''
    })

    const [solutionList, setSolutionList] = useState([]);

    useEffect(() => {
        setformData(edit || {
            feature_name: '',
            description: '',
            project_id: '',
            solution_id: ''
        });
        if (edit?.project_id) {
            const solutionData = solution?.filter((_s) => _s?.project_id === edit?.project_id);
            setSolutionList(solutionData);
        }
    }, [edit, solution])

    function handleChange(e) {
        if (e?.target?.name === 'project_id') {
            selectSolution(e?.target?.value);
            setformData((prevValue) => ({ ...prevValue, solution_id: '' }));
        }
        const { name, value } = e?.target;
        setformData((prevValue) => ({ ...prevValue, [name]: value }));
    }

    function submitForm() {
        onAdd(formData);
        setformData({
            feature_name: '',
            project_id: '',
            description: '',
            solution_id: ''
        })
        onClose();
    }

    function selectSolution(projectData) {
        const solutionData = solution?.filter((_s) => _s?.project_id === projectData);
        setSolutionList(solutionData);
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
                    {project?.map((_p, index) => {
                        return (
                            <MenuItem key={index} value={_p?.id} >{_p?.project_name}</MenuItem>
                        )
                    })}
                </TextField>

                <TextField
                    autoFocus
                    fullWidth
                    label='Select Solution'
                    select
                    value={formData?.solution_id}
                    name='solution_id'
                    onChange={handleChange}
                >
                    {solutionList?.map((_p, index) => {
                        return (
                            <MenuItem key={index} value={_p?.id} >{_p?.solution_name}</MenuItem>
                        )
                    })}
                </TextField>

                <TextField
                    autoFocus
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    label='Feature Name'
                    value={formData.feature_name || ''}
                    name='feature_name'
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
                <Button onClick={onClose} variant='outlined' color='error' sx={{ margin: 1 }}>Cancel</Button>
                <Button onClick={submitForm} variant='contained' color='primary' sx={{ margin: 1 }}>{edit ? 'Edit' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddFeature;