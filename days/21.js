// const temp0 = document.body.getElementsByTagName('pre')[0];
// const lines = temp0.textContent.trim().split("\n").filter(value => value);

const temp0 = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;
const lines = temp0.trim().split("\n").filter(value => value);

const ingredientList = [];
let ingredients = new Set();
const allergenList = {};

for (const line of lines) {
  const parts = line.split(" (contains ");

  const ingredients = parts[0].split(' ');
  const allergens = parts[1].slice(0, -1).split(', ');

  products.push([ingredients.sort(), allergens.sort()]);
  ingredients.forEach(ingredient => ingredientList.push(new Set(ingredient)));
  allergens.forEach((allergen) => allergenList.pus(new Set(allergen)));
}

const found = {};

const intersection = (first, second) => {
    return first.filter((element) => second.includes(element));
}
  
const findProductAllergen = (productList, ingredients, allergens) => {
  for (const [productId, [productIng, productAlg]] of productList.entries()) {
    if (productList.includes(productId)) {
        return;
    }

    const nextIngredient = intersection(ingredients, productIng).filter((i) => !Object.values(found).includes(i));
    const nextAllergen = intersection(allergens, productAlg).filter((i) => !Object.keys(found).includes(i));

    if (nextIngredient.length === 0 || nextAllergen.length === 0) {
        continue;
    }

    if (nextIngredient.length === nextAllergen.length) {
      for (const [index, ingredient] of nextIngredient.entries()) {
        const allergen = nextAllergen[index];
        found[allergen] = ingredient;
      }
    }
    findProductAllergen([...productList, productId], nextIngredient, nextAllergen);
  }
}

while (true) {
  const before = Object.keys(found).length;
  findProductAllergen([], [...ingredientList], [...allergenList]);
  const after = Object.keys(found).length;
  if (after === allergenList.size) {
    console.log("good");
    break;
  }
  if (before === after) {
    console.log("stuck");
    break;
  }
}

const safeIngredients = [...ingredientList].filter((ingredients) => !Object.values(found).includes(ingredients));

const part1 = products.reduce((acc, [ingredientList]) => acc + intersection(ingredientList, safeIngredients).length, 0);
const part2 = Object.keys(found)
  .sort()
  .map((a) => found[a])
  .join(",");

  console.log(part1);
  console.log(part2);