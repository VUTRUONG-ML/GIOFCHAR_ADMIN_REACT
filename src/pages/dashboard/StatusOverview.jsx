import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
export function StatusOverview({ title, content, trend, contentStatus, icon }) {
  return (
    <div className="flex-1 bg-white rounded-xl shadow flex items-start py-8 px-4">
      <div className="flex-3 h-full flex flex-col justify-around">
        <p className="text-md font-medium text-secondary">{title}</p>
        <p className="text-2xl font-extrabold">{content}</p>
        {/* status */}
        <div
          className={`flex items-center text-[14px] ${
            trend === "increase"
              ? "text-primary"
              : trend === "decrease"
              ? "text-red-700"
              : "text-gray-500"
          } font-medium`}
        >
          {trend === "increase" ? (
            <NorthOutlinedIcon />
          ) : trend === "decrease" ? (
            <SouthOutlinedIcon />
          ) : trend === "no_change" ? (
            <HorizontalRuleRoundedIcon />
          ) : (
            ""
          )}
          <p>{contentStatus}</p>
        </div>
      </div>
      <div className="flex-1">{icon}</div>
    </div>
  );
}
