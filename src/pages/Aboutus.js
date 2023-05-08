import React from 'react'
import { useState, useEffect } from 'react';
import { AppFooter, AppHeader, AppSidebar } from '../component'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from 'react-router-dom';

export default function AboutUs() {

  return (
    <div className="App">

      <AppSidebar />



      <div data-elementor-type="wp-page" data-elementor-id="13904" className="elementor elementor-13904" >
        <section style={{ padding: "0px" }} className="elementor-section elementor-top-section elementor-element elementor-element-af402d8 bg-product-white elementor-section-boxed elementor-section-height-default elementor-section-height-default">
          <br></br>
          <br></br>
          <div style={{marginTop:"100px"}} className="elementor-container elementor-column-gap-default">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-515e5dd">
              <div className="elementor-widget-wrap elementor-element-populated">
                <section className="elementor-section elementor-inner-section elementor-element elementor-element-1b8867c elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                  <div className="elementor-container elementor-column-gap-default">
                    <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-9f2ceda">
                      <div className="elementor-widget-wrap elementor-element-populated">


                        <div className="elementor-element elementor-element-e3d681a elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                          <div className="elementor-widget-container">About Us </div>
                        </div>
                        <div className="elementor-element elementor-element-d3fac80 elementor-widget elementor-widget-text-editor"></div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>



          <section className="elementor-section elementor-inner-section elementor-element elementor-element-be1d051 elementor-section-full_width elementor-section-height-default elementor-section-height-default" style={{width: "70%", textAlign: "start", margin: "0px auto"}}>


            <div className="topheadingmy">PLAN YOUR FUTURE WITH US </div>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              Imagine if you could plan your future;debunking all myths around predictions and fortune telling! We at Astrosagga are there at your disposal. As the name suggests, Astrosagga treads on the fascinating story weaved through the intricate lines of destiny. Based on astrological signs, stars, planets, predictions, tarot and numerology; it is said that in the relativity of the planets is hidden the future of the native. Most of the life events are predestined not predicted, and at Astrosagga we believe that all of us have the power within to create a life of our desires by planning our future based on our birth chart. We are a committed panel of trusted astrologers, tarot readers, numerologists and vastu experts available at your service 24*7*365 days. Come, let us help you to design and plan your life that you’ve always dreamt of; make your dreams come true with Astrosagga.
            </p>

            <br></br>
            <br></br>

            <div className="topheadingmy">VISION </div>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              Astrosagga is devoted to unraveling the deeper meaning and significance of fortune telling. It is not only to find a solution to your current problems but to define and channelize your birth chart with the help of the wisdom and knowledge of vedic scripture to create a life of your fantasy. We at Astrosagga do not believe in predictions, we solely believe in “planning your own future”. Trust us and let us help you plan. Your trust in us will take you places,rest assured we’re there to guide you every step of the way.
            </p>

            <br></br>
            <br></br>


            <div className="topheadingmy">MISSION </div>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              We at Astrosagga are committed to create a platform from which people from all strata are given a once in a lifetime opportunity to create their own story (saga) based on their birth chart, as the Almighty has conceived us from what they must have wanted us to be.
            </p>
            <br></br>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              We believe that God has created us with immense love and has equipped us with multitude potential and capabilities to carve a beautiful and the best life for us and this is only possible at Astrosagga.
            </p>


            <br></br>
            <br></br>


            <div className="topheadingmy">OBJECTIVE </div>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              We are on a mission to educate and provide knowledge of this ancient wisdom formulated by our rishis and gurus. Introspecting into the future to the masses at a very reasonable price,is our plan of action.. We highly believe that such knowledge should not only vest in the hands of few but should be accessible to and by all. For such a humble cause, Astrosagga is offering a variety of courses at your disposal to quench your thirst of understanding and curiosity of what beholds us in the future, and plan accordingly to face the challenges of life and rise above it all.
            </p>
            <br></br>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              We serve, what we believe in …. Is the story of Astrosagga and how it came into existence. Astrosagga’s Founder, Rajeev Bhandari has been associated with astrology since his inception into childhood and he has profoundly carved his life as he has dreamt of. This was achievable with the help of astrology, his planetary dasas and combing through other helpful areas of occult sciences. His constant curiosity to discover this ancient knowledge and scriptures has helped him to concreate his belief on the occult sciences. He firmly believes that if he could successfully derive what he wanted from his life then this should and must become,not just a solution but a way of life for every person out there.. He is indebted to make all this and much more,on the platform of Astrosagga. This platform, Astrosagga aims at making astrology and other occult sciences useful for everyone to create a life of their choice. Planning and aiming at a better life and a better society and a wonderful world at large is what he believes in . He wants to burst the bubble of predictions and wants everyone to plan rather than predict their future.
            </p>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              So,come plan your future at Astrosagga by only trusting your own knowledge.
            </p>
            <p style={{ width: "100%", textAlign: "start", margin: "0px auto" }}>
              Team Astrosagga.
            </p>


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
