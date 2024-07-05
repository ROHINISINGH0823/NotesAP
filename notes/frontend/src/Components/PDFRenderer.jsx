import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFRenderer = ({ pdfUrl }) => (
  <Worker workerUrl={`//unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}>
    <Viewer fileUrl={pdfUrl} />
  </Worker>
);

export default PDFRenderer;
