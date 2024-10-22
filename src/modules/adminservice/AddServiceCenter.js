import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddServiceCenter() {
    const [step, setStep] = useState(1);
    const { serviceCenterId } = useParams();
    const { register, handleSubmit, control, setValue, formState: { errors}, watch } = useForm({
        mode: 'all', // Validate on each change
        defaultValues: {
            accountDetails: [{}] // Ensure at least one account field is present
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "accountDetails",
    });

    useEffect(() => {
        if (serviceCenterId) {
            axios.get(`http://localhost:8081/getSingleServiceCenter/${serviceCenterId}`)
                .then(response => {
                    const data = response.data;
                    setValue("serviceCenterName", data.serviceCenterName);
                    setValue("serviceCenterAddress", data.serviceCenterAddress);
                    setValue("serviceCenterContactNumber", data.serviceCenterContactNumber);
                   
                    if (Array.isArray(data.accountDetails)) {
                        data.accountDetails.forEach(account => {
                            append(account);
                        });
                    } else {
                        console.warn("No account details found in response.");
                    }
                })
                .catch(error => {
                    console.error("Failed to fetch service center data", error);
                    alert("Failed to fetch service center data.");
                });
        }
    }, [serviceCenterId, append, setValue]);

    const onNext = () => {
        // Check if the current step's inputs are valid before proceeding
        if (step === 1) {
            const requiredFields = ["serviceCenterName", "serviceCenterAddress", "serviceCenterContactNumber"];
            const isValidStepOne = requiredFields.every(field => watch(field) !== "");
            if (isValidStepOne) {
                setStep(step + 1);
            } else {
                alert("Please fill in all required fields before proceeding.");
            }
        } else if (step === 2) {
            // Additional logic for validation in step 2 if needed
            setStep(step + 1);
        }
    };

    const onPrevious = () => setStep(step => (step - 1 >= 1 ? step - 1 : 1));

    const onSave = (data) => {
        if (serviceCenterId) {
            updateServiceCenter(serviceCenterId, data);
        } else {
            saveServiceCenter(data); 
        }
    };

    const saveServiceCenter = (serviceCenter) => {
        axios.post('http://localhost:8081/saveservicecenter', serviceCenter)
            .then(res => {
                if (res.status === 201) {
                    
                    alert("Service center added successfully!");
                }
            })
            .catch(error => {
                console.error(error);
                alert("Something went wrong.");
            });
    };

    const updateServiceCenter = (serviceCenterId, serviceCenter) => {
        axios.put(`http://localhost:8081/updateservicecenter/${serviceCenterId}`, serviceCenter)
            .then(res => {
                if (res.status === 200) {
                    alert("Service center updated successfully!");
                }
            })
            .catch(error => {
                console.error(error);
                alert("Something went wrong.");
            });
    };

    return (
        <div className='container'>
            <div className='card m-3 p-4'>
                <h1 className='text-secondary fs-3 text-center'>Fill the Form</h1>
                <form onSubmit={handleSubmit(onSave)}>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            {step === 1 && (
                                <div className='text-center'>
                                    <h2>{serviceCenterId ? "Edit Service Center Details" : "Add Service Center Details"}</h2>
                                    <div>
                                        <label>Service Center Name:</label>
                                        <input
                                            type="text"
                                            {...register("serviceCenterName", { required: 'Service Center Name is required' })}
                                            placeholder="Service Center Name"
                                            className="form-control"
                                        />
                                        {errors.serviceCenterName && <span className="text-danger">{errors.serviceCenterName.message}</span>}
                                        <br />
                                        <label>Service Center Address:</label>
                                        <input
                                            type="text"
                                            {...register("serviceCenterAddress", { required: 'Service Center Address is required' })}
                                            placeholder="Service Center Address"
                                            className="form-control"
                                        />
                                        {errors.serviceCenterAddress && <span className="text-danger">{errors.serviceCenterAddress.message}</span>}
                                        <br />
                                        <label>Service Center Contact Number:</label>
                                        <input
                                            type="text"
                                            {...register("serviceCenterContactNumber", { required: 'Service Center Contact Number is required' })}
                                            placeholder="Service Center Contact Number"
                                            className="form-control"
                                        />
                                        {errors.serviceCenterContactNumber && <span className="text-danger">{errors.serviceCenterContactNumber.message}</span>}
                                        <br />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className='text-center'>
                                    <h2>Add Bank Account Details</h2>
                                    {fields.map((item, index) => (
                                        <div key={item.id} className="mb-3">
                                            <h4>Account {index + 1}</h4>
                                            <label>Account Holder Name:</label>
                                            <input
                                                type="text"
                                                {...register(`accountDetails.${index}.accountHolderName`, { required: 'Account Holder Name is required' })}
                                                className="form-control"
                                            />
                                            {errors.accountDetails?.[index]?.accountHolderName && <span className="text-danger">{errors.accountDetails[index].accountHolderName.message}</span>}
                                            <br />
                                            <label>Account Holder Address:</label>
                                            <input
                                                type='text'
                                                {...register(`accountDetails.${index}.accountHolderAddress`, { required: 'Account Holder Address is required' })}
                                                className="form-control"
                                            />
                                            {errors.accountDetails?.[index]?.accountHolderAddress && <span className="text-danger">{errors.accountDetails[index].accountHolderAddress.message}</span>}
                                            <br />
                                            <label>Account Type:</label>
                                            <input
                                                type='text'
                                                {...register(`accountDetails.${index}.accountType`, { required: 'Account Type is required' })}
                                                className="form-control"
                                            />
                                            {errors.accountDetails?.[index]?.accountType && <span className="text-danger">{errors.accountDetails[index].accountType.message}</span>}
                                            <br />
                                            <label>Account Number:</label>
                                            <input
                                                type='text'
                                                {...register(`accountDetails.${index}.accountNumber`, { required: 'Account Number is required' })}
                                                className="form-control"
                                            />
                                            {errors.accountDetails?.[index]?.accountNumber && <span className="text-danger">{errors.accountDetails[index].accountNumber.message}</span>}
                                            <br />
                                            <label>Account IFSC Number:</label>
                                            <input
                                                type='text'
                                                {...register(`accountDetails.${index}.accountIfscNumber`, { required: 'Account IFSC Number is required' })}
                                                className="form-control"
                                            />
                                            {errors.accountDetails?.[index]?.accountIfscNumber && <span className="text-danger">{errors.accountDetails[index].accountIfscNumber.message}</span>}
                                            <br />
                                            <button type="button" className='btn btn-danger' onClick={() => remove(index)}>Remove Account</button>
                                        </div>
                                    ))}
                                    <button type="button" className='btn btn-secondary' onClick={() => append({})}>Add Another Account</button>
                                </div>
                            )}
                            <div className='d-flex justify-content-center mt-3'>
                                <button type="button" className='btn btn-secondary me-5' onClick={onPrevious} disabled={step === 1}>Previous</button>
                                {(step >= 2) ? (
                                    <button type="submit" className='btn btn-success ms-5' disabled={fields.length === 0}>Submit</button>
                                ) : (
                                    <button type="button" className='btn btn-primary ms-2' onClick={onNext}>Next</button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddServiceCenter;
