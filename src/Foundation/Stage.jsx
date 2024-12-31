import { Button } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStage, deleteStage, editStage, fetchStage } from '../ReduxKit/Slices/Foundation/StageSlice';
import Loader from '../Components/Loader';
import AddItem from './AddItem';

const Stage = () => {

  const dispatch = useDispatch();
  const {stage,loading} = useSelector((state)=>state?.stageList);
  const[open,setOpen]=useState(false);
  const [edit,setEdit]=useState(null);

  useEffect(()=>{
    dispatch(fetchStage());
  },[dispatch])

  function openModal(){
    setEdit(null);
    setOpen(true);
  }

  function closeModal(){
    setOpen(false)
  }

  function handleSubmit(data){
    data.stage_name = data?.name;
    if(edit){
      data.id = edit?.id;
      dispatch(editStage(data))
    }
    else{
      dispatch(createStage(data))
    }
    setOpen(false);
  }
  function handelEdit(data){
    const passData = {
      id:data?.id,
      name:data?.stage_name,
      description:data?.description
    }
    setEdit(passData);
    setOpen(true);
  }

  function deleteData(data){
    dispatch(deleteStage(data));
  }

  return (
    <div>
        {loading ? <Loader/> : ''}
        <div style={{display:'flex',justifyContent:'end'}} >
          <Button onClick={openModal} variant='contained' color='primary' >Add Stage</Button>
          </div>

        <div className='p-3' >
          <table className='table table-bordered table-striped table-hover'>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stage?.map((_s,index)=>{
                return(
                  <tr key={_s?.id}>
                    <td>{index+1}</td>
                    <td>{_s?.stage_name}</td>
                    <td>{_s?.description ? _s?.description : '- -'}</td>
                    <td>
                      <Button onClick={()=>handelEdit(_s)} variant='outlined' color='primary' sx={{ margin: 1 }} >Edit</Button>
                      <Button onClick={()=>deleteData(_s)} variant='outlined' color='error' sx={{ margin: 1 }} >Delete</Button>
                      </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <AddItem label={'Stage'} open={open} onClose={closeModal} onAdd={handleSubmit} edit={edit} />
    </div>
  )
}

export default Stage