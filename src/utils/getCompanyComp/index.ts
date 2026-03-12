const getCompanyComp = (address: string) => {
  if (!address) return { addressRes: "", complement: "" };
  const index = address.lastIndexOf("_");
  if (index === -1) return { addressRes: address, complement: "" };
  return {
    addressRes: address.slice(0, index).trim(),
    complement: address.slice(index + 1).trim(),
  };
};

export { getCompanyComp };
