const serialNumber = (index, currentPage, pageSize) => {
  return (currentPage - 1) * pageSize + index + 1;
};

// To remove function overload in the loop
const serialNum = (currentPage, pageSize)=>{
  return (currentPage - 1) * pageSize + 1;
}

const pageSummary = (currentPage, pageSize, totalCount, currentData = []) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = start + currentData.length - 1;
  return `Showing ${start} to ${end} of ${totalCount}`;
};

const pageSummaryEnhanced = (start, totalCount, currentData = []) => {
  const end = start + currentData.length - 1;
  return `Showing ${start} to ${end} of ${totalCount}`;
};

export { serialNumber, pageSummary, serialNum, pageSummaryEnhanced };
