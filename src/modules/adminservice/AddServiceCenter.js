import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddServiceCenter() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const { serviceCenterId } = useParams(); 
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "accountDetails",
    });
    useEffect(() => {
        if (serviceCenterId) {
            axios.get(`http://localhost:8081/getSingleServiceCenter/${serviceCenterId}`)
                .then(response => {
                    console.log("Fetched service center data:", response.data);
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
    

    const onNext = () => setStep(step => (step + 1 <= 2 ? step + 1 : 2));
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
                                        <input type="text" {...register("serviceCenterName", { required: true })} placeholder="Service Center Name" className="form-control" />
                                        {errors.serviceCenterName && <span>This field is required</span>}
                                        <br />
                                        <label>Service Center Address:</label>
                                        <input type="text" {...register("serviceCenterAddress", { required: true })} placeholder="Service Center Address" className="form-control" />
                                        {errors.serviceCenterAddress && <span>This field is required</span>}
                                        <br />
                                        <label>Service Center Contact Number:</label>
                                        <input type="text" {...register("serviceCenterContactNumber", { required: true })} placeholder="Service Center Contact Number" className="form-control" />
                                        {errors.serviceCenterContactNumber && <span>This field is required</span>}
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
                                                {...register(`accountDetails.${index}.accountHolderName`, { required: true })}
                                                className="form-control"
                                            />
                                            {errors.accountDetails?.[index]?.accountHolderName && <span>This field is required</span>}
                                            <br />
                                            <label>Account Holder Address:</label>
                                            <input
                                                type='text'
                                                {...register(`accountDetails.${index}.accountHolderAddress`, { required: true })}
                                                className="form-control"
                                            />
                                            {errors.accountDetails?.[index]?.accountHolderAddress && <span>This field is required</span>}
                                            <br />
                                            <label>Account Type:</label>
                                            <input
                                                type='text'
                                                {...register(`accountDetails.${index}.accountType`, { required: true })}
                                                className="form-control"
                                            />
                                            {errors.accountDetails?.[index]?.accountType && <span>This field is required</span>}
                                            <br />
                                            <label>Account Number:</label>
                                            <input
                                                type='text'
                                                {...register(`accountDetails.${index}.accountNumber`, { required: true })}
                                                className="form-control"
                                            />
                                            {errors.accountDetails?.[index]?.accountNumber && <span>This field is required</span>}
                                            <br />
                                            <label>Account IFSC Number:</label>
                                            <input
                                                type='text'
                                                {...register(`accountDetails.${index}.accountIfscNumber`, { required: true })}
                                                className="form-control"
                                            />
                                            {errors.accountDetails?.[index]?.accountIfscNumber && <span>This field is required</span>}
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
