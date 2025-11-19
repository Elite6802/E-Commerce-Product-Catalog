import { useEffect } from "react";
import Filters from "../features/products/Filters";
import ProductsList from "../features/products/ProductsList";
import { useAppDispatch } from "../app/hooks";
import { loadAllProducts, loadCategories } from "../features/products/productsSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadAllProducts());
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <Filters />
          </div>
        </aside>
        <section className="md:col-span-3">
          <ProductsList />
        </section>
      </div>
    </div>
  );
}
