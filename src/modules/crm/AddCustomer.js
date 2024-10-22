import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css'; 
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

    axios.post('http://localhost:8082/savecustomer', fd)
      .then(res => {
        if (res.status === 201) {
          alert("Customer Registered successfully!");
          reset();
          setStep(1); 
        }
      })
      .catch(error => {
        alert("Something went wrong.");
        console.error(error); 
      });
  };

  const onNext = () => setStep(step => (step < 4 ? step + 1 : step));
  const onPrevious = () => setStep(step => (step > 1 ? step - 1 : step));

  return (
    <div className='container mt-3'>
      <form onSubmit={handleSubmit(saveCustomer)} className='p-4 border rounded shadow'>
      {step === 1 && (
          <>
            <div className="mb-3">
              <label>Customer Name:</label>
              <input type="text" className="form-control" {...register('customerFirstName', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Customer Last Name:</label>
              <input type="text" className="form-control" {...register('customerLastName', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Customer Address:</label>
              <input type="text" className="form-control" {...register('customerAddress', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Customer Contact Number:</label>
              <input type="number" className="form-control" {...register('customerContactNumber', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Customer Adhar Number:</label>
              <input type="number" className="form-control" {...register('customerAdharNumber', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Customer Email Id:</label>
              <input type="email" className="form-control" {...register('customerEmailId', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Customer Pancard Number:</label>
              <input type="text" className="form-control" {...register('customerPancardNumber', { required: true })} />
            </div>
            <div className="mb-3">
              <label>Customer Date Of Birth:</label>
              <input type="date" className="form-control" {...register('customerDateOfBirth')} />
            </div>

            <div className="mb-3">
              <label>Customer Gender:</label>
              <input type="text" className="form-control" {...register('customerGender')} />
            </div>
           
          </>
        )}


        {step === 2 && (
          <>
            <h3 className="text-center mb-2">Documentation</h3>
            <div className="mb-3">
              <label>*Select profile Image:</label>
              <input type="file" className="form-control" onChange={e => setProfileImage(e.target.files[0])}
                required
              />
              </div>



              <div className="mb-3">
              <label>*Select Vehical RC Image:</label>
              <input type="file" className="form-control" onChange={e => setVehicleRCImage(e.target.files[0])}
                required
              />
              </div>

              <div className="mb-3">
              <label>*Select Pan Card Image:</label>
              <input type="file" className="form-control" onChange={e => setPancardImage(e.target.files[0])}
                required
              />
              </div>

              <div className="mb-3">
              <label>*Select Adhar Card Image:</label>
              <input type="file" className="form-control" onChange={e => setAdharcardImage(e.target.files[0])}
                required
              />
              </div>

              <div className="mb-3">
              <label>*Select Vehical Image:</label>
              <input type="file" className="form-control" onChange={e => setVehicleImage(e.target.files[0])}
                required
              />
              </div>

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
