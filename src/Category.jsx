import React from 'react'
// Component for Category
export default function Category({ finalCategory,catName,setCatname }) {
  // console.log(finalCategory[0].name)

  let cat = finalCategory.map((v, i) => {
    
    return (
      <li onClick={()=>setCatname(v.name)} className='bg-[#ccc] p-[7px] cursor-pointer text-[20px] font-serif font-[500] mb-2' key={i}>
        {v.name}
      </li>
    )
  })
  return (
    <div>
      <h3 className='text-[25px] font-[500] p-[10px]'>Product Category</h3>

      <ul>
        {cat}
        
      </ul>
    </div>
  )
}


