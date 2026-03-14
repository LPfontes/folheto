import React from 'react';
import type { Product } from '../store/usePamphletStore';

interface ProductCardProps {
  product: Product;
  onProductChange: (id: string, field: keyof Product, value: string) => void;
  onRemoveBackground: (productId: string, imageUrl: string) => Promise<void>;
  processingId: string | null;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductChange,
  onRemoveBackground,
  processingId
}) => {
  return (
    <div
      className="flex flex-col items-center justify-between px-1 py-[2px] bg-white relative group"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-0 left-0 z-10 overflow-hidden w-12 h-12 pointer-events-none">
           <input
             className="bg-[#c2a132] text-white text-[7px] font-bold px-1 w-20 text-center transform -rotate-45 -translate-x-5 translate-y-2 outline-none pointer-events-auto absolute"
             value={product.badge}
             onChange={(e) => onProductChange(product.id, 'badge', e.target.value)}
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
              onClick={() => onProductChange(product.id, 'image', '')}
              className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded w-3 h-3 flex items-center justify-center text-[8px] opacity-0 group-hover/image:opacity-100 transition-opacity z-20"
              title="Remover Imagem"
            >
              ✕
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemoveBackground(product.id, product.image!); }}
              disabled={processingId === product.id}
              className={`absolute bottom-0 w-full left-0 ${processingId === product.id ? 'bg-orange-500 opacity-100' : 'bg-blue-500 opacity-0 group-hover/image:opacity-100'} hover:bg-blue-600 text-white flex items-center justify-center text-[7px] py-[2px] transition-opacity z-20 font-bold`}
              title="Remover Fundo"
            >
              {processingId === product.id ? '⏳ Removendo...' : '✨ Remover Fundo'}
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
                onProductChange(product.id, 'image', url)
              }
            }} 
          />
        </label>
      </div>

      {/* Product Name */}
      <textarea
        value={product.name}
        onChange={(e) => onProductChange(product.id, 'name', e.target.value)}
        className="text-gray-900 text-[9px] leading-[10px] text-center w-full resize-none bg-transparent outline-none overflow-hidden h-[40px] font-medium"
        placeholder="Nome do produto"
      />

      {/* Old Price Box */}
      <div className="border border-red-500 rounded-[2px] w-[95%] flex items-center justify-center mb-[1px] h-[14px] bg-white z-10 relative ">
        <span className="text-red-600 text-[8px] absolute left-1">de:</span>
        <input
          type="text"
          value={product.oldPrice || ''}
          onChange={(e) => onProductChange(product.id, 'oldPrice', e.target.value)}
          className="text-red-700 text-[10px] w-full bg-transparent outline-none text-center font-semibold z-10"
          placeholder="R$ 0,00"
        />
      </div>

      {/* New Price Box */}
      <div className="bg-[#b31919] text-white rounded-[2px] w-[100%] flex items-center justify-center h-[16px] relative z-10 shadow-sm">
        <span className="text-[8px] leading-none absolute left-1">por:</span>
        <input
          type="text"
          value={product.price || ''}
          onChange={(e) => onProductChange(product.id, 'price', e.target.value)}
          className="text-white text-[14px] font-bold w-full bg-transparent outline-none text-center z-10"
          placeholder="R$ 0,00"
        />
        <input
          type="text"
          value={product.unit || ''}
          onChange={(e) => onProductChange(product.id, 'unit', e.target.value)}
          className="text-white text-[8px] absolute right-1 bottom-[2px] w-[25px] bg-transparent outline-none text-right z-20"
          placeholder="cada"
        />
      </div>
    </div>
  );
};
