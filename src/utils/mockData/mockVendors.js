const names = [
  "Vendor Name 1",
  "Vendor Name 2",
  "Vendor Name 3",
  "Vendor Name 4",
  "Vendor Name 5",
  "Vendor Name 6",
  "Vendor Name 7",
  "Vendor Name 8"
];

const mockVendors = () => {
  const vendors = names.map((name, index) => {
    return {
      name,
      price: (Math.random() * 100).toFixed(2),
      time: (Math.random() * 100).toFixed(2)
    };
  });

  return vendors;
};

export default mockVendors;
