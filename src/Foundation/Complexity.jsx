import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComplexity, deleteComplexity, editComplexity, fetchComplexity } from '../ReduxKit/Slices/Foundation/ComplexitySlice';
import Loader from '../Components/Loader';
import AddItem from './AddItem';

const Complexity = () => {
  const dispatch = useDispatch();
  const{complexity,loading}=useSelector((state)=> state?.complexityList);

  const[open,setOpen] = useState(false);
  const[edit,setEdit]=useState(null);

  useEffect(()=>{
      dispatch(fetchComplexity());
  },[dispatch])

  function openModal(){
    setEdit(null);
    setOpen(true);
  }

  function closeModal(){
    setOpen(false);
  }

  function handleSubmit(data){
    data.complexity_name = data?.name;
    if(edit){
      data.id = edit?.id;
      dispatch(editComplexity(data))
    }
    else{
      dispatch(createComplexity(data));
    }
    setOpen(false);
  }

  function editData(data){
    const passData ={
      id:data?.id,
      name:data?.complexity_name,
      description:data?.description
    }
    setEdit(passData);
    setOpen(true);
  }

  function deleteData(data){
    dispatch(deleteComplexity(data));
  }

  return (
    <div>
      {loading ? <Loader/> : ''}
        <div style={{display:'flex',justifyContent:'end'}} >
          <Button onClick={openModal} variant='contained' color='primary'>Add Complexity</Button>
        </div>
        <div className='p-3' >
          <table className='table table-bordered table-hover table-striped'>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complexity?.map((_c,index)=>{
                return(
                  <tr key={_c?.id}>
                    <td>{index+1}</td>
                    <td>{_c?.complexity_name}</td>
                    <td>{_c?.description ? _c?.description : '- -'}</td>
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
        <AddItem label={'Complexity'} open={open} onClose={closeModal} onAdd={handleSubmit} edit={edit}/>
    </div>
  )
}

export default Complexity