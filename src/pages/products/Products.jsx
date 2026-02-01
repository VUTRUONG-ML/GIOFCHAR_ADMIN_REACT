import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import { SubTitle } from "../../components/SubTitle";
import { useEffect, useState } from "react";
import foodsApi from "../../api/foodsApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useConfirm } from "../../contexts/ConfirmContext";
import { useLoader } from "../../contexts/LoaderContext";
import { VariantDrawer } from "./VariantDrawer";

export default function Products() {
  const { confirm } = useConfirm();
  const { setLoading } = useLoader();

  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [foodVariant, setFoodVariant] = useState({
    foodId: 1,
    foodName: "Xúc xích",
  });

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
    const ok = await confirm({
      title: "Xác nhận xóa sản phẩm!",
      message: "Bạn có chắc chắn muốn xóa sản phẩm này?",
    });
    if (!ok) return;
    setLoading(true);
    try {
      await foodsApi.deleteFood(foodId);

      setFoods(foods.filter((food) => food.foodId !== foodId));

      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      if (error.status === 400) {
        toast.warn("Sản phẩm còn tồn tại trong đơn hàng!");
      }
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleMove = () => navigate("/admin/products/create");
  const updateProduct = (foodId) => {
    navigate(`/admin/products/update/${foodId}`);
  };
  const handleOpenDraw = (foodId, foodName) => {
    setOpenDrawer(true);
    setFoodVariant({ foodId, foodName });
  };

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
            <div className=" font-medium overflow-y-auto max-h-[calc(98vh-260px)]">
              {!quantity ? (
                <div>Danh sách rỗng</div>
              ) : (
                <table className="w-full table-fixed">
                  <thead className="text-left">
                    <tr className="border-b border-gray-200">
                      <th className="w-[30%] py-2">Sản phẩm</th>
                      <th className="w-[10%]">Danh mục</th>
                      <th className="w-[10%]">Rating</th>
                      <th className="w-[20%]">Thành phần</th>
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
                                  src={food.image}
                                  alt="Ảnh sp"
                                  className="w-12 h-12 rounded-xl object-cover"
                                />
                                <div>
                                  <p>{food.foodName}</p>
                                  <p className="text-[12px] text-secondary font-normal truncate max-w-[220px]">
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
                            <td>
                              {food.rating ? (
                                <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                                  <span>
                                    <StarBorderPurple500OutlinedIcon />
                                  </span>
                                  <span>{food.rating.toFixed(1)}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">
                                  Chưa có
                                </span>
                              )}
                            </td>
                            <td>
                              {food.ingredients?.length ? (
                                <div className="flex flex-wrap gap-1 max-w-[220px]">
                                  {food.ingredients
                                    .slice(0, 3)
                                    .map((ing, idx) => (
                                      <span
                                        key={idx}
                                        className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                                      >
                                        {ing}
                                      </span>
                                    ))}
                                  {food.ingredients.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                      +{food.ingredients.length - 3}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">—</span>
                              )}
                            </td>

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
                                <button
                                  onClick={() =>
                                    handleOpenDraw(food.foodId, food.foodName)
                                  }
                                  title="Quản lý variant"
                                  className="text-gray-700 hover:text-primary cursor-pointer active:scale-95"
                                >
                                  <ViewSidebarOutlinedIcon />
                                </button>
                                <button
                                  onClick={() => updateProduct(food.foodId)}
                                >
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
          <VariantDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            foodName={foodVariant.foodName}
            foodId={foodVariant.foodId}
          />
        </>
      )}
    </>
  );
}
