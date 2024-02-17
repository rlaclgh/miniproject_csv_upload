import { useGetProducts } from "@/query/product";
import Product from "./product";

const Products = () => {
  const { data: products } = useGetProducts();

  if (!products) return <div>loading.....</div>;
  if (products.length === 0) return <div>제품이 없습니다.</div>;

  return (
    <>
      {products.map((product) => {
        return <Product {...product} key={product.id} />;
      })}
    </>
  );
};

export default Products;
