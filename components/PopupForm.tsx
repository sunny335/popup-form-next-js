"use client";
// components/PopupForm.tsx

import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";

type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  consent: boolean;
};

const PopupForm = () => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
  
      const response = await axios.post("/api/submitForm", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Form submitted successfully
        setSuccess(true);
        reset();
      } else {
        const contentType = response.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
          const responseData = response.data;
          setIsError(true);
          // Handle JSON errors and display them to the user
          console.error('Error response from server:', responseData);
        } else {
          // Handle non-JSON responses (e.g., plain text or HTML)
          setIsError(true);
          console.error('Unexpected response type:', contentType);
        }
      }
    } catch (error) {
      setIsError(true);
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false); // Hide loader after submission
    }
  };
  

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [success]);

  return (
    <div className="bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between min-h-386"
      >
        <div className="mb-2">
      
          <label htmlFor="name" className="block font-light mb-1 text-black">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            placeholder="Enter your name"
            className={`w-full border rounded-md p-2 text-black bg-slate-100 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block font-light mb-1 text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
                message: "invalid email address",
              },
            })}
            placeholder="Enter your email"
            className={`w-full border rounded-md p-2 text-black  bg-slate-100 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email?.message ? (
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          ) : (
            errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="phoneNumber"
            className="block font-light  mb-1 text-black"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...register("phoneNumber", { required: true , pattern: {
              value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
              message: "invalid email address",
            },})}
            placeholder="Enter your phone number"
            className={`w-full border rounded-md p-2 text-black bg-slate-100 ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">a valid phone number is required</p>
          )}
        </div>
        <div className="mb-2">
          <input
            type="checkbox"
            id="consent"
            {...register("consent", { required: true })}
            className={`mr-2 ${
              errors.consent ? "border-red-500" : "border-gray-300"
            }`}
          />
          <span className="text-black text-sm">
            I agree to the terms and conditions.
          </span>
          {errors.consent && (
            <p className="text-red-500 text-sm">please agree T&C</p>
          )}
        </div>
        {error ? (
            <p className="text-red-500 text-sm">Please try again</p>
          ) : null}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4  rounded-md hover:bg-blue-600 w-full flex justify-center items-center"
          disabled={isLoading}
        >
          {success
            ? <><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="27" height="27" viewBox="0 0 48 48">
            <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
            </svg> Submitted</>
            : isLoading
            ?     <div className="w-6 h-6 rounded-full animate-spin
            border-2 border-solid border-yellow-500 border-t-transparent"></div>
            : "Submit"}
        </button>
        {success && <p>Form submitted successfully</p>}
      </form>
    </div>
  );
};

export default PopupForm;
