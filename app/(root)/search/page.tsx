const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;
  console.log(q, category, price, rating, sort, page);
  //   const product = await getAllProducts({
  //     query: q,
  //     category,
  //     price,
  //     rating,
  //     sort,
  //     page: Number(page),
  //   });
  return <div>SearchPage</div>;
};
export default SearchPage;
