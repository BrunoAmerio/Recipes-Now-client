import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import {notifyError, notifySuccess} from '../../utils/notify'
import s from './Register.module.scss';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Register = ()=>{
      const navigate = useNavigate()

      const [user, setUser] = useState({
            name : '',
            lastName : '',
            userName : '',
            password : '',
            repassword : ''
      });

      const [error, setError] = useState({
            password : false,
            disable : true
      });

      //Funcion que valida los imputs
      const validate= (input, setError)=>{
            if(input.name.length && input.lastName.length && input.userName.length ){
                  setError({
                        ...error,
                        disable : false
                  })
            } 
            if(input.password !== input.repassword){
                  setError({
                        ...error,
                        password : true,
                        disable: true
                  })
            } else {
                  setError({
                        ...error,
                        password: false,
                        disable: false
                  })
            }
      }

      const handlerChange = (event)=>{
            setUser({
                  ...user,
                  [event.target.name] : event.target.value
            });
            validate({...user, [event.target.name] : event.target.value}, setError)

      }
      
      const handlerSubmit = (event)=>{
            event.preventDefault();
            axios.post(baseUrl + 'register', {...user})
            .then(res => {
                  notifySuccess(res.data.success)
                  setTimeout(()=>{
                        navigate('/login')
                  },[1500])
            })
            .catch(err => notifyError(err.response.data.error))
      }


      return <div className={s.container}>
            <Button variant='contained' onClick={() => navigate('/')}>Go to home</Button>
            <h2>CREATE A NEW USER</h2>
            <form onSubmit={ handlerSubmit } className={s.formContainer}>
                  <TextField 
                        label='Nombre' 
                        name='name'
                        value={user.name} 
                        onChange={ handlerChange }
                  />
                  <TextField 
                        label='Apellido' 
                        name='lastName' 
                        value={user.lastName}
                        onChange={ handlerChange } 
                  />
                  <TextField 
                        label='Username' 
                        name='userName' 
                        value={user.userName}
                        onChange={ handlerChange } 
                  />
                  <TextField 
                        label='Password' 
                        name='password' 
                        type='password' 
                        color= {error.password ? 'error' : 'success'}
                        onChange={ handlerChange } 
                  />
                  <TextField 
                        label='Confirm Password' 
                        name='repassword' 
                        type='password'
                        color= {error.password ? 'error' : 'success'}
                        onChange={ handlerChange }
                  />
                  <Button variant='contained' type='submit' disabled={error.disable} > Create User </Button>
            </form>
      </div>
}

export default Register;