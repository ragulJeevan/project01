import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import {createUser, deleteUsers, editUser, fetchUser} from '../ReduxKit/Slices/UserManagement/UserSlice'
import { Button } from '@mui/material';
import AddUser from './AddUser';
import {fetchDepartment} from '../ReduxKit/Slices/UserManagement/DepartmentSlice';
import {fetchDesignation} from '../ReduxKit/Slices/UserManagement/DesignationSlice';

const User = () => {
  const dispatch = useDispatch();
  const{users,loading}=useSelector((state)=>state.userList);
  const{departments,loading1}=useSelector((state)=> state?.departmentList);
  const{designations,loading2}=useSelector((state)=> state?.designationList);
  const[open,setOPen]=useState(false);
  const[edit,setEdit]=useState(null);

  useEffect(()=>{
    dispatch(fetchUser());
    dispatch(fetchDepartment());
    dispatch(fetchDesignation());
  },[dispatch])

  function handleOpen(){
    setOPen(true);
  }

  function handelEdit(user){
    console.log(user);
    setEdit(user);
    setOPen(true);
  }

  function handelClose(){
    setOPen(false);
  }

  function handleSubmit(data){
    if(edit){
      data.id = edit?.id;
      dispatch(editUser(data))
    }
    else{
      dispatch(createUser(data));
    }
  }

  function deleteUSer(data){
    dispatch(deleteUsers(data));
  }

  
  return (
    <div>
      {(loading || loading1 || loading2) ? <Loader/> : ''}
      <div style={{display:'flex',justifyContent:'end'}} >
        <Button onClick={handleOpen}  variant='contained'>Add User</Button>
      </div>
      <div className='p-3' >
          <table className='table table-bordered table-striped table-hover'>
            <thead>
              <tr>
                <th>Sno</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((x,index)=>{
                return(
                  <tr key={x?.id}>
                    <td>{index+1}</td>
                    <td>{x?.user_name}</td>
                    <td>{x?.email}</td>
                    <td>{x?.department_name}</td>
                    <td>{x?.designation_name}</td>
                    <td>
                      <Button onClick={()=> handelEdit(x)} variant='outlined' color='primary' sx={{ margin: 1 }} >Edit</Button>
                      <Button onClick={()=>deleteUSer(x)} variant='outlined' color='error' sx={{ margin: 1 }} >Delete</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </div>

      <AddUser edit={edit} open={open} onClose={handelClose} onAdd={handleSubmit} designation={designations?.data} department={departments?.data}   />

    </div>
  )
}

export default User