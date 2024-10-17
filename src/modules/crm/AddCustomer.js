import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function AddCustomer() {
  const { register, handleSubmit, reset } = useForm();
  
  const [profImage, setProfileImage] = useState();
  const [vehicleRCImage, setVehicleRCImage] = useState();
  const [pancard, setPancardImage] = useState();
  const [adharcard, setAdharcardImage] = useState();
  const [vehimg, setVehicleImage] = useState();
  const [step, setStep] = useState(1);

  const saveCustomer = (employee) => {
    const fd = new FormData();
    fd.append('data', JSON.stringify(employee));
    fd.append('prof-image', profImage);
    fd.append('vehicleRC-image', vehicleRCImage);
    fd.append('pan-image', pancard);
    fd.append('aadhar-image', adharcard);
    fd.append('vehicle-image', vehimg);

    axios.post('http://localhost:9095/employee_details/save_employee', fd)
      .then(res => {
        if (res.status === 201) {
          alert("Employee Registered successfully!");
          reset(); // Reset the form after successful submission
          setStep(1); // Reset to the first step
        }
      })
      .catch(error => {
        alert("Something went wrong.");
        console.error(error); // Log the error for debugging
      });
  };

  const onNext = () => setStep(step => (step < 4 ? step + 1 : step));
  const onPrevious = () => setStep(step => (step > 1 ? step - 1 : step));

  return (
    <div className='container mt-3'>
      <form onSubmit={handleSubmit(saveCustomer)} className='p-4 border rounded shadow'>
        {step === 1 && (
          <>
            <h3 className="text-center mb-2">Customer Form</h3>
            {['customerFirstName', 'customerLastName', 'customerAddress', 'customerContactNumber', 'customerAadharNumber', 'customerEmailId', 'customerPancardNumber', 'customerDateOfBirth', 'customerGender'].map((field, index) => (
              <div className="mb-3" key={index}>
                <label className="form-label ">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input type={field === 'customerDateOfBirth' ? 'date' : 'text'} {...register(field)} className=' form-control border border-primary rounded p-1' required />
              </div>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-center mb-2">Documentation</h3>
            {['profImage', 'vehicleRCImage', 'pancard', 'adharcard', 'vehimg'].map((imageField, index) => (
              <div className="mb-3" key={index}>
                <label className="form-label">Select {imageField.replace(/([A-Z])/g, ' $1')}</label>
                <input type='file' className='form-control border border-primary rounded p-1' onChange={e => {
                  if (imageField === 'profImage') setProfileImage(e.target.files[0]);
                  if (imageField === 'vehicleRCImage') setVehicleRCImage(e.target.files[0]);
                  if (imageField === 'pancard') setPancardImage(e.target.files[0]);
                  if (imageField === 'adharcard') setAdharcardImage(e.target.files[0]);
                  if (imageField === 'vehimg') setVehicleImage(e.target.files[0]);
                }} />
              </div>
            ))}
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-center mb-2">Policy Details</h3>
            {['policyName', 'policyCoverageExpiryLimit', 'policyStartDate', 'policyExpiryDate', 'policyClaimDate', 'policyCoverageOptions', 'policyPremium'].map((field, index) => (
              <div className="mb-3" key={index}>
                <label className="form-label">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input type='text' {...register(field)} className='form-control border border-primary rounded p-1' required />
              </div>
            ))}
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="text-center mb-2">Vehicle Details</h3>
            {['vehicleOwnerName', 'vehicleType', 'vehicleRcNumber', 'vehicleManufacturer', 'vehicleModelName', 'vehicleRegistrationDate', 'vehicleRegistrationUpto'].map((field, index) => (
              <div className="mb-3" key={index}>
                <label className="form-label">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input type='text' {...register(field)} className='form-control border border-primary rounded p-1' required />
              </div>
            ))}
          </>
        )}

        <div className='d-flex justify-content-center mt-2'>
          <button type="button" className='btn btn-secondary me-3' onClick={onPrevious} disabled={step === 1}>Previous</button>
          {step === 4 ? (
            <button type="submit" className='btn btn-success'>Submit</button>
          ) : (
            <button type="button" className='btn btn-primary' onClick={onNext}>Next</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
