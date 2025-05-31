import { useQuery } from "@tanstack/react-query";
import { BannerApiFunc } from "../functions/BannerApiFunc";
import { PortfolioApiFunc } from "../functions/PortfolioApiFunc";
import CourseApiFunc from "../functions/CourseApiFunc";
import CourseDetailsApiFunc from "../functions/CourseDetailsApiFunc";

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
export const CourseDetailsQuery= (id:any) => {
  return useQuery({
    queryKey: ["CourseDetails"],
    queryFn: () => CourseDetailsApiFunc(id)
  })
}
