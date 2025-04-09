import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductsPage.css';
import { useCart } from './CartContext'; // Предполагается, что вы используете контекст корзины

const productsData = {
    maps: [
        { id: 1, name: 'Зеленая карта', description: 'Описание зеленой карты.', price: 10, image: '/images/green.png' },
        { id: 2, name: 'Синяя карта', description: 'Описание синей карты.', price: 20, image: '/images/blue.png' },
        { id: 3, name: 'Фиолетовая карта', description: 'Описание фиолетовой карты.', price: 30, image: '/images/purple.png' },
        { id: 4, name: 'Резистор', description: 'Описание резистора.', price: 30, image: '/images/rezis.png' },
    ],


    sets: [
        { id: 5, name: 'Сет 1', description: 'Фул костянка, СМГ, Калиматор, 500 патр.', price: 70, image: '/images/set1.png' },
        { id: 6, name: 'Сет 2', description: 'Фул костянка, СМГ, УЗИ, Калиматор, 500 патр.', price: 90, image: '/images/set2.png' },
        { id: 7, name: 'Сет 3', description: 'Фул костянка, ФАМАС, УЗИ, Калиматор, 500 патр.', price: 110, image: '/images/set3.png' },
        { id: 8, name: 'Сет 4', description: 'Фул железко, ФАМАС, УЗИ, Калиматор, 500 патр', price: 130, image: '/images/set4.png' },
        { id: 9, name: 'Сет 5', description: 'Спустя 3 часа Фул железко, СКАР, Калиматор, 500 патр 7,62', price: 150, image: '/images/set5.png' },
    ],

    explosion: [
        { id: 10, name: 'Руда Серо (10к)', description: 'Доступно в начале вайпа.', price: 30, image: '/images/sero.png' },
        { id: 11, name: 'Плавленное Серо (10к)', description: 'Доступно в начале вайпа.', price: 40, image: '/images/serosplav.png' },
        { id: 12, name: 'уголь (10к)', description: 'Доступно в начале вайпа.', price: 40, image: '/images/ugl.png' },
        { id: 13, name: 'Бобовка (10 шт)', description: 'Доступно в начале вайпа', price: 50, image: '/images/bb.png' },
        { id: 14, name: 'Экспа (1 шт)', description: 'Доступно в начале вайпа', price: 80, image: '/images/expa.png' },
        { id: 15, name: 'Порох (5к)', description: 'Доступно в начале вайпа', price: 150, image: '/images/gunpowder.png' },
        { id: 15, name: 'Динамит (1шт)', description: 'Спустя 6 часов', price: 100, image: '/images/dino.png' },
        { id: 17, name: 'Динамит (10шт)', description: 'Спустя 24 часов', price: 120, image: '/images/dino.png' },
        { id: 18, name: 'С4 (10шт)', description: 'Спустя 24 часов', price: 130, image: '/images/c4.png' },
        { id: 19, name: 'Ракета (10 шт)', description: 'Спустя 24 часов', price: 100, image: '/images/rocket.png' },
        { id: 20, name: 'Гексоген (1 шт)', description: 'Спустя 48 часов', price: 300, image: '/images/giksogen.png' },
    ],


    additionally: [
        { id: 21, name: 'Экстра (1 шт)', description: 'Доступно в начале вайпа.', price: 30, image: '/images/extra.png' },
        { id: 22, name: 'Экстра (5 шт)', description: 'Доступно в начале вайпа.', price: 130, image: '/images/extra.png' },
        { id: 23, name: 'Перчатка(Энерго руда)', description: 'Доступно в начале вайпа.', price: 100, image: '/images/energobur.png' },
    ],


    components: [
        { id: 24, name: 'Корпус (1 шт)', description: 'Обязательные материалы для изготовления транспорта', price: 44, image: '/images/corpus-Photoroom.png' },
        { id: 25, name: 'Железные листы (10 шт)', description: 'Материалы,необходимые для изготовления некоторых обьектов.', price: 35, image: '/images/sheet.png' },
        { id: 26, name: 'Механическая шестерня (10 шт)', description: 'материалы для изготовления транспорта, обьектов.', price: 35, image: '/images/gear.png' },
        { id: 27, name: 'Бечевка (10 шт)', description: 'Материалы,необходимые для изготовление некоторых обьектов', price: 20, image: '/images/bech-Photoroom.png' },
        { id: 28, name: 'Электронная деталь (10 шт)', description: 'Базовые материалы для обьектов цепи', price: 44, image: '/images/file_13.png' },
        { id: 29, name: 'Металлический патрон (10 шт)', description: 'материалы для изготовления стрелкового оружия', price: 35, image: '/images/file_23.png' },
        { id: 30, name: 'Пружина кручения (10шт)', description: 'материалы для изготовления стрелкового оружия', price: 35, image: '/images/file_24.png' },
        { id: 31, name: 'Корпус автомата (1 шт)', description: 'материалы для изготовления стрелкового оружия', price: 44, image: '/images/corpakm-Photoroom.png' },
        { id: 32, name: 'Пусковая установка (1 шт)', description: 'материалы для изготовления стрелкового оружия', price: 30, image: '/images/pusc-Photoroom.png' },
        { id: 33, name: 'Лезвие (10 шт)', description: 'Необходимые материалы для оружия ближнего боя', price: 20, image: '/images/lezv-Photoroom.png' },
        { id: 34, name: 'Иголка с ниткой (10 шт)', description: 'Материалы,необходимые для изготовления некоторой брони', price: 20, image: '/images/nit-Photoroom.png' },
    ],


    buildings: [
        { id: 35, name: 'Шар (1 шт)', description: 'Основание для крепления автоматческой турели.', price: 25, image: '/images/char.png' },
        { id: 36, name: 'Большая плавильня печь (1 шт)', description: 'Может перерабатывать различную руду и древесину .', price: 30, image: '/images/p1-Photoroom.png' },
        { id: 37, name: 'Установка автоматичемкой винтовки (1 шт)', description: 'Бой/ловушка.', price: 40, image: '/images/turrets2.png' },
        { id: 38, name: 'Топ турель (1 шт)', description: 'Бой/ловушка.', price: 60, image: '/images/topturrets.png' },
        { id: 39, name: 'Переработчик нефьти (1 шт)', description: 'Можно переработать нефть', price: 50, image: '/images/oil1-Photoroom.png' },
        { id: 40, name: 'Основное контрольное (1 шт)', description: 'Источник для восстановления стен(пауков)', price: 50, image: '/images/en1-Photoroom.png' },
        { id: 41, name: 'Титан печь (1шт)', description: 'доступно Спустя 6 часов', price: 300, image: '/images/ttbake.png' },
        { id: 42, name: 'Реактор (1шт)', description: 'Спустя 24 часов', price: 50, image: '/images/reactor-Photoroom.png' },
        { id: 43, name: 'Паук (1 шт)', description: 'Спустя 24 часов', price: 20, image: '/images/pauk-Photoroom.png' },
        { id: 44, name: 'Тэсла (1 шт)', description: 'Спустя 24 часов', price: 150, image: '/images/electro-Photoroom.png' },
        { id: 45, name: 'Оборудование для переработки Энергоруды (1 шт)', description: 'Спустя 24 часов', price: 150, image: '/images/energyfurnace.png' },
    ],


    weapon: [
        { id: 46, name: 'СМГ (1 шт)', description: 'Доступно в начале вайпа.', price: 25, image: '/images/file_57.png' },
        { id: 47, name: 'УЗИ письолет автоматическое (1 шт)', description: 'Доступно в начале вайпа.', price: 35, image: '/images/uzi.png' },
        { id: 48, name: 'ФАМАС (1 шт)', description: 'Доступно в начале вайпа.', price: 35, image: '/images/famas.png' },
        { id: 49, name: 'Полуавтоматическая винтовка (1 шт)', description: 'Доступно в начале вайпа', price: 25, image: '/images/5454048634569092974-Photoroom.png' },
        { id: 50, name: 'Калиматор (1 шт)', description: 'Доступно в начале вайпа', price: 11, image: '/images/calimator.png' },
        { id: 51, name: '2-кратный прицел (1 шт)', description: 'Доступно в начале вайпа', price: 20, image: '/images/5454048634569092976-Photoroom.png' },
        { id: 52, name: 'Фул костянка (1 комплект)', description: 'Доступно в начале вайпа', price: 20, image: '/images/file_36.png' },
        { id: 53, name: 'Фул железка (1 комплект)', description: 'Доступно Спустя 3 часов', price: 35, image: '/images/file_40.png' },
        { id: 54, name: 'Маска 2-уровня (1 шт)', description: 'Доступно в начале вайпа', price: 20, image: '/images/maska.png' },

        { id: 55, name: 'Скар (1 шт)', description: 'Доступно Спустя 3 часов', price: 50, image: '/images/scar.png' },
        { id: 56, name: 'Марксманская винтовка (1 шт)', description: 'Доступно Спустя 3 часов', price: 35, image: '/images/minik.png' },
        { id: 57, name: 'Боевой дробовик (1 шт)', description: 'Доступно Спустя 3 часов', price: 35, image: '/images/5454048634569092975-Photoroom.png' },

        { id: 58, name: 'Винтовка М762 (1 шт)', description: 'Доступно Спустя 24 часа.', price: 50, image: '/images/m76.png' },
        { id: 59, name: 'Автомат АКМ (1 шт)', description: 'Доступно Спустя 24 часа', price: 50, image: '/images/akm.png' },
        { id: 60, name: 'Винтовка QBZ (1 шт)', description: 'Доступно Спустя 24 часа', price: 50, image: '/images/gbz.png' },
        { id: 61, name: 'Винтовка М4 (1 шт)', description: 'Доступно Спустя 24 часа', price: 50, image: '/images/m4.png' },
        { id: 62, name: 'Лютая базука РПГ (1 шт)', description: 'Доступно Спустя 24 часа', price: 80, image: '/images/rpg.png' },
        { id: 63, name: '4-кратный прицел (1 шт)', description: 'Доступно Спустя 24 часа', price: 20, image: '/images/x4.png' },
        { id: 64, name: 'Фул МВК (1 комплект)', description: 'Доступно Спустя 24 часа', price: 60, image: '/images/file_43.png' },
        { id: 65, name: 'Фул титан (1 комплект)', description: 'Доступно Спустя 24 часа', price: 90, image: '/images/file_47.png' },
        { id: 66, name: 'Энергоброня фул (1 комплект)', description: 'Доступно Спустя 3-ех дней', price: 200, image: '/images/file_51.png' },
    ],


    resources: [
        { id: 67, name: 'Дерево (20к)', description: 'Доступно в начале вайпа.', price: 20, image: '/images/file_0.png' },
        { id: 68, name: 'Ткань (1к)', description: 'Доступно в начале вайпа.', price: 335, image: '/images/cloth.png' },
        { id: 69, name: 'Шкура (1к)', description: 'Доступно в начале вайпа.', price: 35, image: '/images/file_29.png' },
        { id: 70, name: 'Камень (20к)', description: 'Доступно в начале вайпа', price: 30, image: '/images/file_1.png' },
        { id: 71, name: 'Железная руда (10к)', description: 'Доступно в начале вайпа', price: 24, image: '/images/file_5.png' },
        { id: 72, name: 'Руда МВК (500 шт)', description: 'Спустя 3 часов', price: 100, image: '/images/file_62.png' },
        { id: 73, name: 'Титан руда (500 шт)', description: 'Спустя 6 часов', price: 200, image: '/images/file_9.png' },
        { id: 74, name: 'Деталь-скрап (1к)', description: 'Спустя 6 часов', price: 50, image: '/images/detail.png' },
        { id: 75, name: 'Бензин (1000 к)', description: 'Доступно в начале вайпа', price: 90, image: '/images/petrol.png' },
        { id: 76, name: 'Металл сплав (10к)', description: 'Доступно в начале вайпа', price: 30, image: '/images/metalalloy.png' },
        { id: 77, name: 'МВК сплав (500 шт)', description: 'Спустя 3 часов', price: 120, image: '/images/file_3.png' },
        { id: 78, name: 'Нефть (500 шт)', description: 'Доступно в начале вайпа.', price: 100, image: '/images/oil.png' },
        { id: 79, name: 'Топор отличный (1 шт)', description: 'Доступно в начале вайпа', price: 25, image: '/images/file_27.png' },
    ],


    technic: [
        { id: 80, name: 'Спорткар', description: 'авто Спорткар.', price: 250, image: '/images/5454112822855331891.jpg' },
        { id: 81, name: 'Бронемашина-хамер', description: 'авто Бронемашина-хамер.', price: 250, image: '/images/5454112822855331892.jpg' },
        { id: 82, name: 'Боевая машина', description: 'авто Боевая машина.', price: 200, image: '/images/5454112822855331893.jpg' },
        { id: 83, name: 'машина "Быстрее ветра"', description: 'авто "Быстрее ветра"', price: 200, image: '/images/5454112822855331897.jpg' },
        { id: 84, name: 'вертолет "Птенец"', description: 'вертолет "Птенец"', price: 200, image: '/images/5454112822855331894.jpg' },
        { id: 85, name: 'Носорог', description: 'авто "Носорог".', price: 200, image: '/images/5454112822855331896.jpg' },
        { id: 86, name: 'мотоцикл "Искусство войны"', description: 'мотоцикл "Искусство войны".', price: 150, image: '/images/5454112822855331895.jpg' },
    ],



    // Дополнительные категории можно добавить здесь
};

function ProductsPage() {
    const { id } = useParams(); // Получение ID категории из URL
    const products = productsData[id] || [];
    const { addToCart } = useCart(); // Использование контекста корзины
    const [quantities, setQuantities] = useState(
        products.reduce((acc, product) => {
            acc[product.id] = 0;
            return acc;
        }, {})
    );

    const handleIncrement = (productId) => {
        setQuantities((prevState) => ({
            ...prevState,
            [productId]: prevState[productId] + 1,
        }));
    };

    const handleDecrement = (productId) => {
        setQuantities((prevState) => ({
            ...prevState,
            [productId]: Math.max(prevState[productId] - 1, 0),
        }));
    };

    const handleAddToCart = (productId) => {
        const product = products.find((p) => p.id === productId);
        if (product && quantities[productId] > 0) {
            addToCart(product, quantities[productId]);
            setQuantities((prevState) => ({ ...prevState, [productId]: 0 })); // Сброс количества после добавления
        } else {
            alert('Выберите количество перед добавлением в корзину!');
        }
    };

    return (
        <div className="products-page">
            <h1>Товары</h1>
            <div className="grid-container">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <img
                            src={`${process.env.PUBLIC_URL}${product.image}`}
                            alt={product.name}
                            onError={(e) => {
                                console.error(`Ошибка загрузки изображения: ${product.image}`);
                                e.target.src = `${process.env.PUBLIC_URL}/images/default.jpg`;
                            }}
                        />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Цена: {product.price} руб.</p>
                        <div className="actions">
                            <button onClick={() => handleDecrement(product.id)}>-</button>
                            <span>{quantities[product.id]}</span>
                            <button onClick={() => handleIncrement(product.id)}>+</button>
                            <button
                                className="cart-button"
                                onClick={() => handleAddToCart(product.id)}
                            >
                                🛒 Добавить в корзину
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;


