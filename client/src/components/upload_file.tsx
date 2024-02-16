import dynamic from "next/dynamic";

const DownloadExample = dynamic(() => import("@/components/download_example"), {
  ssr: false,
  loading: () => {
    return <div className="h-6"></div>;
  },
});

const UploadFile = () => {
  return (
    <div className="p-4 border-b border-gray-light shadow">
      <div>제품을 csv 파일로 등록해주세요.</div>

      <div className="h-2" />

      <DownloadExample />
      <div className="h-2" />

      <input type="file" id="file" accept=".csv" />
    </div>
  );
};

export default UploadFile;
