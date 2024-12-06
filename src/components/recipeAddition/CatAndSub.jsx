import React from 'react'

function CatAndSub({setCategory, setSubCategory}) {
    const subCats = [
        {
          cat: 'MainCourse',
        },
        {
          cat: 'Breakfast',
        },
        {
          cat: 'Vegan',
        },
        {
          cat: 'Curry',
        },
        {
          cat: 'Snacks',
        },
        {
          cat: 'General',
        },
      ]
      const cats = [
        {
          cat: 'Chineese',
        },
        {
          cat: 'Pakistani',
        },
        {
          cat: 'Italian',
        },
        {
          cat: 'Indian',
        },
        {
          cat: 'Others',
        },
      
      ]
  return (
    <div>
        <div className="max-md:my-3 flex ">
            <label htmlFor="category">
              <i className="font-bold">Select a Category :</i>
              <div>
              {
                cats.map((sub, i) => (
                  <>
                  <input
                  key={i}
                  type="radio"
                  name="category"
                  value={sub.cat}
                  onChange={(e) => setCategory(e.target.value)}
                  className="m-5"
                  required
                />
                {sub.cat}
                </>
                ))
              }
              
              </div>
            </label>
          </div>

          {/* SUb Categories */}
          <div className="">
            <label htmlFor="subCategory">
              <i className="font-bold">Select a SubCategory :</i>
              <div>
              {
                subCats.map((sub, i) => (
                  <>
                  <input
                  key={i}
                  type="radio"
                  name="subCategory"
                  value={sub.cat}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="m-5"
                  required
                />
                {sub.cat}
                </>
                ))
              }
              </div>
            </label>
          </div>
    </div>
  )
}

export default CatAndSub
