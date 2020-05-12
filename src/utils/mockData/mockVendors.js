import nile from "../../assets/icons/vendors/nile.svg";
import boire from "../../assets/icons/vendors/boire.svg";
import stardustCafe from "../../assets/icons/vendors/stardust-cafe.svg";
import sUper from "../../assets/icons/vendors/super.svg";
import hike from "../../assets/icons/vendors/hike.svg";
import bike from "../../assets/icons/vendors/bike.svg";
import pear from "../../assets/icons/vendors/pear.svg";
import macrohard from "../../assets/icons/vendors/macrohard.svg";
import bell from "../../assets/icons/vendors/bell.svg";
import rgos from "../../assets/icons/vendors/rgos.svg";
import hfc from "../../assets/icons/vendors/hfc.svg";

const names = [
  "Nile",
  "Pret-a-Boire",
  "Startdust Cafe",
  "sUper",
  "HIKE",
  "BIKE",
  "Pear",
  "Macrohard",
  "BELL",
  "R-gos",
  "Healthy Food Club"
];

const icons = [
  nile,
  boire,
  stardustCafe,
  sUper,
  hike,
  bike,
  pear,
  macrohard,
  bell,
  rgos,
  hfc
];

const hours = {
  start: 8,
  end: 21
};

export const mockVendor = (amount, index, vendorsNo) => {
  const hour =
    hours.start + Math.round((hours.end - hours.start) / vendorsNo) * index;

  const vendorIndex = Math.floor(Math.random() * names.length);

  return {
    name: names[vendorIndex],
    icon: icons[vendorIndex],
    amount: `£${amount}`,
    time: `${hour > 12 ? hour - 12 : hour}:${(
      Math.floor(Math.random() * 60) + 1
    )
      .toString()
      .padStart(2, "0")} ${hour > 12 ? "PM" : "AM"}`
  };
};

export const buildVendors = (vendorsNo, amount) => {
  let vendors = [];
  let amounts = new Array(vendorsNo).fill(
    parseFloat(parseFloat(amount / vendorsNo).toFixed(2))
  );

  amounts.forEach((amount, index) => {
    if (index % 2) {
      const transfer = (Math.random() * amount).toFixed(2);

      amounts[index - 1] = parseFloat(
        parseFloat(amounts[index - 1] - transfer).toFixed(2)
      );
      amounts[index] = parseFloat(
        parseFloat(amounts[index] + parseFloat(transfer)).toFixed(2)
      );
    }
  });

  for (let i = 1; i <= vendorsNo; i++) {
    const vendor = mockVendor(amounts[i - 1], i, vendorsNo);
    vendors.push(vendor);
  }

  return vendors;
};

