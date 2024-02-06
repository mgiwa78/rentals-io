"use client";

import React, { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetRentalsQuery
} from "../../service/rentals";
import Image from "next/image";

type Props = {};

const Rentals = (props: Props) => {
  const { data: rentals, isLoading, isSuccess } = useGetRentalsQuery();
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess
  } = useGetCategoriesQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [pages, setpages] = useState<Array<number>>([]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = rentals?.slice(startIndex, endIndex);

  let totalPages = 0;

  if (rentals?.length) {
    totalPages = Math.ceil(rentals?.length / itemsPerPage);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (itemsPerPage) {
      const r = [];
      for (let index = 0; index < totalPages; index++) {
        r.push(index);
      }
      setpages(r);
    }
  }, [itemsPerPage, totalPages]);

  useEffect(() => {
    if (rentals) {
      setCurrentPage(1);
      const p = [];
    }
  }, [rentals]);

  return (
    <main className="main">
      <div className="page-header mt-30 mb-50">
        <div className="container">
          <div className="archive-header">
            <div className="row align-items-center">
              <div className="col-xl-3">
                <h1 className="mb-15">Rentals</h1>
                <div className="breadcrumb">
                  <a href="index.html" rel="nofollow">
                    <i className="fi-rs-home mr-5"></i>Home
                  </a>
                  <span></span> Rentals
                  {/* <span></span> Shop <span></span> Snack */}
                </div>
              </div>
              {/* <div className="col-xl-9 text-end d-none d-xl-block">
                <ul className="tags-list">
                  {categories?.slice(0, 5)?.map((category) => (
                    <li key={category._id} className="hover-up">
                      <a href="blog-category-grid.html">
                        <i className="fi-rs-cross mr-10"></i>
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-30">
        <div className="row">
          <div className="col-12">
            <div className="shop-product-fillter">
              <div className="totall-product">
                <p>
                  {isLoading ? (
                    "Finding"
                  ) : (
                    <>
                      We found
                      <strong className="text-brand">
                        {" " + rentals?.length + " "}
                      </strong>
                      items for you!
                    </>
                  )}
                </p>
              </div>
              <div className="sort-by-product-area">
                <div className="sort-by-cover mr-10">
                  <div className="sort-by-product-wrap">
                    <div className="sort-by">
                      <span>
                        <i className="fi-rs-apps"></i>Show:
                      </span>
                    </div>
                    <div className="sort-by-dropdown-wrap">
                      <span>
                        {itemsPerPage}
                        <i className="fi-rs-angle-small-down"></i>
                      </span>
                    </div>
                  </div>
                  <div className="sort-by-dropdown">
                    <ul>
                      {[5, 10, 20, 50].map((p) => (
                        <li key={p} onClick={() => setItemsPerPage(p)}>
                          <a
                            className={p === itemsPerPage ? "active" : ""}
                            href="#"
                          >
                            {p}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="sort-by-cover">
                  <div className="sort-by-product-wrap">
                    <div className="sort-by">
                      <span>
                        <i className="fi-rs-apps-sort"></i>Sort by:
                      </span>
                    </div>
                    <div className="sort-by-dropdown-wrap">
                      <span>
                        Featured <i className="fi-rs-angle-small-down"></i>
                      </span>
                    </div>
                  </div>
                  <div className="sort-by-dropdown">
                    <ul>
                      <li>
                        <a className="active" href="#">
                          Featured
                        </a>
                      </li>
                      <li>
                        <a href="#">Price: Low to High</a>
                      </li>
                      <li>
                        <a href="#">Price: High to Low</a>
                      </li>
                      <li>
                        <a href="#">Release Date</a>
                      </li>
                      <li>
                        <a href="#">Avg. Rating</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row product-grid">
              {currentItems?.map((rental) => (
                <div
                  key={rental._id}
                  className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                >
                  <div className="product-cart-wrap mb-30">
                    <div className="product-img-action-wrap">
                      <div className="product-img product-img-zoom">
                        <a href="shop-product-right.html">
                          <Image
                            width={244.4}
                            height={244.4}
                            alt={`${rental?.name} Image`}
                            src={
                              rental?.imgPath
                                ? rental?.imgPath
                                : "/imgs/shop/image.png"
                            }
                          />
                          <Image
                            width={244.4}
                            height={244.4}
                            className="hover-img"
                            src="/imgs/shop/product-1-2.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="product-action-1">
                        <a
                          aria-label="Add To Wishlist"
                          className="action-btn"
                          href="shop-wishlist.html"
                        >
                          <i className="fi-rs-heart"></i>
                        </a>
                        <a
                          aria-label="Compare"
                          className="action-btn"
                          href="shop-compare.html"
                        >
                          <i className="fi-rs-shuffle"></i>
                        </a>
                        <a
                          aria-label="Quick view"
                          className="action-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#quickViewModal"
                        >
                          <i className="fi-rs-eye"></i>
                        </a>
                      </div>
                    </div>
                    <div className="product-content-wrap">
                      <div className="product-category">
                        <a href="shop-grid-right.html">
                          {rental?.category?.name}
                        </a>
                      </div>
                      <h2>
                        <a href="shop-product-right.html">{rental?.name}</a>
                      </h2>
                      <div className="product-rate-cover">
                        <div className="product-rate d-inline-block">
                          <div
                            className="product-rating"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                        <span className="font-small ml-5 text-muted">
                          (4.0)
                        </span>
                      </div>
                      <div>
                        <span className="font-small text-muted">
                          By{" "}
                          <a href="vendor-details-1.html">
                            {rental.vendor.fullName}
                          </a>
                        </span>
                      </div>
                      <div className="product-card-bottom">
                        <div className="product-price">
                          <span>
                            {rental?.price
                              ? new Intl.NumberFormat("ja-JP", {
                                  style: "currency",
                                  currency: "NGN"
                                }).format(Number(rental?.price))
                              : "No Rate"}
                          </span>
                        </div>
                        <div className="add-cart">
                          <a className="add" href="shop-cart.html">
                            <i className="fi-rs-shopping-cart mr-5"></i>Add
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-area mt-20 mb-20">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-start">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      aria-disabled={currentPage === 1}
                    >
                      <i className="fi-rs-arrow-small-left"></i>
                    </button>
                  </li>
                  {/* Render page numbers */}

                  {pages?.map((page: number) => (
                    <li
                      className={`page-item ${
                        currentPage === page + 1 ? "active" : ""
                      }`}
                      key={page}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {`${page + 1}`}
                      </button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      aria-disabled={currentPage === totalPages}
                    >
                      <i className="fi-rs-arrow-small-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rentals;
