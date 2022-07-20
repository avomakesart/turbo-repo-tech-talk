import React, { useEffect, useState } from 'react';
import { NavBar, ProductOverview } from 'ui';
import { useRouter } from 'next/router';
import { products } from '../../utils/products';
import { navigation } from '../../utils';
import { ShoppingBagIcon } from '@heroicons/react/outline';

interface ProductDetailsProps {}

const ProductDetails: React.FC<ProductDetailsProps> = ({}) => {
  const [filteredProduct, setFilteredProduct] = useState<any>([]);
  const [items, setItems] = useState<any>([]);
  const router = useRouter();

  const handleAddToCart = (clickedItem: any) => {
    setItems((prev: any) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item: any) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item: any) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  useEffect(() => {
    products.filter((product) => {
      if (String(product.id).includes(router.query.id as any)) {
        setFilteredProduct(product);
      }
    });

    items.map((val: any) => {
      return localStorage.setItem('items', val.amount as any);
    });

    return () => {};
  }, [items, router.query.id]);

  return (
    <>
      <ProductOverview
        product={filteredProduct}
        reviews={{ href: 'product/1', average: 4, totalCount: 117 }}
        onAddClick={() => handleAddToCart(filteredProduct)}
      />
    </>
  );
};
export default ProductDetails;
