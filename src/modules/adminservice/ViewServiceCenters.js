import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewServiceCenter() {
  const [serviceCenters, setServiceCenters] = useState([]);

  function getServiceCenters() {
    axios.get('http://localhost:8081/getAllServiceCenter')
      .then(response => {
        if (response.status === 200) {
          setServiceCenters(response.data);
        }
      })
      .catch(error => console.log(error));
  }

  function deleteServiceCenter(serviceCenterId) {
    axios.delete(`http://localhost:8081/deleteservicecenter/${serviceCenterId}`)
      .then(response => {
        console.log("Deleted Service Center Successfully...");
        getServiceCenters();
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getServiceCenters();
  }, []);

  return (
    <div className='justify-content-center mt-1'>
      <h1 className='text-secondary text-center'>View Service Centers</h1>
      {serviceCenters.length === 0 ? ( // Check if serviceCenters is empty
        <div className='text-center'>
          <p className='text-muted'>No service centers available right now.</p>
          <p>Please add a new service center to see it listed here.</p>
        </div>
      ) : (
        <table className='table table-hover table-light table-border'>
          <thead>
            <tr>
              <th>Service Center ID</th>
              <th>Service Center Name</th>
              <th>Service Center Address</th>
              <th>Service Center Contact Number</th>
              <th>Bank Account Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {serviceCenters.map((center, index) => (
              <tr key={index}>
                <td>{center.serviceCenterId}</td>
                <td>{center.serviceCenterName}</td>
                <td>{center.serviceCenterAddress}</td>
                <td>{center.serviceCenterContactNumber}</td>
                <td>
                  {center.accountDetails && center.accountDetails.length > 0 ? (
                    center.accountDetails.map((account, idx) => (
                      <div key={idx}>
                        <span className="font-weight-bold">Account Holder:</span> {account.accountHolderName}<br />
                        <span className="font-weight-bold">Account Number:</span> {account.accountNumber}<br />
                        <span className="font-weight-bold">IFSC:</span> {account.accountIfscNumber}<br />
                        <span className="font-weight-bold">Type:</span> {account.accountType}<br />
                        <hr />
                      </div>
                    ))
                  ) : (
                    <p className='text-muted'>No bank account details available.</p>
                  )}
                </td>
                <td>
                  <Link className="btn btn-light" to={`/edit/${center.serviceCenterId}`}>
                    <i className='bi bi-pen-fill'> </i>
                  </Link>

                  <button className="btn btn-danger" onClick={() => deleteServiceCenter(center.serviceCenterId)}>
                    <i className='bi bi-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewServiceCenter;
