import { Button } from '@mui/material';
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import { createStatus, deleteStatus, editStatus, fetchStatus } from '../ReduxKit/Slices/Foundation/StatusSlice';
import AddItem from './AddItem';

const Status = () => {

  const dispatch = useDispatch();
  const {status,loading} = useSelector((state)=> state?.statusList);
  const[open,setOpen] = useState(false);
  const[edit,setEdit] = useState(null);

  useEffect(()=>{
    dispatch(fetchStatus()); 
  },[dispatch])

  function openModal(){
    setEdit(null)
    setOpen(true)
  }

  function closeModal(){
    setOpen(false)
  }

  function handleEdit(data){
    let passData = {
      id:data?.id,
      name:data?.status_name,
      description:data?.description
    };
    setEdit(passData);
    setOpen(true);
  }

  function handleSubmit(data){
    data.status_name = data?.name;
    if(edit){
      data.id = edit?.id;
      dispatch(editStatus(data));
    }
    else{
      dispatch(createStatus(data));
    }
    setOpen(false);
  }
  
  function deleteData(data){
    dispatch(deleteStatus(data));
  }

  return (
    <div>
      {loading ? <Loader/> : ''}
      <div style={{display:'flex',justifyContent:'end'}} >
        <Button onClick={openModal} variant='contained' color='primary'>Add Status</Button>
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
            {status?.map((_s,index)=>{
              return(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{_s?.status_name}</td>
                  <td>{_s?.description ? _s?.description : '- -'}</td>
                  <td>
                    <Button onClick={()=>handleEdit(_s)} variant='outlined' color='primary' sx={{ margin: 1 }} >Edit</Button>
                    <Button onClick={()=>deleteData(_s)} variant='outlined' color='error' sx={{ margin: 1 }} >Delete</Button>
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <AddItem label={'Status'} open={open} onClose={closeModal} onAdd={handleSubmit} edit={edit}  />
    </div>
  )
}

export default Status