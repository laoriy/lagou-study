import { CreatePageArgs } from 'gatsby';

const path = require("path")

const createPages = async ({ actions: { createPage } }:CreatePageArgs) => {
  const persons = [
    { slug: "zhangsan", name: "张三", age: 18 },
    { slug: "lisi", name: "李四", age: 19 },
  ];

  // Create a page for each Pokémon.
  persons.forEach((person) => {
    createPage({
      path: `/person/${person.slug}`,
      component: path.resolve("./src/templates/person.tsx"),
      context: { person },
    });
  });
};

module.exports = {
  createPages
}
