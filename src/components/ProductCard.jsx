function ProductCard({ product, onViewProduct }) {
  return (
    <div className="product-card">

      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-image"
      />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <div className="product-info">
        <span className="price">${product.price}</span>
        <span className="rating">⭐ {product.rating}</span>
      </div>

      <button onClick={() => onViewProduct(product)}>
        View Product
      </button>

    </div>
  );
}

export default ProductCard;