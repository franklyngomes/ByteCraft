"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BannerApiFunc } from "../functions/BannerApiFunc";
import { PortfolioApiFunc } from "../functions/PortfolioApiFunc";
import CourseApiFunc from "../functions/CourseApiFunc";
import CourseDetailsApiFunc from "../functions/CourseDetailsApiFunc";
import SigninFunc from "../functions/SigninApiFunc";
import SignupFunc from "../functions/SignupApiFunc";
import { Cookies } from "react-cookie";
import ProfileApiFunc from "../functions/ProfileApiFunc";
import VerifyEmailFunc from "../functions/VerifyEmailApiFunc";
import toast from "react-hot-toast";
import ForgotPasswordFunc from "../functions/ForgotPasswordFunc";
import ResetPasswordFunc from "../functions/ResetPasswordFunc";

export const BannerListQuery = () => {
  return useQuery({
    queryKey: ["Banners"],
    queryFn: BannerApiFunc,
  });
};
export const PortfolioListQuery = () => {
  return useQuery({
    queryKey: ["Portfolios"],
    queryFn: PortfolioApiFunc,
  });
};
export const CourseListQuery = () => {
  return useQuery({
    queryKey: ["Courses"],
    queryFn: CourseApiFunc,
  });
};
export const CourseDetailsQuery = (id: any) => {
  return useQuery({
    queryKey: ["CourseDetails"],
    queryFn: () => CourseDetailsApiFunc(id),
  });
};
export const SigninQuery = () => {
  // const cookie = new Cookies();
  return useMutation({
    mutationFn: SigninFunc,
    onSuccess: (res) => {
      // if (res.status === true) {
      //   cookie.set("x-access-token", res.token, { path: "/", secure: true });
      // }
    },
    onError: (err) => {
      return err;
    },
  });
};
export const SignupQuery = () => {
  return useMutation({
    mutationFn: SignupFunc,
    onSuccess: (res) => {},
    onError: (error: any) => {},
  });
};
export const VerifyEmailQuery = () => {
  return useMutation({
    mutationFn: VerifyEmailFunc,
    onSuccess: (res) => {},
  });
};
export const ForgotPasswordQuery = () => {
  return useMutation({
    mutationFn: ForgotPasswordFunc,
    onSuccess: (res) => {},
  });
};
export const ResetPasswordQuery = () => {
  return useMutation({
    mutationFn: ResetPasswordFunc,
    onSuccess: (res) => {},
  });
};
export const ProfileQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ["Profile", id],
    queryFn: () => {
      if (!id) {
        throw new Error("User id is undefined!");
      }
      return ProfileApiFunc(id);
    },
    enabled: !!id,
  });
};
