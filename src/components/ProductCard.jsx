import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({product}) => {
  const {addToCart,cartItems} = useCart();
  const itemIntheCart = cartItems?cartItems.find((item)=>item.id === product.id):'';
  const itemCountIntheCart = itemIntheCart? itemIntheCart.quantity:0;
  return (
    <div className='product-card' >
        <img src= {product.image} alt={product.name} className='product-card-image'/>
        <div className='product-card-content'>
            <h3 className='product-card-name'>{product.name}</h3>
            <p className='product-card-price'>${product.price}</p>
            <div className='product-card-actions'>
                <Link to={`/product/${product.id}`} className='btn btn-secondary'>View Details</Link>
                <button className='btn btn-primary' onClick={()=>addToCart(product.id)}>Add to Cart {itemCountIntheCart >0 ? `(${itemCountIntheCart})`:''}</button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard;