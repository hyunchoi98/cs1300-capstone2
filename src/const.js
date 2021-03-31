export const cardlist = [
  { id: 1, name: "Amex Centurion", fee: 5000, type: "Personal", issuer: "American Express", image: "./static/amexcenturion.jpg", link: "https://en.wikipedia.org/wiki/Centurion_Card" },
  { id: 2, name: "Amex Gold", fee: 250, type: "Personal", issuer: "American Express", image: "./static/amexgold.png", link: "https://www.americanexpress.com/us/credit-cards/card/gold-card/" },
  { id: 3, name: "Amex Platinum", fee: 550, type: "Personal", issuer: "American Express", image: "./static/amexplat.png", link: "https://www.americanexpress.com/us/credit-cards/card/platinum/" },
  { id: 4, name: "BoA Cash Rewards", fee: 0, type: "Personal", issuer: "Bank of America", image: "./static/boacash.png", link: "https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/" },
  { id: 5, name: "BoA Travel Rewards", fee: 0, type: "Personal", issuer: "Bank of America", image: "./static/boatravel.png", link: "https://www.bankofamerica.com/credit-cards/products/travel-rewards-credit-card/" },
  { id: 6, name: "Chase Freedom Flex", fee: 0, type: "Personal", issuer: "Chase", image: "./static/cff.jpg", link: "https://creditcards.chase.com/cash-back-credit-cards/freedom/flex" },
  { id: 7, name: "Chase Freedom Unlimited", fee: 0, type: "Personal", issuer: "Chase", image: "./static/cfu.jpg", link: "https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited" },
  { id: 8, name: "Chase Ink Cash", fee: 0, type: "Business", issuer: "Chase", image: "./static/cic.png", link: "https://creditcards.chase.com/business-credit-cards/ink/cash" },
  { id: 9, name: "Chase Ink Preferred", fee: 95, type: "Business", issuer: "Chase", image: "./static/cip.png", link: "https://creditcards.chase.com/business-credit-cards/ink/business-preferred" },
  { id: 10, name: "Chase Sapphire Preferred", fee: 95, type: "Business", issuer: "Chase", image: "./static/csp.png", link: "https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred" },
  { id: 11, name: "Chase Sapphire Reserve", fee: 550, type: "Personal", issuer: "Chase", image: "./static/csr.png", link: "https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve" },
  { id: 12, name: "JetBlue Plus", fee: 99, type: "Personal", issuer: "Barclaycard", image: "./static/jbp.jpg", link: "https://cards.barclaycardus.com/banking/cards/jetblue-plus-card/" },
];

export const CardTypes = {
  ALL_TYPES: "All Types",
  BUSINESS: "Business",
  PERSONAL: "Personal",
};

export const Issuers = {
  ALL_ISSUERS: "All Issuers",
  AMEX: "American Express",
  BOA: "Bank of America",
  CHASE: "Chase",
  BARC: "Barclaycard",
};

export const AnnualFees = {
  ALL_FEES: "Any Annual Fee",
  ZERO: "None",
  LESSTHAN300: "<$300",
  MORETHAN300: ">$300",
};

export const SortTypes = {
  NAME: "Name (A to Z)",
  BONUS: "Bonus (Highest to Lowest)",
  FEE: "Annual Fee (Lowest to Highest)",
}