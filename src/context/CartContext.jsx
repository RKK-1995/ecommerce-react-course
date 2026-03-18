import { createContext, useState,useContext } from 'react';
import { getProductById } from "../data/products";


export  const CartContext = createContext(null);

export default function CartProvider({children}){
    const [cartItems,setCartItems] = useState([]);

    function addToCart(productId){
        const existing =cartItems? cartItems.find((item) => item.id === productId):null;
        if(existing){
            const currentQty = existing.quantity;
           const updatedCartItems = cartItems.map((item) =>
                item.id === productId
                ? { id: productId, quantity: currentQty + 1 }
                : item
            );
            setCartItems(updatedCartItems);
        }else{
            setCartItems([...cartItems, { id: productId, quantity: 1 }]);
        }
    }

    function getCartItemsWithProduct(){
        const cartItemswithProduct =cartItems
                        .map((item) => ({
                            ...item,
                            product: getProductById(item.id),
                        }))
                        .filter((item) => item.product);
        return cartItemswithProduct;
    }

    function removeFromCart(productId){
        setCartItems(cartItems.filter((item)=> item.id !== productId));
    }

    function updateItemQuantity(productId,quantity){
        if(quantity<1){
            removeFromCart(productId);
            return;
        }

        setCartItems(cartItems.map((item)=>
            item.id ===productId ? { ...item,quantity}:item
        ));
    }

    function getCartTotal(){
      const cartTotal =  getCartItemsWithProduct()
            .filter(item => item.product) 
            .reduce((total, item) => { 
                return total + (item.product.price * item.quantity);
            }, 0);
        return cartTotal;
    }

    function clearCart(){
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{
                addToCart,
                cartItems,
                getCartItemsWithProduct,
                removeFromCart,
                updateItemQuantity,
                getCartTotal,
                clearCart
            }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
 return useContext(CartContext);
}