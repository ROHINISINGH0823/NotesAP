import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFRenderer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const navbarHeight = 64; // Fixed height of the navbar in pixels
      if (window.innerWidth > 767) {
        const screenHeight = window.innerHeight;
        const topMargin = screenHeight * 0.001 + navbarHeight; // Reduced to 0.1% of the screen height + navbar height
        document.documentElement.style.setProperty('--pdf-container-top', `${topMargin}px`);
      } else {
        document.documentElement.style.setProperty('--pdf-container-top', '0px'); // No top spacing for narrower screens
      }
    };

    handleResize(); // Set the initial top spacing
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const pdfHeight = "710px"; // Set the desired height of the PDF viewer in pixels

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null); // Clear any previous errors on success
  };

  const handleDocumentLoadError = (error) => {
    console.error('Error loading document:', error);
    setError(error);
  };

  return (
    <div style={{ height: pdfHeight, top: 'var(--pdf-container-top, 0px)' }} className="border-2 border-gray-300 p-1 bg-gray-100 w-full max-w-full overflow-hidden relative">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <div className="w-full h-full absolute inset-0 overflow-auto">
          {pdfUrl ? (
            <Viewer
              fileUrl={pdfUrl}
              onDocumentLoadSuccess={handleDocumentLoadSuccess}
              onDocumentLoadError={handleDocumentLoadError}
              height={pdfHeight} // Set height for the PDF viewer
            />
          ) : (
            <p className="text-center text-gray-500">No PDF URL provided</p>
          )}
        </div>
      </Worker>
      {error && (
        <p className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-md shadow-md">
          Error loading PDF: {error.message}
        </p>
      )}
      {numPages !== null && (
        <p className="absolute bottom-0 right-0 bg-white text-gray-800 p-2 rounded-md shadow-md">
          Number of Pages: {numPages}
        </p>
      )}
    </div>
  );
};

export default PDFRenderer;
