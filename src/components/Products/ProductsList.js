import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './ProductsList.module.css';

const ProductsList = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate the total price when products change
    let sum = 0;
    for (const product of props.Products) {
      sum += parseFloat(product.sellingPrice);
    }
    setTotalPrice(sum);
  }, [props.Products]);

  const deleteProductHandler = (productId) => {
    const updatedProducts = props.Products.filter((product) => product.productId !== productId);
    props.onDeleteProduct(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <Card className={classes.Products}>
      <div><strong>Product List:</strong></div>
      <ul>
        {props.Products.map((product) => (
          <li key={product.productId}>
            ({product.productId}.) {product.name} {product.sellingPrice}
            <button onClick={() => deleteProductHandler(product.productId)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        Total Price: Rs {totalPrice.toFixed(2)}
      </div>
    </Card>
  );
};

export default ProductsList;
