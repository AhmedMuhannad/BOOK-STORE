export default function Categories() {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {/* Category Cards */}
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`https://picsum.photos/200/300?random=${index}`}
                alt={`Category ${index + 1}`}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Category {index + 1}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
