import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AddUsecase = ({ label, open, onClose, onAdd, edit, project, solution, feature }) => {
  const [formData, setformData] = useState({
    usecase_name: '',
    feature_id: '',
    project_id: '',
    solution_id: '',
    description: ''
  })

  const [solutionList, setSolutionList] = useState([]);
  const [featureList, setfeatureList] = useState([]);

  useEffect(() => {
    setformData(edit || {
      usecase_name: '',
      feature_id: '',
      description: '',
      project_id: '',
      solution_id: ''
    });
    if (edit?.project_id) {
      const solutionData = solution?.filter((_s) => _s?.project_id === edit?.project_id);
      setSolutionList(solutionData);
    }
    if (edit?.solution_id) {
      const featureData = feature?.filter((_s) => _s?.solution_id === edit?.solution_id);
      setfeatureList(featureData);
    }
  }, [edit, solution,feature])

  function handleChange(e) {
    if (e?.target?.name === 'project_id') {
      selectSolution(e?.target?.value);
      setformData((prevValue) => ({ ...prevValue, solution_id: '' }));
      setformData((prevValue) => ({ ...prevValue, feature_id: '' }));
    }
    if (e?.target?.name === 'solution_id') {
      selectFeature(e?.target?.value);
      setformData((prevValue) => ({ ...prevValue, feature_id: '' }));
    }
    const { name, value } = e?.target;
    setformData((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function submitForm() {
    onAdd(formData);
    setformData({
      usecase_name: '',
      feature_id: '',
      project_id: '',
      description: '',
      solution_id: ''
    })
    onClose();
  }

  function selectSolution(projectId) {
    const solutionData = solution?.filter((_s) => _s?.project_id === projectId);
    setSolutionList(solutionData);
  }

  function selectFeature(solutionId) {
    const featureData = feature?.filter((_s) => _s?.solution_id === solutionId);
    setfeatureList(featureData);
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
          label='Select Feature'
          select
          value={formData?.feature_id}
          name='feature_id'
          onChange={handleChange}
        >
          {featureList?.map((_p, index) => {
            return (
              <MenuItem key={index} value={_p?.id} >{_p?.feature_name}</MenuItem>
            )
          })}
        </TextField>

        <TextField
          autoFocus
          fullWidth
          margin='dense'
          variant='outlined'
          label='Usecase Name'
          value={formData.usecase_name || ''}
          name='usecase_name'
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

export default AddUsecase;