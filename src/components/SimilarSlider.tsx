import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSimilarBooks } from "../api/booksApi";
import type Book from "../interface/Book";


export default function SimilarSlider({ id }: { id: string }) {
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
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  useEffect(() => {
    async function getSimilarItems() {
      try {
        const res = await getSimilarBooks(id);
        setSimilarBooks(res.data.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
      }
    }
    getSimilarItems();
  }, [id]);
  console.log("this is similar books ",similarBooks);
  const navigate = useNavigate();
  const handleItemClick = (item: string) => {
    navigate(`/${item}/Details`, { state: { item } });
  };
  return (
    <div className="w-full px-6 py-4 slider-container">
      <h2 className="mx-auto  text-3xl font-semibold md:px-4 lg:px-10 xl:px-12 mb-6">Similar Books</h2>
      <div className="w-full">
          <Slider {...settings}>
          {similarBooks &&
          similarBooks.map((item:Book) => (
              <div key={item._id}>
              <div className="w-42 mx-auto">
                <img src={item.coverImage} alt={item.title} onClick={()=>{handleItemClick(item._id)}} className="w-full h-48 object-cover rounded hover:cursor-pointer"/>
                 <p className="mt-2 text-center font-medium">{item.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
