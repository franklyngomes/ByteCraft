"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import { ForgotPasswordQuery } from "@/api/query/query";

const VerifyEmail = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
  });
  const {mutateAsync} = ForgotPasswordQuery()

  const router = useRouter();
  const cookies = new Cookies()

  const onSubmit = async (formData: any) => {
    const { email} = formData;
    const formdata = new FormData();
    formdata.append("email", email);
    mutateAsync(formdata, {
      onSuccess: (res) => {
        if (res.status == true) {
          toast.success(res.message)
          reset();
          router.push("/reset-password");
        } else {
          toast.error(res.response?.data?.message)
        }
      },
    });
  };
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
                        <h4>Forgot Password</h4>
                        <p>We got your back! Please enter an email, and we'll send an OTP</p>
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
                        <button
                          type="submit"
                          className="btn btn-success btn-user btn-block"
                        >
                          Submit
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <p className="small">
                          Already have an account? <a href="/signin">Signin</a>
                        </p>
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

export default VerifyEmail;
