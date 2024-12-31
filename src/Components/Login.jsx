import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../ReduxKit/Slices/LoginSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent } from '@mui/material';
import apisService from '../Apis/AxiosService'
import { useSnackbar } from './ShowMessage';

const Login = () => {

  const showMessage = useSnackbar();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatchLogin = useDispatch();
  const navigateTo = useNavigate();

  const routes = [
    { id: 1, menu: 'Home', url: '/home' },
    { id: 2, menu: 'Department', url: '/user_management/department' },
    { id: 3, menu: 'Designation', url: '/user_management/designation' },
    { id: 4, menu: 'User', url: '/user_management/user' },
    { id: 5, menu: 'Foundation', url: '/foundation/layout' },
    { id: 6, menu: 'Project Management', url: '/project_management/layout'},
    { id: 7, menu: 'Task', url: '/project_management/tasklist'},
    { id: 7, menu: 'Create Task', url: '/project_management/create_task'},
  ]

  async function loginFn(e) {
    e.preventDefault();
    try {
      const response = await apisService.post('/api_user_management/user/login/', {
        email: userName,
        password,
      });
      dispatchLogin(setLoggedIn(true));
      localStorage.setItem('loggedIn', 'token');
      localStorage.setItem('routes', JSON.stringify(routes));
      let user = JSON.stringify(response?.data?.data);
      localStorage.setItem('user', user);
      navigateTo('/home');
      showMessage(response?.data?.message, 'success');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!');
      showMessage(err.response?.data?.message, 'error');
    }
  }

  return (
    <>
      <div className='flex-center' >
        <Box width='300px'  >
          <Card sx={{ backgroundColor: 'slategray' }} >
            <CardContent>
              <form onSubmit={loginFn} >
                <div className='mb-3'>
                  <label className='form-label'  >User Name : { } </label>
                  <input className='form-control' type='text' name='userName' value={userName} onChange={(e) => setUserName(e.target.value)} required />
                </div>

                <div className='mb-3'>
                  <label className='form-label'  >Password : { } </label>
                  <input className='form-control' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='mb-3 text-center'>
                  {/* <button type='submit' className='btn btn-primary'>Login</button> */}
                  <Button type='submit' variant='contained'>Login</Button>
                </div>
              </form>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  )
}

export default Login