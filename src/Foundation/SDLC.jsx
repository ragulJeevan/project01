import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSdlc,createSdlc,editSdlc,deleteSdlc } from '../ReduxKit/Slices/Foundation/SDLCSlice';
import { Button } from '@mui/material';
import Loader from '../Components/Loader';
import AddItem from './AddItem';

const SDLC = () => {
  const dispatch = useDispatch();
  const{Sdlc,loading} = useSelector((state)=> state?.sdlcList);

  const[open,setOpen]=useState(false);
  const [edit,setEdit]=useState(null);

  useEffect(()=>{
    dispatch(fetchSdlc());
  },[dispatch]);


  function openModal(){
    setEdit(null);
    setOpen(true);
  }

  function closeModal(){
    setOpen(false);
  }

  function handleSubmit(data){
    data.sdlc_name = data?.name;
    if(edit){
      data.id = edit.id;
      dispatch(editSdlc(data));
    }
    else{
      dispatch(createSdlc(data));
    }
    setOpen(false);
  }

  function editData(data){
    const passData={
      id:data?.id,
      name:data?.sdlc_name,
      description:data?.description
    }
    setEdit(passData);
    setOpen(true);
  }

  function deleteData(data){
    dispatch(deleteSdlc(data));
  }

  return (
    <div>
      {loading ? <Loader/> : ''}
      <div style={{display:'flex',justifyContent:'end'}}>
        <Button onClick={openModal} variant='contained' color='primary'>Add SDLC</Button>
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
            {Sdlc?.map((_p,index)=>{return(
              <tr key={_p?.id}>
                <td>{index+1}</td>
                <td>{_p?.sdlc_name}</td>
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
      <AddItem label={'SDLC'} open={open} onClose={closeModal} onAdd={handleSubmit} edit={edit} />
    </div>
  )
}

export default SDLC