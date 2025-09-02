import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getBookById } from "../api/booksApi";
import type Book from "../interface/Book";
import { addToCart } from "../api/cartApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { getBooks } from "../api/booksApi";
import Slider from "react-slick";

function SimilarBooks(){
  {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const [books, setBooks] = React.useState<Book[]>([]);
  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks();
        setBooks(res.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);
  //   console.log(books);
  const navigate = useNavigate();
  const handleItemClick = (item: string) => {
    navigate(`${item}/Details`, { state: { item } });
  };
  return (
    <div className="slider-container px-4 w-full mt-12">
      <h2 className="mx-auto px-4 text-3xl font-semibold md:px-16 lg:px-24 xl:px-32 mb-6">
        Top Selling
      </h2>
      <Slider {...settings}>
        {books.map((item) => (
          <div key={item._id} className="px-4">
            <div
              className="w-32 h-32 cursor-pointer rounded-full bg-gradient-to-l from-indigo-500 via-indigo-400 to-indigo-300 flex items-center justify-center mx-auto"
              onClick={() => {
                handleItemClick(item._id);
              }}
            >
              <img src={item.coverImage} alt="" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

}

export default function Details() {
  const [book, setBooks] = useState<Book>();
  const location = useLocation();
  console.log(location.state);
  console.log("HI");
  const navigate = useNavigate();
  async function addItem(id: string, quantity: number) {
    try {
      await addToCart(id, quantity);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }
  useEffect(() => {
    async function getBookInfo() {
      try {
        const res = await getBookById(location.state.item);
        setBooks(res.data.book);
      } catch (err) {
        console.error("Error fetching book details:", err);
      }
    }
    getBookInfo();
  }, [location.state.item]);
  console.log(book);
  const Details = () => {
    return (
      book && (
        <div className="max-w-6xl w-full px-6">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-4">
            <div className="flex justify-center md:justify-start">
              <div className="border border-gray-500/30 rounded overflow-hidden w-full max-w-xs md:max-w-sm lg:max-w-md">
                <img src={book.coverImage} alt={book.title} className="w-full h-auto object-contain max-h-[500px]" />
              </div>
            </div>

            <div className="text-sm w-full md:w-1/2">
              <h1 className="text-3xl font-medium">{book.title}</h1>

              <div className="flex items-center gap-0.5 mt-1">
                {/* {Array(5)
                  .fill("")
                  .map((_, i) => {
                    const ratingValue = i + 1;
                    if (product.rating >= ratingValue) {
                      return (
                        <svg
                          key={i}
                          width="14"
                          height="13"
                          viewBox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                            fill="#615fff"
                          />
                        </svg>
                      );
                    } else if (product.rating > i) {
                      return <HalfStar key={i} />;
                    } else {
                      return (
                        <svg
                          key={i}
                          width="14"
                          height="13"
                          viewBox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                            fill="#615fff"
                            fill-opacity="0.35"
                          />
                        </svg>
                      );
                    }
                  })} */}
                {/* <p className="text-base ml-2">({product.rating})</p> */}
              </div>

              <p className="text-base font-medium mt-6">About The Book</p>
              <h3>{book.description}</h3>

              <div className="flex items-center mt-10 gap-4 text-base">
                <button
                  onClick={() => {
                    console.log(book._id);
                    addItem(book._id, 3);
                  }}
                  className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                >
                  Add to Cart
                </button>
                <button className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition">
                  Buy now
                </button>
              </div>
              <div>
                {book.categories.map((category) => (
                  <button
                    onClick={() => {
                      navigate(`/${category._id}/category`, {
                        state: { category },
                      });
                    }}
                    key={category._id}
                    className="inline-block bg-gray-200 text-gray-800 text-[12px] px-2 py-1 rounded mt-4 mr-2 cursor-pointer"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    );
  };
  return (
    <>
      <NavBar />
      <div className="flex justify-center flex-col h-screen items-start md:items-center w-full py-8 md:py-0 overflow-y-scroll md:mt-8">
        <div className=" my-120 lg:my-40 md:my-80 sm:my-100 xs:my-120"></div>
        <Details />
        <SimilarBooks/>
      </div>
    </>
  );
}
