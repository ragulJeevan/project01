import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddDepartment from './AddDepartment';
import { useDispatch, useSelector } from 'react-redux';
import {fetchDepartment,createDepartment} from '../ReduxKit/Slices/DepartmentSlice';
// import { useSnackbar } from '../Components/ShowMessage';

const Department = () => {

  // const showMessage = useSnackbar();

  const [open, setOpen] = useState(false);
  // const [departments, setDepartments] = useState([]);

  const dispatch = useDispatch();
  const{departments} = useSelector((state)=> state?.departmentList);

  useEffect(()=>{
    dispatch(fetchDepartment());
  },[dispatch]);

  // Open and close dialog handlers
  function handleOpen() {
    setOpen(true)
    console.log(open);
    
  }

  function handleClose() {
    setOpen(false)
  }

  // Add new department
  const handleAddDepartment = (name) => {
    dispatch(createDepartment({department_n:name}))
  };



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }} >
      <Button variant="contained" onClick={handleOpen}> Add Department</Button>
      </div>
      <div className='p-3' >
        <table className='table table-bordered table-striped table-hover'>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments?.data?.map((dep,index)=>{
              return(
                <tr key={dep?.id}  >
                <td>{index+1}</td>
                <td>{dep?.department_name}</td>
                <td>
                  <Button variant='outlined'>Edit</Button>
                  <Button variant='outlined' color='error'>Delete</Button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {/* Add Department Dialog */}
      <AddDepartment
        open={open}
        onClose={handleClose}
        onAdd={handleAddDepartment}
      />
    </div>
  )
}

export default Department