import React, { useEffect, useState, useRef } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getCourses, getBlogList, getAstrologer, getProducts } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const ProductList = () => {
  const blogList = useSelector((state) => state.admin.blogList)
  const astrologerList = useSelector((state) => state.admin.astrologerList)
  const coursesList = useSelector((state) => state.admin.coursesList)
  const productList = useSelector((state) => state.admin.productList)
  const dispatch = useDispatch()
  const [coursesData, setCoursesData] = useState([]);
  const [astrologerData, setAstrologerData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    dispatch(getCourses())
    dispatch(getAstrologer())
    dispatch(getBlogList())
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    setCoursesData(coursesList)
  }, [coursesList])

  useEffect(() => {
    setAstrologerData(astrologerList)
  }, [astrologerList])

  useEffect(() => {
    setProductData(productList)
  }, [productList])

  return (
    <div id="primary" className="content-area">
      <main id="main" className="site-main" role="main">
        <div className="container-xl container-shop">
          <header className="woocommerce-products-header">
          </header>

          <div className="row">
            <div className="col-lg-9 mx-auto pr-lg-4 content-shop">
              <div className="woocommerce-notices-wrapper"></div>
              <p className="woocommerce-result-count">
                Showing 1&ndash;12 of 21 results</p>
              {/* <form className="woocommerce-ordering" method="get">
                <select name="orderby" className="orderby" aria-label="Shop order">
                  <option value="menu_order">Default sorting</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="rating">Sort by average rating</option>
                  <option value="date">Sort by latest</option>
                  <option value="price">Sort by price: low to high</option>
                  <option value="price-desc">Sort by price: high to low</option>
                </select>
                <input type="hidden" name="paged" value="1" />
              </form> */}
              <ul className="products columns-3">
                <li
                  className="product type-product post-16903 status-publish first instock product_cat-astrology product_cat-crystals product_cat-mystical product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                  <Link to="/product-detail" className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                    width="300" height="300" src="assets/images/mineral-1-300x300.png"
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                    <h2 className="woocommerce-loop-product__title">Orange Calcite</h2>
                    <div className="star-rating"><span style={{ width: "0%" }}>Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="price"><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>47.00</bdi></span></span>
                  </Link>
                  <a href="#"
                    className="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to
                    cart</a>
                </li>
                <li
                  className="product type-product post-16901 status-publish instock product_cat-astrology product_cat-mystical product_cat-tarot product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                  <a href="#" className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                    width="300" height="300" src="assets/images/mineral-2-300x300.png"
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                    <h2 className="woocommerce-loop-product__title">Green Sardonyx</h2>
                    <div className="star-rating"><span style={{ width: "0%" }}>Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="price"><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>54.00</bdi></span></span>
                  </a><a href="#"
                    className="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to
                    cart</a>
                </li>
                <li
                  className="product type-product post-16905 status-publish last instock product_cat-astrology product_cat-mystical product_cat-tarot product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                  <a href="#" className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                    width="300" height="300" src="assets/images/mineral-3-300x300.png"
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                    <h2 className="woocommerce-loop-product__title">Akik Stone</h2>
                    <div className="star-rating"><span style={{ width: "0%" }}>Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="price"><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>50.00</bdi></span></span>
                  </a><a href="#"
                    className="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to
                    cart</a>
                </li>
                <li
                  className="product type-product post-16903 status-publish first instock product_cat-astrology product_cat-crystals product_cat-mystical product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                  <a href="#" className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                    width="300" height="300" src="assets/images/mineral-1-300x300.png"
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                    <h2 className="woocommerce-loop-product__title">Orange Calcite</h2>
                    <div className="star-rating"><span style={{ width: "0%" }}>Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="price"><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>47.00</bdi></span></span>
                  </a><a href="#"
                    className="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to
                    cart</a>
                </li>
                <li
                  className="product type-product post-16901 status-publish instock product_cat-astrology product_cat-mystical product_cat-tarot product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                  <a href="#" className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                    width="300" height="300" src="assets/images/mineral-2-300x300.png"
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                    <h2 className="woocommerce-loop-product__title">Green Sardonyx</h2>
                    <div className="star-rating"><span style={{ width: "0%" }}>Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="price"><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>54.00</bdi></span></span>
                  </a><a href="#"
                    className="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to
                    cart</a>
                </li>
                <li
                  className="product type-product post-16905 status-publish last instock product_cat-astrology product_cat-mystical product_cat-tarot product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                  <a href="#" className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                    width="300" height="300" src="assets/images/mineral-3-300x300.png"
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                    <h2 className="woocommerce-loop-product__title">Akik Stone</h2>
                    <div className="star-rating"><span style={{ width: "0%" }}>Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="price"><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>50.00</bdi></span></span>
                  </a><a href="#"
                    className="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to
                    cart</a>
                </li>

                <li
                  className="product type-product post-16903 status-publish first instock product_cat-astrology product_cat-crystals product_cat-mystical product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                  <a href="#" className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                    width="300" height="300" src="assets/images/mineral-1-300x300.png"
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                    <h2 className="woocommerce-loop-product__title">Orange Calcite</h2>
                    <div className="star-rating"><span style={{ width: "0%" }}>Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="price"><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>47.00</bdi></span></span>
                  </a><a href="#"
                    className="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to
                    cart</a>
                </li>
                <li
                  className="product type-product post-16901 status-publish instock product_cat-astrology product_cat-mystical product_cat-tarot product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                  <a href="#" className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                    width="300" height="300" src="assets/images/mineral-2-300x300.png"
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                    <h2 className="woocommerce-loop-product__title">Green Sardonyx</h2>
                    <div className="star-rating"><span style={{ width: "0%" }}>Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="price"><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>54.00</bdi></span></span>
                  </a><a href="#"
                    className="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to
                    cart</a>
                </li>
                <li
                  className="product type-product post-16905 status-publish last instock product_cat-astrology product_cat-mystical product_cat-tarot product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                  <a href="#" className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                    width="300" height="300" src="assets/images/mineral-3-300x300.png"
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                    <h2 className="woocommerce-loop-product__title">Akik Stone</h2>
                    <div className="star-rating"><span style={{ width: "0%" }}>Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="price"><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>50.00</bdi></span></span>
                  </a><a href="#"
                    className="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to
                    cart</a>
                </li>

              </ul>
              <nav className="woocommerce-pagination">
                <ul className='page-numbers'>
                  <li><span aria-current="page" className="page-numbers current">1</span></li>
                  <li><a className="page-numbers" href="#">2</a></li>
                  <li><a className="next page-numbers" href="#">&rarr;</a></li>
                </ul>
              </nav>
            </div>
            {/* <div className="col-lg-3 pl-lg-3 sidebar-shop">
              <div className="widget woocommerce widget_price_filter">
                <div className="widget-content">
                  <h4 className="widget-title">Filter by price</h4>
                  <form method="get" action="#">
                    <div className="price_slider_wrapper">
                      <div className="price_slider" style="display:none;"></div>
                      <div className="price_slider_amount" data-step="10">
                        <label className="screen-reader-text" htmlFor="min_price">Min price</label>
                        <input type="text" id="min_price" name="min_price" value="20" data-min="20"
                          placeholder="Min price" />
                        <label className="screen-reader-text" htmlFor="max_price">Max price</label>
                        <input type="text" id="max_price" name="max_price" value="450"
                          data-max="450" placeholder="Max price" />
                        <button type="submit" className="button">Filter</button>
                        <div className="price_label" style="display:none;">
                          Price: <span className="from"></span> &mdash; <span className="to"></span>
                        </div>
                        <div className="clear"></div>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
              <div className="widget woocommerce widget_shopping_cart">
                <div className="widget-content">
                  <h4 className="widget-title">Cart</h4>
                  <div className="widget_shopping_cart_content"></div>
                </div>
              </div>
              <div className="widget woocommerce widget_rating_filter">
                <div className="widget-content">
                  <h4 className="widget-title">Average rating</h4>
                  <ul>
                    <li className="wc-layered-nav-rating"><a href="#"><span className="star-rating"><span
                      style="width:100%">Rated <strong className="rating">5</strong> out of
                      5</span></span> (3)</a></li>
                  </ul>
                </div>
              </div>
              <div className="widget woocommerce widget_product_search">
                <div className="widget-content">
                  <h4 className="widget-title">Search by products</h4>
                  <form role="search" method="get" className="woocommerce-product-search" action="#">
                    <label className="screen-reader-text" htmlFor="woocommerce-product-search-field-0">Search
                      for:</label>
                    <input type="search" id="woocommerce-product-search-field-0" className="search-field"
                      placeholder="Search products&hellip;" value="" name="s" />
                    <button type="submit" value="Search">Search</button>
                    <input type="hidden" name="post_type" value="product" />
                  </form>
                </div>
              </div>
              <div className="widget woocommerce widget_product_categories">
                <div className="widget-content">
                  <h4 className="widget-title">Product categories</h4>
                  <ul className="product-categories">
                    <li className="cat-item cat-item-37"><a href="#">Accessories</a>
                      <span className="count">(10)</span>
                    </li>
                    <li className="cat-item cat-item-31 current-cat"><a href="#">Astrology</a>
                      <span className="count">(21)</span>
                    </li>
                    <li className="cat-item cat-item-38"><a href="#">Candles</a> <span
                      className="count">(12)</span></li>
                    <li className="cat-item cat-item-46"><a href="#">Crystals</a> <span
                      className="count">(22)</span></li>
                    <li className="cat-item cat-item-32"><a href="#">Mystical</a> <span
                      className="count">(36)</span></li>
                    <li className="cat-item cat-item-45"><a href="#">Tarot</a> <span
                      className="count">(14)</span></li>
                  </ul>
                </div>
              </div>
              <div className="widget woocommerce widget_recent_reviews">
                <div className="widget-content">
                  <h4 className="widget-title">Recent reviews</h4>
                  <ul className="product_list_widget">
                    <li>


                      <a href="#">
                        <img width="300" height="300" src="assets/images/mineral-5-300x300.png"
                          className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" />
                          <span
                          className="product-title">Cabochon Red Agate</span>
                      </a>

                      <div className="star-rating" role="img" aria-label="Rated 5 out of 5"><span
                        style="width:100%">Rated <strong className="rating">5</strong> out of
                        5</span></div>
                      <span className="reviewer">
                        by Olga </span>


                    </li>
                    <li>


                      <a href="#">
                        <img width="300" height="300" src="assets/images/mineral-5-300x300.png"
                          className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" /> 
                          <span
                          className="product-title">Cabochon Red Agate</span>
                      </a>

                      <div className="star-rating" role="img" aria-label="Rated 5 out of 5"><span
                        style="width:100%">Rated <strong className="rating">5</strong> out of
                        5</span></div>
                      <span className="reviewer">
                        by Olga </span>


                    </li>
                    <li>


                      <a href="#">
                        <img width="300" height="300" src="assets/images/mineral-5-300x300.png"
                          className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" /> 
                          <span
                          className="product-title">Cabochon Red Agate</span>
                      </a>

                      <div className="star-rating" role="img" aria-label="Rated 5 out of 5"><span
                        style="width:100%">Rated <strong className="rating">5</strong> out of
                        5</span></div>
                      <span className="reviewer">
                        by Olga </span>


                    </li>
                  </ul>
                </div>
              </div>
              <div className="widget woocommerce widget_product_tag_cloud">
                <div className="widget-content">
                  <h4 className="widget-title">Product tags</h4>
                  <div className="tagcloud"><a href="#" className="tag-cloud-link tag-link-33 tag-link-position-1"
                    style="font-size: 22pt;" aria-label="aroma (36 products)">aroma</a>
                    <a href="#" className="tag-cloud-link tag-link-40 tag-link-position-2"
                      style="font-size: 8pt;" aria-label="astrologer (7 products)">astrologer</a>
                    <a href="#" className="tag-cloud-link tag-link-39 tag-link-position-3"
                      style="font-size: 8pt;" aria-label="cards (7 products)">cards</a>
                    <a href="#" className="tag-cloud-link tag-link-34 tag-link-position-4"
                      style="font-size: 16.358208955224pt;"
                      aria-label="divination (19 products)">divination</a>
                    <a href="#" className="tag-cloud-link tag-link-35 tag-link-position-5"
                      style="font-size: 22pt;" aria-label="numbers (36 products)">numbers</a>
                    <a href="#" className="tag-cloud-link tag-link-36 tag-link-position-6"
                      style="font-size: 22pt;" aria-label="prediction (36 products)">prediction</a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>

  );
}

export default ProductList;
