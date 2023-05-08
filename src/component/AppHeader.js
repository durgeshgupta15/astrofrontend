import React from 'react'

const AppHeader = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="header-group">
            <div className="header-logo-section">
              <div className="logo d-flex">
                <button data-trigger="navbar_main" className="d-lg-none btn btn-danger me-3" type="button"><i className="fa fa-bars"
                  aria-hidden="true"></i></button>
                <a href="#"><img src="assets/images/logo.png" className="img-fluid" alt="" /></a>

              </div>

              <div className="login-register ms-auto my-auto">
                <a href="#"><img src="assets/images/talk-astrologer-icon.svg" alt="" /> Talk To Astrologer</a>
                <a href="#"><img src="assets/images/chat-astrologer.svg" alt="" /> Chat With Astrologer</a>
                <a href="#" className="sarch-icon"><img src="assets/images/sarch-icon.svg" alt="" /></a>
                <a href="login.html" className="sarch-icon mobile-signins">Sign In</a>
                <a href="register.html" className="sign-up-btn"><img src="assets/images/users-icon.svg" alt="" /> SIGN UP</a>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
