const express = require('express');
const router = express.Router();



let categories = [
{
"id": 7,
"name": "Clothes",
"slug": "clothes",
"image": "https://i.imgur.com/QkIa5tT.jpeg",
"creationAt": "2026-02-05T16:51:34.000Z",
"updatedAt": "2026-02-05T16:51:34.000Z"
},
{
"id": 8,
"name": "Electronics",
"slug": "electronics",
"image": "https://i.imgur.com/ZANVnHE.jpeg",
"creationAt": "2026-02-05T16:51:35.000Z",
"updatedAt": "2026-02-05T16:51:35.000Z"
},
{
"id": 9,
"name": "Furniture",
"slug": "furniture",
"image": "https://i.imgur.com/Qphac99.jpeg",
"creationAt": "2026-02-05T16:51:36.000Z",
"updatedAt": "2026-02-05T16:51:36.000Z"
},
{
"id": 10,
"name": "Shoes",
"slug": "shoes",
"image": "https://i.imgur.com/qNOjJje.jpeg",
"creationAt": "2026-02-05T16:51:36.000Z",
"updatedAt": "2026-02-05T16:51:36.000Z"
},
{
"id": 11,
"name": "Miscellaneous",
"slug": "miscellaneous",
"image": "https://i.imgur.com/BG8J0Fj.jpg",
"creationAt": "2026-02-05T16:51:37.000Z",
"updatedAt": "2026-02-05T16:51:37.000Z"
},
{
"id": 13,
"name": "gargantilla",
"slug": "gargantilla",
"image": "https://firebasestorage.googleapis.com/v0/b/pruebasalejandro-597ed.firebasestorage.app/o/gargantilla.jpg?alt=media&token=6bbf8234-5112-4ca8-b130-5e49ed1f3140",
"creationAt": "2026-02-05T21:09:36.000Z",
"updatedAt": "2026-02-05T21:09:36.000Z"
},
{
"id": 15,
"name": "category_B",
"slug": "category-b",
"image": "https://pravatar.cc/",
"creationAt": "2026-02-05T22:04:27.000Z",
"updatedAt": "2026-02-05T22:04:27.000Z"
},
{
"id": 16,
"name": "string",
"slug": "string",
"image": "https://pravatar.cc/",
"creationAt": "2026-02-05T22:04:28.000Z",
"updatedAt": "2026-02-05T22:04:28.000Z"
},
{
"id": 17,
"name": "Anillos",
"slug": "anillos",
"image": "https://firebasestorage.googleapis.com/v0/b/pruebasalejandro-597ed.firebasestorage.app/o/Anillos.jpg?alt=media&token=b7de8064-d4eb-4680-a4e2-ad917838c6c8",
"creationAt": "2026-02-06T02:40:20.000Z",
"updatedAt": "2026-02-06T02:40:20.000Z"
},
{
"id": 18,
"name": "Testing Category",
"slug": "testing-category",
"image": "https://placeimg.com/640/480/any",
"creationAt": "2026-02-06T06:04:54.000Z",
"updatedAt": "2026-02-06T06:04:54.000Z"
}
];


/*
==============================
1️⃣ GET ALL (search theo name)
==============================
*/

router.get('/', (req, res) => {
  const { name } = req.query;

  if (name) {
    const filtered = categories.filter(c =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );
    return res.json(filtered);
  }

  res.json(categories);
});


/*
==============================
2️⃣ GET BY ID
==============================
*/

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const category = categories.find(c => c.id === id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
});


/*
==============================
3️⃣ GET BY SLUG
==============================
*/

router.get('/slug/:slug', (req, res) => {
  const category = categories.find(c => c.slug === req.params.slug);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
});


/*
==============================
4️⃣ CREATE
==============================
*/

router.post('/', (req, res) => {
  const { name, slug, image } = req.body;

  const newCategory = {
    id: Math.max(...categories.map(c => c.id)) + 1,
    name,
    slug,
    image,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  categories.push(newCategory);

  res.status(201).json(newCategory);
});


/*
==============================
5️⃣ EDIT
==============================
*/

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = categories.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Category not found" });
  }

  categories[index] = {
    ...categories[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json(categories[index]);
});


/*
==============================
6️⃣ DELETE
==============================
*/

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = categories.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Category not found" });
  }

  const deleted = categories.splice(index, 1);

  res.json({
    message: "Deleted successfully",
    data: deleted
  });
});

module.exports = router;
