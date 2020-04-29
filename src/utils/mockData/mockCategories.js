const names = [
  "Shopping",
  "Food & Drinks",
  "Bills",
  "Services",
  "Transportation",
  "Entertainment",
  "Health"
];

const colors = [
  "#69a445",
  "#253277",
  "#2dbfa0",
  "#eb9e2b",
  "#fe5454",
  "#712caa",
  "#feed54"
];

const mockCategories = names.map((name, index) => {
  return {
    name,
    data: Math.floor((Math.random() * 1000 + 300) / (index + 1)),
    color: colors[index]
  };
});

export default mockCategories;
