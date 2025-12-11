import { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/Product/ProductCard";
import Classes from "./Results.module.css";

function Results({ categoryName, results }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>

        <hr />

        {isLoading ? (
          <Loader />
        ) : (
          <div className={Classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                renderAdd={true}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
