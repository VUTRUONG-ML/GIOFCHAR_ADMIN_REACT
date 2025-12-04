import { InputCreate } from "../../components/InputCreate";
import { SubTitle } from "../../components/SubTitle";
import { TextArea } from "../../components/TextArea";
import { VND } from "../../constants/currency";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
export default function UpdateProduct() {
  return (
    <>
      {/*subTitle */}
      <SubTitle title="Chỉnh sửa thông tin sản phẩm" />
      {/* data */}
      <div className="flex-1 flex gap-4 py-1">
        <div className="flex-3 flex flex-col gap-3 bg-white shadow rounded-xl p-4">
          <div className="w-full flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer text-primary">
            <div className="">
              <FileUploadOutlinedIcon sx={{ fontSize: 80 }} />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-md font-medium ">Nhấn để tải ảnh sản phẩm</p>
              <p className="text-sm ">PNG, JPG tối đa 5MB</p>
            </div>
          </div>
          <div className="flex items-center w-full gap-2">
            {/* name */}
            <div className="flex-1 flex flex-col items-start gap-2">
              <InputCreate
                label={"Tên sản phẩm"}
                placeHolder={"Giò lụa đặc biệt"}
              />
            </div>
            {/* category */}
            <div className="flex-1 flex flex-col items-start gap-2">
              <label htmlFor="" className="text-sm font-bold">
                Danh mục
              </label>

              <select
                className="w-full
                        focus:border-primary 
                          focus:ring-0 
                          focus:outline-none   
                          border border-gray-300 rounded-lg text-md py-2 px-3"
              >
                <option value="none">Chọn danh mục</option>
                <option value="1">Nem</option>
                <option value="2">Chả</option>
                <option value="3">Giò</option>
                <option value="4">xúc xích</option>
              </select>
            </div>
          </div>
          <div className="flex items-center w-full gap-2">
            {/* price */}
            <div className="flex-1 flex flex-col items-start gap-2">
              <InputCreate label={`Giá (${VND})`} placeHolder={"0"} />
            </div>
            {/* stock */}
            <div className="flex-1 flex flex-col items-start gap-2">
              <InputCreate label={"Tồn kho (kg)"} placeHolder={0} />
            </div>
          </div>
        </div>
        <div className="flex-2 flex flex-col gap-8 bg-white shadow rounded-xl p-4">
          {/* description */}
          <div className="flex-1 flex flex-col items-start gap-2">
            <TextArea
              label={"Mô tả sản phẩm"}
              placeHolder={
                "Giò lụa được làm từ thịt heo nặc tươi ngon, gia vị truyền thống..."
              }
            />
          </div>
          {/* active */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="" className="text-sm font-bold">
              Trạng thái
            </label>
            <select
              className="w-full 
                        focus:border-primary 
                          focus:ring-0 
                          focus:outline-none   
                          border border-gray-300 rounded-lg text-md py-2 px-3"
            >
              <option value="none">Đang bán</option>
              <option value="1">Tạm ẩn</option>
            </select>
          </div>
          {/* button */}
          <div>
            <button className="bg-primary w-full border-0 rounded-lg text-md text-white font-medium py-3 cursor-pointer active:scale-95">
              Cập nhật sản phẩm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
