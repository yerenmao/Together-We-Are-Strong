import Link from "next/link";

export default function ProfSection({ params }) {
  return (
    <>
      <div className="w-5/6 h-24 bg-white border-2 border-black rounded-lg flex items-center justify-between p-6 text-xl font-semibold">
        <div className="w-1/4 flex">
          <div>資料庫管理-</div>
          <div>孔令傑</div>
        </div>
        <div className="flex justify-end items-center space-x-16">
          <div className="flex flex-col items-center">
            <div>流水號</div>
            <div className="text-base text-gray-700">IM3008</div>
          </div>
          <div className="flex flex-col items-center">
            <div>學期</div>
            <div className="text-base text-gray-700">112-2</div>
          </div>
          <div className="flex flex-col items-center">
            <div>時間</div>
            <div className="text-base text-gray-700">暫定</div>
          </div>
          <div className="flex flex-col items-center">
            <div>教室</div>
            <div className="text-base text-gray-700">暫定</div>
          </div>
          <div className="flex flex-col items-center">
            <div>總人數</div>
            <div className="text-base text-gray-700">120人</div>
          </div>

          <Link
            href="/profupload"
            className="flex bg-gray-700 hover:bg-slate-600 text-white text-base font-medium rounded-3xl w-40 justify-center"
          >
            <div>課程大綱：</div>
            <div className="text-gray-400">未上傳</div>
          </Link>
        </div>
      </div>
    </>
  );
}