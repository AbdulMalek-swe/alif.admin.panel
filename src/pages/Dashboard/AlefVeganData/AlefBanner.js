import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'apiService/axios'
import { AiFillEdit,AiFillDelete} from 'react-icons/ai';
import { Formik, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AlefBannerData = () => {
    const [isTrue,setIsTrue] = useState(true)
    const formik = useFormik({
        initialValues: {
          bannerFirstHeader: '',
          bannerSecondHeader: '',
          amount: 0 ,
          bannerImage: null,
        },
        onSubmit: (values) => {
            console.log(values,'updaterd');
          const formData = new FormData();
          formData.append('bannerFirstHeader', values.bannerFirstHeader);
          formData.append('bannerSecondHeader', values.bannerSecondHeader);
          formData.append('discount',values.amount)
          formData.append('bannerImage', values.bannerImage);
      
          axios.post('/banner', formData) 
            .then((response) => {
                console.log(response);
                toast.success("successfully added data") 
            
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
       
            });
        },
      });
      const [banner,setBanner] = useState([])
      async function getBanner(){
        axios.get('/banner')
        .then(res=>{
          setBanner(res?.data?.result)
        })
      }
      useEffect(()=>{
         getBanner()
      },[])
      const bannerDelete = (id)=>{
        
         axios.delete(`/banner/${id}`)
         .then(res=>{
            toast.success("successfully delete this")
            getBanner()
         }).catch(err=>{
            toast.error("no delete this banner data")
         })
         
      }
    return (
        <div>
            <div className='flex justify-around'>
                <Button variant="outlined" onClick={()=>setIsTrue(true)}>Banner Data</Button>
                <Button variant="outlined" className='mx-3 '  onClick={()=>setIsTrue(false)}>Post Banner Data</Button>
            </div>
           {isTrue && <GetData banner={banner} bannerDelete={bannerDelete}/>}

          { !isTrue && <div className="container mx-auto p-4">
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="bannerFirstHeader" className="block text-gray-700 text-sm font-bold mb-2">
            Banner First Title
          </label>
          <input
            id="bannerFirstHeader"
            name="bannerFirstHeader"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bannerFirstHeader}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.bannerFirstHeader && formik.errors.bannerFirstHeader ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.bannerFirstHeader}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="bannerSecondHeader" className="block text-gray-700 text-sm font-bold mb-2">
            Banner Second Header
          </label>
          <input
            id="bannerSecondHeader"
            name="bannerSecondHeader"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bannerSecondHeader}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.bannerSecondHeader && formik.errors.bannerSecondHeader ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.bannerSecondHeader}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
            Discount
          </label>
          <input
            id="amount"
            name="amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.amount && formik.errors.amount ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.amount}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="bannerImage" className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            id="bannerImage"
            name="bannerImage"
            type="file"
            onChange={(event) => {
              formik.setFieldValue('bannerImage', event.target.files[0]);
            }}
            onBlur={formik.handleBlur}
            required
            className="w-full"
          />
          {formik.touched.bannerImage && formik.errors.bannerImage ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.bannerImage}</div>
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

export default AlefBannerData;


export const GetData = ({banner,bannerDelete}) => {
    return (
        <>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left"> Image</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Title1</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Title2</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Discount</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                   {banner.map((item,index)=><tr key={index} className='border-b-2'>
                        <td className="py-2 px-4"> 
                     <img src={item?.bannerImage} alt='loading...' className='h-8 w-8 rounded-full ' /> 
                        </td>
                        <td className="py-2 px-4   ">{item.bannerFirstHeader}</td>
                        <td className="py-2 px-4   "> {item?.bannerSecondHeader?.slice(0,100)}...</td>
                        <td className="py-2 px-4   "> {item?.discount}</td>
                        <td className=" py-7    flex gap-x-5  items-center "> 
                        <Link to={`/dashboard/uihome/${item?._id}`}>
                        <AiFillEdit onClick={()=>{}} className='cursor-pointer text-3xl' /> 
                        </Link>
                       
                         <AiFillDelete onClick={()=>{bannerDelete(item._id)}} className='cursor-pointer text-3xl'/> 
                        
                         </td>
                    </tr>)}
                    {/* Add more rows as needed */}
                </tbody>
            </table>
            
        </>
    );
};

export const UpdateBannerData = ()=>{
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
     
    const [isLoading, setIsLoading] = useState(false);

    const User = useSelector((state) => state?.reducer?.user);
    console.log(User);
    // consol .log(User);

     

    const updateBanner = async (values) => {

        const loading = toast.loading("Please wait a moment...");
        try {
            const res = await axios.patch(`/banner/${id}`,values);
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
                        bannerFirstHeader: vegan?.bannerFirstHeader || "",
                        bannerSecondHeader: vegan?.bannerSecondHeader || "",
                       
                    }}
                    validate={(values) => {
                        const errors = {};
                         


                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                         updateBanner(values)
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
                                id="bannerFirstHeader"
                                label="Title"
                                name="bannerFirstHeader"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.bannerFirstHeader}
                                InputLabelProps={{
                                    style: { color: "#FFFFFF" },
                                }}
                               
                            />
                            <TextField
                            rows={4}
                            cols={4}
                                autoComplete="off"
                                name="bannerSecondHeader"
                                fullWidth
                                className="custom-input"
                                id="bannerSecondHeader"
                                label="Description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.bannerSecondHeader}
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
