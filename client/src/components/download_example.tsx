"use client";
import { CSVLink } from "react-csv";

const csvData = [
  ["name", "nameEng", "description"],
  ["제품1", "product1", "제품1 설명"],
  ["제품2", "product2", "제품2 설명"],
  ["제품3", "product3", "제품3 설명"],
  ["제품4", "product4", "제품4 설명"],
];

const DownloadExample = () => {
  return (
    <CSVLink
      data={csvData}
      filename={"product_upload_example.csv"}
      target="_blank"
    >
      <div className="text-blue">예시 데이터 다운로드</div>
    </CSVLink>
  );
};

export default DownloadExample;
