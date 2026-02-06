import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const products = getProducts()
    return (
        <div className="page">
           <div className="home-hero">
                <h1 className="home-title"> Welcome to ShopHub </h1>
                <p className="home-subtitle"> Discover amazing producst at great prices !!!!!</p>
           </div>
           <div className="container">
            <h2 className="page-title"> Our Products </h2>
            <div className="product-grid">
                {products?.length > 0 && products.map((product) => (
                    <ProductCard product={product} key={product?.id} />
                    // <div className="product-card" key={product?.id}>
                    //     <img className="product-card-image" src={product?.image} />
                    //     <div className="product-card-content">
                    //         <h3 className="product-card-name"> {product?.name} </h3>
                    //         <p className="product-card-price"> ${product?.price} </p>
                    //         <div className="product-card-actions">
                    //             <Link className="btn btn-secondary"> View Details </Link>
                    //             <button className="btn btn-primary"> Add To Cart </button>
                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </div>
           </div>
        </div>
    )
}

export default Home;