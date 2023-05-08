import React from 'react'
import { AppFooter, AppHeader, AppSidebar } from '../component'

export default function Consultation() {

  return (
    <div className="App">

      <AppSidebar />

      <div className="flex relative" style={{ backgroundColor: "#EEEBE6" }}>
        <img className='flex-1 h-60 object-cover' style={{ width: "100%", height: "100px", objectFit: "cover" }} src="assets/images/astrology-bg.png" />
      </div>


      <div data-elementor-type="wp-page" data-elementor-id="13904" className="elementor elementor-13904" >
        <section style={{ padding: "0px" }} className="elementor-section elementor-top-section elementor-element elementor-element-af402d8 bg-product-white elementor-section-boxed elementor-section-height-default elementor-section-height-default">
          <br></br>
          <br></br>
          <div className="elementor-container elementor-column-gap-default">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-515e5dd">
              <div className="elementor-widget-wrap elementor-element-populated">
                <section className="elementor-section elementor-inner-section elementor-element elementor-element-1b8867c elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                  <div className="elementor-container elementor-column-gap-default">
                    <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-9f2ceda">
                      <div className="elementor-widget-wrap elementor-element-populated">


                        <div className="elementor-element elementor-element-e3d681a elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                          <div className="elementor-widget-container">Consultation </div>
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

            <img  style={{height: "calc(100vh - 625px)", width: "100%", objectFit: "none"}} src='./assets/commingsoon.png' />


          </section>
        </section>
      </div>


      <AppFooter />
    </div>
  )
}
