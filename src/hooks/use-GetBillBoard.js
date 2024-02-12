import useSWR,{mutate} from 'swr';
const useGetBillBoard = (userId,cookie) => {
    // console.log(userId)
    const url = `http://localhost:4001/Billboard/GetBillboard/${userId}`;
  const fetcher = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
}
const {data,error} = useSWR(url,()=>fetcher(url,{headers:{authorization:cookie.access_token}}))
// console.log(data);
  return {
    response:data?.data,
    error,
    mutateData: () => mutate(url),
  }
}

export default useGetBillBoard;
