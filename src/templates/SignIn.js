import React from 'react';
import { useForm } from 'react-hook-form';
import '../style/SignIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {

  const { register, handleSubmit } = useForm();  
  const navigate = useNavigate();

  let baseUrl = 'http://localhost:8081/getEmployeeByUsernameAndPassword/';
  
  const onLogin = auth => {
    axios.get(baseUrl + auth.username + '/' + auth.password)
      .then(res => {
        if (res.status === 200) {
          let userJson = JSON.stringify(res.data);
          localStorage.setItem('user', userJson);
          alert("Login successful!");
          navigate('/drive-safe');
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 500) {
          alert(error.response.data.message);
        } else {
          alert('Application is under maintenance');
        }
      });
  };

  return (
    <div className='p-5'>
      <section className="text-center text-lg-start mt-3">
        <div className="card mb-3">
          <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Trendy Pants and Shoes"
                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
            </div>
            <div className="col-lg-8">
              <div className="card-body py-5 px-md-5">
                <form onSubmit={handleSubmit(onLogin)}>

                  {/* Username Field */}
                  <div className="form-outline mb-4">
                    <input type="text" id="form2Example1" className="form-control" {...register('username')} />
                    <label className="form-label" htmlFor="form2Example1">Username</label>
                  </div>

                  {/* Password Field */}
                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" {...register('password')} />
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" defaultChecked />
                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                      </div>
                    </div>
                    <div className="col">
                      <a href="#!">Forgot password?</a>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
