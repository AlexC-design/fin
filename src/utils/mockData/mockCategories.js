import shopping from "../../assets/icons/categories/shopping.svg";
import foodDrink from "../../assets/icons/categories/food-drink.svg";
import bills from "../../assets/icons/categories/bills.svg";
import services from "../../assets/icons/categories/services.svg";
import transportation from "../../assets/icons/categories/transportation.svg";
import entertainment from "../../assets/icons/categories/entertainment.svg";
import health from "../../assets/icons/categories/health.svg";
import savings from "../../assets/icons/categories/savings.svg";
import misc from "../../assets/icons/categories/misc.svg";

const icons = [
  shopping,
  foodDrink,
  bills,
  services,
  transportation,
  entertainment,
  health,
  savings,
  misc
];

const names = [
  "Shopping",
  "Food & Drinks",
  "Bills",
  "Services",
  "Transportation",
  "Entertainment",
  "Health",
  "Savings",
  "Misc"
];

const colors = [
  "#71bddd",
  "#2dbfa0",
  "#dacfaa",
  "#c3cdd8",
  "#5461b5",
  "#e67052",
  "#69d1d1",
  "#dfbc63",
  "#6775bb",
  "#7c7c7c"
];

const mockCategories = () => {
  const categories = names.map((name, index) => {
    return {
      icon: icons[index],
      name,
      data: parseFloat(((Math.random() * 1000 + 300) / (index + 1)).toFixed(2)),
      color: colors[index]
    };
  });

  categories.sort((a, b) => b.data - a.data);

  return categories;
};

export default mockCategories;
