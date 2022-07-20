import { ShoppingBagIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { NavBar, ProductsGrid } from 'ui';
import { navigation, products } from '../utils';

export default function Web() {
  const [cartItems, setCartItems] = useState<any>(0);

  useEffect(() => {
    const items = localStorage.getItem('items');
    setCartItems(items);

    return () => {};
  }, []);

  const itemLength = JSON.parse(cartItems);

  return (
    <>
      <ProductsGrid products={products} />
    </>
  );
}
