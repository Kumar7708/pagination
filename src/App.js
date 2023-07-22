import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };

  const selectPagehandler = (i) => {
    if (i >= 1 && i <= totalPages && i !== page) setPage(i);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      {products.length && (
        <div className="products">
          {products.map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length && (
        <div className="pagination">
          <span
            onClick={() => selectPagehandler(page - 1)}
            className={page > 1 ? "" : "pagination__disabled"}
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPagehandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPagehandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disabled"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
