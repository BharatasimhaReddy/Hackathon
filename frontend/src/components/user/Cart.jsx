import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart, removeItemCompletely, clearCart, totalPrice } =
    useContext(CartContext);

  return (
    <div>
      <h2>My Cart ({cart.length} items)</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
            <button onClick={() => addToCart(item)}>➕</button>
            <button onClick={() => removeFromCart(item.id)}>➖</button>
            <button onClick={() => removeItemCompletely(item.id)}>❌</button>
          </li>
        ))}
      </ul>

      <h3>Total: ₹{totalPrice}</h3>

      {cart.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
    </div>
  );
};

export default Cart;
