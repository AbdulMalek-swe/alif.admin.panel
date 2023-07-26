import React, { useState } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import axios from 'apiService/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UpdateInside from './UpdateInsider';
import InsiderAlif from './ShowInside';
import { toast } from 'react-toastify';

const Inside = () => {
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
            const formData = new FormData();
            formData.append('data', JSON.stringify(values));
           
            console.log(values, "opps",images.length);
            for (let i = 0; i < images.length; i++) {
                console.log(i);
                formData.append('image', images[i]);
              }
           
            const res = await axios.post(`/inside`, formData);
            const { status, data } = res;
            console.log("submit data ", res);
            if (status === 200) {
                // Do something on successful registration
            }
        } catch (error) {
            // Handle error
        }
    };
     const [dltId,setDltId] = useState("")
    const deleteInside = (e)=>{
        axios.delete(`/inside/${dltId}`)
        .then(res=>{
           toast.success("successfully delete this")
        //    getBanner()
        }).catch(err=>{
           toast.error("no delete this inside all data")
        })
    }

    return (
        <>
            <div className="grid lg:grid-cols-2  grid-cols-1 ">
                <div className=" ">
                    <div className="mr-20 ml-20 lg:ml-20 lg:mr-20 md:ml-8 md:mr-8">
                        <div className="text-center">
                            <h1 className="mb-4 font-bold font-5xl font-sans text-black leading-10 uppercase">Inside Form</h1>
                        </div>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                title1: "",
                                title2: "",
                                description1: "",
                                title3: "",
                                description2: "",
                                title4: "",
                                description3: "",
                                title5: "",
                                description4: "",
                                title6: "",
                                description5: "",
                                title7: "",
                                description6: "",
                                title8: "",
                                title9: "",
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
                                            //   value={item.description}
                                            onChange={(content) => handleChange("description1")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description1" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="image1" className="block text-gray-700 text-sm font-bold mb-2">
                                            Image 2
                                        </label>
                                        <input
                                            required
                                            type="file"
                                            id="image1"
                                            onChange={(event) => handleImageChange(event)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        />
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
                                            //   value={item.description}
                                            onChange={(content) => handleChange("description2")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description2" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="image2" className="block text-gray-700 text-sm font-bold mb-2">
                                            Image 2
                                        </label>
                                        <input
                                            required
                                            type="file"
                                            id="image2"
                                            onChange={(event) => handleImageChange(event)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        />
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
                                            //   value={item.description}
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
                                            //   value={item.description}
                                            onChange={(content) => handleChange("description4")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description4" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>


                                    <div className="mb-4">
                                        <label htmlFor="image3" className="block text-gray-700 text-sm font-bold mb-2">
                                            Image 3
                                        </label>
                                        <input
                                            required
                                            type="file"
                                            id="image3"
                                            onChange={(event) => handleImageChange(event)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        />
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
                                            //   value={item.description}
                                            onChange={(content) => handleChange("description5")(content)}
                                            modules={quillm}
                                            formats={quill}
                                            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorMessage name="description5" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

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
                                            //   value={item.description}
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
                   
                   <button onClick={deleteInside} className='bg-black w-full text-white py-2 my-5'>delete</button>
                
                 </div>

                </div>
                <div>
                <UpdateInside setDltId={setDltId}/>
                </div>
            </div>
            <InsiderAlif/>
        </>
    );
};

export default Inside;







