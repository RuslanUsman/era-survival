import React, { useState } from 'react';
import { useCart } from './CartContext';
import './CartPage.css';

function CartPage() {
    const { cart, removeFromCart } = useCart(); // Получаем данные и функции корзины
    const [accountId, setAccountId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Подсчет общей стоимости
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Логика оформления заказа
    const handleOrderSubmit = async () => {
        setError('');
        setSuccess(false);

        // Проверка ввода ID аккаунта
        if (!accountId) {
            setError('Пожалуйста, введите ID игрового аккаунта.');
            return;
        }
        if (!/^\d+$/.test(accountId)) {
            setError('ID должен содержать только цифры.');
            return;
        }

        // Формирование сообщения для Telegram
        const message = `
Заказ оформлен!
ID игрового аккаунта: ${accountId}

Товары:
${cart
    .map(
        (item) =>
            `Название: ${item.name}
Описание: ${item.description}
Цена за единицу: ${item.price} руб.
Количество: ${item.quantity}
Сумма: ${item.price * item.quantity} руб.
Ссылка на изображение: ${process.env.PUBLIC_URL}${item.image}
---------------------`
    )
    .join('\n')}

Общая стоимость: ${totalPrice} руб.
        `;

        // Массив ID чатов
        const chatIds = ['5930230795', '389746882', '6008153078']; // Замените на ваши ID чатов

        try {
            const botToken = '8119819639:AAGSGevmAnNUG1qx_zssw-al6HG-s2XvikY'; // Укажите токен вашего Telegram-бота
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

            // Отправка сообщения в каждый чат
            for (const chatId of chatIds) {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Ошибка при отправке в чат ${chatId}`);
                }
            }

            setSuccess(true); // Показываем сообщение об успехе
        } catch (err) {
            setError('Не удалось отправить заказ в один или несколько чатов. Попробуйте снова.');
        }
    };

    return (
        <div className="cart-page">
            <h1>Корзина</h1>
            {cart.length > 0 ? (
                <div className="grid-container">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            {/* Корректное отображение изображения */}
                            <img
                                src={`${process.env.PUBLIC_URL}${item.image}`}
                                alt={item.name}
                                onError={(e) => {
                                    console.error(`Ошибка загрузки изображения: ${item.image}`);
                                    e.target.src = `${process.env.PUBLIC_URL}/images/default.jpg`; // Картинка по умолчанию
                                }}
                            />
                            <div className="item-details">
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <p>Цена за единицу: {item.price} руб.</p>
                                <p>Количество: {item.quantity}</p>
                                <p>Сумма: {item.price * item.quantity} руб.</p>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(item.id)} // Удаление товара
                                >
                                    🗑️ Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                    <h2 className="total-price">Общая стоимость: {totalPrice} руб.</h2>
                    <div className="order-section">
                        <input
                            type="text"
                            value={accountId}
                            placeholder="Введите ID игрового аккаунта"
                            onChange={(e) => setAccountId(e.target.value)}
                        />
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">Заказ успешно оформлен!</div>}
                        <button onClick={handleOrderSubmit} className="order-button">
                            Оформить заказ
                        </button>
                    </div>
                </div>
            ) : (
                <p>Ваша корзина пуста.</p>
            )}
        </div>
    );
}

export default CartPage;


