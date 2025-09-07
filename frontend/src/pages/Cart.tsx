import React, { useState, useEffect } from "react";
import { getCart, addToCart, removeFromCart } from "../api/cartApi";

interface CartItem {
  book: {
    _id: string;
    title: string;
    coverImage: string;
  };
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAddress, setShowAddress] = useState(false);

  // ✅ Fetch Cart Data
  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await getCart();
        setCartItems(res.cart.items);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    }
    fetchCart();
  }, []);

  // ✅ Add Item (Increase Quantity)
  async function addItem(id: string) {
    try {
      await addToCart(id, 1);
      const res = await getCart(); // refresh cart after adding
      setCartItems(res.cart.items);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }

  // ✅ Remove Item (Decrease Quantity or Delete)
  async function removeItem(id: string) {
    try {
      await removeFromCart(id);
      const res = await getCart(); // refresh cart after removing
      setCartItems(res.cart.items);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  }

  return (
    <div className="flex flex-col md:flex-row py-16 h-screen w-full px-6 bg-background mx-auto">
      {/* ✅ LEFT SIDE - Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6 text-text">
          Shopping Cart{" "}
          <span className="text-sm text-primary">
            {cartItems.length} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-text/80 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-text/60 mt-4">Your cart is currently empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.book._id}
              className="grid grid-cols-[2fr_1fr_1fr] text-text/80 items-center text-sm md:text-base font-medium pt-3"
            >
              <div className="flex items-center md:gap-6 gap-3">
                <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-primary/20 rounded overflow-hidden">
                  <img
                    className="max-w-full h-full object-cover"
                    src={item.book.coverImage}
                    alt={item.book.title}
                  />
                </div>
                <div>
                  <p className="hidden md:block font-semibold text-text">
                    {item.book.title}
                  </p>
                  <div className="font-normal text-text/60">
                    <div className="flex items-center">
                      <p>Qty:</p>
                      <select
                        value={item.quantity}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value);
                          if (newQty > item.quantity) {
                            addItem(item.book._id);
                          } else {
                            removeItem(item.book._id);
                          }
                        }}
                        className="outline-none bg-background"
                      >
                        {Array(5)
                          .fill("")
                          .map((_, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-text">${item.quantity * 20}</p>
              <button
                className="cursor-pointer mx-auto"
                onClick={() => removeItem(item.book._id)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                    stroke="#FF532E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))
        )}

        <button className="group cursor-pointer flex items-center mt-8 gap-2 text-text font-medium">
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* ✅ RIGHT SIDE - Order Summary */}
      <div className="max-w-[360px] w-full bg-secondary/40 p-5 max-md:mt-16 border border-primary/20">
        <h2 className="text-xl md:text-xl font-medium text-text">Order Summary</h2>
        <hr className="border-primary/20 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-text">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-text/60">No address found</p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-background border border-primary/20 text-sm w-full">
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-text/60 p-2 hover:bg-secondary/30"
                >
                  New York, USA
                </p>
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6 text-text">Payment Method</p>

          <select className="w-full border border-primary/20 bg-background px-3 py-2 mt-2 outline-none text-text">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-primary/20" />

        <div className="text-text/80 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              ${cartItems.reduce((acc, item) => acc + item.quantity * 20, 0)}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              $
              {(
                (cartItems.reduce((acc, item) => acc + item.quantity * 20, 0) *
                  2) /
                100
              ).toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3 text-text">
            <span>Total Amount:</span>
            <span>
              $
              {(
                cartItems.reduce((acc, item) => acc + item.quantity * 20, 0) +
                (cartItems.reduce((acc, item) => acc + item.quantity * 20, 0) *
                  2) /
                  100
              ).toFixed(2)}
            </span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 cursor-pointer bg-secondary text-text font-medium hover:bg-secondary/60 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;