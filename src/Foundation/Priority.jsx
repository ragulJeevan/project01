import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPriority, deletePriority, editPriority, fetchPriority } from '../ReduxKit/Slices/Foundation/PrioritySlice';
import { Button } from '@mui/material';
import Loader from '../Components/Loader';
import AddItem from './AddItem';

const Priority = () => {

  const dispatch = useDispatch();
  const{priority,loading} = useSelector((state)=> state?.priorityList);

  const[open,setOpen]=useState(false);
  const [edit,setEdit]=useState(null);

  useEffect(()=>{
    dispatch(fetchPriority());
  },[dispatch]);


  function openModal(){
    setEdit(null);
    setOpen(true);
  }

  function closeModal(){
    setOpen(false);
  }

  function handleSubmit(data){
    data.priority_name = data?.name;
    if(edit){
      data.id = edit.id;
      dispatch(editPriority(data));
    }
    else{
      dispatch(createPriority(data));
    }
    setOpen(false);
  }

  function editData(data){
    const passData={
      id:data?.id,
      name:data?.priority_name,
      description:data?.description
    }
    setEdit(passData);
    setOpen(true);
  }

  function deleteData(data){
    dispatch(deletePriority(data));
  }

  return (
    <div>
      {loading ? <Loader/> : ''}
      <div style={{display:'flex',justifyContent:'end'}}>
        <Button onClick={openModal} variant='contained' color='primary'>Add Priority</Button>
      </div>
      <div className='p-3'>
        <table className='table table-borderd table-hover table-striped'>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {priority?.map((_p,index)=>{return(
              <tr key={_p?.id}>
                <td>{index+1}</td>
                <td>{_p?.priority_name}</td>
                <td>{_p?.description}</td>
                <td>
                  <Button onClick={()=>editData(_p)} variant='outlined' color='primary' sx={{ margin: 1 }} >Edit</Button>
                  <Button onClick={()=>deleteData(_p)} variant='outlined' color='error' sx={{ margin: 1 }} >Delete</Button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
      <AddItem label={'Priority'} open={open} onClose={closeModal} onAdd={handleSubmit} edit={edit} />
    </div>
  )
}

export default Priority