import React from 'react';
import useAllProducts from '../hooks/use-Allproducts.js';
import { useCookies } from 'react-cookie';
import ProductTable from '../Components/ProductTable.js';
import AddProduct from '../Components/AddProduct.js';

const Product = () => {
  const [cookie, _] = useCookies(["access_token"]);
  const userId = localStorage.getItem("userId");
  const { allProducts} = useAllProducts(cookie, userId);
  return (
    <div>
      <div className='w-full flex pr-4 mb-3 justify-end'><AddProduct /></div>
      {allProducts && <ProductTable data={allProducts} />}
    </div>
  );
};

export default Product;
