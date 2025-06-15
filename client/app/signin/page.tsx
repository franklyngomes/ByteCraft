"use client";
import { SigninQuery } from "@/api/query/query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
const Signin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      signin_remember: false
    }
  });

  const { mutateAsync } = SigninQuery();
  const router = useRouter();
  const cookies = new Cookies()

  const onSubmit = async (formData: any) => {
    const { email, password, signin_remember} = formData;
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("signin_remember", signin_remember)
    await mutateAsync(formdata, {
      onSuccess: (res) => {
        if (res.status === true) {
          reset();
          toast.success(res.message);
          router.push("/");
        } else {
          toast.error(res.response?.data?.message);
        }
      },
    });
  };
  React.useEffect(() => {
    const user_email =  cookies.get('user_email')
    const user_password =  cookies.get('user_password')
    if(user_email && user_password){
      console.log(user_email)
      console.log(user_password)
    }
    reset({
      email: user_email,
      password: user_password,
      signin_remember: false
    })
  },[])
  return (
    <div className="bg-gradient-success">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
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
                        <h1 className="h4 text-gray-400 font-weight-light mb-4">
                          Welcome Back!
                        </h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                          <input
                            {...register("email", {
                              required: "Email is required",
                            })}
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            placeholder="Email"
                            name="email"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            {...register("password", {
                              required: "Password is required",
                            })}
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                              {...register("signin_remember")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success btn-user btn-block"
                        >
                          Sign in
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <a className="small" href="/signup">
                          Create an Account!
                        </a>
                      </div>
                    </div>
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

export default Signin;
