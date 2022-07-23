import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Color, ProductOverview, Size } from 'ui';
import { useCartContext } from '../../../../../packages/ui/src/components/cart/use-cart-context';
import { products } from '../../utils/products';
import toast from 'react-hot-toast';

interface ProductDetailsProps {}

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
