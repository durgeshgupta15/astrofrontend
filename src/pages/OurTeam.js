import React from 'react'
import { AppFooter, AppHeader, AppSidebar } from '../component'

export default function OurTeam() {

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
                          <div className="elementor-widget-container">Our Team </div>
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
            {/* <div class="wrapper">
              <h1>coming soon<span class="dot">.</span></h1>
              <p>We are working on it.</p>

            </div> */}


          </section>
        </section>
      </div>


      <AppFooter />
    </div>
  )
}
