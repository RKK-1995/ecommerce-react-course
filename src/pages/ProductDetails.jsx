import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../data/products';

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
                        <button className='btn btn-primary' onClick={""}>Add to Cart</button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
