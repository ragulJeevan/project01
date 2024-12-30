import { Button } from '@mui/material';
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import { fetchStatus } from '../ReduxKit/Slices/Foundation/Status';

const Status = () => {

  const dispatch = useDispatch();
  const {status,loading} = useSelector((state)=> state?.statusList);


  useEffect(()=>{
    dispatch(fetchStatus()); 
  },[dispatch])


  return (
    <div>
      {loading ? <Loader/> : ''}
      <div style={{display:'flex',justifyContent:'end'}} >
        <Button variant='contained' color='primary'>Add Status</Button>
      </div>
      <div className='p-3' >
        <table className='table table-bordered table-striped table-hover'>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Sno</th>
              <th>Sno</th>
            </tr>
          </thead>
          <tbody>
            {status?.length}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Status