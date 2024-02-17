/**
 * csv 파일 업로드
 */

import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import Axios from ".";
import { AxiosError, AxiosResponse } from "axios";

const uploadCSVFile = (formData: FormData) => {
  return Axios({
    method: "post",
    url: "/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUploadCSVFile = (
  options?: UseMutationOptions<AxiosResponse, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: uploadCSVFile,
    ...options,
  });
};
