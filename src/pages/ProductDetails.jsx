import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductDetails = () => {

    const [product,setProduct] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
           
     useEffect(() => {
        const foundProduct = getProductById(id);

        if (!foundProduct) {
            navigate("/");
            return;
        }

        setProduct(foundProduct);
    }, [id]);

    if(!product){
       return <h1>Loading...</h1>
    }

    const {addToCart,cartItems} = useCart();
    const itemIntheCart = cartItems?cartItems.find((item)=>item.id === product.id):'';
    const itemCountIntheCart = itemIntheCart? itemIntheCart.quantity:0;

    return (
        <div className='page'>
            <div className="container">
                {product && (
                    <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-detail-content">
                        <h1 className="product-detail-name">{product.name}</h1>
                        <p className="product-price">{product.price}</p>
                        <p className="product-description">{product.description}</p>
                        <button className='btn btn-primary' onClick={()=>addToCart(product.id)}>Add to Cart  {itemCountIntheCart ? `(${itemCountIntheCart})`:''}</button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
