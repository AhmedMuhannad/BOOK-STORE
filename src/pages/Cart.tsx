import React, { useState, useMemo, useEffect } from "react";
import NavBar from "../components/Navbar";
import { getCart, removeFromCart, addToCart } from "../api/cartApi";
// Define the type for a cart item

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
  async function addItem(id: string) {
    try {
      await addToCart(id, 1);
      setCartItems(cartItems);
    } catch (err) {}
  }

  async function removeItem(id: string) {
    try {
      await removeFromCart(id);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  }

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await getCart();
        setCartItems(res.cart.items);
        console.log("Cart data:", res.cart.items);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    }
    fetchCart();
  }, []);
  console.log(cartItems);
  return (
    <>
      <NavBar />
      <div className="min-h-screen my-20 bg-gray-900 p-4 font-sans text-gray-200 antialiased">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gray-800 p-6 shadow-2xl">
          <h1 className="mb-8 text-4xl font-extrabold text-white">
            Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="rounded-xl bg-gray-700 p-8 text-center text-gray-400">
              <p className="text-lg">Your cart is currently empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.book._id}
                  className="flex flex-col items-center gap-6 rounded-xl bg-gray-700 p-6 sm:flex-row"
                >
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="h-28 w-28 flex-shrink-0 rounded-xl object-cover shadow-lg"
                  />
                  <div className="flex flex-1 flex-col items-center sm:items-start">
                    <h2 className="text-xl font-semibold text-white">
                      {item.book.title}
                    </h2>
                    {/* <p className="text-gray-400">${item.price.toFixed(2)}</p> */}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        removeFromCart(item.book._id);
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 text-lg text-gray-300 transition-colors duration-200 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      aria-label={`Decrease quantity of ${item.book.title}`}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-lg font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        addItem(item.book._id);
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 text-lg text-gray-300 transition-colors duration-200 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      aria-label={`Increase quantity of ${item.book.title}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      console.log(item.book._id);
                      removeItem(item.book._id);
                    }}
                    className="flex-shrink-0 rounded-lg p-2 text-gray-400 transition-colors duration-200 ease-in-out hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165M12 2.25h.001M12 5.25h.001M12 8.25h.001M12 11.25h.001M12 14.25h.001"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-col items-end gap-5 rounded-2xl border-t border-gray-700 pt-6">
            <div className="flex w-full justify-between text-2xl font-bold">
              <span className="text-gray-300">Subtotal:</span>
              {/* <span className="text-teal-400">${cartTotal.toFixed(2)}</span> */}
            </div>
            <button className="w-full rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 px-8 py-4 text-xl font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 sm:w-auto">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
