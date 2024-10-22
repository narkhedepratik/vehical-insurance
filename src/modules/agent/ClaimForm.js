import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

function ClaimForm() {  
  const { register, handleSubmit, reset, setValue, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'claimAssessments',
  });
  const {claimId}=useParams();
  const [step, setStep] = useState(1);
  const [incidentImage, setIncidentImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(!!claimId); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (claimId) {
      setLoading(true);  
      axios.get(`http://localhost:8083/getsingleClaimByClaimId/${claimId}`)
        .then(response => {
          console.log(response)
          const claimData = response.data;
          setValue('claimantName', claimData.claimantName);
          setValue('claimantContactNumber', claimData.claimantContactNumber);
          setValue('policyNumber', claimData.policyNumber);
          setValue('claimType', claimData.claimType);
          setValue('claimStatus', claimData.claimStatus);
          setValue('claimDate', claimData.claimDate);
          setValue('dateOfIncident', claimData.dateOfIncident);
          setValue('dateOfClaimClosure', claimData.dateOfClaimClosure);
          setValue('incident.incidentLocation', claimData.incident?.incidentLocation);
          setValue('incident.incidentInvolvePersons', claimData.incident?.incidentInvolvePersons);
          
          if (Array.isArray(claimData.claimAssessments)) {
            claimData.claimAssessments.forEach(assessment => append(assessment));
          }

          setIncidentImage(claimData.incidentImage);
          setLoading(false);  
        })
        .catch(error => {
          setLoading(false);
          console.error("Failed to fetch claim data", error);
          alert("Failed to fetch claim data.");
        });
    }
  }, [claimId]);

  const saveClaim = (claim) => {
    const fd = new FormData();
    fd.append('data', JSON.stringify(claim));
    fd.append('incidentphoto', incidentImage);

    const apiUrl = isEditMode ? `http://localhost:8083/updateClaim/${claimId}` : 'http://localhost:8083/saveClaimInformation';
    const method = isEditMode ? 'put' : 'post';

    axios[method](apiUrl, fd)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          alert("Claim Data saved successfully!");
          reset();
          setStep(1);
          setIncidentImage(null);
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('Error Response:', error.response.data);
          alert(`Error: ${error.response.data.message || "Something went wrong."}`);
        } else {
          console.error('Error:', error.message);
          alert("Something went wrong.");
        }
      });
  };

  const onNext = () => setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  const onPrevious = () => setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));

  const onSubmit = (data) => {
    if (step === 3) {
      saveClaim(data);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mt-2'>
      <h3 className='text-center'>{isEditMode ? 'Edit Claim Form' : 'Claim Form'}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="form-group">
        {step === 1 && (
          <>
            <div className="mb-3">
              <label>Claimant Name:</label>
              <input type="text" className="form-control" {...register('claimantName', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Claimant Contact Number:</label>
              <input type="text" className="form-control" {...register('claimantContactNumber', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Policy Number:</label>
              <input type="text" className="form-control" {...register('policyNumber', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Claim Type:</label>
              <input type="text" className="form-control" {...register('claimType', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Claim Status:</label>
              <input type="text" className="form-control" {...register('claimStatus', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Claim Date:</label>
              <input type="date" className="form-control" {...register('claimDate', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Date Of Incident:</label>
              <input type="date" className="form-control" {...register('dateOfIncident', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Date Of Claim Closure:</label>
              <input type="date" className="form-control" {...register('dateOfClaimClosure')} />
            </div>
            <div className="mb-3">
              <label>*Select Incident Image:</label>
              <input type="file" className="form-control" onChange={e => setIncidentImage(e.target.files[0])}
                required={!isEditMode} 
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {fields.map((item, index) => (
              <div key={item.id}>
                <h3 className="text-center mb-2">Claim Assessment {index + 1}</h3>
                <div className="mb-3">
                  <label htmlFor="claimAmount">Claim Amount:</label>
                  <input type="number" id="claimAmount" {...register(`claimAssessments.${index}.claimAmount`, { required: true })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="claimDate">Claim Date:</label>
                  <input type="date" id="claimDate" {...register(`claimAssessments.${index}.claimDate`, { required: true })}
                    className="form-control"
                  />
                </div>
                <button type="button" className='btn btn-danger' onClick={() => remove(index)}>Remove Assessment</button>
              </div>
            ))}
            <button type="button" className='btn btn-secondary' onClick={() => append({})}>Add Another Assessment</button>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-center mb-2">Incident Details</h3>
            <div className="mb-3">
              <label htmlFor="incidentLocation">Incident Location:</label>
              <input type="text" id="incidentLocation" {...register('incident.incidentLocation', { required: true })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="incidentInvolvedPersons">Persons Involved:</label>
              <input type="number" id="incidentInvolvedPersons" {...register('incident.incidentInvolvePersons', { required: true })}
                className="form-control"
              />
            </div>
          </>
        )}

        <div className='d-flex justify-content-center mt-2'>
          <button type="button" className='btn btn-secondary me-3' onClick={onPrevious} disabled={step === 1}>Previous</button>
          {step === 3 ? (
            <button type="submit" className='btn btn-success'>Submit</button>
          ) : (
            <button type="button" className='btn btn-primary' onClick={onNext}>Next</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ClaimForm;
