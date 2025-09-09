import React from 'react'

function Error404() {
  return (
    <div className='flex justify-center items-center h-screen bg-background'>
      <div className="flex flex-col items-center justify-center text-sm max-md:px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-primary">404</h1>
        <div className="h-1 w-16 rounded bg-primary my-5 md:my-7"></div>
        <p className="text-2xl md:text-3xl font-bold text-text">Page Not Found</p>
        <p className="text-sm md:text-base mt-4 text-text/80 max-w-md text-center">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div className="flex items-center gap-4 mt-6">
          <a href="/" className="bg-primary hover:bg-primary/90 px-7 py-2.5 text-background rounded-md active:scale-95 transition-all">
            Return Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default Error404;