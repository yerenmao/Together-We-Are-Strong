export default function SearchResult({ index, section }) {
  console.log(section);
  return (
    <>
      <div
        id={`section-${index}`}
        className="w-5/6 h-24 bg-white border-2 border-black rounded-lg flex items-center justify-between p-6 text-xl font-semibold m-3"
      >
        <div className="w-1/4 flex">
          <div>{section.name}-</div>
          <div>{section.professor}</div>
        </div>
        <div className="flex w-3/4 justify-end items-center space-x-16">
          <div className="flex flex-col items-center">
            <div>學期</div>
            <div className="text-base text-gray-700">{section.semester}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>系所</div>
            <div className="text-base text-gray-700">{section.department}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>學分</div>
            <div className="text-base text-gray-700">{section.credits}學分</div>
          </div>
          <div className="flex flex-col items-center">
            <div>時間</div>
            <div className="text-base text-gray-700">五2, 3, 4</div>
          </div>
          <div className="flex flex-col items-center">
            <div>教室</div>
            <div className="text-base text-gray-700">
              {section.classroom ? section.classroom : "未公布"}
            </div>
          </div>
          <button className="bg-gray-700 hover:bg-slate-600 text-white text-base font-medium rounded-3xl w-28">
            課程大綱
          </button>
        </div>
      </div>
    </>
  );
}
