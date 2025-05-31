"use client"
import { CourseDetailsQuery } from "@/api/query/query";
import { useParams } from "next/navigation";
import React from "react";

const Details = () => {
  const params = useParams()
  const id = params.slug
  const {data} = CourseDetailsQuery(id)
  console.log(data)
  return (
    <div style={{ marginTop: "100px" }}>
      <section id="blog" className="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 entries">
              {data && (
              <article className="entry">
                <div className="entry-img">
                  <img
                    src={`http://localhost:5000/${data.image}`}
                    alt=""
                    style={{width: "100%"}}
                  />
                </div>

                <h2 className="entry-title">
                  <a href="blog-single.html">
                   {data.title}
                  </a>
                </h2>

                <div className="entry-meta">
                  <ul>
                    <li className="d-flex align-items-center">
                      <i className="icofont icofont-user"></i>{" "}
                      <a href="blog-single.html">John Doe</a>
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="icofont icofont-wall-clock"></i>{" "}
                      <a href="blog-single.html">
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                      </a>
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="icofont icofont-comment"></i>{" "}
                      <a href="blog-single.html">12 Comments</a>
                    </li>
                  </ul>
                </div>

                <div className="entry-content">
                  <p>
                    {data.description}
                  </p>
                </div>
              </article>
              )
            }
            </div>

            <div className="col-lg-4">
              <div className="sidebar">
                  <a href="" className="btn-buy">
                    Buy Now
                  </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
