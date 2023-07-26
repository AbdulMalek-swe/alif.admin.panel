import axios from 'apiService/axios';
import { ErrorMessage, Field, Formik } from 'formik';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';

const Product = () => {
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
    const [images, setImages] = useState([]);

    const handleImageChange = (event) => {
        const files = event.target.files;
        const imageArray = [];
        for (let i = 0; i < files.length; i++) {
            imageArray.push(files[i]);
        }
        setImages((prevImages) => {
            const updatedImages = [...prevImages, ...imageArray];
            return updatedImages;
        });
    };
   
    const Registerapi = async (values) => {
        try {
            console.log(values);
            const formData = new FormData();
            formData.append('data', JSON.stringify(values));
           
            for (let i = 0; i < images.length; i++) {
                
                formData.append('productImage', images[i]);
            }

            const res = await axios.post(`/product/all`, formData);
            const { status, data } = res;
            console.log("submit data ", res);
            if (status === 200) {
                // Do something on successful registration
            }
        } catch (error) {
            // Handle error
            console.log(error.message);
        }
    };

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
                                name: "",
                                price: "",
                                color: "",
                                description: "",
                                quantity: null,
                                category: "",
                                offerCategory: "",
                                skwNo: ""

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
                                        <label htmlFor="image4" className="block text-gray-700 text-sm font-bold mb-2">
                                            Image 4
                                        </label>
                                        <input
                                            required
                                            type="file"
                                            id="image4"
                                            onChange={(event) => handleImageChange(event)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
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
                                            //   value={item.description}
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
                                            type="text"
                                            id="color"
                                            name="color"
                                            placeholder="Color"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="color" component="div" className="text-red-500 text-sm mt-1" />
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
                                            <option value="shoulder">Shoulder</option>
                                            <option value="clutches">Clutches</option>
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

export default Product;