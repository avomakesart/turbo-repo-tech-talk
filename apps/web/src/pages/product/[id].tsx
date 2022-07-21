import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ProductOverview } from 'ui';
import { useCartContext } from '../../../../../packages/ui/src/components/cart/use-cart-context';
import { products } from '../../utils/products';

interface ProductDetailsProps {}

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue =
      typeof window !== 'undefined' && window.localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue as any);

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    typeof window !== 'undefined' &&
      window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({}) => {
  const router = useRouter();

  const { increaseCartQuantity } = useCartContext();

  const filteredProduct = products.filter(
    (product) => String(product.id) === router.query.id
  );

  return (
    <>
      {filteredProduct?.map((prod: any, index: number) => (
        <ProductOverview
          key={`${index}-${prod}`}
          product={prod}
          reviews={{ href: 'product/1', average: 5, totalCount: 117 }}
          onAddClick={increaseCartQuantity}
        />
      ))}
    </>
  );
};
export default ProductDetails;
