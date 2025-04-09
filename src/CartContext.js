import React, { createContext, useContext, useState } from 'react';

// Создаём контекст корзины
const CartContext = createContext();

// Провайдер контекста корзины
export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    // Функция для добавления товара в корзину
    const addToCart = (product, quantity) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
        setTotalItems((prevTotal) => prevTotal + quantity); // Увеличиваем общее количество товаров
    };

    // Функция для удаления товара из корзины
    const removeFromCart = (itemId) => {
        const item = cart.find((item) => item.id === itemId);
        if (item) {
            setCart((prevCart) => prevCart.filter((item) => item.id !== itemId)); // Удаляем товар
            setTotalItems((prevTotal) => prevTotal - item.quantity); // Уменьшаем общее количество товаров
        }
    };

    // Возвращаем контекст
    return (
        <CartContext.Provider value={{ cart, totalItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

// Хук для удобного доступа к контексту корзины
export function useCart() {
    return useContext(CartContext);
}
