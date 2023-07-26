import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';


import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { ErrorMessage, Field, Formik } from 'formik';

import axios from 'apiService/axios';
 
import store from 'rtk/store/store';
import { addUserActions } from 'rtk/feature/addUserSlice';
const Login = () => {
const [cookie, setCookie] = useCookies(["token"])
const navigate = useNavigate()
const Registerapi = async (values) => {

const loading = toast.loading("Please wait a moment...");
try {
const res = await axios.post(
`/user/login/`,
values
);
const { status, data } = res;
if (status === 200 && data?.data?.role==='admin') {
toast.dismiss(loading);
toast.success(data?.message);
setCookie("token", data?.token, {
maxAge: 60 * 60 * 24 * 7, // 1 week
});
store.dispatch(addUserActions.addUser(res.data.data))
navigate("/dashboard")
}
else{
    toast.dismiss(loading);
toast.error('not an admin');
}
} catch (error) {
  
toast.dismiss(loading);
toast.error(error?.response?.data?.error);

}
};
return (
<>
 
{
 
<div className="h-screen md:flex justify-center ">
 
<div className="   h-screen  ">
<div className="w-full h-full   lg:ml-20 lg:mr-20 md:ml-8 md:mr-8  ">
<div className="flex items-center  w-full  h-full">
    <div className='w-full '>
        <h1 className='mb-5 font-bold font-5xl font-sans text-black leading-10 text-center'>Log-in</h1>
        <Formik
            enableReinitialize
            initialValues={{
                email: "",
                password: "",
            }}
            validate={(values) => {
                const error = {};

                if (!values.email) {
                    error.email = "Please enter your email";
                }

                else if (!values.password) {
                    error.password = "Please enter password";
                }

                return error;
            }}
            onSubmit={(values, { resetForm }) => {
                Registerapi(values);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,

                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}  className='shadow-xl p-7' >

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-xl font-normal text-black leading-4">
                            Email<span className="text-red-500">*</span>
                        </label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    {/* password code  */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-xl font-normal text-black leading-4">
                            Password<span className="text-red-500">*</span>
                        </label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  "
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    {/* confirm password  */}


                    <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-black8 w-full text-base font-arial font-bold">
                        Log In
                    </button>
                </form>
            )}
        </Formik>
    </div>
</div>
</div>
</div>
</div>
}
</>
);
};

export default Login;