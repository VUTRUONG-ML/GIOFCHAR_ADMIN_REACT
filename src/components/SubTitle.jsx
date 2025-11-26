import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export function SubTitle({ active, nameActive, handle, title }) {
  return (
    <div className=" flex items-center justify-between h-18">
      {/* left-section */}
      <div>
        <p className="text-xl font-bold">{title}</p>
        <p className="text-[13px] text-secondary">Tổng sản phẩm: 4 sản phẩm</p>
      </div>
      {/* r-section */}
      {active && (
        <button
          onClick={handle}
          className="flex bg-primary text-white text-sm items-center px-4 py-2 rounded-md cursor-pointer active:scale-98"
        >
          <AddOutlinedIcon className="mr-2" />
          <p>Thêm {nameActive}</p>
        </button>
      )}
    </div>
  );
}
