import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, set } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

function AddCustomer() {
  const { register, handleSubmit, reset, trigger, setValue, control, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: {
      vehicle: [{}],
      policy: {}
    }
  });

  const { fields: vehicleFields, append: appendVehicle, remove: removeVehicle } = useFieldArray({
    control,
    name: "vehicle",
    defaultValues:[{
      vehicleId:0
    }]
  });

  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [rcBookImage, setRcBookImage] = useState(null);
  const [pancardImage, setPancardImage] = useState(null);
  const [adharcardImage, setAdharcardImage] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const { customerId } = useParams();

  const saveCustomer = async (data) => {
    const fd = new FormData();
    fd.append('data', JSON.stringify(data));

    // Append vehicle data to the FormData
    // vehicleFields.forEach((_, index) => {
    //   fd.append(`vehicle${index}`, JSON.stringify(data.vehicle[index]));
    // });

    // Append required multipart files
    fd.append('pancard', pancardImage);
    fd.append('adharcard', adharcardImage);
    fd.append('profile', profileImage);
    fd.append('vehicle', vehicleImage);
    fd.append('rc-book', rcBookImage);
    console.log(data)

     try {
       const res = await axios.post('http://localhost:8082/savecustomer', fd);
       if (res.status === 201) {
         alert("Customer Registered successfully!");
         reset(); // Reset the form after successful submission
         setStep(1); // Reset to the first step
         // Reset file uploads
         setProfileImage(null);
         setRcBookImage(null);
         setPancardImage(null);
         setAdharcardImage(null);
         setVehicleImage(null);
       }
     } catch (error) {
       alert("Something went wrong.");
       console.log(error);
     }
  };

  const validateAndNext = async () => {
    const isValid = await trigger(); // Trigger validation for all fields
    if (isValid) {
      onNext(); // Proceed to next step if all fields are valid
    }
  };

  useEffect(() => {
    if (customerId) {
      axios.get(`http://localhost:8082/getSingleCustomer/${customerId}`)
        .then(response => {
          const data = response.data;
          setValue('customerId',data.customerId)
          setValue("customerFirstName", data.customerFirstName);
          setValue("customerLastName", data.customerLastName);
          setValue("customerAddress", data.customerAddress);
          setValue("customerContactNumber", data.customerContactNumber);
          setValue("customerAadharNumber", data.customerAadharNumber);
          setValue("customerEmailId", data.customerEmailId);
          setValue("customerPancardNumber", data.customerPancardNumber);
          setValue("customerDateOfBirth", data.customerDateOfBirth);
          setValue("customerGender", data.customerGender);
          
          // Set policy details
          if (data.policy) {
            setValue('policy.policyId',data.policy.policyId);
            setValue("policy.policyName", data.policy.policyName);
            setValue("policy.policyCoverageExpiryLimit", data.policy.policyCoverageExpiryLimit);
            setValue("policy.policyStartDate", data.policy.policyStartDate);
            setValue("policy.policyExpiryDate", data.policy.policyExpiryDate);
            setValue("policy.policyClaimDate", data.policy.policyClaimDate);
            setValue("policy.policyCoverageOptions", data.policy.policyCoverageOptions);
            setValue("policy.policyPremium", data.policy.policyPremium);
          }

          // Set vehicle details
          if (Array.isArray(data.vehicle)) {
            data.vehicle.forEach(vehicle => {
              appendVehicle(vehicle); // Append vehicle details
            });
          }
        })
        .catch(error => {
          console.error("Failed to fetch customer data", error);
          alert("Failed to fetch customer data.");
        });
    }
  }, [customerId, appendVehicle, setValue]);

  const onNext = () => setStep(prev => (prev < 4 ? prev + 1 : prev));
  const onPrevious = () => setStep(prev => (prev > 1 ? prev - 1 : prev));

  const onSave = (data) => {
    if (customerId) {
      updateCustomer(customerId, data);
    } else {
      saveCustomer(data);
    }
  };

  const updateCustomer = (customerId, customer) => {
    console.log(customer)
    axios.put(`http://localhost:8082/updateCustomer/${customerId}`, customer)
      .then(res => {
        if (res.status === 200) {
          alert("Customer updated successfully!");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Something went wrong.");
      });
  };

  return (
    <div className='container mt-3'>
      <form onSubmit={handleSubmit(onSave)} className='p-4 border rounded shadow'>
        {step === 1 && (
          <>
            <h3 className="text-center mb-2">Personal Details</h3>
            <div className="row">
              {[
                { name: 'customerFirstName', label: 'First Name' },
                { name: 'customerLastName', label: 'Last Name' },
                { name: 'customerAddress', label: 'Address' },
                { name: 'customerContactNumber', label: 'Contact Number', type: 'tel' },
                { name: 'customerAadharNumber', label: 'Aadhar Number', type: 'number' },
                { name: 'customerEmailId', label: 'Email ID', type: 'email' },
                { name: 'customerPancardNumber', label: 'Pancard Number' },
                { name: 'customerDateOfBirth', label: 'Date of Birth', type: 'date' },
                { name: 'customerGender', label: 'Gender' }
              ].map((field, index) => (
                <div className="mb-3 col-md-6" key={index}>
                  <label className="form-label">{field.label}</label>
                  <input 
                    type={field.type || 'text'} 
                    {...register(field.name, { required: `${field.label} is required.` })}
                    className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`} 
                  />
                  {errors[field.name] && <div className="invalid-feedback">{errors[field.name].message}</div>}
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-center mb-2">Policy Details</h3>
            <div className="row">
              {[
                { name: 'policyName', label: 'Policy Name' },
                { name: 'policyCoverageExpiryLimit', label: 'Coverage Expiry Limit' },
                { name: 'policyStartDate', label: 'Start Date', type: 'date' },
                { name: 'policyExpiryDate', label: 'Expiry Date', type: 'date' },
                { name: 'policyClaimDate', label: 'Claim Date', type: 'date' },
                { name: 'policyCoverageOptions', label: 'Coverage Options' },
                { name: 'policyPremium', label: 'Premium' }
              ].map((field, index) => (
                <div className="mb-3 col-md-6" key={index}>
                  <label className="form-label">{field.label}</label>
                  <input 
                    type={field.type || 'text'} 
                    {...register(`policy.${field.name}`, { required: `${field.label} is required.` })} 
                    className={`form-control ${errors.policy?.[field.name] ? 'is-invalid' : ''}`} 
                  />
                  {errors.policy?.[field.name] && <div className="invalid-feedback">{errors.policy[field.name].message}</div>}
                </div>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-center mb-2">Vehicle Details</h3>
            <div className="row">
              {vehicleFields.map((item, index) => (
                <div key={item.id} className="mb-3 col-md-6">
                  <h4>Vehicle {index + 1}</h4>
                  {[
                    { name: 'vehicleOwnerName', label: 'Owner Name' },
                    { name: 'vehicleType', label: 'Vehicle Type' },
                    { name: 'vehicleRcNumber', label: 'RC Number' },
                    { name: 'vehicleManufacturer', label: 'Manufacturer' },
                    { name: 'vehicleModelName', label: 'Model Name' },
                    { name: 'vehicleRegistrationDate', label: 'Registration Date', type: 'date' },
                    { name: 'vehicleRegistrationUpto', label: 'Registration Upto', type: 'date' }
                  ].map((field) => (
                    <div className="mb-3" key={field.name}>
                      <label className="form-label">{field.label}</label>
                      <input 
                        type={field.type || 'text'} 
                        {...register(`vehicle.${index}.${field.name}`, { required: `${field.label} is required.` })}
                        className={`form-control ${errors.vehicle?.[index]?.[field.name] ? 'is-invalid' : ''}`} 
                      />
                      {errors.vehicle?.[index]?.[field.name] && <div className="invalid-feedback">{errors.vehicle[index][field.name].message}</div>}
                    </div>
                  ))}
                  <button type="button" className='btn btn-danger mt-2' onClick={() => removeVehicle(index)}>Remove Vehicle</button>
                </div>
              ))}
              <button type="button" className='btn btn-secondary' onClick={() => appendVehicle({})}>Add Another Vehicle</button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="text-center mb-2">Upload Required Documents</h3>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Pancard</label>
                <input
                  type="file"
                  onChange={(e) => setPancardImage(e.target.files[0])}
                  className={`form-control ${!pancardImage ? 'is-invalid' : ''}`}
                  required
                />
                {!pancardImage && <div className="invalid-feedback">Pancard is required.</div>}
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Adharcard</label>
                <input
                  type="file"
                  onChange={(e) => setAdharcardImage(e.target.files[0])}
                  className={`form-control ${!adharcardImage ? 'is-invalid' : ''}`}
                  required
                />
                {!adharcardImage && <div className="invalid-feedback">Adharcard is required.</div>}
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className={`form-control ${!profileImage ? 'is-invalid' : ''}`}
                  required
                />
                {!profileImage && <div className="invalid-feedback">Profile image is required.</div>}
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Vehicle Image</label>
                <input
                  type="file"
                  onChange={(e) => setVehicleImage(e.target.files[0])}
                  className={`form-control ${!vehicleImage ? 'is-invalid' : ''}`}
                  required
                />
                {!vehicleImage && <div className="invalid-feedback">Vehicle image is required.</div>}
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">RC Book Image</label>
                <input
                  type="file"
                  onChange={(e) => setRcBookImage(e.target.files[0])}
                  className={`form-control ${!rcBookImage ? 'is-invalid' : ''}`}
                  required
                />
                {!rcBookImage && <div className="invalid-feedback">RC Book image is required.</div>}
              </div>
            </div>
          </>
        )}

        <div className="d-flex justify-content-center mt-2">
          <button type="button" className='btn btn-secondary me-3' onClick={onPrevious} disabled={step === 1}>Previous</button>
          {step === 4 ? (
            <button type="submit" className='btn btn-success'>Submit</button>
          ) : (
            <button type="button" className='btn btn-primary' onClick={validateAndNext}>Next</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
