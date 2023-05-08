import React from 'react'
import { useState, useEffect } from 'react';
import { AppFooter, AppHeader, AppSidebar } from '../component'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from 'react-router-dom';

export default function WhatWeDoImportance() {

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


            <div className="topheadingmy">IMPORTANCE OF ASTROLOGY IN MODERN TIMES </div>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              Astrology is an ancient practice that has been used for centuries to gain insight into the mysteries of the universe and our place in it.  While one may dismiss it as superstition or pseudoscience , but people are taking actions on the basis of astrology since ages. Whether it is some auspicious work, marriage whether it for a job or business. People used to find out correct from the astrologer and used to believe that their work would be done in a proper way.
            </p>

            <br></br>

            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              The role of Astrology is that of a planner. Like the meteorological department prepares you for the storm by giving advance information about it. In the same way astrologer also provides an opportunity to be prepared for the problems of the upcoming life by giving advance information about them now. Astrology always play its role as a planner to make life simple and smooth.
            </p>
            <br></br>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              Astrology can be a valuable tool but what good this predictive science can do if we don’t use it to take actions. We can use the insights gained from astrology to proactively shape our future and achieve our goals.
            </p>


            <br></br>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              Astrology can help us to identify auspicious times for starting new projects, making big decisions, and taking risks. By paying attention to the movements of the planets and their impact on our horoscope, we can find opportunities to take bold action and make positive changes in our lives.
            </p>
            <br></br>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              Once we have identified opportunities for actions, it’s important to set clear goal and intentions. And with the goal in mind, plan of action can be created to achieve them.
            </p>
            <br></br>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              Astrology is guidance to the Soul and it is a powerful tool for helping us connect with our true selves and live a more purposeful and fulfilling life.
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
