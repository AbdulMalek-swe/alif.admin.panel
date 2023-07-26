import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import axios from 'apiService/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const UpdateInside = ({setDltId}) => {
    const quill = [
        "header",
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
    ];
    const quillm = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    }
    const [insider,setInsider] = useState({})
   
    const Registerapi = async (values) => {
        try {
            const res = await axios.patch(`/inside/${insider._id}`, values);
            const { status, data } = res;
            console.log("submit data ", res);
            if (status === 200) {
                toast.success("successfully update data ")
                // Do something on successful registration
            }
        } catch (error) {
            // Handle error
        }
    };
  
    useEffect(()=>{
        axios.get("/inside")
        .then(result=>{
           setInsider(...result?.data?.result)
           setDltId(result?.data?.result[0]._id )
        })
    },[setDltId])
    // Function to update the content (you can call this when needed)
    
    return (
        <>  
            <div className=" ">
                <div className=" ">
                    <div className="mr-20 ml-20 lg:ml-20 lg:mr-20 md:ml-8 md:mr-8">
                        <div className="text-center">
                            <h1 className="mb-4 font-bold font-5xl font-sans text-black leading-10 uppercase">Update Inside Form</h1>
                        </div>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                title1: insider.title1||"",
                                title2: insider.title2||"",
                                description1:insider.description1 || "",
                                title3: insider.title3||"",
                                description2: insider.description2 || "",
                                title4: insider.title4||"",
                                description3: insider.description3 || "",
                                title5:insider.title5||"",
                                description4: insider.description4 || "",
                                title6: insider.title6||"",
                                description5: insider.description5 || "",
                                title7: insider.title7||"",
                                description6: insider.description6 || "",
                                title8: insider.title8||"",
                                title9:insider.title9||"",
                            }}
                            validate={(values) => {
                                const error = {};
                          
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
                                <form onSubmit={handleSubmit}   >
                                    <div className="mb-4">
                                        <label htmlFor="title1" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            type="title1"
                                            id="title1"
                                            name="title1"
                                            placeholder="title1"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="title1" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="title2" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            type="title2"
                                            id="title2"
                                            name="title2"
                                            placeholder="title2"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="title2" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    {/* password code  */}
                                    <div className="mb-4">
                                        <label htmlFor="description1" className="block text-xl font-normal text-black leading-4 mt-4">

                                        </label>
                                        <ReactQuill
                                            id="description1"
                                            name="description1"
                                            value=  {values.description1}
                                            onChange={(content) => handleChange("description1")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description1" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                  
                                    <div className="mb-4">
                                        <label htmlFor="title3" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            type="title3"
                                            id="title3"
                                            name="title3"
                                            placeholder="title3"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="title3" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>  <div className="mb-4">
                                        <label htmlFor="description2" className="block text-xl font-normal text-black leading-4 mt-4">

                                        </label>
                                        <ReactQuill
                                            id="description2"
                                            name="description2"
                                            value=  {values.description2}
                                            onChange={(content) => handleChange("description2")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description2" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                   
                                    <div className="mb-4">
                                        <label htmlFor="title4" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            type="title4"
                                            id="title4"
                                            name="title4"
                                            placeholder="title4"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="title4" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>  <div className="mb-4">
                                        <label htmlFor="description3" className="block text-xl font-normal text-black leading-4 mt-4">

                                        </label>
                                        <ReactQuill
                                            id="description3"
                                            name="description3"
                                            value=  {values.description3}
                                            onChange={(content) => handleChange("description3")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description3" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="title5" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            type="title5"
                                            id="title5"
                                            name="title5"
                                            placeholder="title5"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="title5" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>  <div className="mb-4">
                                        <label htmlFor="description4" className="block text-xl font-normal text-black leading-4 mt-4">

                                        </label>
                                        <ReactQuill
                                            id="description4"
                                            name="description4"
                                            value=  {values.description4}
                                            onChange={(content) => handleChange("description4")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description4" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
  
                                    <div className="mb-4">
                                        <label htmlFor="title6" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            type="title6"
                                            id="title6"
                                            name="title6"
                                            placeholder="title6"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="title6" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>  <div className="mb-4">
                                        <label htmlFor="description5" className="block text-xl font-normal text-black leading-4 mt-4">

                                        </label>
                                        <ReactQuill
                                            id="description5"
                                            name="description5"
                                            value=  {values.description5}
                                            onChange={(content) => handleChange("description5")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description5" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
 
                                    <div className="mb-4">
                                        <label htmlFor="title7" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            type="title7"
                                            id="title7"
                                            name="title7"
                                            placeholder="title7"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="title7" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>


                                    <div className="mb-4">
                                        <label htmlFor="title8" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            type="title8"
                                            id="title8"
                                            name="title8"
                                            placeholder="title8"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="title8" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="title9" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            type="title9"
                                            id="title9"
                                            name="title9"
                                            placeholder="title9"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="title9" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="description6" className="block text-xl font-normal text-black leading-4 mt-4">

                                        </label>
                                        <ReactQuill
                                            id="description6"
                                            name="description6"
                                            value=  {values.description6}
                                            onChange={(content) => handleChange("description6")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description6" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-black8 w-full text-base font-arial font-bold">
                                        Submit
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>

                </div>
            </div>
            
        </>
    );
};

export default UpdateInside;

