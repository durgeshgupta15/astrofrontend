import React, { useEffect, useState, useRef } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getCourses, getBlogList, getAstrologer, getProducts } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const ProductDetail = () => {
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
    <main>
      <div className="container-xl container-product">
        <div className="row">

          <div className="col-lg-8 mx-auto content-single-product">

            <div id="primary" className="content-area">
              {/* <main id="main" className="site-main" role="main"> */}
                <nav className="woocommerce-breadcrumb"><a href="#">Home</a>&nbsp;&#47;&nbsp;<a
                  href="#">Astrology</a>&nbsp;&#47;&nbsp;Orange
                  Calcite</nav>
                <div className="woocommerce-notices-wrapper"></div>
                <div id="product-13080"
                  className="product type-product post-13080 status-publish first instock product_cat-astrology product_cat-crystals product_cat-mystical product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">

                  <div className="product-header">
                    <div className="woocommerce-product-gallery woocommerce-product-gallery--with-images woocommerce-product-gallery--columns-4 images"
                      data-columns="4" style="opacity: 0; transition: opacity .25s ease-in-out;">
                      <figure className="woocommerce-product-gallery__wrapper">
                        <div data-thumb="assets/images/mineral-1-300x300.png"
                          data-thumb-alt="" className="woocommerce-product-gallery__image"><a
                            href="assets/images/mineral-1-300x300.png"><img
                              width="600" height="600"
                              src="assets/images/mineral-1-300x300.png"
                              className="wp-post-image" alt="" decoding="async" loading="lazy"
                              title="mineral-6" data-caption=""
                              data-src="assets/images/mineral-1-300x300.png"
                              data-large_image="assets/images/mineral-1-300x300.png"
                              data-large_image_width="720"
                              data-large_image_height="720" /></a></div>
                        <div data-thumb="https://mysta.b-cdn.net/wp-content/uploads/2021/12/mineral-2-100x100.png"
                          data-thumb-alt="" className="woocommerce-product-gallery__image"><a
                            href="../../../mysta.b-cdn.net/wp-content/uploads/2021/12/mineral-2.png"><img
                              width="600" height="600"
                              src="../../../mysta.b-cdn.net/wp-content/uploads/2021/12/mineral-2-600x600.png"
                              className="" alt="" decoding="async" loading="lazy"
                              title="mineral-2" data-caption=""
                              data-src="https://mysta.b-cdn.net/wp-content/uploads/2021/12/mineral-2.png"
                              data-large_image="https://mysta.b-cdn.net/wp-content/uploads/2021/12/mineral-2.png"
                              data-large_image_width="720" data-large_image_height="720"
                              srcset="https://mysta.b-cdn.net/wp-content/uploads/2021/12/mineral-2-600x600.png 600w, https://mysta.b-cdn.net/wp-content/uploads/2021/12/mineral-2-300x300.png 300w, https://mysta.b-cdn.net/wp-content/uploads/2021/12/mineral-2-150x150.png 150w, https://mysta.b-cdn.net/wp-content/uploads/2021/12/mineral-2-100x100.png 100w, https://mysta.b-cdn.net/wp-content/uploads/2021/12/mineral-2.png 720w"
                              sizes="(max-width: 600px) 100vw, 600px" /></a></div>
                      </figure>
                    </div>

                    <div className="summary entry-summary">
                      <p className="price"><span className="woocommerce-Price-amount amount"><bdi><span
                        className="woocommerce-Price-currencySymbol">&#36;</span>47.00</bdi></span>
                      </p>
                      <div className="woocommerce-product-details__short-description">
                        <div id="lipsum">
                          <p>Praesent ullamcorper erat eu mattis commodo. Sed elementum lacinia
                            massa eu hendrerit. Vestibulum auctor metus lectus, vitae convallis
                            turpis sodales quis. Donec congue libero ut justo dignissim posuere.
                          </p>
                        </div>
                      </div>


                      <form className="cart" action="#"
                        method="post" enctype='multipart/form-data'>

                        <div className="quantity">
                          <label className="screen-reader-text" for="quantity_63933515a9cef">Orange
                            Calcite quantity</label>
                          <input type="number" id="quantity_63933515a9cef"
                            className="input-text qty text" step="1" min="1" max="" name="quantity"
                            value="1" title="Qty" size="4" placeholder="" inputmode="numeric"
                            autocomplete="off" />
                        </div>

                        <button type="submit" name="add-to-cart" value="13080"
                          className="single_add_to_cart_button button alt">Add to cart</button>

                      </form>



                      <div className="product_meta">

                        <div className="blog-tile-wave"></div>



                        <span className="posted_in">Categories: <a
                          href="#"
                          rel="tag">Astrology</a> <a
                            href="#"
                            rel="tag">Crystals</a> <a
                              href="#"
                              rel="tag">Mystical</a></span>
                        <span className="tagged_as">Tags: <a href="#"
                          rel="tag">aroma</a> <a
                            href="#"
                            rel="tag">divination</a> <a
                              href="#" rel="tag">numbers</a> <a
                                href="#"
                                rel="tag">prediction</a></span>

                      </div>
                      <div className="blog-tile-wave product-sum-btm-wave"></div>
                    </div>
                  </div>


                  <div className="woocommerce-tabs wc-tabs-wrapper">
                    <ul className="tabs wc-tabs" role="tablist">
                      <li className="description_tab" id="tab-title-description" role="tab"
                        aria-controls="tab-description">
                        <a href="#tab-description">
                          Description </a>
                      </li>
                      <li className="reviews_tab" id="tab-title-reviews" role="tab"
                        aria-controls="tab-reviews">
                        <a href="#tab-reviews">
                          Reviews (0) </a>
                      </li>
                    </ul>
                    <div className="woocommerce-Tabs-panel woocommerce-Tabs-panel--description panel entry-content wc-tab"
                      id="tab-description" role="tabpanel" aria-labelledby="tab-title-description">

                      <h5>Description</h5>

                      <div id="lipsum">
                        <p>Praesent ullamcorper erat eu mattis commodo. Sed elementum lacinia massa
                          eu hendrerit. Vestibulum auctor metus lectus, vitae convallis turpis
                          sodales quis. Donec congue libero ut justo dignissim posuere. Nullam
                          mollis scelerisque volutpat. Nunc ut massa ut sem dignissim maximus.
                          Vivamus iaculis dolor ac lorem auctor, eget eleifend lectus dictum. Cras
                          semper nunc orci, et tempus dui scelerisque tempus. Quisque ornare neque
                          sed hendrerit fermentum. Nunc nec justo sit amet quam lobortis accumsan
                          ac nec nunc. Nulla erat turpis, dignissim at eleifend eget, aliquet at
                          urna. Morbi vel diam dictum, tempus tellus tempus, tempor nisl. Aliquam
                          posuere viverra ex nec lobortis.</p>
                      </div>
                    </div>
                    <div className="woocommerce-Tabs-panel woocommerce-Tabs-panel--reviews panel entry-content wc-tab"
                      id="tab-reviews" role="tabpanel" aria-labelledby="tab-title-reviews">
                      <div id="reviews" className="woocommerce-Reviews">
                        <div id="comments">
                          <h5 className="woocommerce-Reviews-title">
                            Reviews </h5>

                          <p className="woocommerce-noreviews">There are no reviews yet.</p>
                        </div>

                        <div id="review_form_wrapper">
                          <div id="review_form">
                            <div id="respond" className="comment-respond">
                              <span id="reply-title" className="comment-reply-title">Be the first
                                to review &ldquo;Orange Calcite&rdquo; <small><a
                                  rel="nofollow" id="cancel-comment-reply-link"
                                  href="#"
                                  style="display:none;">Cancel
                                  reply</a></small></span>
                              <form action="#"
                                method="post" id="commentform" className="comment-form"
                                novalidate>
                                <p className="comment-notes"><span id="email-notes">Your email
                                  address will not be published.</span> <span
                                    className="required-field-message">Required fields are
                                    marked <span className="required">*</span></span></p>
                                <div className="comment-form-rating"><label for="rating">Your
                                  rating&nbsp;<span
                                    className="required">*</span></label><select
                                      name="rating" id="rating" required>
                                    <option value="">Rate&hellip;</option>
                                    <option value="5">Perfect</option>
                                    <option value="4">Good</option>
                                    <option value="3">Average</option>
                                    <option value="2">Not that bad</option>
                                    <option value="1">Very poor</option>
                                  </select></div>
                                <p className="comment-form-comment"><label for="comment">Your
                                  review&nbsp;<span
                                    className="required">*</span></label><textarea
                                      id="comment" name="comment" cols="45" rows="8"
                                      required></textarea></p>
                                <p className="comment-form-author"><label
                                  for="author">Name&nbsp;<span
                                    className="required">*</span></label><input
                                    id="author" name="author" type="text" value=""
                                    size="30" required /></p>
                                <p className="comment-form-email"><label
                                  for="email">Email&nbsp;<span
                                    className="required">*</span></label><input
                                    id="email" name="email" type="email" value=""
                                    size="30" required /></p>
                                <p className="comment-form-cookies-consent"><input
                                  id="wp-comment-cookies-consent"
                                  name="wp-comment-cookies-consent" type="checkbox"
                                  value="yes" /> <label
                                    for="wp-comment-cookies-consent">Save my name,
                                    email, and website in this browser for the next time
                                    I comment.</label></p>
                                <p className="form-submit"><input name="submit" type="submit"
                                  id="submit" className="submit" value="Submit" /> <input
                                    type='hidden' name='comment_post_ID' value='13080'
                                    id='comment_post_ID' />
                                  <input type='hidden' name='comment_parent'
                                    id='comment_parent' value='0' />
                                </p>
                              </form>
                            </div>
                            
                          </div>
                        </div>

                        <div className="clear"></div>
                      </div>
                    </div>

                  </div>


                  <section className="related products">

                    <h6>Related products</h6>

                    <ul className="products columns-3">


                      <li
                        className="product type-product post-13078 status-publish first instock product_cat-astrology product_cat-mystical product_cat-tarot product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                        <a href="#"
                          className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                            width="300" height="300"
                            src="assets/images/mineral-1-300x300.png"
                            className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                            alt="" />
                          <h2 className="woocommerce-loop-product__title">Akik Stone</h2>
                          <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5">
                            <span style="width:100%">Rated <strong className="rating">5.00</strong>
                              out of 5</span></div>
                          <span className="price"><span
                            className="woocommerce-Price-amount amount"><bdi><span
                              className="woocommerce-Price-currencySymbol">&#36;</span>50.00</bdi></span></span>
                        </a><a href="#"
                          className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                        >Add to cart</a>
                      </li>


                      <li
                        className="product type-product post-13084 status-publish instock product_cat-astrology product_cat-mystical product_cat-tarot product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                        <a href="#"
                          className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                            width="300" height="300"
                            src="assets/images/mineral-2-300x300.png"
                            className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                            alt="" />
                          <h2 className="woocommerce-loop-product__title">Green Sardonyx</h2>
                          <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5">
                            <span style="width:100%">Rated <strong className="rating">5.00</strong>
                              out of 5</span></div>
                          <span className="price"><span
                            className="woocommerce-Price-amount amount"><bdi><span
                              className="woocommerce-Price-currencySymbol">&#36;</span>54.00</bdi></span></span>
                        </a><a href="#" data-quantity="1"
                          className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                        >Add to cart</a>
                      </li>


                      <li
                        className="product type-product post-14879 status-publish last instock product_cat-astrology product_cat-crystals product_cat-mystical product_tag-aroma product_tag-divination product_tag-numbers product_tag-prediction has-post-thumbnail shipping-taxable purchasable product-type-simple">
                        <a href="#"
                          className="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img
                            width="300" height="300"
                            src="assets/images/mineral-2-300x300.png"
                            className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                            alt="" />
                          <h2 className="woocommerce-loop-product__title">Mysta Tarot Cards Gold</h2>
                          <div className="star-rating"><span style="width:0%">Rated <strong
                            className="rating">0</strong> out of 5</span></div>
                          <span className="price"><span
                            className="woocommerce-Price-amount amount"><bdi><span
                              className="woocommerce-Price-currencySymbol">&#36;</span>450.00</bdi></span></span>
                        </a><a href="#" data-quantity="1"
                          className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                        >Add to cart</a>
                      </li>


                    </ul>

                  </section>
                </div>


            </div>
          </div>

          <div className="col-lg-4 pl-lg-4 sidebar-single-product">
            <div className="widget woocommerce widget_shopping_cart">
              <div className="widget-content">
                <h4 className="widget-title">Cart</h4>
                <div className="widget_shopping_cart_content"></div>
              </div>
            </div>
            <div className="widget woocommerce widget_products">
              <div className="widget-content">
                <h4 className="widget-title">Products</h4>
                <ul className="product_list_widget">
                  <li>

                    <a href="#">
                      <img width="300" height="300"
                        src="assets/images/mineral-1-300x300.png"
                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt=""
                      /> <span
                        className="product-title">Scented Candle Jasmine</span>
                    </a>

                    <div className="star-rating"><span style="width:0%">Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <del aria-hidden="true"><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>56.00</bdi></span></del>
                    <ins><span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>24.00</bdi></span></ins>
                  </li>
                  <li>

                    <a href="../akik-stone-2/index.html">
                      <img width="300" height="300"
                        src="assets/images/mineral-2-300x300.png"
                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt=""
                      /> <span className="product-title">Akik
                        Stone</span>
                    </a>

                    <div className="star-rating"><span style="width:0%">Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>50.00</bdi></span>
                  </li>
                  <li>

                    <a href="#">
                      <img width="300" height="300"
                        src="assets/images/mineral-1-300x300.png"
                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt=""
                      /> <span className="product-title">Red
                        Jasper</span>
                    </a>

                    <div className="star-rating"><span style="width:0%">Rated <strong
                      className="rating">0</strong> out of 5</span></div>
                    <span className="woocommerce-Price-amount amount"><bdi><span
                      className="woocommerce-Price-currencySymbol">&#36;</span>35.00</bdi></span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="widget woocommerce widget_product_categories">
              <div className="widget-content">
                <h4 className="widget-title">Product categories</h4><select name='product_cat' id='product_cat'
                  className='dropdown_product_cat'>
                  <option value=''>Select a category</option>
                  <option className="level-0" value="accessories">Accessories&nbsp;&nbsp;(10)</option>
                  <option className="level-0" value="astrology" selected="selected">Astrology&nbsp;&nbsp;(21)
                  </option>
                  <option className="level-0" value="candles">Candles&nbsp;&nbsp;(12)</option>
                  <option className="level-0" value="crystals">Crystals&nbsp;&nbsp;(22)</option>
                  <option className="level-0" value="mystical">Mystical&nbsp;&nbsp;(36)</option>
                  <option className="level-0" value="tarot">Tarot&nbsp;&nbsp;(14)</option>
                </select>
              </div>
            </div>
            <div className="widget woocommerce widget_recent_reviews">
              <div className="widget-content">
                <h4 className="widget-title">Recent reviews</h4>
                <ul className="product_list_widget">
                  <li>


                    <a href="#">
                      <img width="300" height="300"
                        src="assets/images/mineral-4-300x300.png"
                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt=""
                      /> <span
                        className="product-title">Cabochon Red Agate</span>
                    </a>

                    <div className="star-rating" role="img" aria-label="Rated 5 out of 5"><span
                      style="width:100%">Rated <strong className="rating">5</strong> out of 5</span>
                    </div>
                    <span className="reviewer">
                      by Olga </span>


                  </li>
                  <li>


                    <a href="#">
                      <img width="300" height="300"
                        src="assets/images/mineral-1-300x300.png"
                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt=""
                      /> <span
                        className="product-title">Cabochon Red Agate</span>
                    </a>

                    <div className="star-rating" role="img" aria-label="Rated 5 out of 5"><span
                      style="width:100%">Rated <strong className="rating">5</strong> out of 5</span>
                    </div>
                    <span className="reviewer">
                      by Olga </span>


                  </li>
                  <li>


                    <a href="#">
                      <img width="300" height="300"
                        src="assets/images/mineral-2-300x300.png"
                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt=""
                      /> <span
                        className="product-title">Cabochon Red Agate</span>
                    </a>

                    <div className="star-rating" role="img" aria-label="Rated 5 out of 5"><span
                      style="width:100%">Rated <strong className="rating">5</strong> out of 5</span>
                    </div>
                    <span className="reviewer">
                      by Olga </span>


                  </li>
                </ul>
              </div>
            </div>
            <div className="widget woocommerce widget_product_tag_cloud">
              <div className="widget-content">
                <h4 className="widget-title">Product tags</h4>
                <div className="tagcloud"><a href="#"
                  className="tag-cloud-link tag-link-33 tag-link-position-1"
                >aroma</a>
                  <a href="#"
                    className="tag-cloud-link tag-link-40 tag-link-position-2">astrologer</a>
                  <a href="#"
                    className="tag-cloud-link tag-link-39 tag-link-position-3">cards</a>
                  <a href="#"
                    className="tag-cloud-link tag-link-34 tag-link-position-4"
                  >divination</a>
                  <a href="#"
                    className="tag-cloud-link tag-link-35 tag-link-position-5"
                  >numbers</a>
                  <a href="#"
                    className="tag-cloud-link tag-link-36 tag-link-position-6"
                  >prediction</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  );
}

export default ProductDetail;
