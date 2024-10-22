import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function ViewClaims() {
  const [claims, setClaims] = useState([]);
  const { claimId } = useParams();  
  const getClaims = () => {
    axios.get("http://localhost:8083/getAllClaim")
      .then(response => {
        if (response.status === 200) {
          setClaims(response.data);
          alert("Fetched claims successfully.");
        } else {
          alert(`Unexpected response status: ${response.status}`);
        }
      })
      .catch(error => {
        console.error("Error fetching claims:", error.response);
        if (error.response) {
          alert(`Error: ${error.response.status} - ${error.response.data}`);
        } else {
          alert("Something went wrong.");
        }
      });
  };

  function deleteClaim(claimId) {
    axios.delete(`http://localhost:8083/deleteclaimById/${claimId}`)
      .then(response => {
        alert("Claim deleted successfully.");
       
        getClaims();
      })
      .catch(error => {
        console.error("Error deleting claim:", error.response);
        if (error.response) {
          alert(`Error: ${error.response.status} - ${error.response.data}`);
        } else {
          alert("Something went wrong.");
        }
      });
  }

  useEffect(() => {
    getClaims();
  }, []);

  return (
    <div className='justify-content-center mt-1'>
      <h1 className='text-secondary text-center'>View Claims</h1>
      <table className='table table-hover table-light table-border'>
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Claimant Name</th>
            <th>Claimant Contact Number</th>
            <th>Policy Number</th>
            <th>Claim Type</th>
            <th>Claim Status</th>
            <th>Claim Date</th>
            <th>Date of Incident</th>
            <th>Date of Claim Closure</th>
            <th>Incident Details</th>
            <th>Claim Assessment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim, index) => (
            <tr key={index}>
              <td>{claim.claimId}</td>
              <td>{claim.claimantName}</td>
              <td>{claim.claimantContactNumber}</td>
              <td>{claim.policyNumber}</td>
              <td>{claim.claimType}</td>
              <td>{claim.claimStatus}</td>
              <td>{claim.claimDate}</td>
              <td>{claim.dateOfIncident}</td>
              <td>{claim.dateOfClaimClosure}</td>
              <td>
                {claim.incident && claim.incident.length > 0 ? (
                  claim.incident.map((incident, idx) => (
                    <div key={incident.incidentId}>
                      <span className="font-weight-bold">Incident ID:</span> {incident.incidentId}<br />
                      <span className="font-weight-bold">Incident Location:</span> {incident.incidentLocation}<br />
                      <span className="font-weight-bold">Involved Persons:</span> {incident.incidentInvolvePersons}<br />
                    </div>
                  ))
                ) : (
                  <p className='text-muted'>No incident details available.</p>
                )}
              </td>
              <td>
                {claim.claimassessment && claim.claimassessment.length > 0 ? (
                  claim.claimassessment.map((assessment, idx) => (
                    <div key={idx}>
                      <span className="font-weight-bold">Claim Assessment ID:</span> {assessment.claimId}<br />
                      <span className="font-weight-bold">Claim Assessment Amount:</span> {assessment.claimAmount}<br />
                      <span className="font-weight-bold">Claim Assessment Date:</span> {assessment.claimDate}<br />
                    </div>
                  ))
                ) : (
                  <p className='text-muted'>No claim assessment details available.</p>
                )}
              </td>
              <td>
                <Link className="btn btn-light" to={`/editClaim/${claim.claimId}`}>
                  <i className='bi bi-pen-fill'></i>
                </Link>
                <button className="btn btn-danger" onClick={() => deleteClaim(claim.claimId)}>
                  <i className='bi bi-trash'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewClaims;
