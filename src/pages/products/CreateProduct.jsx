import { SubTitle } from "../../components/SubTitle";
import { VND } from "../../constants/currency";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
export default function CreateProduct() {
  return (
    <>
      {/*subTitle */}
      <SubTitle title="Thêm sản phấm mới" />
      {/* data */}
      <div className="flex-1 flex gap-4 py-1">
        <div className="flex-3 flex flex-col gap-3 bg-white shadow rounded-xl p-4">
          <div className="w-full flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer">
            <div className="text-gray-400">
              <FileUploadOutlinedIcon sx={{ fontSize: 80 }} />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-md font-medium text-gray-500">
                Nhấn để tải ảnh sản phẩm
              </p>
              <p className="text-sm text-gray-400">PNG, JPG tối đa 5MB</p>
            </div>
          </div>
          <div className="flex items-center w-full gap-2">
            {/* name */}
            <div className="flex-1 flex flex-col items-start gap-2">
              <label htmlFor="" className="text-sm font-bold">
                Tên sản phẩm
              </label>
              <input
                type="text"
                className="w-full focus:border-0 border border-gray-300 rounded-lg placeholder:text-md placeholder:text-gray-400 text-md py-2 px-3"
                placeholder="Giò lụa đặc biệt"
              />
            </div>
            {/* category */}
            <div className="flex-1 flex flex-col items-start gap-2">
              <label htmlFor="" className="text-sm font-bold">
                Danh mục
              </label>

              <select className="w-full focus:border-0 border border-gray-300 rounded-lg text-md py-2 px-3">
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
              <label htmlFor="" className="text-sm font-bold">
                Giá ({VND})
              </label>
              <input
                type="money"
                className="w-full focus:border-0 border border-gray-300 rounded-lg placeholder:text-md placeholder:text-gray-400 text-md py-2 px-3"
                placeholder="0"
              />
            </div>
            {/* stock */}
            <div className="flex-1 flex flex-col items-start gap-2">
              <label htmlFor="" className="text-sm font-bold">
                Tồn kho (kg)
              </label>
              <input
                type="number"
                className="w-full focus:border-0 border border-gray-300 rounded-lg placeholder:text-md placeholder:text-gray-400 text-md py-2 px-3"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div className="flex-2 flex flex-col gap-8 bg-white shadow rounded-xl p-4">
          {/* description */}
          <div className="flex-1 flex flex-col items-start gap-2">
            <label htmlFor="" className="text-sm font-bold">
              Mô tả sản phẩm
            </label>
            <textarea
              type="text"
              className="w-full h-full focus:border-0 border border-gray-300 rounded-lg placeholder:text-md placeholder:text-gray-400 text-md py-2 px-3"
              placeholder="Giò lụa được làm từ thịt heo nặc tươi ngon, gia vị truyền thống..."
            ></textarea>
          </div>
          {/* activ */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="" className="text-sm font-bold">
              Trạng thái
            </label>
            <select className="w-full focus:border-0 border border-gray-300 rounded-lg text-md py-2 px-3">
              <option value="none">Đang bán</option>
              <option value="1">Tạm ẩn</option>
            </select>
          </div>
          {/* button */}
          <div>
            <button className="bg-primary w-full border-0 rounded-lg text-md text-white font-medium py-3 cursor-pointer">
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
