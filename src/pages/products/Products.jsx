import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import productPicture from "../../assets/product-template.jpg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { SubTitle } from "../../components/SubTitle";
import { useEffect, useState } from "react";
import foodsApi from "../../api/foodsApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { formatMoney } from "../../utils/formatMoney";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
export default function Products() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [loadingFoods, setLoadingFoods] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const loadFoods = async () => {
      setLoadingFoods(true);
      try {
        const response = await foodsApi.getFoods(controller.signal);
        setFoods(response.data.foods);
        setQuantity(response.data.quantity);
      } catch (error) {
        if (error.name === "CanceledError") return;
      } finally {
        if (!controller.signal.aborted) setLoadingFoods(false);
      }
    };
    loadFoods();

    return () => controller.abort();
  }, []);

  const handleDelete = async (foodId) => {
    try {
      await foodsApi.deleteFood(foodId);

      setFoods(foods.filter((food) => food.foodId !== foodId));

      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      return;
    }
  };

  const handleMove = () => navigate("/admin/products/create");

  return (
    <>
      {loadingFoods ? (
        <LoadingSpinner />
      ) : (
        <>
          {/*subTitle */}
          <SubTitle
            active
            nameActive="sản phẩm"
            handleMove={handleMove}
            title="Quản lý sản phẩm"
            miniTitle={`Tổng: ${quantity} sản phẩm`}
          />
          {/* data */}
          <div className="flex-1 bg-white shadow rounded-xl py-1 px-4">
            {/* categy */}
            <div className="flex text-secondary gap-5 h-15 items-center font-bold">
              <div className=" py-1 px-3 rounded-md bg-primary text-white ">
                Tất cả
              </div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Giò</div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Chả</div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Nem</div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Khác</div>
            </div>
            {/* table */}

            <div className="pt-3 mt-2 font-medium overflow-y-auto max-h-[calc(98vh-250px)]">
              {!quantity ? (
                <div>Danh sách rỗng</div>
              ) : (
                <table className="w-full table-fixed">
                  <thead className="text-left">
                    <tr className="border-b border-gray-200">
                      <th className="w-[40%] py-2">Sản phẩm</th>
                      <th className="w-[10%]">Danh mục</th>
                      <th className="w-[10%]">Giá</th>
                      <th className="w-[10%]">Tồn kho</th>
                      <th className="w-[20%]">Trạng thái</th>
                      <th className="w-[10%]">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {foods.map((food) => {
                        return (
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-linear"
                            key={food.foodId}
                          >
                            <td className="py-2">
                              <div className="flex items-center gap-1">
                                <img
                                  src={productPicture}
                                  alt="Ảnh sp"
                                  className="w-12 h-12 rounded-xl object-cover"
                                />
                                <div>
                                  <p>{food.foodName}</p>
                                  <p className="text-[12px] text-secondary font-normal">
                                    {/* Giò lụa cao cấp từ thịt heo nạc tươi... */}
                                    {food.foodDescription}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="bg-green-200 text-center w-[50%] text-sm rounded-2xl text-primary">
                                {food.categoryName}
                              </div>
                            </td>
                            <td>{formatMoney(food.price)}</td>
                            <td>{food.stock} kg</td>
                            <td>
                              {food.isActive ? (
                                <div className="flex bg-green-200 w-[50%] justify-center items-center gap-1 text-primary py-1 rounded-2xl text-[14px]">
                                  <VisibilityOutlinedIcon />
                                  <p>Đang bán</p>
                                </div>
                              ) : (
                                <div className="flex bg-gray-200 w-[50%] justify-center items-center gap-1 text-gray-700 py-1 rounded-2xl text-[14px]">
                                  <VisibilityOffOutlinedIcon />
                                  <p>Tạm ẩn</p>
                                </div>
                              )}
                            </td>
                            <td>
                              <div className="flex items-center gap-3">
                                <button>
                                  <EditOutlinedIcon className="text-blue-800 cursor-pointer active:scale-95" />
                                </button>
                                <button
                                  onClick={() => handleDelete(food.foodId)}
                                >
                                  <DeleteForeverOutlinedIcon className="text-red-800 cursor-pointer active:scale-95" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
