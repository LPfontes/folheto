import React from 'react';
import { usePamphletStore } from '../store/usePamphletStore';
import type { Product } from '../store/usePamphletStore';
import { BasePage } from './BasePage';
import { removeBackground } from '@imgly/background-removal';

export const PageTwo: React.FC = () => {
  const { products, pages, setProducts, updatePageConfig } = usePamphletStore();
  const config = pages[1];

  const [processingId, setProcessingId] = React.useState<string | null>(null);

  const pageProducts = products.slice(12, 24);

  const handleProductChange = (id: string, field: keyof Product, value: string) => {
    const newProducts = products.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProducts(newProducts);
  };

  const handleRemoveBackground = async (productId: string, imageUrl: string) => {
    try {
      setProcessingId(productId);
      const blob = await removeBackground(imageUrl);
      const url = URL.createObjectURL(blob);
      handleProductChange(productId, 'image', url);
    } catch (error) {
      console.error("Error removing background:", error);
      alert("Erro ao remover o fundo da imagem. Tente novamente.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <BasePage 
      products={pageProducts}
      {...config}
      processingId={processingId}
      onThemeColorChange={(color) => updatePageConfig(1, { themeColor: color })}
      onBackgroundImageChange={(url) => updatePageConfig(1, { backgroundImage: url })}
      onLogoImageChange={(url) => updatePageConfig(1, { logoImage: url })}
      onProductChange={handleProductChange}
      onRemoveBackground={handleRemoveBackground}
      onDisclaimerChange={(text) => updatePageConfig(1, { disclaimer: text })}
      onDeliveryTextChange={(text) => updatePageConfig(1, { deliveryText: text })}
      onSocialChange={(text) => updatePageConfig(1, { social: text })}
      onAddressChange={(text) => updatePageConfig(1, { address: text })}
      onPhoneChange={(text) => updatePageConfig(1, { phone: text })}
    />
  );
};
