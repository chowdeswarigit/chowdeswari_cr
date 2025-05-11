import React from 'react';
import PinaculoSvg from '../PinaculoSvg';
import './SingleComponent.css';

const PinaculoChartComponent = ({ pinaculo }) => {
  console.log('...pinaculo...', pinaculo);
  console.log('...pinaculo...', pinaculo?.length);
  return (
    <div className="A">
      {pinaculo && <PinaculoSvg pinaculo={pinaculo} />}
    </div>
  );
};

export default PinaculoChartComponent; 