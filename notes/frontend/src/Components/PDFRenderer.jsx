import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFRenderer = ({ pdfUrl }) => {
  const containerHeight = "calc(100vh - 4rem)"; // Set the height dynamically to take the whole screen minus some margin
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null); // Clear any previous errors on success
  };

  const handleDocumentLoadError = (error) => {
    console.error('Error loading document:', error);
    setError(error);
  };

  return (
    <div style={{ height: containerHeight }} className="border-2 border-gray-300 p-1 bg-gray-100 w-full max-w-full overflow-hidden relative">
      <Worker workerUrl={`//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <div className="w-full h-full absolute inset-0 overflow-auto">
          <Viewer
            fileUrl={pdfUrl}
            onDocumentLoadSuccess={handleDocumentLoadSuccess}
            onDocumentLoadError={handleDocumentLoadError}
          />
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
