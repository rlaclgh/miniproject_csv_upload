"use client";
import Header from "@/components/header";
import Products from "@/components/products";
import UploadFile from "@/components/upload_file";

export default function Home() {
  return (
    <div>
      <Header renderCenter={() => <div>메인 페이지</div>} />

      <UploadFile />

      <Products />
    </div>
  );
}
