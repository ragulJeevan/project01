import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSolution } from '../../ReduxKit/Slices/ProjectManagement/SolutionSlice';
import {fetchFeature,createFeature,editFeature,deleteFeature} from '../../ReduxKit/Slices/ProjectManagement/FeatureSlice';
import { fetchProject } from '../../ReduxKit/Slices/ProjectManagement/ProjectSlice';
import Loader from '../../Components/Loader';
import AddFeature  from './AddItem';

const FeatureList = () => {
  const header ='Feature';
  const dispatch = useDispatch();
  const{project}=useSelector((state)=> state?.projectList);
  const{Solution,Loading}=useSelector((state)=> state?.solutionList);
  const{Feature,loading}=useSelector((state)=> state?.featureList);

  const[open,setOpen] = useState(false);
  const[edit,setEdit]=useState(null);

  useEffect(()=>{
      dispatch(fetchProject());
      dispatch(fetchSolution());
      dispatch(fetchFeature());
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
      dispatch(editFeature(data))
    }
    else{
      dispatch(createFeature(data));
    }
    setOpen(false);
  }

  function editData(data){
    setEdit(data);
    setOpen(true);
  }

  function deleteData(data){
    dispatch(deleteFeature(data));
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
                <th>Solution</th>
                <th>Created By</th>
                <th>Updated By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Feature?.map((_c,index)=>{
                return(
                  <tr key={_c?.id}>
                    <td>{index+1}</td>
                    <td>{_c?.feature_name}</td>
                    <td>{_c?.description ? _c?.description : '- -'}</td>
                    <td>{_c?.project_name}</td>
                    <td>{_c?.solution_name}</td>
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
        <AddFeature label={header} open={open} onClose={closeModal} onAdd={handleSubmit} edit={edit} project={project} solution={Solution} />
    </div>
  )
}

export default FeatureList