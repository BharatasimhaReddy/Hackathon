import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Product = ({ id, name, price }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h3>{name}</h3>
      <p>₹{price}</p>
      <button onClick={() => addToCart({ id, name, price })}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
