import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../store/usePamphletStore';

import logoOboticario from '../assets/logos/oboticario.png'
import logoOui from '../assets/logos/oui.png'
import logoMakie from '../assets/logos/makie.png'
import logoQDB from '../assets/logos/quemdisse.png'
import logoHinode from '../assets/logos/hinode.png'
import logoNatura from '../assets/logos/avon.png'
import logoEudora from '../assets/logos/eudora.png'
import logoNina from '../assets/logos/nina.png'

const WhiteLogo = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [dataUrl, setDataUrl] = React.useState<string>(src);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = 'source-in';
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      setDataUrl(canvas.toDataURL('image/png'));
    };
    img.src = src;
  }, [src]);

  return <img src={dataUrl} alt={alt} className={className} />;
};

interface BasePageProps {
  products: Product[];
  themeColor: string;
  backgroundImage: string | null;
  logoImage: string | null;
  disclaimer: string;
  deliveryText: string;
  social: string;
  address: string;
  phone: string;
  processingId: string | null;
  onThemeColorChange: (color: string) => void;
  onBackgroundImageChange: (url: string | null) => void;
  onLogoImageChange: (url: string | null) => void;
  onProductChange: (id: string, field: keyof Product, value: string) => void;
  onRemoveBackground: (productId: string, imageUrl: string) => Promise<void>;
  onDisclaimerChange: (text: string) => void;
  onDeliveryTextChange: (text: string) => void;
  onSocialChange: (text: string) => void;
  onAddressChange: (text: string) => void;
  onPhoneChange: (text: string) => void;
}

export const BasePage: React.FC<BasePageProps> = (props) => {
  const {
    products, themeColor, backgroundImage, logoImage, disclaimer, deliveryText,
    social, address, phone, processingId,
    onThemeColorChange, onBackgroundImageChange, onLogoImageChange,
    onProductChange, onRemoveBackground,
    onDisclaimerChange, onDeliveryTextChange, onSocialChange, onAddressChange, onPhoneChange
  } = props;

  return (
    <div
      className="shadow-2xl relative flex flex-col font-sans group isolate"
      style={{
        width: '14.4cm',
        height: '20.4cm',
        backgroundColor: themeColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : `radial-gradient(circle at top, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.2) 100%)`,
        backgroundSize: backgroundImage ? 'cover' : 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}
    >
      {/* Background Upload Controls */}
      <div className="absolute top-2 left-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <label className="cursor-pointer bg-white/20 hover:bg-white/40 border border-white/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md transition-colors shadow-sm flex items-center gap-1" title="Cor do Fundo">
          <span className="w-4 h-4 rounded-full overflow-hidden border border-white/50 inline-block">
            <input 
              type="color" 
              value={themeColor}
              onChange={(e) => onThemeColorChange(e.target.value)}
              className="w-8 h-8 -mt-2 -ml-2 cursor-pointer" 
            />
          </span>
        </label>
        <label className="cursor-pointer bg-white/20 hover:bg-white/40 border border-white/50 text-white text-[10px] px-2 py-1 flex items-center rounded backdrop-blur-md transition-colors shadow-sm">
          Trocar Fundo
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                const url = URL.createObjectURL(file)
                onBackgroundImageChange(url)
              }
            }} 
          />
        </label>
        {backgroundImage && (
          <button 
            onClick={() => onBackgroundImageChange(null)}
            className="bg-black/20 hover:bg-black/40 border border-black/30 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md transition-colors shadow-sm"
          >
            Remover Fundo
          </button>
        )}
      </div>

      {/* Header Area */}
      <header className="relative h-[16%] flex flex-col shrink-0 p-2 z-10 justify-center items-center">
        <div className="absolute right-2 bottom-1 text-right flex flex-col items-end group/logo">
          {logoImage ? (
            <div className="relative">
              <img src={logoImage} alt="Logo da Loja" className="h-16 object-contain" />
              <button 
                onClick={() => onLogoImageChange(null)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover/logo:opacity-100 transition-opacity drop-shadow"
                title="Remover Logo"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="relative">
              <label className="absolute -top-4 -right-2 cursor-pointer bg-white/20 hover:bg-white/40 border border-white/50 text-white text-[8px] px-1 py-[2px] rounded backdrop-blur-md transition-colors shadow-sm opacity-0 group-hover/logo:opacity-100 whitespace-nowrap">
                🖼️ Adicionar Logo
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const url = URL.createObjectURL(file)
                      onLogoImageChange(url)
                    }
                  }} 
                />
              </label>
            </div>
          )}
        </div>
      </header>

      {/* Main White Content Area */}
      <main className="flex-1 bg-white mx-4 rounded-t-[2.5rem] relative flex flex-col items-center overflow-hidden z-20">
        <div className="grid grid-cols-4 grid-rows-3 gap-[2px] pt-2 px-2 pb-1 flex-1 w-[90%] relative">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onProductChange={onProductChange}
              onRemoveBackground={onRemoveBackground}
              processingId={processingId}
            />
          ))}
        </div>
        
        <div className="w-full h-[12px] flex items-center justify-center mb-[5px]">
          <input
            type="text"
            value={disclaimer}
            onChange={(e) => onDisclaimerChange(e.target.value)}
            className="text-[12px] text-gray-800 bg-transparent w-full text-center"
            placeholder="Disclaimer text"
          />
        </div>

        <div className="bg-[#b31919] text-white w-full h-[20px] flex items-center justify-center border-t border-b border-[#801010]">
          <input
            type="text"
            value={deliveryText}
            onChange={(e) => onDeliveryTextChange(e.target.value)}
            className="font-bold text-[8px] tracking-widest bg-transparent w-full text-center outline-none drop-shadow"
            placeholder="Delivery Text"
          />
        </div>
      </main>

      {/* Footer Contact area */}
      <footer className="h-[50px] px-3 flex items-center justify-between text-white shrink-0 z-20 text-[12px] leading-tight mb-1 relative">
        <div className="flex flex-col w-[45%] justify-center mt-1">
          <input type="text" value={social} onChange={(e) => onSocialChange(e.target.value)} className="bg-transparent outline-none font-semibold text-[10px]" />
          <input type="text" value={address} onChange={(e) => onAddressChange(e.target.value)} className="bg-transparent outline-none" />
          <input type="text" value={phone} onChange={(e) => onPhoneChange(e.target.value)} className="bg-transparent outline-none" />
        </div>
        
        <div className="w-[100%] flex flex-wrap items-center justify-end gap-x-[6px] gap-y-[3px] opacity-90 mt-1">
          <WhiteLogo src={logoOboticario} alt="oBoticário" className="w-[40px] h-[40px] object-contain" />
          <WhiteLogo src={logoOui} alt="O.U.i" className="w-[40px] h-[40px] object-contain" />
          <WhiteLogo src={logoMakie} alt="MAKIÊ" className="w-[40px] h-[40px] object-contain" />
          <WhiteLogo src={logoQDB} alt="quem disse, berenice?" className="w-[40px] h-[40px] object-contain" />
          <WhiteLogo src={logoHinode} alt="HINODE" className="w-[40px] h-[40px] object-contain" />
          <WhiteLogo src={logoNatura} alt="natura" className="w-[40px] h-[40px] object-contain" />
          <WhiteLogo src={logoEudora} alt="Eudora" className="w-[40px] h-[40px] object-contain" />
          <WhiteLogo src={logoNina} alt="niina secrets" className="w-[30px] h-[30px] object-contain" />
        </div>
      </footer>
    </div>
  );
};
