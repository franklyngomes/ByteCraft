"use client"
import { PortfolioListQuery } from "@/api/query/query";
import React from "react";

const Portfolio = () => {
  const {data} = PortfolioListQuery()
  return (
    <div style={{marginTop: "100px"}}>
      <section id="portfolio" className="portfolio">
        <div className="container">

          <div className="row portfolio-container">
            {
              data? data.map((item: any) => (
            <div className="col-lg-4 col-md-6 portfolio-item" key={item._id}>
              <img
                src={`http://localhost:5000/${item.image}`}
                className="img-fluid"
                alt={item.title}
              />
              <div className="portfolio-info">
                <h4>{item.title}</h4>
              </div>
            </div>
              )) : <p>No data found!</p>
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
