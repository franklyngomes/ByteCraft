import React from "react";

const Signup = () => {
  return (
    <div className="bg-gradient-success">
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div
                className="col-lg-6"
                style={{
                  backgroundImage: "url('/assets/img/bg.jpg')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <img
                  src="/assets/img/logo-png.png"
                  alt="Logo"
                  width="150px"
                  height="150px"
                />
              </div>
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 font-weight-light mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <form className="user" method="post">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleFirstName"
                        placeholder="Full Name"
                        name="name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleLastName"
                        placeholder="Phone"
                        name="phone"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Email"
                        name="email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        name="password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success btn-user btn-block"
                    >
                      Sign up
                    </button>
                    <hr />
                  </form>
                  <div className="text-center">
                    <a className="small" href="forgot-password.html">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <a className="small" href="/signin">
                      Already have an account? Login!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
