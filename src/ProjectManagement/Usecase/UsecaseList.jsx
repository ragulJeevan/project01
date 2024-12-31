import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSolution } from '../../ReduxKit/Slices/ProjectManagement/SolutionSlice';
import {fetchFeature} from '../../ReduxKit/Slices/ProjectManagement/FeatureSlice';
import {fetchUseCase,createUseCase,editUseCase,deleteUseCase} from '../../ReduxKit/Slices/ProjectManagement/Usecase';
import { fetchProject } from '../../ReduxKit/Slices/ProjectManagement/ProjectSlice';
import Loader from '../../Components/Loader';
import AddUsecase  from './AddUsecase';

const UsecaseList = () => {
  const header ='Usecase';
  const dispatch = useDispatch();
  const{project}=useSelector((state)=> state?.projectList);
  const{Solution}=useSelector((state)=> state?.solutionList);
  const{Feature,loading}=useSelector((state)=> state?.featureList);
  const{UseCase,Loading}=useSelector((state)=> state?.useCaseList);

  const[open,setOpen] = useState(false);
  const[edit,setEdit]=useState(null);

  useEffect(()=>{
      dispatch(fetchProject());
      dispatch(fetchSolution());
      dispatch(fetchFeature());
      dispatch(fetchUseCase());
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
      dispatch(editUseCase(data))
    }
    else{
      dispatch(createUseCase(data));
    }
    setOpen(false);
  }

  function editData(data){
    setEdit(data);
    setOpen(true);
  }

  function deleteData(data){
    dispatch(deleteUseCase(data));
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
                <th>Feature</th>
                <th>Created By</th>
                <th>Updated By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {UseCase?.map((_c,index)=>{
                return(
                  <tr key={_c?.id}>
                    <td>{index+1}</td>
                    <td>{_c?.usecase_name}</td>
                    <td>{_c?.description ? _c?.description : '- -'}</td>
                    <td>{_c?.project_name}</td>
                    <td>{_c?.solution_name}</td>
                    <td>{_c?.feature_name}</td>
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
        <AddUsecase label={header} open={open} onClose={closeModal} onAdd={handleSubmit} edit={edit} project={project} solution={Solution} feature={Feature} />
    </div>
  )
}

export default UsecaseList;