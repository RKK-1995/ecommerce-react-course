import React from 'react'
import { useCart } from '../context/CartContext';

 const Checkout = () => {

 const {getCartItemsWithProduct,removeFromCart ,updateItemQuantity,getCartTotal,clearCart} = useCart();
 const cartProducts = getCartItemsWithProduct();  
 const total = getCartTotal();

 function placeOrder(){
  alert('Successful Order');
  clearCart();
 }

  return (
    <div className='page'>
      <div className="container">
        <h1 className="page-title">
          Checkout
        </h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {
             cartProducts && cartProducts.map((item)=>
              (
                <div className="checkout-item" key={item.id}>
                  <img src={item.product.image} alt={item.product.name} className='checkout-item-image' />

                  <div className="checkout-item-details">
                    <h3 className="checkout-item-name">{item.product.name}</h3>
                    <p className="checkout-item-price">
                      ${item.product.price} each
                    </p>
                  </div>

                  <div className="checkout-item-controls">
                    <div className="quantity-controls">
                        <button className="quantity-btn" onClick={()=>updateItemQuantity(item.id,item.quantity+1)}>+</button>
                        <span className='quantity-value'>{item.quantity}</span>
                        <button className="quantity-btn"  onClick={()=>updateItemQuantity(item.id,item.quantity-1)}>-</button>
                    </div>

                     <div className="checkout-item-total">
                      $ {(item.product.price * item.quantity).toFixed(2)}
                      </div>

                      <button className="btn btn-secondary btn-small" onClick={()=>removeFromCart(item.id)}>
                        Remove
                      </button>
                  </div>
                </div>
                
              )
              )
            }
          </div>
          <div className="checkout-summary">
            <h2 className="checkout-section-title">
              Cart Total
            </h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value">${total.toFixed(2)}</p>
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value checkout-total-final">
                ${total.toFixed(2)}
              </p>
            </div>
            <button
              className="btn btn-primary btn-large btn-block"
              onClick={()=>placeOrder()}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Checkout;




