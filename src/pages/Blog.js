import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppFooter, AppHeader, AppSidebar } from '../component'
import { BACKEND_API } from '../store/WebApiUrl';

export default function Blog() {
  const navigate = useNavigate();
  useEffect(() => {
    getAllBlog()
  }, [])

  const [blogs, setBlogs] = useState([]);
  const getAllBlog = async () => {
    let url = BACKEND_API + "course/getBlog";
    let data = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: ""
    })
    let parsedData = await data.json();
    setBlogs(parsedData.data);
  }

  const goToPage = (data) => {
    // localStorage.setItem("blogData", JSON.stringify(data))
    navigate("/blogDetail/" + data.slug)
  }

  return (
    <div className="App">

      <AppSidebar />

      <div data-elementor-type="wp-page" data-elementor-id="13904" className="elementor elementor-13904" >
        <section style={{ padding: "0px" }} className="elementor-section elementor-top-section elementor-element elementor-element-af402d8 bg-product-white elementor-section-boxed elementor-section-height-default elementor-section-height-default">
          <br></br>
          <br></br>
          <div style={{ marginTop: "100px" }} className="elementor-container elementor-column-gap-default">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-515e5dd">
              <div className="elementor-widget-wrap elementor-element-populated">
                <section className="elementor-section elementor-inner-section elementor-element elementor-element-1b8867c elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                  <div className="elementor-container elementor-column-gap-default">
                    <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-9f2ceda">
                      <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-e3d681a elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                          <div className="elementor-widget-container">Blog </div>
                        </div>
                        <div className="elementor-element elementor-element-d3fac80 elementor-widget elementor-widget-text-editor"></div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>



          <section className="elementor-section elementor-inner-section elementor-element elementor-element-be1d051 elementor-section-full_width elementor-section-height-default elementor-section-height-default">

            {/* <img style={{height: "calc(100vh - 625px)", width: "100%", objectFit: "none"}} src='./assets/commingsoon.png' /> */}

            <div>
              <div className="mx-auto max-w-7xl lg:px-8">
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8  lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {blogs.map((post) => (
                    <article onClick={(e) => goToPage(post)} key={post.id} className="flex max-w-xl flex-col items-start justify-between BlogClass">
                      <div className="group relative">
                        <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <a >{post.title} </a>
                        </h3>
                        <div className="relative mt-2 flex items-center gap-x-4">
                          <div className="text-sm leading-6">
                            <p className=" text-gray-900">By - {post.addedBy} </p>
                          </div>
                        </div>
                        <img style={{width:"100%"}} src={BACKEND_API+post.blogImage} />
                        <p style={{ height: "200px", overflow: "hidden", textOverflow: "ellipsis" }} className="mt-3 text-sm leading-6 text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: `${post.longDiscription}` }}></p>
                      </div>
                      <div className="flex mt-3 items-start gap-x-4 text-xs">
                        <a className="timeClass relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600">
                          <time dateTime={post.createDate.split("T")[0]} className="text-gray-500">
                            {post.createDate.split("T")[0]}
                          </time>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>


          </section>
        </section>
      </div>


      <AppFooter />
    </div>
  )
}
