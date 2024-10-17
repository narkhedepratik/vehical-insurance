import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';



function AddEmployee() {
  const { register, handleSubmit } = useForm();
  
  const [profileImage, setProfileImage] = useState();
  const [pancard, setPancard] = useState();

  function saveEmployee(employee) {
    const fd = new FormData();
    fd.append('data', JSON.stringify(employee));
    fd.append('profile', profileImage);
    fd.append('pancard', pancard);

    axios.post('http://localhost:8081/saveEmployee', fd) 
      .then(res => {
        if (res.status === 201) alert("Employee Registered successfully..!");
      })
      .catch(error => {
        alert("Something went wrong.");
      });
  }

  return (
    <div className='empbaground'>
    <div className="container mt-1 ">
      <h3 className='text-center'>Add Employee</h3>
      <form onSubmit={handleSubmit(saveEmployee)} className="form-group  ">
        <div className="mb-3  ">
          <label>Employee Name:</label>
          <input type="text" className="form-control border border-primary rounded p-1" {...register('employeeName')} />
        </div>
        <div className="mb-3">
          <label>Employee Address:</label>
          <input type="text" className="form-control border border-primary rounded p-1" {...register('employeeAddress')} />
        </div>
        <div className="mb-3">
          <label>Employee Contact Number:</label>
          <input type="text" className="form-control border border-primary rounded p-1" {...register('employeeContactNumber')} />
        </div>
        <div className="mb-3">
          <label>Employee Salary:</label>
          <input type="number" className="form-control border border-primary rounded p-1" {...register('employeeSalary')} />
        </div>
        <div className="mb-3">
          <label>Employee Email ID:</label>
          <input type="email" className="form-control border border-primary rounded p-1" {...register('employeeEmailId')} />
        </div>
        <div className="mb-3">
          <label>Select User Type:</label><br />
          <div className="form-check form-check-inline">
            <input className="form-check-input " type="radio" name="employeeDesignation" value="CRM" {...register('employeeDesignation')} />
            <label className="form-check-label">CRM</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input " type="radio" name="employeeDesignation" value="AGENT" {...register('employeeDesignation')} />
            <label className="form-check-label">AGENT</label>
          </div>
        </div>
        <div className="mb-3">
      
          <label>*Select Profile Image:</label>
          <input type="file" className="form-control  border border-primary rounded p-1" onChange={e => setProfileImage(e.target.files[0])} />
        </div>
        <div className="mb-3">
          <label>*Select Pancard Image:</label>
          <input type="file" className="form-control  border border-primary rounded p-1" onChange={e => setPancard(e.target.files[0])} />
        </div>
        <div className="d-flex justify-content-center mt-2">
    <button type="submit" className="btn btn-success">Add Employee</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AddEmployee;
