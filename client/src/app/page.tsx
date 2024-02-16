"use client";
import Header from "@/components/header";
import dynamic from "next/dynamic";
const DownloadExample = dynamic(() => import("@/components/download_example"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Header renderCenter={() => <div>메인 페이지</div>} />
      <DownloadExample />
    </div>
  );
}
