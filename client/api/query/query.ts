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
  const cookie = new Cookies();
  return useMutation({
    mutationFn: SigninFunc,
    onSuccess: (res) => {
      if (res.status === true) {
        cookie.set("x-access-token", res.token, { path: "/", secure: true });
      }
    },
    onError: (err) => {
      return err;
    },
  });
};
export const SignupQuery = () => {
  const cookie = new Cookies();
  return useMutation({
    mutationFn: SignupFunc,
    onSuccess: (res) => {},
    onError: (error: any) => {},
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
