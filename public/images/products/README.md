# Product Images Folder

Place all product images in this folder (`public/images/products/`).

## Image Path Reference in React

Any image placed in this folder is served statically and can be referenced in `src/components/Products.jsx` using:
`'/images/products/filename.ext'`

### Example:
If you place a file named `amoxicillin.png` in this folder, you can link it to a product in `Products.jsx` like this:
```javascript
{ 
  id: 1, 
  name: 'Amoxicillin 500mg', 
  category: 'capsules', 
  type: 'Antibiotic', 
  description: 'Broad-spectrum antibiotic capsules',
  image: '/images/products/amoxicillin.png' 
}
```
