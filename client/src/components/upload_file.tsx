import dynamic from "next/dynamic";
import TextButton from "./text_button";
import axios from "axios";
import { useState } from "react";
import { useUploadCSVFile } from "@/query/upload";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const DownloadExample = dynamic(() => import("@/components/download_example"), {
  ssr: false,
  loading: () => {
    return <div className="h-6"></div>;
  },
});

const UploadFile = () => {
  const [file, setFile] = useState<File | null>();

  const queryClient = useQueryClient();

  const { mutate: uploadCSVFile } = useUploadCSVFile({
    onSuccess: () => {
      toast.success("파일을 업로드했습니다.");

      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
  return (
    <div className="p-4 border-b border-gray-light shadow">
      <div>제품을 csv 파일로 등록해주세요.</div>

      <div className="h-2" />

      <DownloadExample />
      <div className="h-2" />

      <input
        type="file"
        id="file"
        accept=".csv"
        onChange={(e) => {
          if (!e) return;
          if (!e.target) return;
          if (!e.target.files) return;
          const file: File = e.target.files[0];
          setFile(file);
        }}
      />

      <div className="h-4" />
      <TextButton
        text="올리기"
        onClick={() => {
          if (!file) return;
          const formData = new FormData();
          formData.append("file", file);

          uploadCSVFile(formData);

          // axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "upload", formData, {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          // });
        }}
        disabled={!file}
      />
    </div>
  );
};

export default UploadFile;
