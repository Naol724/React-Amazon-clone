import React from 'react';
import Classes from './Category.module.css';

function CategoryCard({ data }) {
return (
    <div className={Classes.category}>
    <a href="#">
        <h2>{data.title}</h2>
        <img src={data.imgLink} alt={data.title} />
        <p>Shop Now</p>
    </a>
    </div>
);
}

export default CategoryCard;
