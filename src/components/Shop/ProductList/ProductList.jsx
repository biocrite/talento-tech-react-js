import { SingleItem } from "@components";
import "./ProductList.css";

export function ProductList({ products }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <SingleItem product={product} ></SingleItem>
        </li>
      ))}
    </ul>
  );
}