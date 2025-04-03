// src/utils/downloadAsPdf.ts

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadPDF = async (
  element: HTMLElement | null,
  fileName = "download"
) => {
  if (!element) {
    alert("❌ PDF content not found.");
    return;
  }

  try {
    console.log("📄 Generating PDF from element:", element);

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("❌ PDF generation error:", error); // <-- Show real error
    alert("Something went wrong while downloading the PDF.");
  }
};
