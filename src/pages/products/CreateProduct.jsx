import { useEffect, useRef, useState } from "react";
import { InputCreate } from "../../components/InputCreate";
import { SubTitle } from "../../components/SubTitle";
import { TextArea } from "../../components/TextArea";
import { VND } from "../../constants/currency";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { toast } from "react-toastify";
import categoriesApi from "../../api/categoriesApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import foodsApi from "../../api/foodsApi";
import { useNavigate } from "react-router";
import { useLoader } from "../../contexts/LoaderContext";
export default function CreateProduct() {
  const fileInputRef = useRef(null);
  const { setLoading } = useLoader();

  const [linkImage, setLinkImage] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [food, setFood] = useState({
    foodName: "",
    foodDescription: "",
    price: "",
    discount: 0,
    rating: 0,
    stock: "",
    isActive: 1,
    categoryID: "",
    imageFood: null,
  });

  const navigate = useNavigate();
  const handleOpenFolder = () => fileInputRef.current.click();
  const handleFileChange = (e) => {
    const input = e.target;
    const file = input.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      // switch byte 1 MB = 1024 * 1024 byte
      toast.warn("Vui lòng chọn ảnh có kích thước bé hơn!");
      input.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    setLinkImage(url);
    setFood((prev) => ({ ...prev, imageFood: file }));

    input.value = "";
  };

  useEffect(() => {
    const controller = new AbortController();
    const loadCategory = async () => {
      setLoadingPage(true);
      try {
        const response = await categoriesApi.getCategories(controller.signal);
        setCategories(response.data?.categories);
      } catch (error) {
        if (error.name === "CanceledError") return;
      } finally {
        if (!controller.signal.aborted) setLoadingPage(false);
      }
    };

    loadCategory();
    return () => controller.abort();
  }, []);
  const handleCreateProduct = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(food).map((key) => {
      formData.append(key, food[key]);
    });
    try {
      await foodsApi.createFood(formData);
      navigate("/admin/products");
      toast.success("Tạo sản phẩm mới thành công");
    } catch (error) {
      if (error.response.status === 409) {
        toast.warn("Sản phẩm đã tồn tại!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage) return <LoadingSpinner />;
  return (
    <>
      {/*subTitle */}
      <SubTitle title="Thêm sản phấm mới" />
      {/* data */}
      <div className="flex-1 flex gap-4 py-1">
        <div className="flex-3 flex flex-col gap-3 bg-white shadow rounded-xl p-4 items-center">
          {/* uploadFile */}
          <div
            className="w-[80%] flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer text-primary"
            onClick={handleOpenFolder}
          >
            {!linkImage ? (
              <>
                <div className="">
                  <FileUploadOutlinedIcon sx={{ fontSize: 80 }} />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-md font-medium ">
                    Nhấn để tải ảnh sản phẩm
                  </p>
                  <p className="text-sm ">PNG, JPG tối đa 5MB</p>
                </div>
              </>
            ) : (
              <img
                src={linkImage}
                className=" w-fit max-h-80  rounded-2xl object-cover"
              />
            )}

            <input
              type="file"
              className=" hidden"
              ref={fileInputRef}
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center w-full gap-2">
            {/* name */}
            <div className="flex-1 flex flex-col items-start gap-2">
              <InputCreate
                label={"Tên sản phẩm"}
                placeHolder={"Giò lụa đặc biệt"}
                value={food.foodName}
                onChange={(e) =>
                  setFood((prev) => ({ ...prev, foodName: e.target.value }))
                }
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
                value={food.categoryID}
                onChange={(e) =>
                  setFood((prev) => ({ ...prev, categoryID: e.target.value }))
                }
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => {
                  return (
                    <option
                      key={category.categoryID}
                      value={category.categoryID}
                    >
                      {category.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex items-center w-full gap-2">
            {/* price */}
            <div className="flex-1 flex flex-col items-start gap-2">
              <InputCreate
                label={`Giá (${VND})`}
                placeHolder={"0"}
                value={food.price}
                onChange={(e) =>
                  setFood((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>
            {/* stock */}
            <div className="flex-1 flex flex-col items-start gap-2">
              <InputCreate
                label={"Tồn kho (kg)"}
                placeHolder={0}
                value={food.stock}
                onChange={(e) =>
                  setFood((prev) => ({ ...prev, stock: e.target.value }))
                }
              />
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
              value={food.foodDescription}
              onChange={(e) => {
                setFood((prev) => ({
                  ...prev,
                  foodDescription: e.target.value,
                }));
              }}
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
              value={food.isActive}
              onChange={(e) =>
                setFood((prev) => ({
                  ...prev,
                  isActive: e.target.value,
                }))
              }
            >
              <option value="true">Đang bán</option>
              <option value="false">Tạm ẩn</option>
            </select>
          </div>
          {/* button */}
          <div>
            <button
              className="bg-primary w-full border-0 rounded-lg text-md text-white font-medium py-3 cursor-pointer active:scale-95"
              onClick={handleCreateProduct}
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
