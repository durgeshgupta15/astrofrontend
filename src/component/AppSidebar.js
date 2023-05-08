import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Tooltip as ReactTooltip } from 'react-tooltip'

const AppSidebar = () => {

  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/")

  }

  const goToBottom = () => {
    var hh = document.body.offsetHeight
    window.scrollTo({
      top: hh,
      behavior: 'smooth',
    });
  };



  return (
    <>
      <nav id="pr-nav" className="primary-menu navbar navbar-expand-lg navbar-dark" >
        <div className="container-fluid primary-menu-inner px-0">
          <div className="top-wrap">

            <Link to="/" className="custom-logo-link" rel="home" aria-current="page">
              <img width="486" height="220" src="assets/images/logo.png" className="custom-logo style-svg" alt="Astrosagga" />
            </Link>


            <button id="mobile-toggle" className="navbar-toggler animate-button collapsed" type="button"
              data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01"
              aria-expanded="false" aria-label="Toggle navigation">
              <span id="m-tgl-icon" className="animated-icon1"><span></span><span></span></span>
            </button>
          </div>

          <div className="collapse navbar-collapse justify-content-end" id="navbarColor01">
            <ul id="primary-menu" className="navbar-nav pl-3">
              <li id="menu-item-635"
                className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children dropdown active menu-item-635 nav-item">
                <Link to="/" className="nav-link">
                  <span itemProp="name">Home</span>
                </Link>
              </li>
              <li id="menu-item-1553"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1553 nav-item">
                <Link to="/aboutus" className="nav-link">
                  <span itemProp="name">About Us</span>
                </Link>
              </li>
              <li id="menu-item-1675"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1675 nav-item">
                <Link to="/outteam" className="nav-link">
                  <span itemProp="name">Our Team</span>
                </Link>
              </li>


              <li id="menu-item-1814"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1814 nav-item">
                <Link to="/courses" className="nav-link">
                  <span itemProp="name">Video Courses</span>
                </Link>
              </li>

              <li id="menu-item-1814"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1814 nav-item">
                <Link to="/consultation" className="nav-link">
                  <span itemProp="name">Consultation</span>
                </Link>
              </li>

              <li id="menu-item-1814"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1814 nav-item">
                <a onClick={() => goToBottom()} className="nav-link">
                  <span itemProp="name">Contact Us</span>
                </a>
              </li>

              <li id="menu-item-1814"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1814 nav-item">
                <Link to="/blog" className="nav-link">
                  <span itemProp="name">Blog</span>
                </Link>
              </li>
            </ul>

            <div className="header-cta">
              {
                localStorage.getItem("myEmail") != undefined && localStorage.getItem("myToken") != undefined &&
                <>
                  <Link to="/myAccount">
                    {/* <div className="d-inline-block elementor-button-link elementor-button elementor-size-md">My Account</div> */}
                    <ReactTooltip anchorId={"myAccoutToolTip"} />
                    <i id={"myAccoutToolTip"} data-tooltip-content="My Account" className="fas fa-user-edit" style={{ fontSize: "25px", marginRight:"20px" }}></i>
                  </Link>

                  <ReactTooltip anchorId={"logoutToolTip"} />
                  <i id={"logoutToolTip"} data-tooltip-content="Logout" onClick={(e) => logout(e)} className="fas fa-sign-out-alt" style={{ fontSize: "30px", color: "red" }}></i>
                  {/* <div onClick={(e) => logout(e)} style={{ marginLeft: "5px" }} className="d-inline-block elementor-button-link elementor-button elementor-size-md">Logout</div> */}
                </>
              },

              {
                localStorage.getItem("myEmail") == undefined && localStorage.getItem("myToken") == undefined &&
                <Link to="/login">
                  <div className="d-inline-block elementor-button-link elementor-button elementor-size-md">Login</div>
                </Link>
              }


            </div>
          </div>
        </div>
      </nav>


    </>

  )
}

export default React.memo(AppSidebar)
