import React from "react";
import CartItem from "../../components/features/cart/CartItem";
import SuggestedProducts from "../../components/features/cart/SuggestedProducts";

const Cart = () => {
  return (
    <div className="min-h-screen bg-white">
      <CartItem />
      <SuggestedProducts />
    </div>
  );
};

export default Cart;
