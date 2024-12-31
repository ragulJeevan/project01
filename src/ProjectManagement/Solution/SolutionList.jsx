import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSolution,createSolution,editSolution,deleteSolution } from '../../ReduxKit/Slices/ProjectManagement/SolutionSlice';
import { fetchProject } from '../../ReduxKit/Slices/ProjectManagement/ProjectSlice';
import Loader from '../../Components/Loader';
import AddSolution from './AddSolution';

const SolutionList = () => {
  const header ='Solution';
  const dispatch = useDispatch();
  const{project,loading}=useSelector((state)=> state?.projectList);
  const{Solution,Loading}=useSelector((state)=> state?.solutionList);

  const[open,setOpen] = useState(false);
  const[edit,setEdit]=useState(null);

  useEffect(()=>{
      dispatch(fetchProject());
      dispatch(fetchSolution());
  },[dispatch])

  function openModal(){
    setEdit(null);
    setOpen(true);
  }

  function closeModal(){
    setOpen(false);
  }

  function handleSubmit(data){
    if(edit){
      dispatch(editSolution(data))
    }
    else{
      dispatch(createSolution(data));
    }
    setOpen(false);
  }

  function editData(data){
    setEdit(data);
    setOpen(true);
  }

  function deleteData(data){
    dispatch(deleteSolution(data));
  }

  return (
    <div>
      {(loading || Loading ) ? <Loader/> : ''}
        <div style={{display:'flex',justifyContent:'end'}} >
        <Button onClick={openModal} variant='contained' color='primary'>Add {header}</Button>
        </div>       

        <div className='p-3' >
          <table className='table table-bordered table-hover table-striped'>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Name</th>
                <th>Description</th>
                <th>Project</th>
                <th>Created By</th>
                <th>Updated By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Solution?.map((_c,index)=>{
                return(
                  <tr key={_c?.id}>
                    <td>{index+1}</td>
                    <td>{_c?.solution_name}</td>
                    <td>{_c?.description ? _c?.description : '- -'}</td>
                    <td>{_c?.project_name}</td>
                    <td>{_c?.created_by_name ? _c?.created_by_name : '- -'}</td>
                    <td>{_c?.updated_by_name ? _c?.updated_by_name : '- -'}</td>
                    <td>
                      <Button onClick={()=>editData(_c)} variant='outlined' color='primary' sx={{ margin: 1 }} >Edit</Button>
                      <Button onClick={()=>deleteData(_c)} variant='outlined' color='error'  >Delete</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <AddSolution label={header} open={open} onClose={closeModal} onAdd={handleSubmit} edit={edit} project={project} />
    </div>
  )
}

export default SolutionList