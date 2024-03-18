"use client";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";

type PDFViewerProps = {
  pdfURL: string;
};

export default function PDFViewer({ pdfURL }: PDFViewerProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({});

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="max-h-full overflow-auto">
        <Viewer fileUrl={pdfURL} plugins={[defaultLayoutPluginInstance]} />
      </div>
    </Worker>
  );
}
