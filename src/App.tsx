import { useState, useRef } from 'react';
import { Canvas } from './components/Canvas';
import * as htmlToImage from 'html-to-image';
import WebFont from 'webfontloader';

function App() {
  const [isExporting, setIsExporting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleExportImage = async () => {
    if (!printRef.current) return;
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

      const node = printRef.current;
      
      const imgData = await htmlToImage.toPng(node, {
        canvasWidth: node.clientWidth,
        canvasHeight: node.clientHeight,
        style: {
          transformOrigin: 'top left',
          width: `${node.clientWidth}px`,
          height: `${node.clientHeight}px`
        },
        backgroundColor: '#ffffff',
        pixelRatio: 4
      });
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'folheto_final.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('Imagem gerada com sucesso!');

    } catch (error) {
      console.error('Error exporting Image:', error);
      alert('Erro ao gerar imagem: ' + (error as Error).message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-xl font-semibold mb-6 text-gray-700">Pré-visualização do Panfleto</h1>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={handleExportImage}
          disabled={isExporting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 px-6 rounded shadow-md transition-colors"
        >
          {isExporting ? 'Gerando Imagem...' : 'Gerar Imagem'}
        </button>
      </div>

      {/* Container wrapper for any zoom or outer specific layout constraints */}
      <div className="scale-100 transform origin-top shadow-2xl" ref={printRef}>
        <Canvas />
      </div>

      <p className="text-sm text-gray-500 mt-6">Tamanho real em papel: 14.4cm x 20.4cm</p>
    </div>
  )
}

export default App;
