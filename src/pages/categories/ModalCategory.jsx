import { InputCreate } from "../../components/InputCreate";
import { TextArea } from "../../components/TextArea";

export function ModelCategory({ onClose }) {
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="flex w-[30%] flex-col gap-4 bg-white py-4 px-8 rounded-xl">
        <InputCreate
          label={"Tên danh mục"}
          placeHolder={"Nhập tên danh mục..."}
        />
        <TextArea
          label={"Chi tiết danh mục"}
          placeHolder={"Nhập chi mô tả chi tiết..."}
        />
        <div className="flex items-center gap-1">
          <button className="w-full h-10 bg-primary text-white text-md rounded-lg border-none cursor-pointer">
            Tạo
          </button>
          <button
            className="w-full h-10 bg-gray-300 text-black text-md rounded-lg border-none cursor-pointer"
            onClick={onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
