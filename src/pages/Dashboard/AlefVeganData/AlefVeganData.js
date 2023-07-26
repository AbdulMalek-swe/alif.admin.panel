import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'apiService/axios'
import { AiFillEdit,AiFillDelete} from 'react-icons/ai';
import { Formik, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AlefVeganData = () => {
    const [isTrue,setIsTrue] = useState(true)
    const formik = useFormik({
        initialValues: {
          veganHeader: '',
          veganDescription: '',
          veganImage: null,
        },
        onSubmit: (values) => {
          const formData = new FormData();
          formData.append('veganHeader', values.veganHeader);
          formData.append('veganDescription', values.veganDescription);
          formData.append('veganImage', values.veganImage);
      
          axios
            .post('/vegan', formData) 
            .then((response) => {
                toast.success("successfully added data") 
            
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
       
            });
        },
      });
      const [vegan,setVegan] = useState([])
      async function getVegan(){
        axios.get('/vegan')
        .then(res=>{
          setVegan(res?.data?.result)
        })
      }
      useEffect(()=>{
         getVegan()
      },[])
      const veganDelete = (id)=>{
        console.log(id);
         axios.delete(`/vegan/${id}`)
         .then(res=>{
            toast.success("successfully delete this")
            getVegan()
         }).catch(err=>{
            toast.error("no delete this vegan")
         })
         
      }
    return (
        <div>
            <div className='flex justify-around'>
                <Button variant="outlined" onClick={()=>setIsTrue(true)}>Vegan Data</Button>
                <Button variant="outlined" className='mx-3 '  onClick={()=>setIsTrue(false)}>Post Vegan Data</Button>
            </div>
           {isTrue && <GetData vegan={vegan} veganDelete={veganDelete}/>}

          { !isTrue && <div className="container mx-auto p-4">
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="veganHeader" className="block text-gray-700 text-sm font-bold mb-2">
            Header
          </label>
          <input
            id="veganHeader"
            name="veganHeader"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.veganHeader}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.veganHeader && formik.errors.veganHeader ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.veganHeader}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="veganDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="veganDescription"
            name="veganDescription"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.veganDescription}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.veganDescription && formik.errors.veganDescription ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.veganDescription}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="veganImage" className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            id="veganImage"
            name="veganImage"
            type="file"
            onChange={(event) => {
              formik.setFieldValue('veganImage', event.target.files[0]);
            }}
            onBlur={formik.handleBlur}
            required
            className="w-full"
          />
          {formik.touched.veganImage && formik.errors.veganImage ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.veganImage}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>}

        </div>
    );
};

export default AlefVeganData;


export const GetData = ({vegan,veganDelete}) => {
    return (
        <>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Profile Image</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Title</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Description</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                   {vegan.map((item,index)=><tr key={index} className='border-b-2'>
                        <td className="py-2 px-4"> 
                        {
                          vegan[0]?._id===item._id?'':<img src={item?.veganImage} alt='loading...' className='h-8 w-8 rounded-full ' />}
                        </td>
                        <td className="py-2 px-4   ">{item.veganHeader}</td>
                        <td className="py-2 px-4   "> {item.veganDescription.slice(0,100)}...</td>
                        <td className=" py-7    flex gap-x-5  items-center "> 
                        

                        <Link to={`/dashboard/uihome/${item?._id}`}>
                        <AiFillEdit onClick={()=>{}} className='cursor-pointer text-3xl' /> 
                        </Link>
                       
                        {
                          vegan[0]?._id===item._id?'': <AiFillDelete onClick={()=>{veganDelete(item._id)}} className='cursor-pointer text-3xl'/> 
                        }
                         </td>
                    </tr>)}
                    {/* Add more rows as needed */}
                </tbody>
            </table>
            
        </>
    );
};

export const UpdateVeganData = ()=>{
     const {id} =useParams();
     const [vegan,setSingleVegan] = useState({})
     useEffect(()=>{
      axios.get(`/vegan/${id}`)
      .then(res=>{
        
        setSingleVegan(res?.data?.result)
      })
      .catch(err=>{
       
      })
     },[id])

     const [picture, setPicture] = useState([]);
    // const [open, setOpen] = React.useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isLoading, setIsLoading] = useState(false);

    const User = useSelector((state) => state?.reducer?.user);
    console.log(User);
    // consol .log(User);

     

    const updateVegan = async (values) => {

        const loading = toast.loading("Please wait a moment...");
        try {
            const res = await axios.patch(`/vegan/${id}`,values);
            const { status, data } = res;
            console.log("res", res);
            setIsLoading(false);
            if (status === 200) {
                toast.dismiss(loading);
                toast.success(data?.message);
                setOpen(true);
            }
        } catch (error) {
            // console.log(error)
            setIsLoading(false);
             

        }
    };
    
      return(
        <>
            <div>
 
 
</div>

<div className="relative overflow-hidden lg:py-10 py-5 flex items-center  bg-hero-pattern bg-center bg-cover bg-no-repeat bg-static bg-fixed">
<div className="container-sk">
    <div className=" rotate-border  bg-white w-full mx-auto md:w-2/3 lg:w-1/2    p-1  ">
        <Box className="z-10 rounded-lg bg-hero-pattern  bg-center bg-cover bg-no-repeat bg-static bg-fixed    w-full h-full">
            <div className="md:p-14 p-5  rounded-lg backdrop-blur-xl bg-gray-900/50">
                {/* <ImageSection /> */}
                <Typography className="text-center font-display lg:text-2xl md:text-xl text-lg font-bold mt-10">
                   Update VeganProduct
                </Typography>
                <Formik
                    enableReinitialize
                    initialValues={{
                        veganHeader: vegan?.veganHeader || "",
                        veganDescription: vegan?.veganDescription || "",
                       
                    }}
                    validate={(values) => {
                        const errors = {};
                         


                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                         updateVegan(values)
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
                        <form
                            onSubmit={handleSubmit}
                            className="mt-5 lg:mt-10 flex flex-col gap-4"
                        >
                            

                            <TextField
                                fullWidth
                                id="veganHeader"
                                label="Title"
                                name="veganHeader"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.veganHeader}
                                InputLabelProps={{
                                    style: { color: "#FFFFFF" },
                                }}
                               
                            />
                            <TextField
                            rows={4}
                            cols={4}
                                autoComplete="off"
                                name="veganDescription"
                                fullWidth
                                className="custom-input"
                                id="veganDescription"
                                label="Description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.veganDescription}
                                InputLabelProps={{
                                    style: { color: "#FFFFFF" },
                                }}
                                
                            />
 
                             
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="py-3 bg-primary capitalize lg:text-2xl md:text-xl text-lg text-white hover:font-bold duration-300 font-display"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save
                            </Button>


                        </form>
                    )}
                </Formik>
            </div>
        </Box>
    </div>
</div>
</div>
        </>
      )
}
