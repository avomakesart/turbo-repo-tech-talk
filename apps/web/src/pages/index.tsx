import { ProductsGrid } from 'ui';
import { products } from '../utils';

export default function Web() {
  return (
    <>
      <ProductsGrid products={products} />
    </>
  );
}
