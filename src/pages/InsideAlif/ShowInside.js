import React, { useEffect, useState } from 'react';

import axios from 'apiService/axios';
const InsiderAlif = () => {
    useEffect(() => {
        // window.scroll(0, 0)
    }, [])
    const [inside, setInside] = useState({ image: "" })
    useEffect(() => {
        axios.get("/inside")
            .then(res => {
                setInside(res.data.result[0])
            })

    }, [])

    return (
        <div  >
            <div className='bg-insiderAlif bg-cover bg-no-repeat h-[600px] flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-7xl uppercase'>{inside?.title1}</h2>
                    <h4 className='font-sans text-sm uppercase'>{inside?.title2}</h4>
                </div>
            </div>
            <div className='container-sk'>
                <div  >
                    <div dangerouslySetInnerHTML={{ __html: inside?.description1 }} className='py-7 text-2xl font-arail leading-7'>

                    </div>

                </div>
                <Handemade inside={inside} />
                <div className='my-7'>
                    <img src={inside.image[1]} alt='loading...' className=' w-full lg:h-80 md:h-52 sm:44' />
                </div>
                <Materials inside={inside} />
                <Brands inside={inside} />
                <Donations inside={inside} />
            </div>
        </div>
    );
};

export default InsiderAlif;

export const Handemade = ({ inside }) => {

    return (
        <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-y-6   gap-x-6'>
            <div className='border-black border-2'>
                <div className='h-1/2'>
                <img src={inside?.image[0]} alt='loading...' className='object-fit' />
                </div>
            </div>
            <div className='bg-[#F0F0F0] h-full flex flex-col justify-center rounded-tl-[100px] rounded-br-[100px] -mt-2 -ml-1  md:p-0 p-7'>
                <h1 className='font-sans font-semibold text-3xl mb-1 mx-5'> {inside.title3}</h1>
                <div dangerouslySetInnerHTML={{ __html: inside.description2 }} className='mx-5 py-7 text-2xl font-arail leading-7'>

                </div>
            </div>
        </div>
    )
}

export const Materials = ({ inside }) => {
    return (

        <div className='bg-[#F0F0F0] h-full flex flex-col justify-center rounded-tr-[100px] rounded-bl-[100px] -mt-2 -ml-1 py-7 my-7'>
            <div className='container-sk text-center'>
                <h1 className='uppercase font-sans font-semibold text-3xl mb-5 mx-5 mt-5'> {inside.title4} </h1>
                <div dangerouslySetInnerHTML={{ __html: inside.description3 }} className='py-7 text-2xl font-arail leading-7'>

                </div>
                <h1 className='uppercase font-sans font-semibold text-3xl mb-5 mx-5 mt-5  md:py-0 py-5'>{inside.title5}</h1>
                <div dangerouslySetInnerHTML={{ __html: inside.description4 }} className='py-7 text-2xl font-arail leading-7'>

                </div>
            </div>
        </div>

    )
}

export const Brands = ({ inside }) => {
    return (
        <div className='  grid md:grid-cols-2 grid-cols-1 items-center gap-y-6 md:gap-y-0'>
            <div className='my-auto'>
                <img src={inside?.image[2]} alt='loading...' className='w-full h-full my-auto' />
            </div>
            <div className='bg-[#F0F0F0] h-full flex flex-col justify-center rounded-tr-[100px] rounded-bl-[100px]  -ml-1  md:p-0 p-5'>
                <h1 className='font-sans font-semibold text-3xl mb-5 mx-5'> {inside.title6} </h1>
                <div dangerouslySetInnerHTML={{ __html: inside.description5 }} className='py-7 text-2xl font-arail leading-7'>

                </div>
            </div>
        </div>
    )
}

export const Donations = ({ inside }) => {
    return (
        <div className='bg-insiderAlif1 bg-cover bg-no-repeat h-[600px] my-7 '>

            <div className='container-sk'>
                <h1 className='uppercase font-sans text-3xl font-semibold text-white pt-7 pb-10'>{inside.title7}</h1>
                <div className='mx-7'>
                    <div className='flex items-center '><img src={inside?.image[3]} alt='laoding' />
                        <h1 className='font-sans text-3xl font-black text-white uppercase my-7'>{inside?.title8}</h1></div>
                    <p className='uppercase text-black text-2xl font-semibold mb-7'>{inside?.title9}</p>
                    <div dangerouslySetInnerHTML={{ __html: inside.description6 }} className='py-7 text-2xl font-arail leading-7'>

                    </div>
                </div>
            </div>
        </div>
    )
}