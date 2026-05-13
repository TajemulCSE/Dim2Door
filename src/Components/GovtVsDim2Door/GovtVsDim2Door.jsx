import React from 'react';
import './GovtVsDim2Door.css';
import Header from '../Homepage/Header';

const govtPrices = [
  { eggType: 'Deshi Duck Egg', govtPrice: 150 },
  { eggType: 'Layer Chicken White Egg', govtPrice: 130 },
  { eggType: 'Local Quail Egg', govtPrice: 85 },
  { eggType: 'Deshi Chicken Egg', govtPrice: 170 },
  { eggType: 'Purnava Omega Egg', govtPrice: 160 },
  { eggType: 'Purnava Egg', govtPrice: 155 },
  { eggType: 'Paragon Brown Egg', govtPrice: 165 },
  { eggType: 'Layer Chicken Brown Egg', govtPrice: 135 },
];

const dim2doorPrices = [
  { eggType: 'Deshi Duck Egg', minPrice: 155, maxPrice: 165 },
  { eggType: 'Layer Chicken White Egg', minPrice: 135, maxPrice: 145 },
  { eggType: 'Local Quail Egg', minPrice: 85, maxPrice: 95 },
  { eggType: 'Deshi Chicken Egg', minPrice: 175, maxPrice: 185 },
  { eggType: 'Purnava Omega Egg', minPrice: 175, maxPrice: 185 },
  { eggType: 'Purnava Egg', minPrice: 170, maxPrice: 180 },
  { eggType: 'Paragon Brown Egg', minPrice: 170, maxPrice: 190 },
  { eggType: 'Layer Chicken Brown Egg', minPrice: 170, maxPrice: 190 },
];

const GovtVsDim2Door = () => {
  return (
    <>
      <Header />
      <div className="price-compare">
        <h2>Govt. Egg Prices</h2>
        <table className="govt-price-table">
          <thead>
            <tr>
              <th>Egg Type</th>
              <th>Govt. Price (৳)</th>
            </tr>
          </thead>
          <tbody>
            {govtPrices.map((item, idx) => (
              <tr key={idx}>
                <td>{item.eggType}</td>
                <td>{item.govtPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Dim2Door Prices</h2>
        <table className="dim2door-price-table">
          <thead>
            <tr>
              <th>Egg Type</th>
              <th>Min Price (৳)</th>
              <th>Max Price (৳)</th>
              <th>Average Price (৳)</th>
            </tr>
          </thead>
          <tbody>
            {dim2doorPrices.map((item, idx) => {
              const avgPrice = ((item.minPrice + item.maxPrice) / 2).toFixed(2);
              return (
                <tr key={idx}>
                  <td>{item.eggType}</td>
                  <td>{item.minPrice}</td>
                  <td>{item.maxPrice}</td>
                  <td>{avgPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GovtVsDim2Door;
