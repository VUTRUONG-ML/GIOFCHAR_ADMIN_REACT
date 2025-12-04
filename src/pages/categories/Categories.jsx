import { useEffect, useState } from "react";
import { SubTitle } from "../../components/SubTitle";
import { CategoryCard } from "./CategoryCard";
import categoriesApi from "../../api/categoriesApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ModelCategory } from "./ModalCategory";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [quantityCategory, setQuantityCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadCategories = async () => {
      setLoading(true);
      try {
        const response = await categoriesApi.getCategories(controller.signal);
        setCategories(response.data?.categories);
        setQuantityCategory(response.data?.quantity);
      } catch (error) {
        if (error.name === "CanceledError") return;
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadCategories();

    return () => controller.abort();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {quantityCategory === 0 ? (
        <div>Danh sách danh mục rỗng</div>
      ) : (
        <>
          {/*subTitle */}
          <SubTitle
            active
            nameActive="danh mục"
            handleMove={() => setOpenAddModal(true)}
            title="Quản lý danh mục"
            miniTitle={`Tổng: ${quantityCategory} danh mục`}
          />
          {/* data */}
          <div className="flex-1 grid grid-cols-3 gap-5  py-1 px-4 overflow-y-auto max-h-[calc(98vh-180px)]">
            {categories.map((category) => {
              return (
                <CategoryCard
                  key={category.categoryID}
                  category={category}
                  setCategories={setCategories}
                  categories={categories}
                />
              );
            })}
          </div>
        </>
      )}
      {openAddModal && (
        <ModelCategory
          onClose={() => setOpenAddModal(false)}
          nameBtnSubmit={"Tạo"}
        />
      )}
    </>
  );
}
