export default function Course({ index, course }) {
  return (
    <>
      <div
        id={`section-${index}`}
        className="w-5/6 h-24 bg-white border-2 border-black rounded-lg flex items-center justify-between p-6 text-xl font-semibold"
      >
        <div className="w-1/4 flex">
          <div>{course.name}</div>
        </div>
        <div className="flex justify-end items-center space-x-16">
          <div className="flex flex-col items-center">
            <div>課號</div>
            <div className="text-base text-gray-700">{course.id}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>學分</div>
            <div className="text-base text-gray-700">{course.credits}學分</div>
          </div>
          <div className="flex flex-col items-center">
            <div>必/選修</div>
            <div className="text-base text-gray-700">{course.type}</div>
          </div>
        </div>
      </div>
    </>
  );
}
