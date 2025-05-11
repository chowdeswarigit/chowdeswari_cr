import React from 'react';
import leftDecoration from '../../assets/img/Lleft.png';
import rightDecoration from '../../assets/img/Lright.png';
import logoImage from '../../assets/img/logonumerana80.png';
import './SingleComponent.css';

const ResultsHeaderComponent = ({ 
  resultados, 
  nombre, 
  birthdateShow, 
  reload, 
  downloadPdf, 
  getScreenWidth,
  print 
}) => {

  const buttonStyle = {
    // Common styles for both buttons
    marginTop: '0', // Assuming no top margin needed here, adjust if necessary
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '.5rem', // Adjust padding as needed for btn-lg
    paddingBottom: '.5rem' // Adjust padding as needed for btn-lg
  };

  const iconStyle = {
    // Common styles for both icons
    fontSize: '2rem', // Adjust size as needed
    // lineHeight: 'normal' // Usually not needed with flex align-items
  };
  
  return (
    <div className={`containerBox ${resultados ? 'visible' : 'hidden'}`} style={{display: print ? 'block' : 'none'}}>
      <div className="container">
      <div className="row">
        <div className="col-8 person resultado2" style={{ boxShadow: '#858585', borderRadius: '0px', maxWidth: '100%', margin: '0', flex: '100%', border: '0px solid #858585' }}>
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
          
          {/* <h2 className="name bold" style={{color:'#E7E7D680'}}>{nombre}</h2>
          <h2 className="bold footerbox" style={{fontSize:"38.4px" ,color:'#E7E7D680'}}>{birthdateShow}</h2>
          <h2 className="bold footerbox" style={{fontSize:"16px", fontWeight:"400",marginTop:"0px",color:'#E7E7D680' }}>DD  MM  YYY</h2> */}
<div class="birth-container">
  <h2 className="name">{nombre}</h2>
  <div className="birthdate">{birthdateShow}</div>
  <div className="labels">
    <span>DD</span>
    <span>MM</span>
    <span>YY</span>
  </div>
</div>

          <div className="row" style={{ marginBottom: '1rem' }}>
            <div className="col-3"></div>
            <div className="col-3">
              <button
                type="button"
                onClick={reload}
                // If using Bootstrap 5+, replace btn-block with w-100
                className="btn btn-primary btn-lg btn-block send" // or className="btn btn-primary btn-lg w-100 send"
                style={buttonStyle}
              >
                <i className="bi bi-arrow-clockwise" style={iconStyle} ></i> <p>Reset</p>
              </button>
            </div>

            <div className="col-3">
              <button
                type="button"
                onClick={downloadPdf}
                // If using Bootstrap 5+, replace btn-block with w-100
                className="btn btn-primary btn-lg btn-block send" // or className="btn btn-primary btn-lg w-100 send"
                style={buttonStyle}
              >
                <i className="bi bi-printer-fill" style={iconStyle}></i> <p>print</p>
              </button>
            </div>
            <div className="col-3" style={{ display: getScreenWidth ? 'block' : 'none' }}>
              <div className="row">
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-6"><h2 className="website www" style={{ fontSize: '11px', right: '30px' }}>www.numerana.com</h2></div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col-8"><h2 className="website ana" style={{ fontSize: '11px' }}>By: Ana Dorotea</h2></div>
              </div>
            </div>
          </div>
          
          <div className="row" style={{ display: !getScreenWidth ? 'flex' : 'none' }}>
            <div className="col-3"></div>
            <div className="col-5">
              <h2 className="website www" style={{ fontSize: '11px', right: '30px' }}>www.numerana.com</h2><br />
            </div>
            <div className="col-4">
              <h2 className="website ana" style={{ fontSize: '11px' }}>By: Ana Dorotea</h2>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ResultsHeaderComponent; 