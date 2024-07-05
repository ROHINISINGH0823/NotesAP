import { pdfjs } from 'react-pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist/webpack';
GlobalWorkerOptions.workerSrc = `/${path_to_pdf_worker_script}/pdf.worker.min.js`;