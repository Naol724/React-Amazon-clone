import React from 'react';
import Classes from './Category.module.css';
import {Link} from 'react-router-dom';

function CategoryCard({ data }) {
return (
    <div className={Classes.category}>
    <Link to={`category/${data.name}`}>
        <h2>{data.title}</h2>
        <img src={data.imgLink} alt={data.title} />
        <p>Shop Now</p>
    </Link>
    </div>
);
}

export default CategoryCard;
