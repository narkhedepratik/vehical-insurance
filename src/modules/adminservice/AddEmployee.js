import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function AddEmployee() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
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
      <form onSubmit={handleSubmit(saveEmployee)} className="form-group">
        
        {/* Employee Name */}
        <div className="mb-3">
          <label>Employee Name:</label>
          <input type="text" 
                 className="form-control border border-primary rounded p-1" 
                 {...register('employeeName', { required: 'Employee Name is required' })} />
          {errors.employeeName && <p style={{ color: 'red' }}>{errors.employeeName.message}</p>}
        </div>

        {/* Employee Address */}
        <div className="mb-3">
          <label>Employee Address:</label>
          <input type="text" 
                 className="form-control border border-primary rounded p-1" 
                 {...register('employeeAddress', { required: 'Employee Address is required' })} />
          {errors.employeeAddress && <p style={{ color: 'red' }}>{errors.employeeAddress.message}</p>}
        </div>

        {/* Employee Contact Number */}
        <div className="mb-3">
          <label>Employee Contact Number:</label>
          <input type="text" 
                 className="form-control border border-primary rounded p-1" 
                 {...register('employeeContactNumber', { required: 'Contact Number is required' })} />
          {errors.employeeContactNumber && <p style={{ color: 'red' }}>{errors.employeeContactNumber.message}</p>}
        </div>

        {/* Employee Salary */}
        <div className="mb-3">
          <label>Employee Salary:</label>
          <input type="number" 
                 className="form-control border border-primary rounded p-1" 
                 {...register('employeeSalary', { required: 'Salary is required' })} />
          {errors.employeeSalary && <p style={{ color: 'red' }}>{errors.employeeSalary.message}</p>}
        </div>

        {/* Employee Email ID */}
        <div className="mb-3">
          <label>Employee Email ID:</label>
          <input type="email" 
                 className="form-control border border-primary rounded p-1" 
                 {...register('employeeEmailId', { required: 'Email ID is required' })} />
          {errors.employeeEmailId && <p style={{ color: 'red' }}>{errors.employeeEmailId.message}</p>}
        </div>

        {/* Select User Type */}
        <div className="mb-3">
          <label>Select User Type:</label><br />
          <div className="form-check form-check-inline">
            <input className="form-check-input" 
                   type="radio" 
                   name="employeeDesignation" 
                   value="CRM" 
                   {...register('employeeDesignation', { required: 'User Type is required' })} />
            <label className="form-check-label">CRM</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" 
                   type="radio" 
                   name="employeeDesignation" 
                   value="AGENT" 
                   {...register('employeeDesignation')} />
            <label className="form-check-label">AGENT</label>
          </div>
          {errors.employeeDesignation && <p style={{ color: 'red' }}>{errors.employeeDesignation.message}</p>}
        </div>

        {/* Profile Image */}
        <div className="mb-3">
          <label><span style={{ color: 'red' }}>*</span> Select Profile Image:</label>
          <input type="file" 
                 className="form-control border border-primary rounded p-1" 
                 onChange={e => setProfileImage(e.target.files[0])} 
                 required />
        </div>

        {/* Pancard Image */}
        <div className="mb-3">
          <label><span style={{ color: 'red' }}>*</span> Select Pancard Image:</label>
          <input type="file" 
                 className="form-control border border-primary rounded p-1" 
                 onChange={e => setPancard(e.target.files[0])} 
                 required />
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-center mt-2">
          <button type="submit" className="btn btn-success">Add Employee</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AddEmployee;
