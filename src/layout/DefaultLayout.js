import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../component/index'
import { Carousel } from 'react-responsive-carousel';
import { BACKEND_API } from '../store/WebApiUrl'
import { Link } from 'react-router-dom';

const DefaultLayout = () => {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    getSliders()
  }, [])


  const getSliders = () => {
    var payload = new URLSearchParams();
    payload.append("userId", localStorage.getItem('userId'));
    fetch(BACKEND_API + 'course/getSliders', {
      method: 'POST',
      body: payload,
      rejectUnauthorized: false,
      headers: {
        'userId': localStorage.getItem('userId'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setSliderList(data.data);
        } else {
          alert(data.message)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="App" style={{ backgroundColor: "#EEEBE6" }}>
      {/* <div className="header-bg"> */}
      {/* <AppHeader /> */}
      {/* <span className="screen-darken"></span> */}
      <AppSidebar />
      {/* </div> */}
      <br></br>
      <Carousel className=' md:h-[500px] md:pt-20 mb-4' showIndicators={false} showThumbs={false} autoPlay={true} showArrows={true} showStatus={false} transitionTime={500} infiniteLoop={true}
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              className={`${hasPrev ? "absolute" : "hidden"
                } top-0 bottom-0 left-0 flex justify-center items-center p-2 hover:opacity-100 cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <div className="flex bg-white opacity-50 hover:opacity-100  h-8 w-8 md:h-10 md:w-10 rounded-full justify-center items-center">
                <span className='md:text-2xl rotate-180'>➤</span>
              </div>
            </div>
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <div
              className={`${hasNext ? "absolute" : "hidden"
                } top-0 bottom-0 right-0 flex justify-center items-center p-2 hover:opacity-100 cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <div className="flex bg-white opacity-50 hover:opacity-100 h-8 w-8 md:h-10 md:w-10 rounded-full justify-center items-center">
                <span className='md:text-2xl'>➤</span>
              </div>
            </div>
          );
        }}
      >

        {sliderList.length > 0 && sliderList.map((slider) => {
          return (
            <Link to={slider.slug != '' ? "/sliderDetail/"+slider.slug : ''}>
              <div key={slider.image} className="flex">
                <img className='' src={BACKEND_API + slider.image} alt="AstroSagga" />
              </div>
            </Link>
          )
        })}

      </Carousel>
      <AppContent />
      <AppFooter />
    </div>
  )
}

export default DefaultLayout
