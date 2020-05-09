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

const hours = {
  start: 8,
  end: 21
};

const mockVendor = (amount, index, vendorsNo) => {
  const hour =
    hours.start + Math.round((hours.end - hours.start) / vendorsNo) * index;

  return {
    name: names[Math.floor(Math.random() * names.length)],
    amount: `£${amount}`,
    time: `${hour > 12 ? hour - 12 : hour}:${(
      Math.floor(Math.random() * 60) + 1
    )
      .toString()
      .padStart(2, "0")} ${hour > 12 ? "PM" : "AM"}`
  };
};

export default mockVendor;
