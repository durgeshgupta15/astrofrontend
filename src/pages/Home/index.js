import React, { useEffect, useState, useRef } from 'react'
import Slider from 'react-slick';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BACKEND_API } from '../../store/WebApiUrl';
import Select from 'react-select'

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom';
// import { getCourses, getBlogList, getAstrologer, getProducts } from '../../store/actions/adminAction'
// import { IMAGE_BASE_URL } from '../../store/WebApiUrl'


const Home = () => {
  const navigate = useNavigate();
  // const blogList = useSelector((state) => state.admin.blogList)
  // const astrologerList = useSelector((state) => state.admin.astrologerList)
  // const coursesList = useSelector((state) => state.admin.coursesList)
  // const productList = useSelector((state) => state.admin.productList)
  // const dispatch = useDispatch()
  // const [coursesData, setCoursesData] = useState([]);
  // const [astrologerData, setAstrologerData] = useState([]);
  // const [productData, setProductData] = useState([]);

  useEffect(() => {
    getTodayPanchang()
    getAllRashi()
    getAllReviews()
    //   dispatch(getCourses())
    //   dispatch(getAstrologer())
    //   dispatch(getBlogList())
    //   dispatch(getProducts())
  }, [])

  // useEffect(() => {
  //   setCoursesData(coursesList?.data)
  // }, [coursesList])

  // useEffect(() => {
  //   setAstrologerData(astrologerList?.data)
  // }, [astrologerList])

  // useEffect(() => {
  //   setProductData(productList?.data)
  // }, [productList])

  const [panchang, setPanchang] = useState([]);
  const getTodayPanchang = async () => {
    let url = BACKEND_API + "user/getTodayPanchang";
    let data = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: "" // <-- Post parameters
    })
    let parsedData = await data.json();
    setPanchang(parsedData.data);
  }

  const [rashi, setRahi] = useState([]);
  const getAllRashi = async () => {
    let url = BACKEND_API + "course/getAllRashi";
    let data = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: "" // <-- Post parameters
    })
    let parsedData = await data.json();
    setRahi(parsedData.data);
  }

  const [review, setReview] = useState([]);
  const getAllReviews = async () => {
    let url = BACKEND_API + "course/getAllReviews";
    let data = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: "" // <-- Post parameters
    })
    let parsedData = await data.json();
    setReview(parsedData.data);
  }


  const gotoPage = () => {
    navigate("/kundaliDetail")
  }



  // Kundali Match FORM AND API
  const [selectedKundaliMatchLanaguageValue, setSelectedKundaliMatchLanguageValue] = useState('en');
  const [selectedKundaliBoyLocation, setSelectedKundaliBoyLocation] = useState('');
  const [selectedKundaliBoyLocationLabel, setSelectedKundaliBoyLocationLabel] = useState('');
  const [selectedKundaliGirlLocation, setSelectedKundaliGirlLocation] = useState('');
  const [selectedKundaliGirlLocationLabel, setSelectedKundaliGirlLocationLabel] = useState('');
  const [selectedChartStyle, setSelectedChartStyle] = useState('north-indian');

  const onChartStyleChange = (e) => {
    setSelectedChartStyle(e.target.value);
  }
  const onKundaliMatchLanguageSelectChange = (e) => {
    setSelectedKundaliMatchLanguageValue(e.target.value);
  }
  const onKundaliMatchBoyLocation = (e) => {
    setSelectedKundaliBoyLocation(e.value);
    setSelectedKundaliBoyLocationLabel(e.label);
    // setSelectedKundaliBoyLocation(e.target.value);
  }

  const onKundaliMatchGirlLocation = (e) => {
    setSelectedKundaliGirlLocation(e.value);
    setSelectedKundaliGirlLocationLabel(e.label);
    // setSelectedKundaliGirlLocation(e.target.value);
  }


  const [formValuesForKundaliMatch, setFormValuesForKundaliMatch] = useState({
    language: selectedKundaliMatchLanaguageValue,
    boy_name: "",
    boy_dob: "",
    boy_location: selectedKundaliBoyLocation,
    girl_dob: "",
    girl_name: "",
    girl_location: selectedKundaliGirlLocation,
  });

  const onChangeKundalimatch = (e) => {
    setFormValuesForKundaliMatch({ ...formValuesForKundaliMatch, [e.target.id]: e.target.value });
  }

  const onKundaliMatchSubmit = async (e) => {
    e.preventDefault();
    var payload = new URLSearchParams();
    payload.append("language", selectedKundaliMatchLanaguageValue);
    payload.append("boy_dob", formValuesForKundaliMatch.boy_dob);
    payload.append("boy_name", formValuesForKundaliMatch.boy_name);
    payload.append("boy_location", selectedKundaliBoyLocation);
    payload.append("boy_locationLabel", selectedKundaliBoyLocationLabel);
    payload.append("girl_name", formValuesForKundaliMatch.girl_name);
    payload.append("girl_dob", formValuesForKundaliMatch.girl_dob);
    payload.append("girl_location", selectedKundaliGirlLocation);
    payload.append("girl_locationLabel", selectedKundaliGirlLocationLabel);

    // await fetch(BACKEND_API + 'user/kundaliMatch', {
    await fetch(BACKEND_API + 'pdfdetail/matchingDetail', {
      method: 'POST',
      body: payload,
      rejectUnauthorized: false,
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {

          localStorage.setItem("kundaliMatch", JSON.stringify(data.data))
          navigate("/kundaliMatchDetail")
          // setSelectedKundaliMatchLanguageValue('');
          // setSelectedKundaliBoyLocation('');
          // setSelectedKundaliGirlLocation('');
          // setFormValuesForKundaliMatch({ ...formValuesForKundaliMatch, ['language']: '', ['boy_name']: '', ['girl_name']: '', ['boy_dob']: '', ['girl_dob']: '' });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }




  // My Kundali FORM AND API
  const [selectedKundaliAyanamsaLanaguageValue, setSelectedKundaliAyanamsaLanguageValue] = useState('1');
  const [selectedKundaliLanaguageValue, setSelectedKundaliLanguageValue] = useState('en');
  const [selectedKundaliGender, setSelectedKundaliGender] = useState('Male');
  const [selectedKundaliMyLocation, setSelectedKundaliMyLocation] = useState('');
  const [selectedKundaliMyLocationLable, setSelectedKundaliMyLocationLable] = useState('');

  const onKundaliLanguageSelectChange = (e) => {
    setSelectedKundaliLanguageValue(e.target.value);
  }
  const onKundaliAyanamsaSelectChange = (e) => {
    setSelectedKundaliAyanamsaLanguageValue(e.target.value);
  }
  const onKundaliGenderChange = (e) => {
    setSelectedKundaliGender(e.target.value);
  }
  const onKundaliMyLocationChange = (e) => {
    setSelectedKundaliMyLocation(e.value);
    setSelectedKundaliMyLocationLable(e.label);
  }
  const onKundaliMyLocationChangeApiCall = (e) => {
    if (e.target.value.length > 2) {
      getLocationApi(e.target.value)
    }
  }

  const [formValuesForKundali, setFormValuesForKundali] = useState({
    fullName: "",
    my_dob: "",
  });

  const onChangeKundali = (e) => {
    setFormValuesForKundali({ ...formValuesForKundali, [e.target.id]: e.target.value });
  }

  const onKundaliSubmit = async (e) => {
    e.preventDefault();
    if (selectedKundaliMyLocation == '' || selectedKundaliMyLocationLable == '') {
      alert("Please select Birth Place")
      return;
    }
    var payload = new URLSearchParams();
    payload.append("ayanamsa", selectedKundaliAyanamsaLanaguageValue);
    payload.append("language", selectedKundaliLanaguageValue);
    payload.append("fullName", formValuesForKundali.fullName);
    payload.append("gender", selectedKundaliGender);
    payload.append("my_dob", formValuesForKundali.my_dob);
    payload.append("MyLocation", selectedKundaliMyLocation);
    payload.append("MyLocationLabel", selectedKundaliMyLocationLable);
    payload.append("chartType", selectedChartStyle);

    // await fetch(BACKEND_API + 'user/myKundali', {
    await fetch(BACKEND_API + 'pdfdetail/birthDetail', {
      method: 'POST',
      body: payload,
      rejectUnauthorized: false,
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {

          localStorage.setItem("kundali", JSON.stringify(data.data))
          navigate("/kundaliDetail")
          // setSelectedKundaliMatchLanguageValue('');
          // setSelectedKundaliBoyLocation('');
          // setSelectedKundaliGirlLocation('');
          // setFormValuesForKundaliMatch({ ...formValuesForKundaliMatch, ['language']: '', ['boy_name']: '', ['girl_name']: '', ['boy_dob']: '', ['girl_dob']: '' });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const [optionList, setOptionList] = useState([]);

  const getLocationApi = async (value) => {
    await fetch(`https://client-api.prokerala.com/v1/location/search.json?q=${value}&limit=20`, {
      method: 'GET',
      rejectUnauthorized: false,
    })
      .then((response) => response.json())
      .then((data) => {
        setOptionList([])
        if (data.status == 'ok') {
          var myValueOptions = []
          for (let index = 0; index < data.data.length; index++) {
            const element = data.data[index];
            myValueOptions.push({ value: (element[6] + ',' + element[7]), label: (element[1] + ',' + element[2] + ',' + element[3]) });
            // setOptionList(optionList => [...optionList, { value: (element[6] + ',' + element[7]), label: (element[1] + ',' + element[2] + ',' + element[3] + ',' + element[4]) }]);
          }
          setOptionList(myValueOptions)
          // console.log(myValueOptions)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }




  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {(isReadMore && text.length >= 260) ? text.slice(0, 260) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {text.length >= 260 && (isReadMore ? "...read more" : " show less")}
        </span>
      </p>
    );
  };

  return (
    <main id="site-content" className="flex-grow-1" role="main">
      <article className="post-13904 page type-page status-publish hentry" id="post-13904">
        <div className="post-inner">
          <header className="entry-header header-group">
            <div className="entry-header-inner">
            </div>
          </header>



          <div className="entry-content clearfix">
            <div data-elementor-type="wp-page" data-elementor-id="13904" className="elementor elementor-13904 w-full flex flex-col">

              <div className="lg:mt-40 xl:mt-40 2xl:mt-60 flex flex-col font-serif md:flex-row justify-center bg-slate-50 rounded-md shadow-md mx-4 p-4">
                <span className=' m-2 md:w-1/4 text-gray-600'><span className='font-semibold text-black'>Sign Up</span> for <span className='font-semibold text-black'>Free</span> & consult your favorite astrologer</span>
                {/* mobile number input */}
                <div className="flex bg-slate-300 px-4 py-2 items-center rounded-md shadow-md">
                  <div className="flex flex-col">
                    <span className='text-xs mx-2 my-2 text-gray-600'>Add your phone number to continue</span>
                    <div className="flex">
                      <input className="w-16 shadow appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="countryCode" type="text" placeholder="+91" />
                      <input className="w-full mx-2 shadow appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mobileNumber" type="text" placeholder="Mobile Number" />
                    </div>
                  </div>
                </div>
                {/* sign up button with terms */}
                <div className="flex flex-col md:mx-6  items-center mt-4 ">
                  <button className='bg-amber-400 w-32 px-4 py-2 rounded-md shadow-xl hover:bg-amber-500  duration-700 hover:font-semibold hover:text-white'>Sign Up</button>

                  <div className="flex mx-2 items-center mt-2">
                    <input type="checkbox" checked readOnly className='' />
                    <Link to={"/privacy"}><span className='text-xs mx-2'>I Agree with terms and conditions</span></Link>
                  </div>
                </div>
              </div>


              <section
                className="p-0 elementor-section elementor-top-section elementor-element elementor-element-82fab11 elementor-section-height-min-height elementor-reverse-tablet elementor-reverse-mobile elementor-section-boxed elementor-section-height-default elementor-section-items-middle">
                <div className="elementor-background-overlay"></div>

                <div className="elementor-container elementor-column-gap-custom" style={{ minHeight: "auto" }}>
                  <div
                    className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-9ebc47f">
                    <div className="elementor-widget-wrap elementor-element-populated">


                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-e670fcb elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-default">


                          <div className="flex flex-col md:flex-row w-full font-serif mb-10">
                            <div className="flex bg-[#eeebe6] border border-gray-400 rounded-md shadow p-4 md:w-1/3 mx-2 mt-2">
                              <img className='h-10 w-10 object-contain' src="https://cdn-icons-png.flaticon.com/512/3135/3135810.png" />
                              <div className="flex flex-col ml-4">
                                <span className='text-xl font-medium'>10,000+ Students</span>
                                <span className='text-slate-600'>A vast community of active learners from around the globe.</span>
                              </div>
                            </div>
                            <div className="flex bg-[#eeebe6] border border-gray-400 rounded-md shadow p-4 md:w-1/3 mx-2 mt-2">
                              <img className='h-10 w-10 object-contain' src="https://cdn-icons-png.flaticon.com/512/4762/4762311.png" />
                              <div className="flex flex-col ml-4">
                                <span className='text-xl font-medium'>6+ Courses</span>
                                <span className='text-slate-600'>A wide range of courses to learn in all domains of Vedic Science.</span>
                              </div>
                            </div>
                            <div className="flex bg-[#eeebe6] border border-gray-400 rounded-md shadow p-4 md:w-1/3 mx-2 mt-2">
                              <img className='h-10 w-10 object-contain' src="https://cdn-icons-png.flaticon.com/512/7829/7829198.png" /><div className="flex flex-col ml-4">
                                <span className='text-xl font-medium'>11+ Panelists</span>
                                <span className='text-slate-600'>A leading team of trained professionals to learn and consult with.</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </section>

                      {/* kundali boxes */}
                      <div className="grid md:grid-cols-3 w-full font-serif">

                        <div className="flex flex-col mt-4 bg-[#eeebe6] border border-gray-400 rounded-md shadow-md p-3 m-2">
                          <span className='text-xl font-medium self-center'>Kundli / Birth Chart</span>
                          <div className="flex w-full bg-gray-100 h-[1px] mt-2 mb-2" />
                          <span className='font-medium'>Enter Birth Details</span>
                          <br></br>

                          <Form onSubmit={onKundaliSubmit} id="kundaliBirthChartFrom">
                            {/* <span className='text-sm text-gray-500 ml-2 mt-2'>Ayanamsa</span>
                            <select className="custom-select shadow-md" required value={selectedKundaliAyanamsaLanaguageValue} onChange={onKundaliAyanamsaSelectChange}>
                              <option value="1">Lahiri</option>
                              <option value="3">Raman</option>
                              <option value="5">KP</option>
                            </select> */}


                            <span className='text-sm text-gray-500 ml-2 mt-2'>Language</span>
                            <select className="custom-select shadow-md" required value={selectedKundaliLanaguageValue} onChange={onKundaliLanguageSelectChange}>
                              <option value="en">English</option>
                              <option value="hi">Hindi</option>
                            </select>


                            <span className='text-sm text-gray-500 ml-2 mt-2'>Full Name</span>
                            <input className="w-full mt-2 shadow-md appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required onChange={onChangeKundali} name='fullName' id="fullName" type="text" placeholder="Full Name" />

                            <span className='text-sm text-gray-500 ml-2 mt-2'>Gender</span>
                            <select className="custom-select shadow-md" required value={selectedKundaliGender} onChange={onKundaliGenderChange}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>


                            <span className='text-sm text-gray-500 ml-2 mt-2'>DOB</span>
                            <input className="w-full mt-2 shadow-md appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required onChange={onChangeKundali} name='my_dob' id="my_dob" type="datetime-local" placeholder="Name" />


                            <span className='text-sm text-gray-500 ml-2 mt-2'>Birth Place</span>
                            {/* <select className="custom-select shadow-md" required value={selectedKundaliMyLocation} onChange={onKundaliMyLocationChange}>
                              <option value="">Birth Place</option>
                              <option value="26.9196,75.7878">Jaipur, Rajasthan</option>
                              <option value="26.9176,70.9039">Jaisalmer, Rajasthan</option>
                              <option value="28.652,77.2315">Delhi, Delhi</option>
                            </select> */}


                            <Select
                              required="true"
                              className='dropDownSelect'
                              options={optionList}
                              placeholder="Search Location"
                              onChange={onKundaliMyLocationChange}
                              onKeyDown={onKundaliMyLocationChangeApiCall}
                              isSearchable={true}
                            />

                            <span className='text-sm text-gray-500 ml-2 mt-2'>Chart Style</span>
                            <select className="custom-select shadow-md" required value={selectedChartStyle} onChange={onChartStyleChange}>
                              <option value="NORTH_INDIAN">North Indian</option>
                              <option value="SOUTH_INDIAN">South Indian</option>
                              <option value="EAST_INDIAN">East Indian</option>
                            </select>

                            <div style={{ width: "100%", textAlign: "center" }} >

                              <button type='submit' className='self-center mt-4 bg-orange-600 w-36 px-4 py-2 rounded-md shadow-xl hover:bg-orange-700  duration-300 font-medium hover:font-medium text-white hover:text-white'>Get Kundli</button>
                            </div>
                          </Form>

                        </div>

                        {/* kundali matching boxes */}


                        <div className="flex flex-col mt-4 bg-[#eeebe6] border border-gray-400 rounded-md shadow-md p-3 m-2">
                          <span className='text-xl font-medium self-center'>Kundli Matching</span>
                          <div className="flex w-full bg-gray-100 h-[1px] mt-2 mb-2" />


                          <Form onSubmit={onKundaliMatchSubmit}>
                            <span className='text-sm text-gray-500 ml-2 mt-2'>Language</span>
                            <select className="custom-select shadow-md" value={selectedKundaliMatchLanaguageValue} onChange={onKundaliMatchLanguageSelectChange} required >
                              <option value="en">English</option>
                              <option value="hi">Hindi</option>
                            </select>


                            <div className="flex w-full bg-gray-100 h-[1px] mt-2 mb-2" />
                            <span className='font-medium'>Enter Boy's Details</span>
                            <input className="w-full mt-2 shadow-md appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required onChange={onChangeKundalimatch} name='boy_name' id="boy_name" type="text" placeholder="First Last Name" />


                            <span className='text-sm text-gray-500 ml-2 mt-2'>DOB</span>
                            <input className="w-full mt-2 shadow-md appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required onChange={onChangeKundalimatch} name='boy_dob' id="boy_dob" type="datetime-local" placeholder="Dob" />


                            <span className='text-sm text-gray-500 ml-2 mt-2'>Birth Place</span>
                            {/* <select className="custom-select shadow-md" value={selectedKundaliBoyLocation} onChange={onKundaliMatchBoyLocation} required >
                              <option value="">Birth Place</option>
                              <option value="26.9196,75.7878">Jaipur, Rajasthan</option>
                              <option value="26.9176,70.9039">Jaisalmer, Rajasthan</option>
                              <option value="28.652,77.2315">Delhi, Delhi</option>
                            </select> */}

                            <Select
                              className='dropDownSelect'
                              options={optionList}
                              placeholder="Search Location"
                              onChange={onKundaliMatchBoyLocation}
                              onKeyDown={onKundaliMyLocationChangeApiCall}
                              isSearchable={true}
                            />


                            <div className="flex w-full bg-gray-100 h-[1px] mt-2 mb-2" />
                            <span className='font-medium'>Enter Girl's Details</span>
                            <input className="w-full mt-2 shadow-md appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required onChange={onChangeKundalimatch} name='girl_name' id="girl_name" type="text" placeholder="First Last Name" />

                            <span className='text-sm text-gray-500 ml-2 mt-2'>DOB</span>
                            <input className="w-full mt-2 shadow-md appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required onChange={onChangeKundalimatch} name='girl_dob' id="girl_dob" type="datetime-local" placeholder="Name" />

                            <span className='text-sm text-gray-500 ml-2 mt-2'>Birth Place</span>
                            {/* <select className="custom-select shadow-md" value={selectedKundaliGirlLocation} onChange={onKundaliMatchGirlLocation} required >
                              <option value="">Birth Place</option>
                              <option value="26.9196,75.7878">Jaipur, Rajasthan</option>
                              <option value="26.9176,70.9039">Jaisalmer, Rajasthan</option>
                              <option value="28.652,77.2315">Delhi, Delhi</option>
                            </select> */}


                            <Select
                              className='dropDownSelect'
                              options={optionList}
                              placeholder="Search Location"
                              onChange={onKundaliMatchGirlLocation}
                              onKeyDown={onKundaliMyLocationChangeApiCall}
                              isSearchable={true}
                            />
                            <div style={{ width: "100%", textAlign: "center" }} >

                              <button type="submit" className='self-center mt-1 bg-orange-600 w-36 mt-4 px-4 py-2 rounded-md shadow-xl hover:bg-orange-700  duration-300 font-medium hover:font-medium text-white hover:text-white'>Submit</button>
                            </div>

                          </Form>
                        </div>


                        {/* panchang card */}


                        <div className="flex flex-col mt-4 bg-[#eeebe6] border border-gray-400 rounded-md shadow-md p-3 m-2">
                          <span className='text-xl font-medium self-center'>Panchang</span>
                          <div className="flex w-full bg-gray-100 h-[1px] mt-2 mb-2" />

                          {Object.keys(panchang).length > 0 &&
                            <>
                              {panchang?.sunTime != "undefined - undefined" && <div>
                                <span className='self-center font-medium'>Sun Time:<span className='font-normal'> {panchang?.sunTime.split(" - ")[0]} - {panchang?.sunTime.split(" - ")[1]}</span></span>
                                {/* <span className='self-center font-medium'>Sunset:<span className='font-normal'> </span>{panchang?.sunTime.split(" - ")[1]}</span> */}
                                <span className='self-center font-medium'>Moon Time:<span className='font-normal'> {panchang?.moonTime.split(" - ")[0]} - {panchang?.moonTime.split(" - ")[1]}</span></span>
                                {/* <span className='self-center font-medium'>Moonset:<span className='font-normal'> {panchang?.moonTime.split(" - ")[1]}</span></span> */}

                                <br></br>
                                <table border={1} id="panchangeHomeTable">
                                  <tbody>
                                    <tr className="alert-success text-center">
                                      <td colSpan="2">Auspicious Timing</td>
                                    </tr>
                                    {panchang?.fullData?.auspicious_period.map((auspicious_period, index) => (
                                      <tr key={index}>
                                        <td>{auspicious_period.name}</td>
                                        <td>
                                          {auspicious_period.period.map((period) => (
                                            <>
                                              {(period.start.split("+")[0] + ' - ' + period.end.split("+")[0]).replaceAll("T", " ")}
                                              <br></br>
                                            </>
                                          ))}
                                          {/* {auspicious_period.period[0].start.split("+")[0]} - {auspicious_period.period[0].end.split("+")[0]}<br /> */}

                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>


                                <span className="text-black d-block b">Nakshatra</span>

                                {panchang?.fullData?.nakshatra.map((nakshatra, index) => (
                                  <>
                                    <span key={index} className="text-black d-block"> {nakshatra.name} (Lord: {nakshatra.lord.name}) :  {nakshatra.start.split("+")[0].replaceAll("T", " ")} - {nakshatra.end.split("+")[0].replaceAll("T", " ")}</span>
                                    <br></br>
                                  </>
                                ))}
                              </div>}

                              {panchang?.sunTime == "undefined - undefined" && <div style={{height:"457px",textAlign:"center"}}>Panchang Not Availabe for Today</div>}
                            </>

                          }


                          <Link className='text-center' to="/panchangDetail">
                            <button className='self-center mt-4 bg-orange-600  px-4 py-2 rounded-md shadow-xl hover:bg-orange-700  duration-300 font-medium hover:font-medium text-white hover:text-white'>Today Panchang</button>
                          </Link>
                        </div>

                      </div>

                      {/* all rashi */}
                      <div className="flex justify-center w-full font-serif">
                        <span className='text-2xl font-medium mt-[100px]'>Free Daily Horoscope</span>
                      </div>

                      <div className="flex flex-wrap font-serif justify-center bg-slate-50 shadow rounded-md pt-2 pb-4 mt-4 mb-[70px] w-full">

                        {rashi.length > 0 && rashi.map((rashidetail, index) => (
                          <Link key={rashidetail.intId} to={"rashiDetail/" + rashidetail.rashiName}>
                            <div className="flex flex-col m-3 mt-4 cursor-pointer items-center">
                              <img alt="" className='h-12 w-12' src={rashidetail.rashiImage} />
                              <span className='font-medium'>{rashidetail.rashiName}</span>
                            </div>
                          </Link>
                        ))}

                      </div>



                    </div>
                  </div>
                </div>
              </section>


              <section
                className="elementor-section elementor-top-section elementor-element elementor-element-40e3ea2 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                <div className="elementor-background-overlay"></div>
                <div className="elementor-container elementor-column-gap-default">
                  <div
                    className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-c451366">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-5cd55bb elementor-section-full_width elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-default">
                          <div
                            className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-3d2ea7b">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-9bdeb54 premium-floating-effects-yes elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container animation_Move">
                                  <img alt="" width="845" height="1024"
                                    src="assets/images/hands-1268x1536.png"
                                    className="attachment-large size-large" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{ display: "block" }}
                            className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-018dbf3">


                            <div className="elementor-widget-wrap elementor-element-populated">
                              {/* <div
                                className="elementor-element elementor-element-1fd1bae elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  What we do </div>
                              </div> */}
                              <div
                                className="elementor-element elementor-element-f2132d5 elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container" style={{ fontSize: "32px", textTransform: "capitalize" }}>
                                  Importance of Astrology in morden Time </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-e035502 elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  {/* <ReadMore className='font-medium text-gray-700 text-sm mt-2'>
                                    Astrology is an ancient practice that has been used for centuries to gain insight into the mysteries of the universe and our place in it.  While one may dismiss it as superstition or pseudoscience , but people are taking actions on the basis of astrology since ages. Whether it is some auspicious work, marriage whether it for a job or business. People used to find out correct from the astrologer and used to believe that their work would be done in a proper way.

                                    The role of Astrology is that of a planner. Like the meteorological department prepares you for the storm by giving advance information about it. In the same way astrologer also provides an opportunity to be prepared for the problems of the upcoming life by giving advance information about them now. Astrology always play its role as a planner to make life simple and smooth.

                                    Astrology can be a valuable tool but what good this predictive science can do if we don’t use it to take actions. We can use the insights gained from astrology to proactively shape our future and achieve our goals.

                                    Astrology can help us to identify auspicious times for starting new projects, making big decisions, and taking risks. By paying attention to the movements of the planets and their impact on our horoscope, we can find opportunities to take bold action and make positive changes in our lives.

                                    Once we have identified opportunities for actions, it’s important to set clear goal and intentions. And with the goal in mind, plan of action can be created to achieve them.

                                    Astrology is guidance to the Soul and it is a powerful tool for helping us connect with our true selves and live a more purposeful and fulfilling life.
                                  </ReadMore> */}
                                  Astrology is an ancient practice that has been used for centuries to gain insight into the mysteries of the universe and our place in it.  While one may dismiss it as superstition or <Link to={"/whatwedoimportance"}><span style={{ color: "var(--btn-bg-color)", fontWeight: "bold" }}> ...view more</span></Link>
                                </div>
                              </div>
                            </div>
                            <br></br>

                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-f2132d5 elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container" style={{ fontSize: "32px", textTransform: "capitalize" }}>
                                  Learning Astrology can be a Valueable Tool </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-e035502 elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  {/* <ReadMore className='font-medium text-gray-700 text-sm mt-2'>
                                    Everyone should learn the Astrology, everyone should know about their horoscope, Why?

                                    The way we get diagnosed with a disease, we go to doctor. In the same way, whenever we feel that there is something wrong with our life then we can help ourselves with Astrology.

                                    Our horoscope is made as per the birth time and on the basis of horoscope, we understand some aspects of our life, we know the good and the bad about us. And with the help of this divine science we can make the best out of it.

                                    It is important to remember that Astrology is a tool that can be useful for personal growth, understanding your relationships, planning for the future and finding meaning and purpose in life.

                                    We are providing the courses by which you can understand how to fix the problems related to your life. You can prepare yourself and plan your life as per the upcoming events in future. YOU CAN HELP YOURSELF AND YOUR NEAR & DEAR ONES.
                                  </ReadMore> */}
                                  The way we get diagnosed with a disease, we go to doctor. In the same way, whenever we feel that there is something wrong with our life then we can help ourselves with Astrology <Link to={"/whatwedo"}><span style={{ color: "var(--btn-bg-color)", fontWeight: "bold" }}> ...view more</span></Link>
                                </div>
                              </div>
                            </div>


                            {/* <div className="elementor-element elementor-element-03e7962 elementor-tablet-align-center elementor-widget elementor-widget-button"
                              data-id="03e7962" data-element_type="widget"
                              data-widget_type="button.default">
                              <div className="elementor-widget-container">
                                <div className="elementor-button-wrapper">
                                  <Link to={"/whatwedo"}
                                    className="elementor-button-link elementor-button elementor-size-xl"
                                    style={{ fontSize: "16px", padding: "10px 20px 10px 20px" }}
                                    role="button">
                                    <span className="elementor-button-content-wrapper">
                                      <span className="elementor-button-text">View More</span>
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </div> */}

                          </div>



                        </div>
                      </section>

                    </div>
                  </div>
                </div>
              </section>


              <section
                className="elementor-section elementor-top-section elementor-element elementor-element-2981531 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                <div className="elementor-background-overlay"></div>
                <div className="elementor-container elementor-column-gap-default">
                  <div
                    className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-5ec1fae">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-5e228a5 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-no">
                          <div
                            className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-9457692">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-471b92a elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container">
                                  <img alt="" width="81" height="80"
                                    src="assets/images/star-about-us.png"
                                    className="attachment-large size-large"
                                    loading="lazy" />
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-14c5f3b elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Our services </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-cd943e9 elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading">
                                <div className="elementor-widget-container">
                                  <h2
                                    className="elementor-heading-title elementor-size-default">
                                    Astrology is just a finger pointing at reality</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-b822d8c elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-custom">
                          <div
                            className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-80d6b1e">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-c6d2ebf elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container">
                                  <img alt="" width="132" height="132"
                                    src="assets/images/services%402x.png"
                                    className="attachment-large size-large" />
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-2f6f1ed elementor-widget elementor-widget-heading">
                                <div className="elementor-widget-container">
                                  <h3
                                    className="elementor-heading-title elementor-size-default">
                                    General consultation</h3>
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-359225b elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Astrology is one of the earliest attempts made by man to
                                  find the order hidden behind or within the confusing and
                                  apparent chaos that exists in the world.

                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-b905f74">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-7fe929e elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container">
                                  <img alt="" width="132" height="132"
                                    src="assets/images/services-3%402x.png"
                                    className="attachment-large size-large" />
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-b8f216f elementor-widget elementor-widget-heading">
                                <div className="elementor-widget-container">
                                  <h3
                                    className="elementor-heading-title elementor-size-default">
                                    Personal life advice </h3>
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-a3cb7cd elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Astrology is one of the earliest attempts made by man to
                                  find the order hidden behind or within the confusing and
                                  apparent chaos that exists in the world.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-9644c5a">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-855797d elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container">
                                  <img alt="" width="132" height="132"
                                    src="assets/images/services-4%402x.png"
                                    className="attachment-large size-large" />
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-c6b14ba elementor-widget elementor-widget-heading">
                                <div className="elementor-widget-container">
                                  <h3
                                    className="elementor-heading-title elementor-size-default">
                                    Learn divine science</h3>
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-730bf3d elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Astrology is one of the earliest attempts made by man to
                                  find the order hidden behind or within the confusing and
                                  apparent chaos that exists in the world.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-20d3c51 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-custom">
                          <div
                            className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-8407699">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-1560716 elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container">
                                  <img alt="" width="132" height="132"
                                    src="assets/images/services-2%402x.png"
                                    className="attachment-large size-large" />
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-a840e27 elementor-widget elementor-widget-heading"
                                data-id="a840e27" data-element_type="widget"
                                data-widget_type="heading.default">
                                <div className="elementor-widget-container">
                                  <h3
                                    className="elementor-heading-title elementor-size-default">
                                    Work, career, finance</h3>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-40fd7b9 elementor-widget elementor-widget-text-editor"
                                data-id="40fd7b9" data-element_type="widget"
                                data-widget_type="text-editor.default">
                                <div className="elementor-widget-container">
                                  Astrology is one of the earliest attempts made by man to
                                  find the order hidden behind or within the confusing and
                                  apparent chaos that exists in the world.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-2d9904d"
                            data-id="2d9904d" data-element_type="column"
                            data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div className="elementor-element elementor-element-27da97c elementor-widget elementor-widget-image"
                                data-id="27da97c" data-element_type="widget"
                                data-widget_type="image.default">
                                <div className="elementor-widget-container">
                                  <img alt="" width="132" height="132"
                                    src="assets/images/services-1%402x.png"
                                    className="attachment-large size-large" />
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-3880be6 elementor-widget elementor-widget-heading"
                                data-id="3880be6" data-element_type="widget"
                                data-widget_type="heading.default">
                                <div className="elementor-widget-container">
                                  <h3
                                    className="elementor-heading-title elementor-size-default">Forecast of future events</h3>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-0b2c20b elementor-widget elementor-widget-text-editor"
                                data-id="0b2c20b" data-element_type="widget"
                                data-widget_type="text-editor.default">
                                <div className="elementor-widget-container">
                                  Astrology is one of the earliest attempts made by man to
                                  find the order hidden behind or within the confusing and
                                  apparent chaos that exists in the world.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-4ac2836">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-f050332 elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container">
                                  <img alt="" width="132" height="132"
                                    src="assets/images/services-5%402x.png"
                                    className="attachment-large size-large" />
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-3a22970 elementor-widget elementor-widget-heading">
                                <div className="elementor-widget-container">
                                  <h3
                                    className="elementor-heading-title elementor-size-default">
                                    Current life situation</h3>
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-4031c09 elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Astrology is one of the earliest attempts made by man to
                                  find the order hidden behind or within the confusing and
                                  apparent chaos that exists in the world.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </section>


              <section
                className="elementor-section elementor-top-section elementor-element elementor-element-c91e5f9 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                <div className="elementor-background-overlay"></div>
                <div className="elementor-container elementor-column-gap-default">
                  <div
                    className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-22522e9">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-b1f38eb elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-default">
                          <div
                            className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-dbc2449">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-aff5430 elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container">
                                  <img width="80" height="80"
                                    src="assets/images/comet.png"
                                    className="attachment-large size-large" alt=""
                                    loading="lazy" />
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-7d64122 elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Testimonials </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-0950bb5 elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Hear from our clients </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </section>
                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-585f319 elementor-section-full_width elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-no">
                          {/* 
                          <Carousel selectedItem={3}>
                            <img src='https://via.placeholder.com/150' alt='imagem' title='imagem' />
                            <img src='https://via.placeholder.com/150' alt='imagem' title='imagem' />
                            <img src='https://via.placeholder.com/150' alt='imagem' title='imagem' />
                            <img src='https://via.placeholder.com/150' alt='imagem' title='imagem' />
                            <img src='https://via.placeholder.com/150' alt='imagem' title='imagem' />
                          </Carousel> */}








                          <Row>
                            <Slider {...settings}>
                              {review.length > 0 && review.map((rashidetail, index) => (
                                <div
                                  className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-3c0bfbf" style={{ marginLeft: "-3px" }}>
                                  <div className="elementor-widget-wrap elementor-element-populated" style={{ boxShadow: "none" }}>
                                    <div
                                      className="elementor-element elementor-element-0f193cd elementor-widget elementor-widget-image">
                                      <div className="elementor-widget-container" style={{ paddingBottom: "12px", display: "flex" }}>

                                        <div style={{ width: "25%" }}>
                                          <img width="300" height="300" style={{ marginLeft: "-4px" }}
                                            src={BACKEND_API + "" + rashidetail.image}
                                            className="attachment-large size-large" alt="" />
                                        </div>

                                        <div style={{ width: "75%", marginTop: "18px" }}>
                                          <div style={{ textAlign: "left", marginBottom: "0px" }}
                                            className="elementor-element elementor-element-edb0026 elementor-widget elementor-widget-heading">
                                            <div className="elementor-widget-container">
                                              <h5
                                                className="elementor-heading-title elementor-size-default">
                                                {rashidetail.name}</h5>
                                            </div>
                                          </div>
                                          <div style={{ textAlign: "left" }}
                                            className="elementor-element elementor-element-1a269b3 elementor-widget elementor-widget-heading">
                                            <div className="elementor-widget-container">
                                              <h5
                                                className="elementor-heading-title elementor-size-default">
                                                {rashidetail.place}</h5>
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                    </div>



                                    <div
                                      className="elementor-element elementor-element-6af6c1a elementor-widget elementor-widget-text-editor">
                                      <div className="elementor-widget-container">
                                        <p>&#8220;{rashidetail.review}&#8221;</p>
                                      </div>
                                    </div>


                                  </div>
                                </div>
                              ))}
                            </Slider>
                          </Row>


                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </section>



              <section
                className="elementor-section elementor-top-section elementor-element elementor-element-f033bb4 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                <div className="elementor-background-overlay"></div>
                <div className="elementor-container elementor-column-gap-default">
                  <div
                    className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-d1abef9">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-1ce86c7 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-no">
                          <div
                            className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-26462fd">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-9749c55 premium-floating-effects-yes elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container animation_Move">
                                  <img width="800" height="989"
                                    src="assets/images/planets-2-1.png"
                                    className="attachment-large size-large" alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="elementor-column elementor-col-66 elementor-inner-column elementor-element elementor-element-9009d04">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-16f0322 elementor-widget-mobile__width-initial elementor-widget elementor-widget-heading">
                                <div className="elementor-widget-container">
                                  <h2
                                    className="elementor-heading-title elementor-size-default">
                                    Embark on a journey to discover the realm of astrology</h2>
                                </div>
                              </div>
                              {/* <div
                                className="elementor-element elementor-element-d0381ec elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Your path is illuminated by a road-map of stars. I am
                                  here to guide you! </div>
                              </div> */}
                              <div
                                className="elementor-element elementor-element-2e09869 elementor-tablet-align-center elementor-widget elementor-widget-button">
                                <div className="elementor-widget-container">
                                  <div className="elementor-button-wrapper">
                                    <a href="#"
                                      className="elementor-button-link elementor-button elementor-size-xl"
                                      role="button">
                                      <span className="elementor-button-content-wrapper">
                                        <span className="elementor-button-text">Get
                                          started</span>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </section>















              {/* <section
                className="elementor-section elementor-top-section elementor-element elementor-element-39adc4e elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                <div className="elementor-background-overlay"></div>
                <div className="elementor-container elementor-column-gap-no">
                  <div
                    className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-58fc070">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-4271ef9 elementor-reverse-tablet elementor-reverse-mobile elementor-section-full_width elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-no">
                          <div
                            className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-5bb8c48">
                            <div
                              className="elementor-widget-wrap elementor-element-populated marginauto">
                              <div
                                className="elementor-element elementor-element-4c2ba4a elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Gift cards </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-5977453 elementor-widget-mobile__width-initial elementor-widget elementor-widget-heading">
                                <div className="elementor-widget-container">
                                  <h2
                                    className="elementor-heading-title elementor-size-default">
                                    Free astrological express consultation</h2>
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-e44813a elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  The way that I see astrology is as a repository of
                                  thought and psychology. A system we’ve created as a
                                  culture as way to make things mean things. </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-e46328c elementor-align-left elementor-tablet-align-center elementor-widget elementor-widget-button">
                                <div className="elementor-widget-container">
                                  <div className="elementor-button-wrapper">
                                    <a href="#"
                                      className="elementor-button-link elementor-button elementor-size-xl"
                                      role="button">
                                      <span className="elementor-button-content-wrapper">
                                        <span className="elementor-button-text">Learn
                                          more</span>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-37e0e33">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-6a41bb2 premium-floating-effects-yes elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container animation_Move">
                                  <img alt="" width="800" height="761"
                                    src="assets/images/planets-1.png"
                                    className="attachment-large size-large" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </section> 
              <section
                className="elementor-section elementor-top-section elementor-element elementor-element-46e7fb2 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                <div className="elementor-background-overlay"></div>
                <div className="elementor-container elementor-column-gap-default">
                  <div
                    className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a341fcb">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-7b10dff elementor-section-full_width elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-default">
                          <div
                            className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-1a40491">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-d9b551a premium-floating-effects-yes animated-slow elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container animation_Move">
                                  <img alt="" width="1024" height="973"
                                    src="assets/images/tarot-consultation-1024x973.png"
                                    className="attachment-large size-large" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-03c740b">
                            <div
                              className="elementor-widget-wrap elementor-element-populated marginauto">
                              <div
                                className="elementor-element elementor-element-b845918 elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Other services </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-cc05cce elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Tarot consultations on various topics </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-d3c6193 elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                  Etiam mi tellus, pulvinar vel tempus eget, finibus vitae
                                  ante. Fusce sit amet velit eleifend, iaculis velit quis,
                                  malesuada lacus. Vestibulum sodales magna a volutpat
                                  tempus. Mauris vestibulum id urna viverra ultrices.
                                  Nullam rhoncus elit eget libero varius dapibus. </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-ea87edb elementor-tablet-align-center elementor-align-left elementor-widget elementor-widget-button">
                                <div className="elementor-widget-container">
                                  <div className="elementor-button-wrapper">
                                    <a href="#"
                                      className="elementor-button-link elementor-button elementor-size-xl"
                                      role="button">
                                      <span className="elementor-button-content-wrapper">
                                        <span className="elementor-button-text">Learn
                                          more</span>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                    </div>
                  </div>
                </div>
              </section>


              <section
                className="elementor-section elementor-top-section elementor-element elementor-element-f033bb4 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                <div className="elementor-background-overlay"></div>
                <div className="elementor-container elementor-column-gap-default">
                  <div
                    className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-d1abef9">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <section
                        className="elementor-section elementor-inner-section elementor-element elementor-element-1ce86c7 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-no">
                          <div
                            className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-26462fd">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-9749c55 premium-floating-effects-yes elementor-widget elementor-widget-image">
                                <div className="elementor-widget-container animation_Move">
                                  <img alt="" width="800" height="989"
                                    src="assets/images/planets-2-1.png"
                                    className="attachment-large size-large" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="elementor-column elementor-col-66 elementor-inner-column elementor-element elementor-element-9009d04">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div
                                className="elementor-element elementor-element-16f0322 elementor-widget-mobile__width-initial elementor-widget elementor-widget-heading">
                                <div className="elementor-widget-container">
                                  <h2
                                    className="elementor-heading-title elementor-size-default">
                                    Get an answer to one question for free</h2>
                                </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-d0381ec elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  Your path is illuminated by a road-map of stars. I am
                                  here to guide you! </div>
                              </div>
                              <div
                                className="elementor-element elementor-element-2e09869 elementor-tablet-align-center elementor-widget elementor-widget-button">
                                <div className="elementor-widget-container">
                                  <div className="elementor-button-wrapper">
                                    <a href="#"
                                      className="elementor-button-link elementor-button elementor-size-xl"
                                      role="button">
                                      <span className="elementor-button-content-wrapper">
                                        <span className="elementor-button-text">Get
                                          started</span>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </section>*/}
            </div>
          </div>


        </div >

        {/* <div className="section-inner clearfix"></div> */}


      </article >
    </main >

  );
}

export default Home;
