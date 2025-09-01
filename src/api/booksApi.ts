import apiBase from "./baseUrl";
import type Book from "../interface/Book";
export const getBooks = async (search = ""): Promise<Book> => {
  try {
    const res = await apiBase.get(`/api/books/getbooks?search=${search}`);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getBookById = async (id: string): Promise<Book> => {
  try {
    const res = await apiBase.get(`/api/books/${id}`);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getBooksByCategory = async (
  categoryId: string
): Promise<Book[]> => {
  try {
    const res = await apiBase.get(
      `/api/books/get-category-books/${categoryId}`
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};
