import React from 'react'
import { usePamphletStore } from '../store/usePamphletStore'

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
    img.crossOrigin = 'anonymous';
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

export const Canvas: React.FC = () => {
  const {
   products, themeColor, disclaimer, deliveryText, social, address, phone, backgroundImage, logoImage,
    setProducts, setThemeColor, setDisclaimer, setDeliveryText, setSocial, setAddress, setPhone, setBackgroundImage, setLogoImage
  } = usePamphletStore()

  const handleProductChange = (id: string, field: keyof typeof products[0], value: string) => {
    const newProducts = products.map(p => p.id === id ? { ...p, [field]: value } : p)
    setProducts(newProducts)
  }

  return (
    <div
      className="shadow-2xl relative flex flex-col font-sans group isolate"
      style={{
        width: '14.40cm',
        height: '20.40cm',
        backgroundColor: themeColor,
        // When no background image is set, use a subtle gradient mask over the solid background color
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : `radial-gradient(circle at top, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.2) 100%)`,
        backgroundSize: backgroundImage ? 'cover' : 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: backgroundImage ? 'normal' : 'overlay',
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
              onChange={(e) => setThemeColor(e.target.value)}
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
                setBackgroundImage(url)
              }
            }} 
          />
        </label>
        {backgroundImage && (
          <button 
            onClick={() => setBackgroundImage(null)}
            className="bg-black/20 hover:bg-black/40 border border-black/30 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md transition-colors shadow-sm"
          >
            Remover Fundo
          </button>
        )}
      </div>

      {/* Header Area (~ 18% of height) */}
      <header className="relative h-[18%] flex flex-col shrink-0 p-2 z-10 justify-center items-center">
        {/* Title text */}

        {/* Store Name & Category or Logo */}
        <div className="absolute right-2 bottom-1 text-right flex flex-col items-end group/logo">
          {logoImage ? (
            <div className="relative">
              <img src={logoImage} alt="Logo da Loja" className="h-16 object-contain" />
              <button 
                onClick={() => setLogoImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover/logo:opacity-100 transition-opacity drop-shadow"
                title="Remover Logo"
              >
                ✕
              </button>
            </div>
          ) : (
            <>
              <div className="relative">
                
                {/* Logo Upload Button (Visible on hover when no logo is set) */}
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
                        setLogoImage(url)
                      }
                    }} 
                  />
                </label>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main White Content Area with curved top */}
      <main className="flex-1 bg-white mx-2 rounded-t-[2.5rem] relative flex flex-col items-center overflow-hidden z-20">
        
        {/* Products Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-[2px] pt-2 px-2 pb-1 flex-1 w-[90%] relative">
          {products.slice(0, 12).map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center justify-between px-1 py-[2px] bg-white relative group"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-0 left-0 z-10 overflow-hidden w-12 h-12 pointer-events-none">
                   <input
                     className="bg-[#c2a132] text-white text-[7px] font-bold px-1 w-20 text-center transform -rotate-45 -translate-x-5 translate-y-2 outline-none pointer-events-auto absolute"
                     value={product.badge}
                     onChange={(e) => handleProductChange(product.id, 'badge', e.target.value)}
                     placeholder="NEW"
                   />
                </div>
              )}
              {/* Image box placeholder */}
              <div className="w-25 h-25 bg-gray-50 rounded mb-[2px] flex items-center justify-center overflow-hidden shrink-0 mt-1 relative group/image">
                {product.image ? (
                  <>
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    <button 
                      onClick={() => handleProductChange(product.id, 'image', '')}
                      className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded w-3 h-3 flex items-center justify-center text-[8px] opacity-0 group-hover/image:opacity-100 transition-opacity z-20"
                      title="Remover Imagem"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <span className="text-[8px] text-gray-300">Sem Imagem</span>
                )}
                
                {/* Image Upload Overlay */}
                <label className="absolute inset-0 cursor-pointer hover:bg-black/10 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity z-10 rounded">
                  {!product.image && <span className="text-white text-[8px] font-bold bg-black/50 px-1 py-[2px] rounded drop-shadow">📷 Foto</span>}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const url = URL.createObjectURL(file)
                        handleProductChange(product.id, 'image', url)
                      }
                    }} 
                  />
                </label>
              </div>

              {/* Product Name */}
              <textarea
                value={product.name}
                onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                className="text-gray-900 text-[9px] leading-[10px] text-center w-full resize-none bg-transparent outline-none overflow-hidden h-[30px] font-medium"
                placeholder="Nome do produto"
              />

              {/* Old Price Box */}
              <div className="border border-red-500 rounded-[2px] w-[95%] flex items-center justify-center mb-[2px] h-[13px] bg-white z-10 relative px-1">
                <span className="text-red-600 text-[8px] absolute left-1">de:</span>
                <input
                  type="text"
                  value={product.oldPrice || ''}
                  onChange={(e) => handleProductChange(product.id, 'oldPrice', e.target.value)}
                  className="text-red-700 text-[10px] w-full bg-transparent outline-none text-center font-semibold z-10"
                  placeholder="R$ 0,00"
                />
              </div>

              {/* New Price Box */}
              <div className="bg-[#b31919] text-white rounded-[2px] w-[100%] flex items-center justify-center h-[17px] relative z-10 shadow-sm px-1">
                <span className="text-[8px] leading-none absolute left-1">por:</span>
                <input
                  type="text"
                  value={product.price || ''}
                  onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                  className="text-white text-[14px] font-bold w-full bg-transparent outline-none text-center z-10"
                  placeholder="R$ 0,00"
                />
                <input
                  type="text"
                  value={product.unit || ''}
                  onChange={(e) => handleProductChange(product.id, 'unit', e.target.value)}
                  className="text-white text-[8px] absolute right-1 bottom-[2px] w-[25px] bg-transparent outline-none text-right z-20"
                  placeholder="cada"
                />
              </div>
            </div>
          ))}
        </div>
           {/* Disclaimer */}
        <div className="w-full h-[12px] flex items-center justify-center mb-[5px]">
          <input
            type="text"
            value={disclaimer}
            onChange={(e) => setDisclaimer(e.target.value)}
            className="text-[12px] text-gray-800 bg-transparent w-full text-center"
            placeholder="Disclaimer text"
          />
        </div>
        {/* Delivery Bar */}
        <div className="bg-[#b31919] text-white w-full h-[20px] flex items-center justify-center border-t border-b border-[#801010]">
          <input
            type="text"
            value={deliveryText}
            onChange={(e) => setDeliveryText(e.target.value)}
            className="font-bold text-[8px] tracking-widest bg-transparent w-full text-center outline-none drop-shadow"
            placeholder="Delivery Text"
          />
        </div>
      </main>
      {/* Footer Contact area */}
      <footer className="h-[50px] px-3 flex items-center justify-between text-white shrink-0 z-20 text-[12px] leading-tight mb-1 relative">
        <div className="flex flex-col w-[45%] justify-center mt-1">
          <input type="text" value={social} onChange={(e) => setSocial(e.target.value)} className="bg-transparent outline-none font-semibold text-[10px]" />
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="bg-transparent outline-none" />
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-transparent outline-none" />
        </div>
        
        {/* Logos Replacement */}
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
  )
}
