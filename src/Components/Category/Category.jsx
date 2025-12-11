import React from 'react';
import { categoryImage } from './categoryFullInfos';
import CategoryCard from './CategoryCard';
import Classes from './Category.module.css';

function Category() {
  return (
    <section className={Classes.category_container}>
      {categoryImage.map((item, index) => (
        <CategoryCard data={item} key={index} />
      ))}
    </section>
  );
}

export default Category;
