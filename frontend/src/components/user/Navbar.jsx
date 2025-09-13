import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <nav style={{ padding: "10px", background: "#f8f8f8" }}>
      <h2 style={{ display: "inline-block", marginRight: "20px" }}>My Shop</h2>

      <div style={{ display: "inline-block", position: "relative" }}>
        <span style={{ fontSize: "24px" }}>🛒</span>

        {totalItems > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {totalItems}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
