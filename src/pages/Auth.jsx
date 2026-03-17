import React, {  useState } from 'react';
import {useAuth} from '../context/AuthContext'
import { useForm,} from 'react-hook-form';
import { useNavigate  } from 'react-router-dom';

const Auth = () => {
  const [mode,setMode] = useState('signup');
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  const {signUp,user,logout,login} = useAuth();

  function onSubmit(data){
    setError('');
    let result='';
    if(mode === 'signup'){
      result = signUp(data.email,data.password);
    }else{
      result = login(data.email,data.password);
    }

    if(result.success){
      navigate("/");
    }else{
      setError(result.message);
    }
  }
  return (
    <div className='page'>
      <div className='container'>
        <div className="auth-container">
          <h1 className="page-title">
            {mode === 'signup' ? 'Sign Up':'Login'}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
            {user && 
              <div>
                <p>User Loggedin : {user.email}</p>
                <button onClick={() => logout()}>Logout</button>
              </div>
            }

            {error && <div className='error-message'>{error}</div>}
            <div className='form-group'>
              <label className='form-label' htmlFor='email'>Email</label>
              <input className='form-input' type='email' id='email'  {...register("email", { required: "Email is required" })}/>
              {errors.email && <span className='form-error'>{errors.email.message}</span>}
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='password'>Password</label>
              <input className='form-input' type='password' id='password'  {...register("password", { required: "Password is required" ,
               minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 12,
                  message: "Password must be less than 12 characters",
                }
              })}/>
              {errors.password && <span className='form-error'>{errors.password.message}</span>}

            </div>
            <button type='submit' className='btn btn-primary btn-large'>
               {mode === 'signup' ? 'Sign Up':'Login'}
            </button>
          </form>
          <div className='auth-swith'>
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span className="auth-link" onClick={() => setMode("login")}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                {" "}
                Don't have an account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Auth;
