import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'apiService/axios'
import { AiFillEdit,AiFillDelete} from 'react-icons/ai';
import { Formik, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from './Product';
const HomeProduct = () => {
    const [isTrue,setIsTrue] = useState(true)
    const formik = useFormik({
        initialValues: {
          productHeader: '',
          productDescription: '',
          productImage: null,
        },
        onSubmit: (values) => {
          const formData = new FormData();
          formData.append('productHeader', values.productHeader);
          formData.append('productDescription', values.productDescription);
          formData.append('productImage', values.productImage);
      
          axios
            .post('/product', formData) 
            .then((response) => {
                toast.success("successfully added data") 
            
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
       
            });
        },
      });
      const [product,setProduct] = useState([])
      async function getproduct(){
        axios.get('/product/all')
        .then(res=>{
          setProduct(res?.data?.result)
        })
      }
      useEffect(()=>{
         getproduct()
      },[])
      const productDelete = (id)=>{
        console.log(id);
         axios.delete(`/product/delete/${id}`)
         .then(res=>{
            toast.success("successfully delete this")
            getproduct()
         }).catch(err=>{
            toast.error("no delete this product")
         })
         
      }
      const [toggleProduct,setToggleProduct] = useState([])
      const allProduct = (e) => {
        if (e === "all") {
          // "Select All" checkbox clicked
          if (toggleProduct.length) {
            // If all products are already selected, unselect all
            if(toggleProduct.length===product.length){
                setToggleProduct([]);
            }
            else{
                setToggleProduct(product);
            }
            
          } else {
            // Otherwise, select all products
            setToggleProduct([...product]);
          }
        } else {
          // Individual checkbox clicked
          const result = toggleProduct.includes(e)
            ? toggleProduct.filter((item) => item._id !== e._id)
            : [...toggleProduct, e];
          setToggleProduct(result);
        }
      };
      const deleteAll =async ()=>{
        try {
            // Send the data to the backend endpoint using Axios with the DELETE method
            let ids=[1,2,3];
            const response = await axios.delete('/product/all/delete', {
              data: toggleProduct, // Pass the data in the request body
            });
      
            // Handle the response from the backend
            const data = response.data;
            console.log(data); // You can log the response or handle it as needed
          } catch (error) {
          
        }
      }
    return (
        <div>

            <div className='flex justify-around'>
                <Button variant="outlined" onClick={()=>setIsTrue(true)}>PRODUCT</Button>
                <Button variant="outlined" className='mx-3 '  onClick={()=>setIsTrue(false)}>Post Product Data</Button>
            </div>
           {!isTrue && <Product/>}
             <button onClick={()=>deleteAll()}>delete salla</button>
          { isTrue && 
          <table className="min-w-full bg-white">
          <thead>
              <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Profile Image</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Title</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Description</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left">Action</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left"><input type='checkbox' checked={toggleProduct.length===product.length?true:false}  onChange={()=>allProduct("all")}/> </th>
              </tr>
          </thead>
          <tbody>
             {product.map((item,index)=><tr key={index} className='border-b-2'>
                  <td className="py-2 px-4"> 
                   <img src={item?.productImage[0]} alt='loading...' className='h-8 w-8 rounded-full ' />
                  </td>
                  <td className="py-2 px-4   ">{item.name}</td>
                  <td className="py-2 px-4   ">  ds</td>
                  <td className=" py-7    flex gap-x-5  items-center "> 
                  

                  <Link to={`/dashboard/updateproduct/${item?._id}`}>
                  <AiFillEdit onClick={()=>{}} className='cursor-pointer text-3xl' /> 
                  </Link>
                 
                  <AiFillDelete onClick={()=>{productDelete(item._id)}} className='cursor-pointer text-3xl'/> 
               
                   </td>
                   <td className="py-2 px-4 border-b-2 border-gray-300 font-semibold text-left"><input type='checkbox' checked={toggleProduct.some(items=>items._id===item._id)} onChange={()=>allProduct(item)}/> </td>
              </tr>)}
              {/* Add more rows as needed */}
          </tbody>
      </table>}

        </div>
    );
};

export default HomeProduct;


export const GetData = ({product,productDelete}) => {
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
                   {product.map((item,index)=><tr key={index} className='border-b-2'>
                        <td className="py-2 px-4"> 
                        {
                          product[0]?._id===item._id?'':<img src={item?.productImage} alt='loading...' className='h-8 w-8 rounded-full ' />}
                        </td>
                        <td className="py-2 px-4   ">{item.productHeader}</td>
                        <td className="py-2 px-4   "> {item.productDescription.slice(0,100)}...</td>
                        <td className=" py-7    flex gap-x-5  items-center "> 
                        

                        <Link to={`/dashboard/uihome/${item?._id}`}>
                        <AiFillEdit onClick={()=>{}} className='cursor-pointer text-3xl' /> 
                        </Link>
                       
                        {
                          product[0]?._id===item._id?'': <AiFillDelete onClick={()=>{productDelete(item._id)}} className='cursor-pointer text-3xl'/> 
                        }
                         </td>
                    </tr>)}
                    {/* Add more rows as needed */}
                </tbody>
            </table>
            
        </>
    );
};

export const UpdateproductData = ()=>{
     const {id} =useParams();
     const [product,setSingleproduct] = useState({})
     useEffect(()=>{
      axios.get(`/product/${id}`)
      .then(res=>{
        
        setSingleproduct(res?.data?.result)
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

     

    const updateproduct = async (values) => {

        const loading = toast.loading("Please wait a moment...");
        try {
            const res = await axios.patch(`/product/${id}`,values);
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
                   Update productProduct
                </Typography>
                <Formik
                    enableReinitialize
                    initialValues={{
                        productHeader: product?.productHeader || "",
                        productDescription: product?.productDescription || "",
                       
                    }}
                    validate={(values) => {
                        const errors = {};
                         


                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                         updateproduct(values)
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
                                id="productHeader"
                                label="Title"
                                name="productHeader"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.productHeader}
                                InputLabelProps={{
                                    style: { color: "#FFFFFF" },
                                }}
                               
                            />
                            <TextField
                            rows={4}
                            cols={4}
                                autoComplete="off"
                                name="productDescription"
                                fullWidth
                                className="custom-input"
                                id="productDescription"
                                label="Description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.productDescription}
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
