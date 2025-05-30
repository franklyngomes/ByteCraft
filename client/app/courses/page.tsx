"use client";
import { CourseListQuery } from "@/api/query/query";
import React from "react";

const Courses = () => {
  const { data } = CourseListQuery();
  console.log(data);
  return (
    <div className="courses" style={{ marginTop: "100px" }}>
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="row">
            {data ? (
              data.map((item: any) => (
                <div className="col-lg-3 col-md-6 mt-4 mt-md-0" key={item._id}>
                  <div className="card">
                    <img
                      src={`http://localhost:5000/${item.image}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        {item.description}
                      </p>
                      <div className="btn-wrap">
                        <a href={`/courses/${item._id}`} className="btn-buy">
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Courses Found!</p>
            )}
          </div>
        </div>
      </section>

      <section id="faq" className="faq section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            <ul>
              <li>
                <i className="bx bx-help-circle icon-help"></i>{" "}
                <a
                  data-toggle="collapse"
                  className="collapse"
                  href="#faq-list-1"
                >
                  Non consectetur a erat nam at lectus urna duis?{" "}
                  <i className="bx bx-chevron-down icon-show"></i>
                  <i className="bx bx-chevron-up icon-close"></i>
                </a>
                <div
                  id="faq-list-1"
                  className="collapse show"
                  data-parent=".faq-list"
                >
                  <p>
                    Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id
                    volutpat lacus laoreet non curabitur gravida. Venenatis
                    lectus magna fringilla urna porttitor rhoncus dolor purus
                    non.
                  </p>
                </div>
              </li>

              <li>
                <i className="bx bx-help-circle icon-help"></i>{" "}
                <a
                  data-toggle="collapse"
                  href="#faq-list-2"
                  className="collapsed"
                >
                  Feugiat scelerisque varius morbi enim nunc?{" "}
                  <i className="bx bx-chevron-down icon-show"></i>
                  <i className="bx bx-chevron-up icon-close"></i>
                </a>
                <div
                  id="faq-list-2"
                  className="collapse"
                  data-parent=".faq-list"
                >
                  <p>
                    Dolor sit amet consectetur adipiscing elit pellentesque
                    habitant morbi. Id interdum velit laoreet id donec ultrices.
                    Fringilla phasellus faucibus scelerisque eleifend donec
                    pretium. Est pellentesque elit ullamcorper dignissim. Mauris
                    ultrices eros in cursus turpis massa tincidunt dui.
                  </p>
                </div>
              </li>

              <li>
                <i className="bx bx-help-circle icon-help"></i>{" "}
                <a
                  data-toggle="collapse"
                  href="#faq-list-3"
                  className="collapsed"
                >
                  Dolor sit amet consectetur adipiscing elit?{" "}
                  <i className="bx bx-chevron-down icon-show"></i>
                  <i className="bx bx-chevron-up icon-close"></i>
                </a>
                <div
                  id="faq-list-3"
                  className="collapse"
                  data-parent=".faq-list"
                >
                  <p>
                    Eleifend mi in nulla posuere sollicitudin aliquam ultrices
                    sagittis orci. Faucibus pulvinar elementum integer enim. Sem
                    nulla pharetra diam sit amet nisl suscipit. Rutrum tellus
                    pellentesque eu tincidunt. Lectus urna duis convallis
                    convallis tellus. Urna molestie at elementum eu facilisis
                    sed odio morbi quis
                  </p>
                </div>
              </li>

              <li>
                <i className="bx bx-help-circle icon-help"></i>{" "}
                <a
                  data-toggle="collapse"
                  href="#faq-list-4"
                  className="collapsed"
                >
                  Tempus quam pellentesque nec nam aliquam sem et tortor
                  consequat? <i className="bx bx-chevron-down icon-show"></i>
                  <i className="bx bx-chevron-up icon-close"></i>
                </a>
                <div
                  id="faq-list-4"
                  className="collapse"
                  data-parent=".faq-list"
                >
                  <p>
                    Molestie a iaculis at erat pellentesque adipiscing commodo.
                    Dignissim suspendisse in est ante in. Nunc vel risus commodo
                    viverra maecenas accumsan. Sit amet nisl suscipit adipiscing
                    bibendum est. Purus gravida quis blandit turpis cursus in.
                  </p>
                </div>
              </li>

              <li>
                <i className="bx bx-help-circle icon-help"></i>{" "}
                <a
                  data-toggle="collapse"
                  href="#faq-list-5"
                  className="collapsed"
                >
                  Tortor vitae purus faucibus ornare. Varius vel pharetra vel
                  turpis nunc eget lorem dolor?{" "}
                  <i className="bx bx-chevron-down icon-show"></i>
                  <i className="bx bx-chevron-up icon-close"></i>
                </a>
                <div
                  id="faq-list-5"
                  className="collapse"
                  data-parent=".faq-list"
                >
                  <p>
                    Laoreet sit amet cursus sit amet dictum sit amet justo.
                    Mauris vitae ultricies leo integer malesuada nunc vel.
                    Tincidunt eget nullam non nisi est sit amet. Turpis nunc
                    eget lorem dolor sed. Ut venenatis tellus in metus vulputate
                    eu scelerisque.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
