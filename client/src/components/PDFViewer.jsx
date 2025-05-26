// components/PDFViewer.jsx
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFViewer = ({ fileUrl, onClose }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] h-[90%] relative shadow-lg rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 z-10"
        >
          Đóng
        </button>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;
