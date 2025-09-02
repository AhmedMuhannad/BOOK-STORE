export default function DiscountBanner() {
  return (
    <div className=" text-black relative h-[50vh] mx-5 md:mx-20 min-h-[300px] flex items-center overflow-hidden mt-20 md:mt-32 px-4 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300 rounded-lg">
      <img
        alt="Discount Banner"
        src="../public/gotartofbk29.webp"
        className="absolute -right-20 md:right-0 top-0 h-full w-auto object-cover  transform rotate-12 scale-125"
      />
      <div className="relative px-8 md:px-16 lg:px-24">
        <p className="text-xs font-bold uppercase tracking-widest text-black/70">
          Summer Sale
        </p>
        <h2 className="text-4xl md:text-5xl font-bold my-3">Sale 25% Off</h2>
        <button className="mt-4 bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300">
          Shop Now &gt;
        </button>
      </div>
    </div>
  );
}
