import { Link, useNavigate } from "react-router-dom";


const ProductCard = ({product}) => {

    const navigate = useNavigate();
    return (
        <div className="product-card" key={product?.id}>
            <img className="product-card-image" src={product?.image} alt={product?.name} />
            <div className="product-card-content">
                <h3 className="product-card-name"> {product?.name} </h3>
                <p className="product-card-price"> ${product?.price} </p>
                <div className="product-card-actions">
                    <Link className="btn btn-secondary" to={`/products/${product?.id}`}> View Details </Link>
                    <button className="btn btn-primary"> Add To Cart </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;