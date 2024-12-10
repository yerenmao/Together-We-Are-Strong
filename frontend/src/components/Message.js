import HeadSvg from "./HeadSvg";
import Event from "./Event";
import Link from "next/link";

function formatTimeStamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Message({ path, message, showIcon = true }) {
  const justify = message.is_mine ? "justify-end" : "justify-start";
  const visibility = showIcon ? "visible" : "invisible";
  const margin = showIcon ? "mt-2" : "";
  return (
    <div className={`flex items-center ${justify} ${margin}`}>
      {message.is_mine ? (
        <div className="flex flex-col items-center self-end">
          <div className="text-xs text-gray-500">
            {formatTimeStamp(message.sent_at)}
          </div>
        </div>
      ) : (
        <Link
          href={`/profile/${message.student_id}`}
          className={`${visibility} self-start mt-2 flex flex-col items-center`}
        >
          <HeadSvg showIcon={showIcon} />
          <div className="text-xs text-gray-500">{message.student}</div>
        </Link>
      )}
      {message.type === "message" ? (
        <div className="max-w-[75%] lg:max-w-[65%] bg-gray-300 text-sm rounded-xl py-2 px-3 m-1">
          {message.message}
        </div>
      ) : (
        <Event path={path} message={message} />
      )}

      {message.is_mine ? (
        <div
          className={`${visibility} self-start mt-2 flex flex-col items-center`}
        >
          <HeadSvg showIcon={showIcon} />
          <div className="text-xs text-gray-500">{message.student}</div>
        </div>
      ) : (
        <div className="flex flex-col items-center self-end">
          <div className="text-xs text-gray-500">
            {formatTimeStamp(message.sent_at)}
          </div>
        </div>
      )}
    </div>
  );
}
