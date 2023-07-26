import axios from 'apiService/axios';
import { ErrorMessage, Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
const UpdateProduct = () => {
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
    const {id} =useParams();
    const Registerapi = async (values) => {
        try {
             console.log(values);
            const res = await axios.patch(`/product/one/${id}`, values);
            const { status } = res;
            console.log("submit data ", res);
            if (status === 200) {
                // Do something on successful registration
            }
        } catch (error) {
            // Handle error
            console.log(error.message);
        }
    };
  
    const [product,setProduct] = useState({})
    useEffect(()=>{
     axios.get(`/product/${id}`)
     .then(res=>{
       
       setProduct(res?.data?.result)
     })
     .catch(err=>{
      
     })
    },[id])
    return (
        <div  >
            <div className="grid lg:grid-cols-2  grid-cols-1 ">
                <div className=" ">
                    <div className="mr-20 ml-20 lg:ml-20 lg:mr-20 md:ml-8 md:mr-8">
                        <div className="text-center">
                            <h1 className="mb-4 font-bold font-5xl font-sans text-black leading-10 uppercase">Inside Form</h1>
                        </div>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                name: product?.name|| "",
                                price: product?.price||"",
                                color: product?.color||"",
                                description:product?.description|| "",
                                quantity:product.quantity|| null,
                                category:product?.category|| "",
                                offerCategory:product?.offerCategory|| "",
                                skwNo: product?.skwNo || ""

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
                                        <label htmlFor="name" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span> Name
                                        </label>
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="skwNo" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">Skw No *</span>
                                        </label>
                                        <Field
                                            type="text"
                                            id="skwNo"
                                            name="skwNo"
                                            placeholder="skwNo"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="skwNo" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-xl font-normal text-black leading-4 mt-4">
                                            description
                                        </label>
                                        <ReactQuill
                                            id="description"
                                            name="description"
                                              value={values?.description}
                                            onChange={(content) => handleChange("description")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="price" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span> Price
                                        </label>
                                        <Field
                                            type="number"
                                            id="price"
                                            name="price"
                                            placeholder="Price"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="color" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span> Color
                                        </label>
                                        <Field
                                            component="select"
                                            id="color"
                                            name="color"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="">Select a color</option>
                                            {['red', 'black', 'white', 'yellow', 'green', 'blue'].map((item) => (
                                                <option key={item} value={item}>
                                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>


                                    <div className="mb-4">
                                        <label htmlFor="quantity" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span> Quantity
                                        </label>
                                        <Field
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            placeholder="Quantity"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="category" className="block text-xl font-normal text-black leading-4">
                                            <span className="text-red-500">*</span> Category
                                        </label>
                                        <Field
                                            component="select"
                                            id="category"
                                            name="category"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="">Select a category</option>
                                            {['shoulder', 'clutches', 'handbags', 'pouch', 'buckets', 'pouches', 'vegan'].map((item) => (
                                                <option key={item} value={item}>
                                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>


                                    <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-black8 w-full text-base font-arial font-bold">
                                        Submit
                                    </button>
                                </form>
                            )}
                        </Formik>


                    </div>

                </div>
                <div>

                </div>
            </div>
        </div>

    );
};

export default UpdateProduct;