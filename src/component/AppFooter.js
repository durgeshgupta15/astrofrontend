import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BACKEND_API } from '../store/WebApiUrl';
import Noti from './SideMessage';

const AppFooter = () => {
  const [emailSubscribe, setEmailSubscribe] = useState("");
  const handleChange = (e) => {
    setEmailSubscribe(e.target.value)
  }

  const goToBottom = () => {
    var hh = document.body.offsetHeight
    window.scrollTo({
      top: hh,
      behavior: 'smooth',
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    var payload = new URLSearchParams();
    payload.append("email", emailSubscribe);

    await fetch(BACKEND_API + 'course/addSubscribe', {
      method: 'POST',
      body: payload,
      rejectUnauthorized: false,
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setEmailSubscribe("")
        if (data.status) {
          Noti({
            status: 'success',
            content: "Thanks for Subscribe",
            timer: 5000,
            animation: true,
            progress: true,
          })
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
    <footer id="site-footer" role="contentinfo">

      <div id="footer-wave"></div>

      <div className="footer-bg">

        <div className="footer-inner container-xl">


          <div className="footer-top">
            <div className="row">

              <div className="ft-col-1 col-sm-12 col-lg-4">
                <div className="widget widget_text">
                  <div className="widget-content">
                    <div className="textwidget">
                      <h4>Astrosagga</h4>
                      <p>PLAN YOUR FUTURE WITH US, imagine if you could plan your future; debunking all myths around predictions and fortune telling.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ft-col-2 col-sm-12 col-lg-4">
                <div className="widget widget_text">
                  <div className="widget-content">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="textwidget">
                      <p>Jaipur, Rajasthan, 302021</p>
                      <p>Call Us: <strong><a href="tel:9057111116">9057111116</a></strong></p>
                      <p><a href="mailto:astrosagga@gmail.com">astrosagga@gmail.com</a></p>

                      <div style={{ display: 'flex', marginTop: '20px' }}>
                        <a target='_blank' href="https://www.facebook.com/Astrosagga-116060738050927"><img style={{ width: "30px", marginRight: "10px" }} src='https://astrosagga.com/assets/social%20media/fb.png' /></a>
                        <a target='_blank' href="https://instagram.com/astrosagga?igshid=MDM4ZDc5MmU="><img style={{ width: "30px", marginRight: "10px" }} src='https://astrosagga.com/assets/social%20media/insta.png' /></a>
                        <a target='_blank' href="https://www.youtube.com/channel/UCQWbzHC1OZa1iZGKy1tSDkA"><img style={{ width: "30px", marginRight: "10px" }} src='https://astrosagga.com/assets/social%20media/youtube.png' /></a>
                        <a target='_blank' href="https://www.telegram.com/"><img style={{ width: "30px", marginRight: "10px" }} src='https://astrosagga.com/assets/social%20media/telegram.png' /></a>
                        {/* <a target='_blank' href="https://www.twitter.com/"><img style={{ width: "30px", marginRight: "10px" }} src='https://astrosagga.com/assets/social%20media/Whatsapp.png' /></a> */}
                        <a target='_blank' href="https://www.twitter.com/"><img style={{ width: "30px", marginRight: "10px" }} src='https://astrosagga.com/assets/social%20media/tweet.png' /></a>
                        {/* <Link to=""><img style={{width:"30px", marginRight:"10px"}} src='https://cdn-icons-png.flaticon.com/512/145/145807.png' /></Link> */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ft-col-3 col-lg-4">
                <div className="widget widget_mc4wp_form_widget">
                  <div className="widget-content">
                    <h4 className="widget-title">Sign Up for Email Updates</h4>

                    <form onSubmit={onSubmit}>
                      <div className="mc4wp-form-fields">
                        <div className="theme-mailchimp">
                          <div className="theme-mailchimp-fields">
                            <input type="email" onChange={(e) => { handleChange(e) }} value={emailSubscribe} required placeholder="Your e-mail adress" />
                            <input type="submit" value="Subscribe" />
                          </div>
                          <p>Sign up with your email address to receive news and updates</p>
                        </div>
                      </div>

                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>


          <div className="footer-bottom">
            <div className="footer-credits">
              <p className="footer-copyright">Copyright &copy;2023 Astrosagga. All rights reserved..
              </p>
            </div>
            <nav className="footer-menu-wrapper" aria-label="Footer" role="navigation">
              <ul className="footer-menu">
                <li id="menu-item-2007"
                  className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-2007">
                  <Link to="/">Home</Link>
                </li>
                <li id="menu-item-2005"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2005">
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li id="menu-item-2011"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2011">
                  <Link to="/outteam">Our Team</Link>
                </li>


                <li id="menu-item-2010"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2010">
                  <Link to="/courses">Video Courses</Link>
                </li>

                <li id="menu-item-2010"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2010">
                  <Link to="/consultation">Consultation</Link>
                </li>

                <li id="menu-item-2008"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2008">
                  <a onClick={() => goToBottom()}>Contact Us</a>
                </li>

                <li id="menu-item-2010"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2010">
                  <Link to="/privacy">Privacy Policy</Link>
                </li>

                <li id="menu-item-2012"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2012">
                  <Link to="/blog">Blog</Link>
                </li>
              </ul>
            </nav>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default React.memo(AppFooter)
