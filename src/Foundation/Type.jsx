import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchType,createType,editType,deleteType } from '../ReduxKit/Slices/Foundation/TypeSlice';
import { Button } from '@mui/material';
import Loader from '../Components/Loader';
import AddItem from './AddItem';

const Type = () => {
  const dispatch = useDispatch();
  const{Type,loading} = useSelector((state)=> state?.typeList);

  const[open,setOpen]=useState(false);
  const [edit,setEdit]=useState(null);

  useEffect(()=>{
    dispatch(fetchType());
  },[dispatch]);


  function openModal(){
    setEdit(null);
    setOpen(true);
  }

  function closeModal(){
    setOpen(false);
  }

  function handleSubmit(data){
    data.type_name = data?.name;
    if(edit){
      data.id = edit.id;
      dispatch(editType(data));
    }
    else{
      dispatch(createType(data));
    }
    setOpen(false);
  }

  function editData(data){
    const passData={
      id:data?.id,
      name:data?.type_name,
      description:data?.description
    }
    setEdit(passData);
    setOpen(true);
  }

  function deleteData(data){
    dispatch(deleteType(data));
  }

  return (
    <div>
      {loading ? <Loader/> : ''}
      <div style={{display:'flex',justifyContent:'end'}}>
        <Button onClick={openModal} variant='contained' color='primary'>Add Type</Button>
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
            {Type?.map((_p,index)=>{return(
              <tr key={_p?.id}>
                <td>{index+1}</td>
                <td>{_p?.type_name}</td>
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
      <AddItem label={'Type'} open={open} onClose={closeModal} onAdd={handleSubmit} edit={edit} />
    </div>
  )
}


export default Type