export const getPagination = async (
  modelQuery: any,
  page: number,
  limit: number,
) => {
  // Implement pagination
  const result = await modelQuery.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  // Count the records in the table
  const totalCount = await modelQuery.count();

  // Count Total pages
  const totalPages = Math.ceil(totalCount / limit);

  return {
    result,
    totalCount,
    totalPages,
  };
};
