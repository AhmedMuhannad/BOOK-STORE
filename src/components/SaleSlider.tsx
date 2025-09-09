import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { getBooks } from "../api/booksApi";
import type Book from "../interface/Book";

export default function SaleSlider() {
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
    <div className="slider-container  px-4">
      <h2 className="mx-auto px-4 text-3xl font-semibold md:px-16 lg:px-24 xl:px-32 mb-6">
        Top Selling
      </h2>
      <Slider {...settings}>
        {books.map((item) => (
          <div key={item._id} className="px-4">
            <div
              className="w-32 h-32 cursor-pointer rounded-full bg-gradient-to-l flex items-center justify-center mx-auto"
              onClick={() => {
                handleItemClick(item._id);
              }}
            >
              <img src={item.coverImage} alt={item.title} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
