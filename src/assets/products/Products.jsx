import React, { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]); // لتخزين المنتجات المفتوحة

  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((eid) => eid !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  if (loading) {
    return <div className="container my-5">Loading products...</div>;
  }

  if (error) {
    return <div className="container my-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {products.map((ele) => {
          const isExpanded = expandedIds.includes(ele.id);
          return (
            <div className="col-md-4 mb-4 d-flex align-items-stretch" key={ele.id}>
              <div className="card w-100 text-center shadow-sm">
                <img
                  src={ele.image}
                  alt={ele.title}
                  className="card-img-top p-3"
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{ele.title}</h5>
                  <p className="card-text text-muted">${ele.price.toFixed(2)}</p>

                  {isExpanded && (
                    <>
                      <p className="card-text" style={{ fontSize: '0.9rem' }}>
                        {ele.description}
                      </p>
                      <p className="card-text">
                        <small className="text-secondary">{ele.category}</small>
                      </p>
                      <p className="card-text">
                        Rating: {ele.rating.rate} ⭐ ({ele.rating.count} reviews)
                      </p>
                    </>
                  )}

                  <button
                    onClick={() => toggleExpand(ele.id)}
                    className="btn btn-sm btn-primary mt-auto"
                  >
                    {isExpanded ? 'Hide details' : 'Show details '}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
