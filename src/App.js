import './App.css';
import Category from './Category';
import axios from 'axios';
import { useEffect, useState } from 'react';

// main function app
function App() {
  // three states
  let [finalCategory, setFinalCategory] = useState([])
  let [finalProducts, setFinalProducts] = useState([])
  let [catName, setCatname] = useState("")

  // get category function
  let getCategory = () => {
    axios.get('https://dummyjson.com/products/categories')
      .then((res) => res.data)
      .then((finalRes) => {
        setFinalCategory(finalRes)
      })
  }
  
  // get product function
  let getProducts = () => {
    axios.get('https://dummyjson.com/products')
      .then((proRes) => proRes.data)
      .then((finalRes) => {
        setFinalProducts(finalRes.products)
      })
  }

  // use effect hook
  useEffect(() => {
    getCategory()
    getProducts()
  }, [])

  // another use effect
  useEffect(() => {
    if (catName !== "") {
      axios.get(`https://dummyjson.com/products/category/${catName}`)
        .then((proRes) => proRes.data)
        .then((finalRes) => {
          setFinalProducts(finalRes.products)
        })
    } else {
      console.log('no name')
    }
  }, [catName])

  // anothr func
  let pItems = finalProducts.map((products, index) => {
    return (
      <ProductItems products={products} key={index} />
    )
  })

  // main function return statement
  return (
    <>
      <div className='py-6 px-4 sm:px-8 lg:px-16'>
        <div className='max-w-[1320px] mx-auto'>
          <h1 className='text-center text-3xl sm:text-4xl font-bold mb-6 sm:mb-10'>Our Products</h1>
          <div className='grid grid-cols-1 md:grid-cols-[30%_auto] gap-5'>
            {/* Category list */}
            <div className="mb-8 md:mb-0">
              <Category finalCategory={finalCategory} catName={catName} setCatname={setCatname} />
            </div>

            {/* Products grid */}
            <div>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                  finalProducts.length >= 1
                    ? pItems
                    : <h1 className='text-2xl text-center font-bold col-span-full'>No Data Found</h1>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// Component for product items design
function ProductItems({ products }) {
  return (
    <div className='shadow-lg text-center pb-4'>
      <img src={products.thumbnail} className='w-full h-[180px] sm:h-[200px] md:h-[220px] object-cover' alt={products.title} />
      <h4 className='text-lg sm:text-xl font-semibold mt-2'>{products.title}</h4>
      <b className='text-md sm:text-lg'> Rs {products.price}</b>
    </div>
  )
}
