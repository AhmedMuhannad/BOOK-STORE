import apiBase from "./baseUrl";

export const addToCart = async (bookId: string, quantity: number) => {
  try {
    const response = await apiBase.post(
      "/api/cart/add/",
      {
        bookId,
        quantity,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await apiBase.get("/api/cart/", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const removeFromCart = async (bookId: string) => {
  try {
    const response = await apiBase.delete(`/api/cart/remove/${bookId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};
