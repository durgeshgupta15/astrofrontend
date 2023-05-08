import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppFooter, AppHeader, AppSidebar } from '../component'
import { BACKEND_API } from '../store/WebApiUrl';

export default function BlogDetail() {
  const navigate = useNavigate();
  const [blogsDetail, setBlogsDetail] = useState([]);
  const { id } = useParams()
  useEffect(() => {
    if (id == undefined || id == null || id == '') {
      navigate("/blog/")
    } else {
      getAllBlog()
      // setBlogsDetail(JSON.parse(localStorage.getItem('blogData')))
    }
  }, [])


  const getAllBlog = async () => {
    var payload = new URLSearchParams();
    payload.append("slug", id);
    let url = BACKEND_API + "course/getBlogBySlug";
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

      <div className="flex h-40 w-full md:mt-[100px] relative">
        <img className='w-full' src="../assets/images/rashibanner.png" />
        <div className="flex flex-col absolute top-10  w-full h-full font-serif myhoroscopeClass">
          <span style={{ fontSize: "40px" }} className='text-align-center text-white text-xl'>{blogsDetail.title}</span>
        </div>
      </div>



      <div data-elementor-type="wp-page" data-elementor-id="13904" className="elementor elementor-13904" >
        <section style={{ padding: "0px" }} className="elementor-section elementor-top-section elementor-element elementor-element-af402d8 bg-product-white elementor-section-boxed elementor-section-height-default elementor-section-height-default">
          <br></br>
          <br></br>

          <section className="elementor-section elementor-inner-section elementor-element elementor-element-be1d051 elementor-section-full_width elementor-section-height-default elementor-section-height-default" style={{ width: "70%", textAlign: "start", margin: "0px auto" }}>
            <img style={{ width: "100%" }} src={BACKEND_API + blogsDetail.blogImage} />
            <br></br>
            <p dangerouslySetInnerHTML={{ __html: `${blogsDetail.longDiscription}` }}></p>
            <br></br>
            <br></br>
            <br></br>
          </section>
        </section>
      </div>



      {/* <div className="flex flex-col w-full items-center">

        {courseList.map((element) => {
          return <div className="flex flex-col bg-[#eeebe7] shadow-md rounded-md p-3 mx-4 md:w-1/2 mb-5">
            <div className="flex flex-col md:flex-row">
              <span className='flex-1 font-semibold'>{element.courseName}</span>
              <span className='text-gray-500 text-sm'>Course Duration: <span className='text-black font-semibold'>10 Hours</span></span>
            </div>
            <div className="flex my-2">
              <span className='flex-1 text-gray-500 text-sm overflow-hidden text-ellipsis'>Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.</span>
            </div>
            <div className="flex my-2 justify-end">
              <PayPalScriptProvider options={{ "client-id": "test" }}>
                <PayPalButtons style={{ layout: "horizontal" }} />
              </PayPalScriptProvider>
            </div>
          </div>
        })}
      </div> */}

      <AppFooter />
    </div>
  )
}
