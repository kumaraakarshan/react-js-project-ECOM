import React, { useRef, useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';
import classes from './AddProduct.module.css';

const AddProduct = (props) => {
  const nameInputRef = useRef();
  const ProductIdInputRef = useRef();
  const SellingPriceRef = useRef();

  const [error, setError] = useState();

  const addProductHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredProductId = ProductIdInputRef.current.value;
    const enteredSellingPrice = SellingPriceRef.current.value;

    if (
      enteredName.trim().length === 0 ||
      enteredProductId.trim().length === 0 ||
      enteredSellingPrice.trim().length === 0
    ) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name, ProductId, and Selling Price (non-empty values).',
      });
      return;
    }
    if (+enteredProductId < 1) {
      setError({
        title: 'Invalid ProductId',
        message: 'Please enter a valid ProductId (> 0).',
      });
      return;
    }

    // Create a new product object
    const newProduct = {
      name: enteredName,
      productId: enteredProductId,
      sellingPrice: enteredSellingPrice,
      id: Math.random().toString(),
    };

    // Save the entered data to local storage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = [...storedProducts, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Clear input fields
    nameInputRef.current.value = '';
    ProductIdInputRef.current.value = '';
    SellingPriceRef.current.value = '';

    // Fetch products from local storage after saving
    props.onFetchProducts(updatedProducts);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addProductHandler}>
          <label htmlFor="Productname">Productname</label>
          <input id="Productname" type="text" ref={nameInputRef} />
          <label htmlFor="ProductId">ProductId</label>
          <input id="ProductId" type="number" ref={ProductIdInputRef} />
          <label htmlFor="SellingPrice">SellingPrice</label>
          <input id="SellingPrice" type="text" ref={SellingPriceRef} />
          <Button type="submit">Add Product</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddProduct;
