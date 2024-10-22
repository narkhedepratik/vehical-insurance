import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8082/getAllCustomer');
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch customers.");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  
  const deleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`http://localhost:8082/deleteCustomer/${customerId}`);
       
        setCustomers(customers.filter(customer => customer.customerId !== customerId));
        alert("Customer deleted successfully!");
      } catch (err) {
        alert("Failed to delete customer.");
        console.log(err);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='container mt-3'>
      <h3 className="text-center mb-4">Customer List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>sr</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Number</th>
            <th>Email ID</th>
            <th>Policy Name</th>
            <th>Vehicle Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <tr key={customer.customerId}>
                <td>{index + 1}</td>
                <td>{customer.customerFirstName}</td>
                <td>{customer.customerLastName}</td>
                <td>{customer.customerContactNumber}</td>
                <td>{customer.customerEmailId}</td>
                <td>{customer.policy?.policyName}</td>
                <td>
                  {customer.vehicle.map((vehicle, vIndex) => (
                    <div key={vIndex}>
                      <p><strong>Owner:</strong> {vehicle.vehicleOwnerName}</p>
                      <p><strong>Model:</strong> {vehicle.vehicleModelName}</p>
                    </div>
                  ))}
                </td>
                <td>
                  <Link className="btn btn-light" to={`/editcus/${customer.customerId}`}>
                    <i className='bi bi-pen-fill'></i>
                  </Link>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => deleteCustomer(customer.customerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCustomers;
