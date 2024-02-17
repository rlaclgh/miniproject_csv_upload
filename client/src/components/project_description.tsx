"use client";

const ProjectDescription = () => {
  return (
    <div className="flex items-center h-full flex-col">
      <div className="w-120">
        <div className="text-5xl mb-10 mt-10">miniproject_csv_upload</div>
        <div className="text-2xl my-2">1. 프로젝트 설명</div>
        <div className="text-xl my-2">1.1 client에서 csv 파일 업로드</div>
        <div className="text-xl my-2">1.2 server에 csv 파일 저장</div>
        <div className="text-xl my-2">1.3 spring batch 로 db에 업로드</div>
      </div>
    </div>
  );
};

export default ProjectDescription;
