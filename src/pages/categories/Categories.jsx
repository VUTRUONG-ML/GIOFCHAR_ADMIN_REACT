import { SubTitle } from "../../components/SubTitle";
import { CategoryCard } from "./CategoryCard";
export default function Categories() {
  return (
    <>
      {/*subTitle */}
      <SubTitle
        active
        nameActive="danh mục"
        handle={() => {}}
        title="Quản lý danh mục"
        miniTitle="Tổng: 4 danh mục"
      />
      {/* data */}
      <div className="flex-1 grid grid-cols-3 gap-5  py-1 px-4">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </>
  );
}
