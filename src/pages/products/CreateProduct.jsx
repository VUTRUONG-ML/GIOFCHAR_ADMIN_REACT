import { useEffect, useRef, useState } from "react";
import { InputCreate } from "../../components/InputCreate";
import { SubTitle } from "../../components/SubTitle";
import { TextArea } from "../../components/TextArea";
import { VND } from "../../constants/currency";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
    ingredients: [],
    rating: 0,
    isActive: 1,
    categoryID: "",
    imageFood: null,
  });

  // State hỗ trợ thêm nguyên liệu
  const [newIngre, setNewIngre] = useState("");

  const navigate = useNavigate();

  // --- Logic xử lý Nguyên liệu ---
  const addIngredient = () => {
    if (!newIngre.trim()) return;
    setFood((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngre.trim()],
    }));
    setNewIngre("");
  };

  const removeIngredient = (index) => {
    const updated = food.ingredients.filter((_, i) => i !== index);
    setFood((prev) => ({ ...prev, ingredients: updated }));
  };

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
      if (key === "ingredients")
        formData.append(key, JSON.stringify(food[key]));
      else formData.append(key, food[key]);
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
        {/* left col */}
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
          </div>
          <div className="flex items-center w-full gap-2">
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
        </div>
        {/* right col */}
        <div className="flex-2 flex flex-col bg-white shadow rounded-xl p-4">
          {/* description */}
          <div className="flex-1 mb-2 flex flex-col items-start gap-2">
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

          {/* ingredients */}
          <div className="my-2">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-gray-700">
                Nguyên liệu sản phẩm
              </label>
              <span className="text-xs text-gray-400">
                {food.ingredients.length} thành phần
              </span>
            </div>

            {/* Ô nhập nguyên liệu mới */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Thêm nguyên liệu (ví dụ: 500g Thịt heo)"
                className="flex-1 border-b border-gray-300 py-1 focus:border-primary outline-none text-sm"
                value={newIngre}
                onChange={(e) => setNewIngre(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addIngredient()}
              />
              <button
                onClick={addIngredient}
                className="text-primary hover:scale-110 transition-transform"
              >
                <AddCircleOutlineOutlinedIcon />
              </button>
            </div>

            {/* Danh sách hiển thị */}
            <div className="max-h-20 overflow-y-auto pr-2">
              <div className="flex flex-wrap gap-2">
                {food.ingredients.map((ing, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-2 rounded-lg group"
                  >
                    <span className="text-sm text-gray-600 italic">
                      - {ing}
                    </span>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => removeIngredient(index)}
                        className="p-1 text-red-400"
                      >
                        <HighlightOffOutlinedIcon sx={{ fontSize: 18 }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* active */}
          <div className="flex flex-col items-start gap-2 my-2">
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
          <div className="mt-2">
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
