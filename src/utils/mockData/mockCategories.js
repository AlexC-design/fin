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

function hexToRgba(hex, percentage) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      `, ${percentage})`
    );
  }
  throw new Error("Bad Hex");
}


const colors = [
  { light: "#71bddd", dark: hexToRgba("#71bddd", 0.7) },
  { light: "#2dbfa0", dark: hexToRgba("#2dbfa0", 0.7) },
  { light: "#dacfaa", dark: hexToRgba("#dacfaa", 0.7) },
  { light: "#c3cdd8", dark: hexToRgba("#c3cdd8", 0.7) },
  { light: "#5461b5", dark: hexToRgba("#5461b5", 0.7) },
  { light: "#e67052", dark: hexToRgba("#e67052", 0.7) },
  { light: "#69d1d1", dark: hexToRgba("#69d1d1", 0.7) },
  { light: "#dfbc63", dark: hexToRgba("#dfbc63", 0.7) },
  { light: "#6775bb", dark: hexToRgba("#6775bb", 0.7) },
  { light: "#7c7c7c", dark: hexToRgba("#7c7c7c", 0.7) }
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
