import { useState, useRef } from 'react';
import { Canvas } from './components/Canvas';
import * as htmlToImage from 'html-to-image';
import WebFont from 'webfontloader';
import { jsPDF } from 'jspdf';

function App() {
  const [isExporting, setIsExporting] = useState(false);
  const printRef1 = useRef<HTMLDivElement>(null);
  const printRef2 = useRef<HTMLDivElement>(null);

  const handleExportImage = async (ref: React.RefObject<HTMLDivElement | null>, pageNum: number) => {
    if (!ref.current) return;
    setIsExporting(true);

    try {
      // Ensure fonts are loaded before capturing
      await new Promise<void>((resolve) => {
        WebFont.load({
          google: {
            families: ['Inter:300,400,500,600,700', 'Material Symbols Outlined']
          },
          active: () => resolve(),
          inactive: () => resolve() // resolve anyway to not block
        });
      });

      // Small delay to ensure browser has painted the fonts and re-rendered inputs
      await new Promise((resolve) => setTimeout(resolve, 500));

      const node = ref.current;
      
      const imgData = await htmlToImage.toPng(node, {
        canvasWidth: node.clientWidth,
        canvasHeight: node.clientHeight,
        style: {
          transformOrigin: 'top left',
          width: `${node.clientWidth}px`,
          height: `${node.clientHeight}px`
        },
        backgroundColor: '#themeColor', // we don't have themeColor in App easily, but let htmlToImage capture the node's background
        pixelRatio: 6
      });
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `folheto_pagina_${pageNum}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(`Página ${pageNum} gerada com sucesso!`);

    } catch (error) {
      console.error('Error exporting Image:', error);
      alert('Erro ao gerar imagem: ' + (error as Error).message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    if (!printRef1.current || !printRef2.current) return;
    setIsExporting(true);

    try {
      // Ensure fonts are loaded before capturing
      await new Promise<void>((resolve) => {
        WebFont.load({
          google: {
            families: ['Inter:300,400,500,600,700', 'Material Symbols Outlined']
          },
          active: () => resolve(),
          inactive: () => resolve() // resolve anyway to not block
        });
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      const capturePage = async (node: HTMLDivElement) => {
        return await htmlToImage.toPng(node, {
          canvasWidth: node.clientWidth,
          canvasHeight: node.clientHeight,
          style: {
            transformOrigin: 'top left',
            width: `${node.clientWidth}px`,
            height: `${node.clientHeight}px`
          },
          pixelRatio: 4 // slightly lower ratio for PDF to manage file size
        });
      };

      const imgData1 = await capturePage(printRef1.current);
      const imgData2 = await capturePage(printRef2.current);
      
      // Page size is 14.4cm x 20.4cm -> 144mm x 204mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [144, 204]
      });

      pdf.addImage(imgData1, 'PNG', 0, 0, 144, 204);
      pdf.addPage();
      pdf.addImage(imgData2, 'PNG', 0, 0, 144, 204);

      pdf.save('folheto_completo.pdf');
      
      alert('PDF gerado com sucesso!');

    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Erro ao gerar PDF: ' + (error as Error).message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDFX1A = async () => {
    if (!printRef1.current || !printRef2.current) return;
    setIsExporting(true);

    try {
      // Ensure fonts are loaded before capturing
      await new Promise<void>((resolve) => {
        WebFont.load({
          google: {
            families: ['Inter:300,400,500,600,700', 'Material Symbols Outlined']
          },
          active: () => resolve(),
          inactive: () => resolve() // resolve anyway to not block
        });
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      const capturePage = async (node: HTMLDivElement) => {
        return await htmlToImage.toPng(node, {
          canvasWidth: node.clientWidth,
          canvasHeight: node.clientHeight,
          style: {
            transformOrigin: 'top left',
            width: `${node.clientWidth}px`,
            height: `${node.clientHeight}px`
          },
          pixelRatio: 4 // slightly lower ratio for PDF to manage file size
        });
      };

      const imgData1 = await capturePage(printRef1.current);
      const imgData2 = await capturePage(printRef2.current);
      
      // Page size is 14.4cm x 20.4cm -> 144mm x 204mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [144, 204]
      });

      pdf.addImage(imgData1, 'PNG', 0, 0, 144, 204);
      pdf.addPage();
      pdf.addImage(imgData2, 'PNG', 0, 0, 144, 204);

      // Get the PDF as a Blob
      const pdfBlob = pdf.output('blob');
      
      const formData = new FormData();
      formData.append('file', pdfBlob, 'folheto.pdf');

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/convert`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao converter no servidor.');
      }

      // Receive the converted PDF/X-1a
      const convertedBlob = await response.blob();
      const url = window.URL.createObjectURL(convertedBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'folheto_completo_x1a.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert('PDF/X-1a (Gráfica) gerado e baixado com sucesso!');

    } catch (error) {
      console.error('Error exporting PDF X1A:', error);
      alert('Erro ao gerar PDF/X-1a: ' + (error as Error).message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-xl font-semibold mb-6 text-gray-700">Pré-visualização do Panfleto</h1>
      
      <div className="flex flex-wrap gap-4 mb-6 justify-center max-w-4xl">
        <button 
          onClick={() => handleExportImage(printRef1, 1)}
          disabled={isExporting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 px-6 rounded shadow-md transition-colors"
        >
          {isExporting ? 'Gerando...' : 'Gerar Página 1 (PNG)'}
        </button>
        <button 
          onClick={() => handleExportImage(printRef2, 2)}
          disabled={isExporting}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-2 px-6 rounded shadow-md transition-colors"
        >
          {isExporting ? 'Gerando...' : 'Gerar Página 2 (PNG)'}
        </button>
        <button 
          onClick={handleExportPDF}
          disabled={isExporting}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-2 px-6 rounded shadow-md transition-colors"
        >
          {isExporting ? 'Gerando...' : 'Gerar PDF (Digital)'}
        </button>
        <button 
          onClick={handleExportPDFX1A}
          disabled={isExporting}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-2 px-6 rounded shadow-md transition-colors"
        >
          {isExporting ? 'Convertendo...' : 'Gerar PDF/X-1a (Gráfica)'}
        </button>
      </div>

      {/* Container wrapper for any zoom or outer specific layout constraints */}
      <div className="scale-100 transform origin-top flex flex-row gap-4">
        <div ref={printRef1} className="shadow-2xl">
          <Canvas pageIndex={0} />
        </div>
        <div ref={printRef2} className="shadow-2xl">
          <Canvas pageIndex={1} />
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center max-w-2xl">
        Tamanho real em papel (por página): 14.4cm x 20.4cm. 
        <br/>
        Para gráfica, lembre-se de rodar o servidor local (<code>python server.py</code>) antes de clicar em "Gerar PDF/X-1a".
      </p>
    </div>
  )
}

export default App;
