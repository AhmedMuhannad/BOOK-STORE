import useRefreshToken from "../hooks/useRefreshToken";

export default function HeroSection() {
  const refresh = useRefreshToken();
  const handleClick = async () => {
    try {
      const response = await refresh();
      console.log(response);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };
  return (
    <section className="  pb-3 md:pb-6 bg-cover bg-center bg-no-repeat text-text text-sm">
      <div className="flex flex-col-reverse gap-10 md:flex-row px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="max-md:text-center">
          <h5 className="text-4xl md:text-6xl/[76px] font-semibold max-w-xl bg-gradient-to-r from-text to-accent text-transparent bg-clip-text">
            Your next adventure begins here
          </h5>

          <p className="text-sm md:text-base max-w-lg mt-6 max-md:px-2 text-text/80">
            discover something new , discounts on your first purchase, and a
            wide range of products to explore. Join us today and start your
            journey with us.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleClick}
              className="px-5 py-3 rounded-md bg-secondary text-primary border border-primary flex items-center gap-2 hover:bg-primary/5 active:scale-95 transition-all"
              type="button"
            >
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.68395 9.89231C6.62515 9.66436 6.50633 9.45634 6.33987 9.28988C6.17341 9.12341 5.96538 9.0046 5.73743 8.94579L1.69644 7.90377C1.6275 7.8842 1.56682 7.84267 1.52362 7.7855C1.48041 7.72832 1.45703 7.65861 1.45703 7.58694C1.45703 7.51527 1.48041 7.44556 1.52362 7.38839C1.56682 7.33121 1.6275 7.28969 1.69644 7.27012L5.73743 6.22743C5.9653 6.16868 6.17327 6.04997 6.33973 5.88363C6.50618 5.71729 6.62504 5.5094 6.68395 5.28157L7.72598 1.24058C7.74535 1.17137 7.78683 1.11039 7.84409 1.06695C7.90136 1.02351 7.97126 1 8.04313 1C8.11501 1 8.18491 1.02351 8.24217 1.06695C8.29943 1.11039 8.34092 1.17137 8.36029 1.24058L9.40166 5.28157C9.46046 5.50952 9.57928 5.71755 9.74574 5.88401C9.9122 6.05047 10.1202 6.16928 10.3482 6.22809L14.3892 7.26946C14.4587 7.28863 14.5199 7.33006 14.5636 7.38741C14.6073 7.44476 14.6309 7.51486 14.6309 7.58694C14.6309 7.65903 14.6073 7.72912 14.5636 7.78647C14.5199 7.84382 14.4587 7.88526 14.3892 7.90442L10.3482 8.94579C10.1202 9.0046 9.9122 9.12341 9.74574 9.28988C9.57928 9.45634 9.46046 9.66436 9.40166 9.89231L8.35963 13.9333C8.34026 14.0025 8.29878 14.0635 8.24151 14.1069C8.18425 14.1504 8.11435 14.1739 8.04247 14.1739C7.9706 14.1739 7.9007 14.1504 7.84344 14.1069C7.78617 14.0635 7.74469 14.0025 7.72532 13.9333L6.68395 9.89231Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3105 1.66016V4.29487"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6328 2.97656H11.998"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.76953 10.8809V12.1982"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.42673 11.541H2.10938"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Get Started</span>
            </button>
          </div>
        </div>
        <div className="w-full md:max-w-xs lg:max-w-lg">
          <img
            className="w-full h-auto"
            src="../public/hand-drawn-flat-stack-books_23-2149323629.png"
            alt="books"
          />
        </div>
      </div>
    </section>
  );
}