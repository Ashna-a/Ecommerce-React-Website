import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";

const CartContext = createContext();

export default function CartProvider({children}) {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (productId) => {
        const existing = cartItems.find((item) => item.id === productId);
        if(existing) {
            const currentQuantity = existing?.quantity;
            const updatedCart = cartItems?.map((item) => item.id === productId ? {id: productId, quantity: currentQuantity + 1} : item);
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, {id: productId, quantity: 1}])
        }
    }

    const getCartItemsWithProducts =() => {
        return cartItems
            .map((item) => ({
                ...item,
                product: getProductById(item.id),
            }))
    }

    const removeFromCart = (productId) => {
        setCartItems(cartItems?.filter((item) => item.id !== productId));

    }

    const  updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(
            cartItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    }

    const getCartTotal = () => {
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
        return total;
    }

    const clearCart = () => {
         setCartItems([]);
    }

    return <CartContext.Provider value={{cartItems, addToCart, getCartItemsWithProducts, updateQuantity, removeFromCart, getCartTotal, clearCart}}> {children} </CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}