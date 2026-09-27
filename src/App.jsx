import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Get unique product categories
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category))
  ];

  // Search + category filtering
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">

      <Header />

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        {categories.map((categoryName) => (
          <option key={categoryName} value={categoryName}>
            {categoryName === "all"
              ? "All Categories"
              : categoryName}
          </option>
        ))}
      </select>

      {/* Loading */}
      {loading && (
        <p className="status-message">
          Loading products...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {/* Selected Product */}
      {selectedProduct && (
        <div className="selected-product">

          <h2>{selectedProduct.title}</h2>

          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
          />

          <p>{selectedProduct.description}</p>

          <h3>${selectedProduct.price}</h3>

          <button
            onClick={() => setSelectedProduct(null)}
          >
            Close
          </button>

        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <div className="product-grid">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={setSelectedProduct}
            />
          ))}

        </div>
      )}

      {/* No Results */}
      {!loading &&
        !error &&
        filteredProducts.length === 0 && (
          <p className="status-message">
            No products found.
          </p>
        )}

    </div>
  );
}

export default App;