import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import { getBooksByCategory } from "../api/booksApi";
import Navbar from "../components/Navbar";

const Category = () => {
  const location = useLocation(); // Move this to the top
  const [books, setBooks] = React.useState([]);
  console.log("Location is: ", location.state.category._id);
  useEffect(() => {
    async function getBooksByCate() {
      try {
        // Now location is defined before this useEffect runs
        const res = await getBooksByCategory(location.state.category._id);
        setBooks(res.data);
      } catch (err) {
        throw err;
      }
    }
    getBooksByCate();
  }, [location]); // Add location as a dependency
  console.log(books);

  // console.log("Your books is: ", books);
  // console.log(location.state.category);
  return (
    <>
      <Navbar />
      <div className="max-w-6xl w-full px-6 pt-20">
        <h1 className="text-4xl font-bold my-6">
          {location.state.category.name}
        </h1>
        <p className="my-6">{location.state.category.description}</p>
        <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5 2xl:grid-cols-6 md:gap-x-60 gap-x-30 gap-y-5 mt-4 mb-8">
          {books.map((book) => (
            <Card book={book} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
