import React from 'react'
import { useState, useEffect } from 'react';
import { AppFooter, AppHeader, AppSidebar } from '../component'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from 'react-router-dom';

export default function WhatWeDo() {

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


                        {/* <div className="elementor-element elementor-element-e3d681a elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                          <div className="elementor-widget-container">What We Do </div>
                        </div> */}
                        <div className="elementor-element elementor-element-d3fac80 elementor-widget elementor-widget-text-editor"></div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>



          <section className="elementor-section elementor-inner-section elementor-element elementor-element-be1d051 elementor-section-full_width elementor-section-height-default elementor-section-height-default" style={{ width: "70%", textAlign: "start", margin: "0px auto" }}>


            <div className="topheadingmy">LEARNING ASTROLOGY CAN BE A VALUABLE TOOL </div>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              Everyone should learn the Astrology, everyone should know about their horoscope, Why?
            </p>

            <br></br>

            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              The way we get diagnosed with a disease, we go to doctor. In the same way, whenever we feel that there is something wrong with our life then we can help ourselves with Astrology.
            </p>
            <br></br>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              Our horoscope is made as per the birth time and on the basis of horoscope, we understand some aspects of our life, we know the good and the bad about us. And with the help of this divine science we can make the best out of it.
            </p>


            <br></br>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              It is important to remember that Astrology is a tool that can be useful for personal growth, understanding your relationships, planning for the future and finding meaning and purpose in life.
            </p>
            <br></br>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              We are providing the courses by which you can understand how to fix the problems related to your life. You can prepare yourself and plan your life as per the upcoming events in future. YOU CAN HELP YOURSELF AND YOUR NEAR & DEAR ONES.
            </p>



            <br></br>
            <br></br>
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
