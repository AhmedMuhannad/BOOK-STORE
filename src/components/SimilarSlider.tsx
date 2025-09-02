import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSimilarBooks } from "../api/booksApi";
import type Book from "../interface/Book";

export default function SimilarSlider({ id }: { id: string }) {
  console.log("fuck this id", id);
  const [similarBooks, setSimilarBooks] = useState<[]>();
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
  }, []);
  console.log(similarBooks);
  const navigate = useNavigate();
  const handleItemClick = (item: string) => {
    navigate(`/${item}/Details`, { state: { item } });
  };
  return (
    <div className="max-w-6xl w-full px-6 ">
      {" "}
      <h2 className="my-2 text-3xl font-semibold  mb-6">Top Selling</h2>
      <div className="flex gap-4 items-center ">
        {similarBooks &&
          similarBooks.map((item) => (
            <div key={item._id} className="">
              <div className="w-42 mx-auto">
                <img src={item.coverImage} alt="" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
