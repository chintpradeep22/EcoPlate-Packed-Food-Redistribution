.admin-list-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

.admin-list-heading {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
}

.admin-search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.admin-search-bar input {
  width: 100%;
  max-width: 400px;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s ease;
}

.admin-search-bar input:focus {
  border-color: #007bff;
}

.admin-list-scroll {
  max-height: 75vh;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fafafa;
}

.admin-grid-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
}

.admin-product-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.admin-product-card:hover {
  transform: translateY(-5px);
}

.admin-product-image-container {
  width: 100%;
  padding-top: 66.66%; /* 3:2 Aspect Ratio */
  position: relative;
  background: #f4f4f4;
}

.admin-product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.admin-product-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.admin-product-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
}

.admin-product-info,
.admin-product-mfg,
.admin-product-exp {
  font-size: 0.9rem;
  color: #555;
}

.admin-product-price {
  font-size: 1rem;
  font-weight: 500;
  color: #e63946;
}

.admin-product-price s {
  color: #aaa;
  margin-right: 6px;
}

.admin-delete-btn {
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 0 0 12px 12px;
  padding: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.admin-delete-btn:hover {
  background-color: #c12738;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.admin-list-status.no-more {
  text-align: center;
  margin: 1rem 0;
  color: #888;
}

/* Tablet Adjustments */
@media (max-width: 1050px) {
  .admin-product-card {
    max-width: 45%;
  }

  .admin-product-title {
    font-size: 1rem;
  }

  .admin-product-info {
    font-size: 0.85rem;
  }
}

/* Mobile View */
@media (max-width: 750px) {
  .admin-list-container {
    padding: 1rem 0.5rem;
  }

  .admin-search-bar input {
    width: 90%;
    font-size: 0.95rem;
  }

  .admin-product-card {
    max-width: 100%;
  }

  .admin-product-title {
    font-size: 1rem;
  }

  .admin-product-info,
  .admin-product-mfg,
  .admin-product-exp,
  .admin-product-price {
    font-size: 0.82rem;
  }

  .admin-delete-btn {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
}
