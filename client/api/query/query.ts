import { useQuery } from "@tanstack/react-query";
import { BannerApiFunc } from "../functions/BannerApiFunc";
import { PortfolioApiFunc } from "../functions/PortfolioApiFunc";

export const BannerListQuery = () => {
  return useQuery({
    queryKey: ['Banners'],
    queryFn: BannerApiFunc
  })
};
export const PortfolioListQuery = () => {
  return useQuery({
    queryKey: ['Portfolios'],
    queryFn: PortfolioApiFunc
  })
}
