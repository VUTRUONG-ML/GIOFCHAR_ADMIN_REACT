import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
export function StatusOverview({
  title,
  content,
  statusIncrease,
  contentStatus,
  icon,
}) {
  return (
    <div className="flex-1 bg-white rounded-xl shadow flex items-start py-8 px-4">
      <div className="flex-3 h-full flex flex-col justify-around">
        <p className="text-md font-medium text-secondary">{title}</p>
        <p className="text-2xl font-extrabold">{content}</p>
        {/* status */}
        <div
          className={`flex items-center text-[14px] ${
            statusIncrease ? "text-primary" : "text-red-700"
          } font-medium`}
        >
          {statusIncrease === undefined ? (
            ""
          ) : statusIncrease ? (
            <NorthOutlinedIcon />
          ) : (
            <SouthOutlinedIcon />
          )}
          <p>{contentStatus}</p>
        </div>
      </div>
      <div className="flex-1">{icon}</div>
    </div>
  );
}
