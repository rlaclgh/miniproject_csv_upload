"use client";
import { CSVLink } from "react-csv";

const productsArray = Array.from({ length: 1000 }, (_, i) => [
  `제품${i + 1}`,
  `product${i + 1}`,
  `제품${i + 1} 설명`,
]);

const csvData = [["name", "nameEng", "description"], ...productsArray];

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
