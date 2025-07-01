"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import OtpInput from 'react-otp-input';
import { VerifyEmailQuery } from "@/api/query/query";

const VerifyEmail = () => {
  const [otp, setOtp] = React.useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
  });
  const { mutateAsync } = VerifyEmailQuery()

  const router = useRouter();
  const cookies = new Cookies()

  const onSubmit = async (formData: any) => {
    const { email} = formData;
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("code", otp);
    mutateAsync(formdata, {
      onSuccess: (res) => {
        if (res.status == true) {
          toast.success(res.message)
          reset();
          router.push("/signin");
        } else {
          toast.error(res.response?.data?.message)
        }
      },
    });
  };
  const handleChange = (code) => {
    setOtp(code)
  }
  console.log(otp)
  React.useEffect(() => {
  }, [])
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
                        <h4>Email Verification</h4>
                        <p>Your code was sent to you via email</p>
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
                          <div className="form-group" style={{display: "flex", justifyContent: "center"}}>
                            <OtpInput
                              value={otp}
                              onChange={handleChange}
                              numInputs={6}
                              renderSeparator={<span style={{ width: "8px" }}></span>}
                              renderInput={(props) => <input {...props} style={{
                                border: "1px solid gray",
                                borderRadius: "8px",
                                width: "35px",
                                height: "35px",
                                fontSize: "16px",
                                color: "#000",
                                fontWeight: "400",
                                caretColor: "blue"
                              }} className="text-center" />}
                            />

                          </div>
                        <button
                          type="submit"
                          className="btn btn-success btn-user btn-block"
                        >
                          Verify
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <p className="small">
                          Didn't receive code? <a href="">Request again</a>
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
