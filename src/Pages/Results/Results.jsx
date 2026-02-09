import { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/Product/ProductCard";
import Classes from "./Results.module.css";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";

function Results() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (categoryName === 'search' && searchQuery) {
      // Handle search functionality
      axios
        .get(`${productUrl}/products`)
        .then((res) => {
          // Filter products based on search query
          const filteredResults = res.data.filter(product => 
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setResults(filteredResults);
        })
        .catch((err) => {
          console.log(err);
          setResults([]);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 500);
        });
    } else {
      // Handle category browsing
      axios
        .get(`${productUrl}/products/category/${categoryName}`)
        .then((res) => {
          setResults(res.data);
        })
        .catch((err) => {
          console.log(err);
          setResults([]);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 500);
        });
    }
  }, [categoryName, searchQuery]);

  const getPageTitle = () => {
    if (categoryName === 'search' && searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }
    return 'Results';
  };

  const getPageSubtitle = () => {
    if (categoryName === 'search' && searchQuery) {
      return `${results.length} results found for "${searchQuery}"`;
    }
    return `Category / ${categoryName}`;
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <LayOut>
      <section className={Classes.results_section}>
        <div className={Classes.results_header}>
          <button onClick={handleGoBack} className={Classes.back_button}>
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <div className={Classes.title_section}>
            <h1>{getPageTitle()}</h1>
            <p>{getPageSubtitle()}</p>
          </div>
        </div>
        <hr className={Classes.divider} />

        {isLoading ? (
          <Loader />
        ) : (
          <div className={Classes.products_container}>
            {results?.length > 0 ? (
              results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderDesc={false}
                  renderAdd={true}
                />
              ))
            ) : (
              <div className={Classes.no_results}>
                <h3>No products found</h3>
                <p>Try adjusting your search terms or browse our categories.</p>
                <button onClick={handleGoBack} className={Classes.back_to_home_btn}>
                  Go Back
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
