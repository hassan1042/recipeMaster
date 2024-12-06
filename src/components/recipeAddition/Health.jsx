import React from 'react'

function Health({fats, setFats, carbohydrates, setCarbohydrates, proteins, setProteins,}) {
  return (
    <div className="md:text-[1.1em] md:font-semibold font-serif ">
            <p className="py-3">
              {" "}
              Please Select the correct quantity of the specified elements in
              your recipe:{" "}
            </p>
            <label className="m-3 grow flex">
              Fats: &nbsp; &nbsp;
              <input
                type="range"
                value={fats}
                onChange={(e) => setFats(parseFloat(e.target.value))}
                required
              />{" "}
              &nbsp; &nbsp; {fats}
            </label>
            <label htmlFor="protiens" className="m-3 grow flex">
              Proteins: &nbsp; &nbsp;
              <input
                name="protiens"
                type="range"
                value={proteins}
                onChange={(e) => setProteins(parseFloat(e.target.value))}
                required
              />{" "}
              &nbsp; &nbsp; {proteins}
            </label>
            <label className="m-3 grow flex ">
              Carbohydrates: &nbsp; &nbsp;
              <input
                type="range"
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(parseFloat(e.target.value))}
                required
              />{" "}
              &nbsp; &nbsp; {carbohydrates}
            </label>
          </div>
  )
}

export default Health
