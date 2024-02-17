import { useQuery } from "@tanstack/react-query";
import Axios from ".";

/**
 * 제품 리스트
 */

interface GetProductsResponse {
  id: number;
  name: string;
  nameEng: string;
  description: string;
  createdAt: string;
}

const getProducts = async () => {
  const data = await Axios({
    method: "get",
    url: `/product`,
  });

  return data.data;
};

export const useGetProducts = () => {
  return useQuery<GetProductsResponse[]>({
    queryKey: ["product"],
    queryFn: () => getProducts(),
  });
};
