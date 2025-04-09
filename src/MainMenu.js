import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';

const containers = [
    { id: 'maps', title: 'Карты', description: 'зелёные, синие и фиолетовые карточки (чипы для открывания дверей)' },
    { id: 'sets', title: 'Сета', description: 'Сета в начале вайпа и спустя 3 часа, фул броня оружия патроны.' },
    { id: 'explosion', title: 'Взрыв', description: 'Доступно в начале вайпа, спустя 6 часов, спустя 24 часов, спустя 48 часов.' },
    { id: 'additionally', title: 'Дополнительно', description: 'Супер экстра, перчатки для добычи супер руды, бур, пила.' },
    { id: 'components', title: 'Компоненты', description: 'Компоненты для крафта' },
    { id: 'buildings', title: 'Постройки', description: 'Объекты для устанрвки' },
    { id: 'weapon', title: 'Оружие,Броня', description: 'Оружие, Броня: Доступны в начале вайпа, спустя 3 часов, спустя 24 часа, спустя 72 часа.' },
    { id: 'resources', title: 'Ресурсы', description: 'Ресурсы доступны со старта' },
    { id: 'technic', title: 'Техника', description: 'Спорткар, Бронемашина-хамер, Боевая машина, машина "Быстрее ветра", вертолет "Птенец", мотоцикл "Искусство войны"' },
    // Добавьте остальные категории
];

function MainMenu() {
    const navigate = useNavigate();

    const handleContainerClick = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <div className="main-menu-container">
            <h1>Магазин</h1>
            <div className="grid-container">
                {containers.map((container) => (
                    <div
                        key={container.id}
                        className="menu-item"
                        onClick={() => handleContainerClick(container.id)}
                    >
                        <h2>{container.title}</h2>
                        <p>{container.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainMenu;
