import { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/Product/ProductCard";
import Classes from "./Results.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";

function Results() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 500);
      });
  }, [categoryName]);

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
                product={product}
                renderDesc={false}
                renderAdd={true}
                
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
