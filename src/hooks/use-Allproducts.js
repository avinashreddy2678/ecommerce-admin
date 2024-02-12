import useSWR, { mutate } from 'swr';


const useAllProducts = (cookie, userId) => {
  const url = `http://localhost:4001/Product/Allproducts/${userId}`;
  const fetcher = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  const { data, error } = useSWR(url, () => fetcher(url, { headers: { authorization: cookie.access_token } }));
  return {
    allProducts: data?.data || [],
    loading: !data && !error,
    error,
    mutateData: () => mutate(url),
  };
};


export default useAllProducts;
