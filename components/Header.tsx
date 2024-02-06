"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../service/rentals";
import { TCategories } from "../types/Categories";
import { usePathname } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  const pathname = usePathname();
  const { data, isLoading, isError, error, isSuccess } =
    useGetCategoriesQuery();

  const [leftHalf, setleftHalf] = useState<TCategories[]>();
  const [rightHalf, setrightHalf] = useState<TCategories[]>();
  const [others, setOthers] = useState<{
    othersLeft: TCategories[];
    othersRight: TCategories[];
  }>();

  function splitAndSortArray(array: Array<any>) {
    let others: any = [];
    if (array.length > 10) {
      const top = array.slice(0, 9);
      const others = array.slice(9, array.length - 1);

      const topMiddleIndex = Math.floor(top.length / 2);
      const left = top.slice(0, topMiddleIndex + 1);
      const right = top.slice(topMiddleIndex);

      const othersMiddleIndex = Math.floor(others.length / 2);
      const othersLeft = others.slice(0, othersMiddleIndex);
      const othersRight = others.slice(othersMiddleIndex);

      left.sort((a, b) => a - b);
      right.sort((a, b) => a - b);

      return { left, right, others: { othersLeft, othersRight } };
    } else {
      const middleIndex = Math.floor(array.length / 2);
      const left = array.slice(0, middleIndex);
      const right = array.slice(middleIndex);

      left.sort((a, b) => a - b);
      right.sort((a, b) => a - b);

      return { left, right, others: null };
    }
  }

  useEffect(() => {
    if (data) {
      let { left, right, others }: any = splitAndSortArray(data);

      setrightHalf(right);
      setleftHalf(left);
      setOthers(others);
    }
  }, [data]);

  return (
    <header className="header-area header-style-1 header-height-2">
      <div className="mobile-promotion">
        <span>
          Grand opening, <strong>up to 15%</strong> off all items. Only
          <strong>3 days</strong> left
        </span>
      </div>
      <div className="header-top header-top-ptb-1 d-none d-lg-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-3 col-lg-4">
              <div className="header-info">
                <ul>
                  <li>
                    <a href="page-about.html">About Us</a>
                  </li>
                  <li>
                    <a href="page-account.html">My Account</a>
                  </li>
                  <li>
                    <a href="shop-wishlist.html">Wishlist</a>
                  </li>
                  <li>
                    <a href="shop-order.html">Order Tracking</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-4">
              <div className="text-center">
                <div id="news-flash" className="d-inline-block">
                  <ul>
                    <li>100% Secure delivery without contacting the courier</li>
                    <li>Supper Value Deals - Save more with coupons</li>
                    <li>Trendy 25silver jewelry, save up 35% off today</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="header-info header-info-right">
                <ul>
                  <li>
                    Need help? Call Us:
                    <strong className="text-brand"> + 1800 900</strong>
                  </li>
                  <li>
                    <a className="language-dropdown-active" href="#">
                      English <i className="fi-rs-angle-small-down"></i>
                    </a>
                    <ul className="language-dropdown">
                      <li>
                        <a href="#">
                          <img src="/imgs/theme/flag-fr.png" alt="" />
                          Français
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/imgs/theme/flag-dt.png" alt="" />
                          Deutsch
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/imgs/theme/flag-ru.png" alt="" />
                          Pусский
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="language-dropdown-active" href="#">
                      USD <i className="fi-rs-angle-small-down"></i>
                    </a>
                    <ul className="language-dropdown">
                      <li>
                        <a href="#">
                          <img src="/imgs/theme/flag-fr.png" alt="" />
                          INR
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/imgs/theme/flag-dt.png" alt="" />
                          MBP
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/imgs/theme/flag-ru.png" alt="" />
                          EU
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
        <div className="container">
          <div className="header-wrap">
            <div className="logo logo-width-1">
              <a href="index.html">
                <img src="/imgs/theme/logo.svg" alt="logo" />
              </a>
            </div>
            <div className="header-right">
              <div className="search-style-2">
                <form action="#">
                  <select className="select-active">
                    <option>All Categories</option>
                    <option>Milks and Dairies</option>
                    <option>Wines & Alcohol</option>
                    <option>Clothing & Beauty</option>
                    <option>Pet Foods & Toy</option>
                    <option>Fast food</option>
                    <option>Baking material</option>
                    <option>Vegetables</option>
                    <option>Fresh Seafood</option>
                    <option>Noodles & Rice</option>
                    <option>Ice cream</option>
                  </select>
                  <input type="text" placeholder="Search for items..." />
                </form>
              </div>
              <div className="header-action-right">
                <div className="header-action-2">
                  <div className="search-location">
                    <form action="#">
                      <select className="select-active">
                        <option>Your Location</option>
                        <option>Alabama</option>
                        <option>Alaska</option>
                        <option>Arizona</option>
                        <option>Delaware</option>
                        <option>Florida</option>
                        <option>Georgia</option>
                        <option>Hawaii</option>
                        <option>Indiana</option>
                        <option>Maryland</option>
                        <option>Nevada</option>
                        <option>New Jersey</option>
                        <option>New Mexico</option>
                        <option>New York</option>
                      </select>
                    </form>
                  </div>
                  <div className="header-action-icon-2">
                    <a href="shop-compare.html">
                      <img
                        className="svgInject"
                        alt="Nest"
                        src="/imgs/theme/icons/icon-compare.svg"
                      />
                      <span className="pro-count blue">3</span>
                    </a>
                    <a href="shop-compare.html">
                      <span className="lable ml-0">Compare</span>
                    </a>
                  </div>
                  <div className="header-action-icon-2">
                    <a href="shop-wishlist.html">
                      <img
                        className="svgInject"
                        alt="Nest"
                        src="/imgs/theme/icons/icon-heart.svg"
                      />
                      <span className="pro-count blue">6</span>
                    </a>
                    <a href="shop-wishlist.html">
                      <span className="lable">Wishlist</span>
                    </a>
                  </div>
                  <div className="header-action-icon-2">
                    <a className="mini-cart-icon" href="shop-cart.html">
                      <img alt="Nest" src="/imgs/theme/icons/icon-cart.svg" />
                      <span className="pro-count blue">2</span>
                    </a>
                    <a href="shop-cart.html">
                      <span className="lable">Cart</span>
                    </a>
                    <div className="cart-dropdown-wrap cart-dropdown-hm2">
                      <ul>
                        <li>
                          <div className="shopping-cart-img">
                            <a href="shop-product-right.html">
                              <img
                                alt="Nest"
                                src="/imgs/shop/thumbnail-3.jpg"
                              />
                            </a>
                          </div>
                          <div className="shopping-cart-title">
                            <h4>
                              <a href="shop-product-right.html">
                                Daisy Casual Bag
                              </a>
                            </h4>
                            <h4>
                              <span>1 × </span>$800.00
                            </h4>
                          </div>
                          <div className="shopping-cart-delete">
                            <a href="#">
                              <i className="fi-rs-cross-small"></i>
                            </a>
                          </div>
                        </li>
                        <li>
                          <div className="shopping-cart-img">
                            <a href="shop-product-right.html">
                              <img
                                alt="Nest"
                                src="/imgs/shop/thumbnail-2.jpg"
                              />
                            </a>
                          </div>
                          <div className="shopping-cart-title">
                            <h4>
                              <a href="shop-product-right.html">
                                Corduroy Shirts
                              </a>
                            </h4>
                            <h4>
                              <span>1 × </span>$3200.00
                            </h4>
                          </div>
                          <div className="shopping-cart-delete">
                            <a href="#">
                              <i className="fi-rs-cross-small"></i>
                            </a>
                          </div>
                        </li>
                      </ul>
                      <div className="shopping-cart-footer">
                        <div className="shopping-cart-total">
                          <h4>
                            Total <span>$4000.00</span>
                          </h4>
                        </div>
                        <div className="shopping-cart-button">
                          <a className="outline" href="shop-cart.html">
                            View cart
                          </a>
                          <a href="shop-checkout.html">Checkout</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="header-action-icon-2">
                    <a href="page-account.html">
                      <img
                        className="svgInject"
                        alt="Nest"
                        src="/imgs/theme/icons/icon-user.svg"
                      />
                    </a>
                    <a href="page-account.html">
                      <span className="lable ml-0">Account</span>
                    </a>
                    <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                      <ul>
                        <li>
                          <a href="page-account.html">
                            <i className="fi fi-rs-user mr-10"></i>My Account
                          </a>
                        </li>
                        <li>
                          <a href="page-account.html">
                            <i className="fi fi-rs-location-alt mr-10"></i>
                            Order Tracking
                          </a>
                        </li>
                        <li>
                          <a href="page-account.html">
                            <i className="fi fi-rs-label mr-10"></i>My Voucher
                          </a>
                        </li>
                        <li>
                          <a href="shop-wishlist.html">
                            <i className="fi fi-rs-heart mr-10"></i>My Wishlist
                          </a>
                        </li>
                        <li>
                          <a href="page-account.html">
                            <i className="fi fi-rs-settings-sliders mr-10"></i>
                            Setting
                          </a>
                        </li>
                        <li>
                          <a href="page-login.html">
                            <i className="fi fi-rs-sign-out mr-10"></i>Sign out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom header-bottom-bg-color sticky-bar">
        <div className="container">
          <div className="header-wrap header-space-between position-relative">
            <div className="logo logo-width-1 d-block d-lg-none">
              <a href="index.html">
                <img src="/imgs/theme/logo.svg" alt="logo" />
              </a>
            </div>
            <div className="header-nav d-none d-lg-flex">
              <div className="main-categori-wrap d-none d-lg-block">
                <a className="categories-button-active" href="#">
                  <span className="fi-rs-apps"></span>
                  <span className="et">Browse</span> All Categories
                  <i className="fi-rs-angle-down"></i>
                </a>
                <div className="categories-dropdown-wrap categories-dropdown-active-large font-heading">
                  <div className="d-flex categori-dropdown-inner justify-content-center">
                    <ul>
                      {leftHalf?.map((category) => (
                        <li key={category._id}>
                          <a href="shop-grid-right.html">
                            <img
                              src="/imgs/theme/icons/category-1.svg"
                              alt=""
                            />
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <ul>
                      {rightHalf?.map((category) => (
                        <li key={category._id}>
                          <a href="shop-grid-right.html">
                            <img
                              src="/imgs/theme/icons/category-1.svg"
                              alt=""
                            />
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {others && (
                    <div
                      className="more_slide_open "
                      style={{ display: "none" }}
                    >
                      <div className="d-flex categori-dropdown-inner justify-content-center">
                        <ul>
                          {others?.othersLeft?.map((category) => (
                            <li key={category._id}>
                              <a href="shop-grid-right.html">
                                <img
                                  src="/imgs/theme/icons/icon-1.svg"
                                  alt=""
                                />
                                {category.name}
                              </a>
                            </li>
                          ))}
                        </ul>

                        <ul className="end">
                          {others?.othersRight?.map((category) => (
                            <li key={category._id}>
                              <a href="shop-grid-right.html">
                                <img
                                  src="/imgs/theme/icons/icon-1.svg"
                                  alt=""
                                />
                                {category.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="more_categories">
                    <span className="icon"></span>
                    <span className="heading-sm-1">Show more...</span>
                  </div>
                </div>
              </div>
              <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block font-heading">
                <nav>
                  <ul>
                    <li className="hot-deals">
                      <img
                        src="/imgs/theme/icons/icon-hot.svg"
                        alt="hot deals"
                      />
                      <a href="shop-grid-right.html">Deals</a>
                    </li>
                    <li>
                      <Link
                        className={` ${pathname === "/" ? "active" : ""}`}
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={` ${pathname === "/about" ? "active" : ""}`}
                        href="/about"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={` ${
                          pathname === "/rentals" ? "active" : ""
                        }`}
                        href="/rentals"
                      >
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={` ${
                          pathname === "/vendors" ? "active" : ""
                        }`}
                        href="/vendors"
                      >
                        Vendors
                      </Link>
                    </li>
                    <li className="position-static">
                      <a href="#">
                        Combo menu <i className="fi-rs-angle-down"></i>
                      </a>
                      <ul className="mega-menu">
                        <li className="sub-mega-menu sub-mega-menu-width-22">
                          <a className="menu-title" href="#">
                            Fruit & Vegetables
                          </a>
                          <ul>
                            <li>
                              <a href="shop-product-right.html">
                                Meat & Poultry
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Fresh Vegetables
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Herbs & Seasonings
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Cuts & Sprouts
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Exotic Fruits & Veggies
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Packaged Produce
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="sub-mega-menu sub-mega-menu-width-22">
                          <a className="menu-title" href="#">
                            Breakfast & Dairy
                          </a>
                          <ul>
                            <li>
                              <a href="shop-product-right.html">
                                Milk & Flavoured Milk
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Butter and Margarine
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Eggs Substitutes
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">Marmalades</a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">Sour Cream</a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">Cheese</a>
                            </li>
                          </ul>
                        </li>
                        <li className="sub-mega-menu sub-mega-menu-width-22">
                          <a className="menu-title" href="#">
                            Meat & Seafood
                          </a>
                          <ul>
                            <li>
                              <a href="shop-product-right.html">
                                Breakfast Sausage
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Dinner Sausage
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">Chicken</a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Sliced Deli Meat
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Wild Caught Fillets
                              </a>
                            </li>
                            <li>
                              <a href="shop-product-right.html">
                                Crab and Shellfish
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="sub-mega-menu sub-mega-menu-width-34">
                          <div className="menu-banner-wrap">
                            <a href="shop-product-right.html">
                              <img
                                src="/imgs/banner/banner-menu.png"
                                alt="Nest"
                              />
                            </a>
                            <div className="menu-banner-content">
                              <h4>Hot deals</h4>
                              <h3>
                                Dont miss
                                <br />
                                Trending
                              </h3>
                              <div className="menu-banner-price">
                                <span className="new-price text-success">
                                  Save to 50%
                                </span>
                              </div>
                              <div className="menu-banner-btn">
                                <a href="shop-product-right.html">Shop now</a>
                              </div>
                            </div>
                            <div className="menu-banner-discount">
                              <h3>
                                <span>25%</span>
                                off
                              </h3>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <Link
                        className={` ${
                          pathname === "/contact" ? "active" : ""
                        }`}
                        href="/contact"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="hotline d-none d-lg-flex">
              <img src="/imgs/theme/icons/icon-headphone.svg" alt="hotline" />
              <p>
                1900 - 888<span>24/7 Support Center</span>
              </p>
            </div>
            <div className="header-action-icon-2 d-block d-lg-none">
              <div className="burger-icon burger-icon-white">
                <span className="burger-icon-top"></span>
                <span className="burger-icon-mid"></span>
                <span className="burger-icon-bottom"></span>
              </div>
            </div>
            <div className="header-action-right d-block d-lg-none">
              <div className="header-action-2">
                <div className="header-action-icon-2">
                  <a href="shop-wishlist.html">
                    <img alt="Nest" src="/imgs/theme/icons/icon-heart.svg" />
                    <span className="pro-count white">4</span>
                  </a>
                </div>
                <div className="header-action-icon-2">
                  <a className="mini-cart-icon" href="#">
                    <img alt="Nest" src="/imgs/theme/icons/icon-cart.svg" />
                    <span className="pro-count white">2</span>
                  </a>
                  <div className="cart-dropdown-wrap cart-dropdown-hm2">
                    <ul>
                      <li>
                        <div className="shopping-cart-img">
                          <a href="shop-product-right.html">
                            <img alt="Nest" src="/imgs/shop/thumbnail-3.jpg" />
                          </a>
                        </div>
                        <div className="shopping-cart-title">
                          <h4>
                            <a href="shop-product-right.html">
                              Plain Striola Shirts
                            </a>
                          </h4>
                          <h3>
                            <span>1 × </span>$800.00
                          </h3>
                        </div>
                        <div className="shopping-cart-delete">
                          <a href="#">
                            <i className="fi-rs-cross-small"></i>
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="shopping-cart-img">
                          <a href="shop-product-right.html">
                            <img alt="Nest" src="/imgs/shop/thumbnail-4.jpg" />
                          </a>
                        </div>
                        <div className="shopping-cart-title">
                          <h4>
                            <a href="shop-product-right.html">
                              Macbook Pro 2022
                            </a>
                          </h4>
                          <h3>
                            <span>1 × </span>$3500.00
                          </h3>
                        </div>
                        <div className="shopping-cart-delete">
                          <a href="#">
                            <i className="fi-rs-cross-small"></i>
                          </a>
                        </div>
                      </li>
                    </ul>
                    <div className="shopping-cart-footer">
                      <div className="shopping-cart-total">
                        <h4>
                          Total <span>$383.00</span>
                        </h4>
                      </div>
                      <div className="shopping-cart-button">
                        <a href="shop-cart.html">View cart</a>
                        <a href="shop-checkout.html">Checkout</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
