import NavBar from "../components/Navbar";
export default function ContactUs() {
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen px-4 bg-background">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-lg font-medium text-primary mb-2">Contact Us</h3>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-text">
            Meet Our Team
          </h1>
          <p className="w-3/5 mb-14 text-text/80 text-sm">
            Libro store UI has made by{" "}
            <a
              href="https://prebuiltui.com/"
              className="font-bold text-xl text-primary"
              target="_blank"
            >
              PreBuilt UI
            </a>
          </p>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            <div className="group flex flex-col items-center py-8 text-sm bg-background border border-primary/20 w-64 rounded-md hover:border-primary hover:bg-primary transition">
              <img
                className="w-24 rounded-full"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="userImage1"
              />
              <h2 className="text-text group-hover:text-background text-lg font-medium mt-2">
                Ahmed Sabah
              </h2>
              <p className="text-text/80 group-hover:text-background/80">
                Front-end
              </p>
              <p className="text-center text-text/60 group-hover:text-background/60 w-3/4 mt-4">
                a student at UOB that works as a front end developer & UI
                designer
              </p>
              <div className="flex items-center space-x-4 mt-6 text-text/80 group-hover:text-background">
                <a
                  href="https://www.linkedin.com/in/ahmed-sabah-548901372?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a href="https://www.instagram.com/vvvph/" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.917 3.917 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8s.01 2.444.048 3.297c.04.852.174 1.433.38 1.942.208.509.472.994.923 1.417.44.44.908.715 1.417.923.509.208 1.09.342 1.942.38C5.556 15.99 5.827 16 8 16s2.444-.01 3.297-.048c.852-.04 1.433-.174 1.942-.38.509-.208.994-.472 1.417-.923.44-.44.715-.908.923-1.417.208-.509.342-1.09.38-1.942C15.99 10.444 16 10.173 16 8s-.01-2.444-.048-3.297c-.04-.852-.174-1.433-.38-1.942a3.916 3.916 0 0 0-.923-1.417A3.916 3.916 0 0 0 13.24.42c-.51-.208-1.09-.342-1.942-.38C10.444.01 10.173 0 8 0zm0 2.422a5.578 5.578 0 1 1 0 11.156 5.578 5.578 0 0 1 0-11.156zM8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </a>
                <a href="mailto:alezhre78@gmail.com" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="group flex flex-col items-center py-8 text-sm bg-background border border-primary/20 w-64 rounded-md hover:border-primary hover:bg-primary transition">
              <img
                className="w-24 rounded-full"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="userImage2"
              />
              <h2 className="text-text group-hover:text-background text-lg font-medium mt-2">
                Ahmed Muhannad
              </h2>
              <p className="text-text/80 group-hover:text-background/80">
                Back-end & Front-end
              </p>
              <p className="text-center text-text/60 group-hover:text-background/60 w-3/4 mt-4">
                a student at UOB that works as a full stack developer
              </p>
              <div className="flex items-center space-x-4 mt-6 text-text/80 group-hover:text-background">
                <a
                  href="https://www.linkedin.com/in/ahmed-mohned-b35a88328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/mohned243?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.917 3.917 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8s.01 2.444.048 3.297c.04.852.174 1.433.38 1.942.208.509.472.994.923 1.417.44.44.908.715 1.417.923.509.208 1.09.342 1.942.38C5.556 15.99 5.827 16 8 16s2.444-.01 3.297-.048c.852-.04 1.433-.174 1.942-.38.509-.208.994-.472 1.417-.923.44-.44.715-.908.923-1.417.208-.509.342-1.09.38-1.942C15.99 10.444 16 10.173 16 8s-.01-2.444-.048-3.297c-.04-.852-.174-1.433-.38-1.942a3.916 3.916 0 0 0-.923-1.417A3.916 3.916 0 0 0 13.24.42c-.51-.208-1.09-.342-1.942-.38C10.444.01 10.173 0 8 0zm0 2.422a5.578 5.578 0 1 1 0 11.156 5.578 5.578 0 0 1 0-11.156zM8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}