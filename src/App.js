import React, { Component, Suspense } from 'react'
import { Route, Routes, browserHistory } from 'react-router-dom'
// Containers
import DefaultLayout from './layout/DefaultLayout'
import AboutUs from './pages/Aboutus'
import Blog from './pages/Blog'
import BlogDetail from './pages/blogDetail'
import ChangePassword from './pages/changePassword'
import Consultation from './pages/Consultation'
import CourseDetails from './pages/CourseDetails'
import Courses from './pages/Courses'
import KundaliDetail from './pages/KundaliDetail'
import KundaliMatchDetail from './pages/KundaliMatchDetail'
import Login from './pages/Login'
import MyAccount from './pages/myAccount'
import MyCourseDetail from './pages/myCourseDetail'
import MyPaymentHistory from './pages/myPaymentHistory'
import MyProfile from './pages/myProfile'
import OurTeam from './pages/OurTeam'
import PanchangDetail from './pages/PanchangDetail'
import Privacy from './pages/Privacy'
import RashiDetail from './pages/RashiDetail'
import Register from './pages/register'
import WhatWeDo from './pages/WhatWeDo'
import WhatWeDoImportance from './pages/WhatWeDoImportance'
import SliderDetail from './pages/SliderDetail'
// Pages
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {
  render() {
    return (
      <Suspense fallback={loading} browserHistory>
        <Routes>
          <Route path="*" name="Home" element={<DefaultLayout />} />
          <Route exact path="/courses" name="Course Page" element={<Courses />} />
          <Route exact path="/rashiDetail/:rashiId" name="Course Page" element={<RashiDetail />} />
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Login Page" element={<Register />} />
          <Route exact path="/myAccount" name="Login Page" element={<MyAccount />} />
          <Route exact path="/myPaymentHistory" name="Login Page" element={<MyPaymentHistory />} />
          <Route exact path="/myProfile" name="Login Page" element={<MyProfile />} />
          <Route exact path="/changePassword" name="Login Page" element={<ChangePassword />} />
          <Route exact path="/myCourseDetail" name="Login Page" element={<MyCourseDetail />} />
          <Route exact path="/aboutus" name="Login Page" element={<AboutUs />} />
          <Route exact path="/consultation" name="Login Page" element={<Consultation />} />
          <Route exact path="/blog" name="Login Page" element={<Blog />} />
          <Route exact path="/outteam" name="Login Page" element={<OurTeam />} />
          <Route exact path="/courseDetail/:id" name="Login Page" element={<CourseDetails />} />
          <Route exact path="/privacy" name="Login Page" element={<Privacy />} />
          <Route exact path="/kundaliDetail" name="Login Page" element={<KundaliDetail />} />
          <Route exact path="/panchangDetail" name="Login Page" element={<PanchangDetail />} />
          <Route exact path="/kundaliMatchDetail" name="Login Page" element={<KundaliMatchDetail />} />
          <Route exact path="/whatwedo" name="Login Page" element={<WhatWeDo />} />
          <Route exact path="/whatwedoimportance" name="Login Page" element={<WhatWeDoImportance />} />
          <Route exact path="/blogDetail/:id" name="Login Page" element={<BlogDetail />} />
          <Route exact path="/sliderDetail/:id" name="Login Page" element={<SliderDetail />} />


          {/* <Route exact path="/admin/login" name="Login Page" element={<Login />} /> */}
          {/* <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
        </Routes>
      </Suspense>
    )
  }
}

export default App
