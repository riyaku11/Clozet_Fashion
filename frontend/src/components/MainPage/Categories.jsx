import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Fashion",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Ethnic",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Party Wear",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Fancy dress",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Business wear",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Casual wear",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Men's wear",
    },
    {
      cateImg: "./images/category/cat8.png",
      cateName: "Children's wear",
    },
    {
      cateImg: "./images/category/cat9.png",
      cateName: "Designer",
    },
    {
      cateImg: "./images/category/cat10.png",
      cateName: "Wedding special",
    },
    {
      cateImg: "./images/category/cat11.png",
      cateName: "Thrift clothes",
    },
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
