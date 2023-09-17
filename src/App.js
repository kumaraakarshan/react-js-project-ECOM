import React, { useState, useEffect, Fragment } from 'react';
import AddProduct from './components/Products/AddProduct';
import ProductsList from './components/Products/ProductsList';

function App() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const fetchProductsFromLocalStorage = (products) => {
    setProducts(products);
  };

  const deleteProductHandler = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  return (
    <Fragment>
      <AddProduct onFetchProducts={fetchProductsFromLocalStorage} />
      <ProductsList Products={Products} onDeleteProduct={deleteProductHandler} />
    </Fragment>
  );
}

export default App;
