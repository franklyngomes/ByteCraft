"use client";
import React from "react";
import { clientLogo } from "./lib/data";
import { services } from "./lib/data";
import { BannerListQuery, PortfolioListQuery } from "@/api/query/query";
import Image from "next/image";

export default function Home() {
  const { data } = BannerListQuery();
  const {data: portfolio} = PortfolioListQuery()
  return (
    <>
      <section id="hero">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div className="carousel-inner" role="listbox">
            {data
              ? data.map((item: any, index: number) => {
                  const imageUrl = `http://localhost:5000/${item.image.replaceAll(
                    "\\",
                    "/"
                  )}`;
                  return (
                    <div
                       className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={item._id}
                      style={{
                        backgroundImage: `url("${imageUrl}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="carousel-container">
                        <div className="carousel-content animate__animated animate__fadeInUp">
                          <h2>
                            {item.title}
                          </h2>
                          <p>
                            {item.subtitle}
                          </p>
                          <div className="text-center">
                            <a href="" className="btn-get-started">
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "No Banners Found!"}
          </div>

          <a
            className="carousel-control-prev"
            href="#heroCarousel"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon icofont icofont-simple-left"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>

          <a
            className="carousel-control-next"
            href="#heroCarousel"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon icofont icofont-simple-right"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>

          {/* <ol className="carousel-indicators" id="hero-carousel-indicators"></ol> */}
        </div>
      </section>

      <main id="main">
        <section id="about-us" className="about-us">
          <div className="container">
            <div className="section-title">
              <h2>About Us</h2>
            </div>

            <div className="row content">
              <div className="col-lg-6">
                <h2>Eum ipsam laborum deleniti velitena</h2>
                <h3>
                  Voluptatem dignissimos provident quasi corporis voluptates sit
                  assum perenda sruen jonee trave
                </h3>
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0">
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum
                </p>
                <ul>
                  <li>
                    <i className="ri-check-double-line"></i> Ullamco laboris
                    nisi ut aliquip ex ea commodo consequa
                  </li>
                  <li>
                    <i className="ri-check-double-line"></i> Duis aute irure
                    dolor in reprehenderit in voluptate velit
                  </li>
                  <li>
                    <i className="ri-check-double-line"></i> Ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in
                  </li>
                </ul>
                <p className="font-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="portfolio" className="portfolio">
          <div className="container">
            <div className="section-title">
              <h2>Portfolio</h2>
            </div>

            <div className="row">
              {portfolio ? portfolio.map((item : any, index : number) => (
                <div className="col-lg-4 col-md-6 portfolio-item" key={index}>
                  <img
                    src={`http://localhost:5000/${item.image.replaceAll(
                    "\\",
                    "/"
                  )}`}
                    className="img-fluid"
                    alt={item.title}
                  />
                  <div className="portfolio-info">
                    <h4>{item.title}</h4>
                    <p>{item.title}</p>
                    <a
                      href="/details"
                      className="details-link"
                      title="More Details"
                    >
                      <i className="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              )) : "No Portfolios Found!"}
            </div>
          </div>
        </section>

        <section id="clients" className="clients">
          <div className="container">
            <div className="section-title">
              <h2>Clients</h2>
            </div>

            <div className="row no-gutters clients-wrap clearfix">
              {clientLogo.map((item) => (
                <div className="col-lg-3 col-md-4 col-6" key={item.title}>
                  <div className="client-logo">
                    <img
                      src={item.image}
                      className="img-fluid"
                      alt={item.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
