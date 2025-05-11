import React from 'react';
// import leftDecoration from '../../assets/img/Lleft.png';
import leftDecoration from '../../assets/img/image 2.png';

import rightDecoration from '../../assets/img/Lright.png';
import logoImage from '../../assets/img/logonumerana80.png';
import './SingleComponent.css';

const NumerologyInputFormComponent = ({ 
  isVisible, 
  resultados, 
  nombre, 
  setNombre, 
  birthdate, 
  birthdateShow, 
  handleBirthdateChange, 
  handleSubmit, 
  birthRef 
}) => {
  return (
    <div className={`containerBox ${isVisible ? 'visible' : 'hidden'}`} style={{display: !resultados ? 'flex' : 'none'}}>
      <div className="container">
      <div className="row">
        <div className="col-8 person resultado2" style={{ border: 'box-shadow #858585', borderRadius: '5px',maxWidth: '100%', margin:'0',flex:"100%" }}>
          <div className="row">
            <div className="col-2">
              <img src={leftDecoration} className="Lleft" alt="Left decoration" />
            </div>
            <div className="col-8">
              <img src={logoImage} alt="numeranamx" className="logo" />
              <h1 className="numerologia">Numerology | Numerología</h1>
            </div>
            <div className="col-2">
              <img src={rightDecoration} className="Lright" alt="Right decoration" />
            </div>
          </div>
          
          <h2 className="name bold">{nombre}</h2>
          <h2 className="bold footerbox">{birthdateShow}</h2>
          <br />
          
          <div className="row" id="name">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="Name"><b>Name/Nombre</b></label>
                <input 
                  type="text" 
                  className="form-control textomv" 
                  name="Name" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Name/Nombre" 
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-2"></div>
          </div>
          
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="birth"><b>Birthdate/Cumpleaños</b></label>
                <input
                  className="form-control textomv"
                  placeholder="dd/mm/yyyy"
                  type="text"
                  value={birthdate}
                  onChange={handleBirthdateChange}
                  ref={birthRef}
                  name="birth"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-2"></div>
          </div>
          
          <div className="row" style={{ marginBottom: '1rem' }}>
            <div className="col-3"></div>
            <div className="col-6">
            <button
        style={{
          marginTop: '1rem',
          // Add Flexbox properties for centering
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Adjust padding if needed, especially if removing text
          paddingTop: '.5rem', // Example padding adjustment
          paddingBottom: '.5rem' // Example padding adjustment
        }}
        type="button"
        onClick={handleSubmit}
        // Consider using w-100 instead of btn-block if using Bootstrap 5+
        className="btn btn-primary btn-lg btn-block send" // or className="btn btn-primary btn-lg w-100 send"
      >
        <i
          className="bi bi-play-btn-fill"
          style={{
            // Use font-size or transform: scale() instead of zoom
            fontSize: '1.8rem', // Adjust size as needed
            // Remove lineHeight or set to 'normal' if needed, but Flexbox should handle alignment
            // lineHeight: 'normal'
          }}
        ></i>
        {/* Add text here if needed, e.g., <span>Play</span> */}
      </button>
            </div>
            <div className="col-3">
              <div className="row">
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-6"><h2 className="website www">www.numerana.com</h2></div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col-8"><h2 className="website ana" >By: Ana Dorotea</h2></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default NumerologyInputFormComponent; 