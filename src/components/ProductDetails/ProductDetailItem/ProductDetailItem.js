import React, { useState } from 'react';

import './ProductDetailItem.css';

const ProductDetailItem = (props) => {
  const [deleteText, setDeleteText] = useState('');

  const deleteHandler = () => {
    setDeleteText('(Deleted!)'); // Set the delete text when the item is deleted
    props.onDelete(props.id);
  };

  return (
    <li className="goal-item" onClick={deleteHandler}>
      {props.children} {deleteText}
    </li>
  );
};

export default ProductDetailItem;
