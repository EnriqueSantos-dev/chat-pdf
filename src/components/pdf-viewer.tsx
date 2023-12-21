type PDFViewerProps = {
  pdfURL: string;
};

export default function PDFViewer({ pdfURL }: PDFViewerProps) {
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${pdfURL}&embedded=true`}
      className="h-full w-full scroll-smooth"
    />
  );
}
