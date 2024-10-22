import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link} from 'react-router-dom';

function ViewEmployee() {

  const [employee,setEmployee]=useState([]);
  
  function getEmployees()
  {

    axios.get('http://localhost:8081/getAllEmployee')
    .then(response=>{
         if(response.status===200)
         {
           setEmployee(response.data)
         }
    }).catch(error=>console.log(error))

  }

  function deleteEmployee(employeeId){

    axios.delete(`http://localhost:8081/deleteEmployee/${employeeId}`,employee)
    .then(response=>{  
       console.log("Delete Employee Successfully...")
       getEmployees()
      })
    .catch(error=>console.log(error))

  }


  useEffect(()=>{
    getEmployees()
  },[])

  return (
    <div className='justify-content-center m-3 '>
      <h1 className='text-secondary text-center'>ViewEmployee</h1>
      <table className='table table-hover table-light table-border'>
        <thead>
          <tr>
            <th>Id </th>
            <th>Name </th>
            <th>Address</th>
            <th>Contact <br/>Number</th>
            <th>Salary</th>
            <th>Designation</th>
            <th>Email Id</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
          employee.map((emp, index)=><tr key={index}>
                                     <td>{emp.employeeId}</td>
                                     <td>{emp.employeeName}</td>
                                     <td>{emp.employeeAddress}</td>
                                     <td>{emp.employeeContactNumber}</td>
                                     <td>{emp.employeeSalary}</td>
                                     <td>{emp.employeeDesignation}</td>
                                     <td>{emp.employeeEmailId}</td>
                                     <td>{emp.username}</td>
                                     <td>{emp.password}</td>
                                     <td>
                                     <Link className="btn btn-light" to={`/edit-employee/${emp.employeeId}`}><i class="bi bi-pencil"></i></Link>
                                     <button className="btn btn-light" onClick={()=>deleteEmployee(emp.employeeId)}>
                                     <i className="bi bi-trash"></i>
                                      </button></td>
                                     </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ViewEmployee