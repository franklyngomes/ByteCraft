"use client";
import { SignupQuery } from "@/api/query/query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const [image, setImage] = React.useState<File | null>(null);
  const { mutateAsync } = SignupQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();
  const onSubmit = async (formData: any) => {
    const { name, phone, email, password } = formData;
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("phone", phone);
    formdata.append("email", email);
    formdata.append("password", password);
    if (image) {
      formdata.append("image", image);
    } else {
      alert("Please upload an image");
      return;
    }
    mutateAsync(formdata, {
      onSuccess: (res) => {
        if(res.status == true){
          toast.success(res.message)
          reset();
          setImage(null)
          router.push("/signin");
        }else{
          toast.error(res.response?.data?.message)
        }
      },
    });
  };
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
                  <form
                    className="user"
                    method="post"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group">
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : "/assets/img/noavatar.jpg"
                        }
                        alt="Preview"
                        height={60}
                        width="auto"
                        style={{ borderRadius: "50%", marginBottom: "10px" }}
                      />
                      <input
                        {...register("image", {
                          required: "Image is required",
                        })}
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setImage(e.target.files[0]);
                          }
                        }}
                        className="form-control form-control-user"
                        id="image"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        {...register("name", {
                          required: "Full name is required",
                        })}
                        type="text"
                        className="form-control form-control-user"
                        id="exampleFirstName"
                        placeholder="Full Name"
                        name="name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        {...register("phone", {
                          required: "Phone is required",
                        })}
                        type="text"
                        className="form-control form-control-user"
                        id="exampleLastName"
                        placeholder="Phone"
                        name="phone"
                      />
                    </div>
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
