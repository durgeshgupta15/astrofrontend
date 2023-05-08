import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppFooter, AppSidebar, Noti } from '../component'
import { useNavigate } from 'react-router-dom';
import { BACKEND_API } from '../store/WebApiUrl'

export default function Login() {
  const navigate = useNavigate();
  // let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("")

  const handleChange = (e) => {
    if (e.target.id == 'username') {
      setEmail(e.target.value)
    } else {
      setpassword(e.target.value)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    var payload = new URLSearchParams();
    payload.append("email", email);
    payload.append("password", password);

    await fetch(BACKEND_API + 'user/userLogin', {
      method: 'POST',
      body: payload,
      rejectUnauthorized: false,
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          localStorage.setItem("myUserId", data['data'].intId);
          localStorage.setItem("myName", data['data'].name);
          localStorage.setItem("myEmail", data['data'].email);
          localStorage.setItem("myToken", data['data'].token);
          navigate("/");
        } else {
          Noti({
            status: 'danger',
            content: data.data,
            timer: 5000,
            animation: true,
            progress: true,
          })
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

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


                       
                        <div className="elementor-element elementor-element-d3fac80 elementor-widget elementor-widget-text-editor"></div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>



          <section className="elementor-section elementor-inner-section elementor-element elementor-element-be1d051 elementor-section-full_width elementor-section-height-default elementor-section-height-default">

            <div className="content">
              <div className="container">
                <div className="row">
                  <div class="col-md-1"></div>
                  <div className="col-md-4">
                    <img src="assets/images/undraw_remotely_2j6y.svg" alt="Image" className="img-fluid" />
                  </div>
                  <div className="col-md-6 contents" style={{ display: "block" }}>
                    <div className="row justify-content-center">
                      <div className="col-md-8">

                      <div style={{textAlign:"start"}} className="elementor-element elementor-element-e3d681a elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                          <div className="elementor-widget-container">Login </div>
                        </div>

                        <form onSubmit={onSubmit}>
                          <div className="form-group first">
                            <input type="email" onChange={(e) => { handleChange(e) }} value={email} required className="form-control" id="username" placeholder='Email' />
                          </div>
                          <br></br>
                          <div className="form-group last mb-4">
                            <input type="password" onChange={(e) => { handleChange(e) }} value={password} required className="form-control" id="password" placeholder='Password' />
                          </div>
                          <div className="d-flex mb-5 align-items-center">
                            <span className="ml-auto">
                              <Link to="/register" className="forgot-pass">Sign up New Account</Link>
                            </span>
                          </div>
                          <input type="submit" value="Log In" className="btn btn-block btn-primary" style={{backgroundColor:"#ea580c"}} />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-1"></div>
                </div>
              </div>
            </div>


            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </section>
        </section>
      </div>
      <AppFooter />
    </div>
  )
}