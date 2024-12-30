import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader';
import { createDesignation, editDesignation, fetchDesignation,deleteDesignation } from '../ReduxKit/Slices/UserManagement/DesignationSlice';
import AddDesignation from './AddDesignation';


const Designation = () => {

   const dispatch = useDispatch();
   const { designations,loading } = useSelector((state) => state?.designationList);
   const[open,setOpen]=useState(false);
   const[edit,setEdit]=useState(null);
  
  useEffect(() => {
    dispatch(fetchDesignation());
  }, [dispatch]);

  function handleOPen(){
    setEdit(null);
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

  function handelEdit(designation){
    setEdit(designation);
    setOpen(true);
  }

  function handleSubmit(designation){
    if(edit){
      let payLoad ={
        id:edit?.id,
        designation_name:designation
      }
      dispatch(editDesignation(payLoad))
    }
    else{
      dispatch(createDesignation({designation_name:designation}))
    }
  }

  function deleteDesig(designation){
    dispatch(deleteDesignation(designation));
  }

  return (
    <>
      {loading ? <Loader/> : ''}
      <div style={{ display: 'flex', justifyContent: 'end' }} >
        <Button variant="contained" onClick={handleOPen} > Add Designation</Button>
      </div>

      <div className='p-3' >
        <table className='table table-bordered table-striped table-hover'>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {designations?.data?.map((des,index)=>{
              return(
                <tr key={des?.id}>
                  <td>{index+1}</td>
                  <td>{des?.designation_name}</td>
                  <td>
                    <Button onClick={()=>handelEdit(des)} variant='outlined' color='primary'>Edit</Button>
                    <Button onClick={()=>deleteDesig(des)} variant='outlined' color='error'>Delete</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    <AddDesignation open={open}  onClose={handleClose} onAdd={handleSubmit} edit={edit}/>
    </>
  )
}

export default Designation