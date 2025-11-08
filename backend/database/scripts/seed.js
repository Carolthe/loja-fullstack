// @ts-check

const UsersFactory = require("../factories/1.UsersFactory");
const ProductsFactory = require("../factories/2.ProductsFactory");
const CategoriesFactory = require("../factories/3.CategoriesFactory");
const ProductsCategoriesFactory = require("../factories/4.ProductsCategoriesFactory");
const FavoritesFactory = require("../factories/5.FavoritesFactory");
const CartFactory = require("../factories/6.CartFactory");
const NewsletterFactory = require("../factories/7.NewsletterFactory");

(async () => {
  try {
    await new UsersFactory().quantity(10).run();
    await new ProductsFactory().quantity(50).run();
    await new CategoriesFactory().quantity(10).run();
    await new ProductsCategoriesFactory().quantity(20).run();
    await new FavoritesFactory().quantity(20).run();
    await new CartFactory().quantity(20).run();
    await new NewsletterFactory().quantity(20).run();
    console.log("🌱 Seed finalizado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao rodar seed:", error);
  }
})();
