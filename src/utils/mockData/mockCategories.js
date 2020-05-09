const names = [
  "Shopping",
  "Food & Drinks",
  "Bills",
  "Services",
  "Transportation",
  "Entertainment",
  "Health",
  "test1",
  "test2",
  "test3"
];

const colors = [
  "#69a445",
  "#253277",
  "#2dbfa0",
  "#eb9e2b",
  "#712caa",
  "#fe5454",
  "#712caa",
  "#feed54",
  "#fe5454",
  "#712caa"
];

const mockCategories = () => {
  const categories = names.map((name, index) => {
    return {
      name,
      data: parseFloat(((Math.random() * 1000 + 300) / (index + 1)).toFixed(2)),
      color: colors[index]
    };
  });

  return categories;
};

export default mockCategories;
