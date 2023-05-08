import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppFooter, AppHeader, AppSidebar } from '../component'
import { BACKEND_API } from '../store/WebApiUrl';

export default function SliderDetail() {
    const navigate = useNavigate();
    const [blogsDetail, setBlogsDetail] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        console.log("helll")
        if (id == undefined || id == null || id == '') {
            navigate("/")
        } else {
            getSliderDetail()
            // setBlogsDetail(JSON.parse(localStorage.getItem('blogData')))
        }
    }, [])


    const getSliderDetail = async () => {
        var payload = new URLSearchParams();
        payload.append("slug", id);
        let url = BACKEND_API + "course/getSliderDetail";
        let data = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: payload
        })
        let parsedData = await data.json();
        setBlogsDetail(parsedData.data[0]);
    }

    return (
        <div style={{ background: "#eeebe6" }}>
            <div className="flex">
                <AppSidebar />
            </div>

            <div className="flex w-full md:mt-[100px] relative">
                <img className='w-full' src={BACKEND_API + blogsDetail.image} />
                {/* <img className='w-full' src="../assets/images/rashibanner.png" /> */}
                <div className="flex flex-col absolute top-10  w-full h-full font-serif myhoroscopeClass">
                    <span style={{ fontSize: "40px" }} className='text-align-center text-white text-xl'>{blogsDetail.title}</span>
                </div>
            </div>



            <div data-elementor-type="wp-page" data-elementor-id="13904" className="elementor elementor-13904" >
                <section style={{ padding: "0px" }} className="elementor-section elementor-top-section elementor-element elementor-element-af402d8 bg-product-white elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                    <br></br>
                    <br></br>

                    <section className="elementor-section elementor-inner-section elementor-element elementor-element-be1d051 elementor-section-full_width elementor-section-height-default elementor-section-height-default" style={{ width: "70%", textAlign: "start", margin: "0px auto" }}>
                        {/* <img style={{ width: "100%" }} src={BACKEND_API + blogsDetail.image} /> */}
                        <br></br>
                        <p dangerouslySetInnerHTML={{ __html: `${blogsDetail.fulldiscription}` }}></p>
                        <br></br>
                        <br></br>

                        <p style={{ fontSize: '18px' }}>
                            <span><b style={{ color: "var(--btn-bg-color)" }}>Created By -</b> {blogsDetail.author}</span>
                            <span style={{ float: 'right' }}><b style={{ color: "var(--btn-bg-color)" }}>Created On -</b> {blogsDetail.createDate != undefined && blogsDetail?.createDate.split('T')[0]}</span>
                        </p>
                        <br></br>
                    </section>
                </section>
            </div>

            <AppFooter />
        </div >
    )
}
