import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddDepartment from './AddDepartment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartment, createDepartment, editDepartment,deleteDepartment } from '../ReduxKit/Slices/UserManagement/DepartmentSlice';
import Loader from '../Components/Loader';


const Department = () => {

  const dispatch = useDispatch();
  const { departments,loading } = useSelector((state) => state?.departmentList);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);


  function handleAdd() {
    setEdit(null)
    setOpen(true);
  }

  function handleEdit(department) {
    setEdit(department);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false)
  }

  // Add new department
  function handleAddDepartment(department){
    if(edit){
      let data ={
        id:edit?.id,
        department_name:department
      }
      dispatch(editDepartment(data))
    }
    else{
      dispatch(createDepartment({department_name:department}))
    }
    setOpen(false)
  };

  function deleteDep(department){
    if(window.confirm('Are sure want to delete?'))
      dispatch(deleteDepartment(department?.id))
  }

  return (
    <div>
      
      {loading ? <Loader/> : ''}
      
      <div style={{ display: 'flex', justifyContent: 'end' }} >
        <Button variant="contained" onClick={handleAdd}> Add Department</Button>
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
            {departments?.data?.map((dep, index) => {
              return (
                <tr key={dep?.id}  >
                  <td>{index + 1}</td>
                  <td>{dep?.department_name}</td>
                  <td>
                    <Button variant='outlined' onClick={() => handleEdit(dep)} >Edit</Button>
                    <Button variant='outlined' color='error' onClick={() => deleteDep(dep)}>Delete</Button>
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
        edit={edit}
      />
    </div>
  )
}

export default Department