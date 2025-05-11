import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import PinaculoChartComponent from './couple/PinaculoChartComponent';
import DesktopMonthGridComponent from './common/DesktopMonthGridComponent';
import DesktopDayGridComponent from './common/DesktopDayGridComponent';
import YearChartComponent from './common/YearChartComponent';
import CoupleYearChart from './coupleYearChat';
// Import utility functions
import { calculosUtils } from '../utils/calculosUtils';
import * as newCalculationUtils from '../utils/newCalculationUtils'; // Updated import

// Import Bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import images
import leftDecoration from '../assets/img/Lleft.png';
import rightDecoration from '../assets/img/Lright.png';
import logoImage from '../assets/img/logonumerana80.png';
import leftDownDecoration from '../assets/img/image3.png';
import rightDownDecoration from '../assets/img/Lright.png.png';
import './CoupleComponent.css';

const CoupleComponent = () => {
  // State variables for person 1
  const [nombre, setNombre] = useState('saurav');
  const [birthdate, setBirthdate] = useState('11/11/1984');
  
  // State variables for person 2
  const [nombre2, setNombre2] = useState('kumar');
  const [birthdate2, setBirthdate2] = useState('11/01/1999');
  
  // UI state variables
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [resultados, setResultados] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  
  // Mobile month/year selection state
  const [mobilMesSelect, setMobilMesSelect] = useState({
    year: 0,
    Month: 0,
  });
  
  // Pinaculo data for both individuals
  const [rpinaculo, setRpinaculo] = useState([]);
  const [rpinaculo2, setRpinaculo2] = useState([]);
  const [rpinaculo3, setRpinaculo3] = useState([]);
  const [coupleYearData,setCoupleYearData] = useState([])
  
  // Year data for both individuals
  const [pinYear, setPinYear] = useState([]);
  const [pinYear2, setPinYear2] = useState([]);
  
  // Sinastra data (couple compatibility)
  const [sinastra, setSinastra] = useState([]);
  
  // Monthly data
  const [listMobileM, setListMobileM] = useState([]);
  
  // Swiper indices
  const [index, setIndex] = useState(0);
  const [indexMobil, setIndexMobil] = useState(0);
  const [indexSina, setIndexSina] = useState(0);
  
  // Screen size detection
  const [getScreenWidth, setGetScreenWidth] = useState(true);
  
  // Constants for current year data
  const thisY = new Date();
  const year = thisY.getFullYear();
  const nxYear = thisY.getFullYear() + 1;
  
  // Month visibility state
  const [monthsVisible, setMonthsVisible] = useState({
    CYQ1: false,
    CYQ2: false,
    CYQ3: false,
    NYQ: false,
  });
  
  // Refs
  const contentRef = useRef(null);
  const birth1Ref = useRef(null);
  const birth2Ref = useRef(null);
  const myScrollContainerRef = useRef(null);
  const swiperRef = useRef(null);
  const swiperAnoRef = useRef(null);
  const swiperSinaRef = useRef(null);
  const swiperMbRef = useRef(null);
  
  // Swiper configurations
  const swiperConfig = {
    spaceBetween: 10,
    navigation: true,
    modules: [Navigation],
  };
  
  const swiperConfigSina = {
    spaceBetween: 5,
    navigation: true,
    modules: [Navigation],
  };

  const yearSliderSettings = {
    modules: [Navigation], // Add Pagination if you want dots: import { Navigation, Pagination } from 'swiper/modules';
    spaceBetween: 10,
    slidesPerView: 1,
    navigation: true, // Shows arrows
    // pagination: { clickable: true }, // Uncomment and import Pagination + CSS if you want dots
    loop: false, // Set to true if you want it to loop
  };
  
  // Initialize the component
  useEffect(() => {
    // Set screen width detection
    const handleResize = () => {
      setGetScreenWidth(window.innerWidth > 600);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Initial loading animation
    theLoading(1500).then(() => {
      setIsVisible(true);
    });
    
    // Determine current month and set visibility
    // getCurrentMonth();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Update swiper indexes when they change
  useEffect(() => {
    if (resultados && swiperRef.current && swiperSinaRef.current && swiperMbRef.current) {
      if (getScreenWidth) {
        swiperRef.current.swiper.slideTo(index);
        swiperSinaRef.current.swiper.slideTo(indexSina);
      } else {
        swiperMbRef.current.swiper.slideTo(indexMobil);
      }
    }
  }, [resultados, index, indexMobil, indexSina, getScreenWidth]);
  
  // Update mobilMesSelect when listMobileM changes
  useEffect(() => {
    if (listMobileM.length > 1 && mobilMesSelect.year === 0) {
      // Initialize with the first valid month
      setMobilMesSelect({
        year: listMobileM[1].year,
        Month: listMobileM[1].month
      });
    }
  }, [listMobileM, mobilMesSelect.year]);
  
  // Loading animation function
  const theLoading = (loadingTime = 3500) => {
    return new Promise((resolve) => {
      if (loading) {
        setTimeout(() => {
          setLoading(false);
          return resolve(true);
        }, loadingTime);
      } else {
        setLoading(true);
        return resolve(true);
      }
    });
  };
  
  // Get current month and set visibilities
  // const getCurrentMonth = async () => {
  //   try {
  //     const meshoy = await calculosUtils.getTodaysMonth();
  //     if (meshoy === 1 || meshoy === 2) {
  //       setMonthsVisible({
  //         CYQ1: true,
  //         CYQ2: true,
  //         CYQ3: true,
  //         NYQ: false,
  //       });
  //     } else if (meshoy === 3) {
  //       setMonthsVisible({
  //         CYQ1: false,
  //         CYQ2: false,
  //         CYQ3: true,
  //         NYQ: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error getting current month:', error);
  //   }
  // };
  
  // Form submission
  const subm = () => {
    console.log('nombre', nombre);
    console.log('birthdate', birthdate);
    console.log('nombre2', nombre2);
    console.log('birthdate2', birthdate2);
    
    if (!birthdate || !birthdate2) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        html: "Both birthdates are required.<br>Ambas fechas de nacimiento son necesarias.",
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
    
    // Parse dates
    const fixDate = birthdate.split('/');
    const fixDate2 = birthdate2.split('/');
    
    if (fixDate.length < 3 || fixDate2.length < 3) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        html: "Check birthdate format (DD/MM/YYYY).<br>Verifica el formato de fecha (DD/MM/AAAA).",
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
    
    // Validate dates
    const dateString1 = `${fixDate[1]}-${fixDate[0]}-${fixDate[2]}`;
    const dateString2 = `${fixDate2[1]}-${fixDate2[0]}-${fixDate2[2]}`;
    const [day1, month1, year1] = fixDate.map((part) => parseInt(part, 10));
    const [day2, month2, year2] = fixDate2.map((part) => parseInt(part, 10));

    // Get the current year
    const chartYear = new Date().getFullYear();
    
    // Process calculations
    setLoading(true);
    setIsVisible(false);
    
    try {
      // Calculate for person 1
      const pinaculo1 = newCalculationUtils.calculatePersonalityPinaculo(birthdate);
      console.log('.....birthdate .......', birthdate, '..................', pinaculo1);
      setRpinaculo(pinaculo1);

      const yearData1 = newCalculationUtils.generateAnnualChart(month1, day1, year1, chartYear);
      setPinYear([yearData1]);

      // Calculate for person 2
      const yearchatadata = newCalculationUtils.generateCoupleYearlyChart(birthdate,birthdate2,chartYear)
      console.log('yearchatadata', yearchatadata);
      setCoupleYearData([yearchatadata])
      const pinaculo2 = newCalculationUtils.calculatePersonalityPinaculo(birthdate2);
      setRpinaculo2(pinaculo2);
      calculateCoupleCompatibility(pinaculo1, pinaculo2);
      const yearData2 = newCalculationUtils.generateAnnualChart(month2, day2, year2, chartYear);
      setPinYear2([yearData2]);
      // List months
      listMonths();
      
      // Show results
      setResultados(true);
      
      // Scroll to results after a short delay
      setTimeout(() => {
        if (myScrollContainerRef.current) {
          myScrollContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } catch (error) {
      console.error('Error in calculations:', error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Calculation Error",
        html: "An error occurred during calculations.<br>Ocurrió un error durante los cálculos.",
        showConfirmButton: false,
        timer: 2500
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(coupleYearData,"chowdeswarirpinaculo data")
  console.log(pinYear,"chowdeswarirpinaculo data")
  // Calculate couple compatibility
  // const calculateCoupleCompatibility = (person1, person2) => {
  //   try {
  //     // Enhanced implementation with proper algorithm
  //     const combinedSinastra = {
  //       A: calculosUtils.sum(parseInt(person1.A) || 0, parseInt(person2.A) || 0),
  //       B: calculosUtils.sum(parseInt(person1.B) || 0, parseInt(person2.B) || 0),
  //       C: calculosUtils.sum(parseInt(person1.C) || 0, parseInt(person2.C) || 0),
  //       D: calculosUtils.sum(parseInt(person1.D) || 0, parseInt(person2.D) || 0),
  //       E: calculosUtils.sum(parseInt(person1.top) || 0, parseInt(person2.top) || 0),
  //       NA: person1.A,
  //       NB: person1.B,
  //       NC: person1.C,
  //       ND: person1.D,
  //       NE: person2.A,
  //       NF: person2.B,
  //       NG: person2.C,
  //       NH: person2.D
  //     };
      
  //     setSinastra([combinedSinastra]);
      
  //     // Third combined result
  //     const combinedPinaculo = {
  //       A: calculosUtils.sum(parseInt(person1.A) || 0, parseInt(person2.A) || 0),
  //       B: calculosUtils.sum(parseInt(person1.B) || 0, parseInt(person2.B) || 0),
  //       C: calculosUtils.sum(parseInt(person1.C) || 0, parseInt(person2.C) || 0),
  //       D: calculosUtils.sum(parseInt(person1.D) || 0, parseInt(person2.D) || 0),
  //       top: calculosUtils.sum(parseInt(person1.top) || 0, parseInt(person2.top) || 0),
  //     };
      
  //     setRpinaculo3([combinedPinaculo]);
  //   } catch (error) {
  //     console.error('Error in compatibility calculation:', error);
  //   }
  // };
  const calculateCoupleCompatibility = (person1, person2) => {
     console.log(person1[0], "person1 data")
    try {
      const combinedSinastra = {
        A: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].A) + parseInt(person2[0].A))),
        B: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].B) + parseInt(person2[0].B))),
        C: newCalculationUtils.reduceNumber(parseInt(person1[0].C) + parseInt(person2[0].C)),
        D: newCalculationUtils.reduceNumber(parseInt(person1[0].D) + parseInt(person2[0].D)),
        N1: newCalculationUtils.reduceNumber(parseInt(person1[0].N1) + parseInt(person2[0].N1)),
        N2: newCalculationUtils.reduceNumber(parseInt(person1[0].N2) + parseInt(person2[0].N2)),
        N3: newCalculationUtils.reduceNumber(parseInt(person1[0].N3) + parseInt(person2[0].N3)),
        N4: newCalculationUtils.reduceNumber(parseInt(person1[0].N4) + parseInt(person2[0].N4)),
        P1: newCalculationUtils.reduceNumber(parseInt(person1[0].P1) + parseInt(person2[0].P1)),
        P2: newCalculationUtils.reduceNumber(parseInt(person1[0].P2) + parseInt(person2[0].P2)),
        P3: newCalculationUtils.reduceNumber(parseInt(person1[0].P3) + parseInt(person2[0].P3)),
        P4: newCalculationUtils.reduceNumber(parseInt(person1[0].P4) + parseInt(person2[0].P4)),
        P5: newCalculationUtils.reduceNumber(parseInt(person1[0].P5) + parseInt(person2[0].P5)),
        bottom: newCalculationUtils.reduceNumber(parseInt(person1[0].bottom) + parseInt(person2[0].bottom)),
        top: newCalculationUtils.reduceNumber(parseInt(person1[0].top) + parseInt(person2[0].top)),
      
      };
      
      setSinastra([combinedSinastra]);
      
      const combinedPinaculo = {
        A: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].A) + parseInt(person2[0].A))),
        B: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].B) + parseInt(person2[0].B))),
        C: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].C) + parseInt(person2[0].C))),
        D: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].D) + parseInt(person2[0].D))),
        N1: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].N1) + parseInt(person2[0].N1))),
        N2: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].N2) + parseInt(person2[0].N2))),
        N3:newCalculationUtils.formatNumber( newCalculationUtils.reduceNumber(parseInt(person1[0].N3) + parseInt(person2[0].N3))),
        N4: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].N4) + parseInt(person2[0].N4))),
        P1: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].P1) + parseInt(person2[0].P1))),
        P2:newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].P2) + parseInt(person2[0].P2))),
        P3: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].P3) + parseInt(person2[0].P3))),
        P4: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].P4) + parseInt(person2[0].P4))),
        P5: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].P5) + parseInt(person2[0].P5))),
        bottom: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].bottom) + parseInt(person2[0].bottom))),
        top: newCalculationUtils.formatNumber(newCalculationUtils.reduceNumber(parseInt(person1[0].top) + parseInt(person2[0].top))),
      };
      
      
      setRpinaculo3([combinedPinaculo]);
    } catch (error) {
      console.error('Error in compatibility calculation:', error);
    }
  };
  
  console.log(rpinaculo3,"chowdeswarirpinaculo3 data")
  // List months data
  const listMonths = () => {
    setListMobileM([]);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based
    
    // Generate months for the current year and next year
    const months = [];
    
    // Add a placeholder option
    months.push({
      month: 0,
      year: 0,
      name: "Month/Mes",
      data: null
    });
    
    // Current year months
    for (let m = 1; m <= 12; m++) {
      if (m >= currentMonth - 1) { // Include one month before current month
        months.push({
          month: m,
          year: currentYear,
          name: getMonthName(m),
          data: calculateMonthData(m, currentYear)
        });
      }
    }
    
    // Next year months for the first quarter
    for (let m = 1; m <= 3; m++) {
      months.push({
        month: m,
        year: currentYear + 1,
        name: getMonthName(m),
        data: calculateMonthData(m, currentYear + 1)
      });
    }
    
    setListMobileM(months);
    
    // Initialize mobilMesSelect with first valid month if not already set
    if (mobilMesSelect.year === 0 && months.length > 1) {
      setMobilMesSelect({
        year: months[1].year,
        Month: months[1].month
      });
    }
  };
  
  // Get month name in English/Spanish
  const getMonthName = (month) => {
    const monthNames = [
      'JAN/ENE', 'FEB', 'MAR', 'APR/ABR', 'MAY', 'JUN',
      'JUL', 'AUG/AGO', 'SEP', 'OCT', 'NOV', 'DEC/DIC'
    ];
    
    return monthNames[month - 1] || '';
  };
  
  // Calculate numerological data for a specific month
  const calculateMonthData = (month, year) => {
    if (!birthdate || !birthdate2) return null;
    
    try {
      // Simple placeholder calculation - this should be expanded with the actual algorithm
      const monthNumber = newCalculationUtils.reduceNumber(month, year % 10);
      
      const data1 = newCalculationUtils.reduceNumber(
        // newCalculationUtils.cleanint(rpinaculo[0]?.top) || 0,
        parseInt(monthNumber) || 0
      );
      
      const data2 = newCalculationUtils.reduceNumber(
        // newCalculationUtils.cleanint(rpinaculo2[0]?.top) || 0,
        parseInt(monthNumber) || 0
      );
      
      return {
        combined: newCalculationUtils.reduceNumber(data1, data2),
        person1: data1,
        person2: data2
      };
    } catch (error) {
      console.error('Error in month calculation:', error);
      return null;
    }
  };
  
  // Handle month selection in mobile view
  const callMesMobil = (event) => {
    console.log('Selected month:', event);
    
    try {
      const selectedMonth = listMobileM[event] || null;
      if (selectedMonth) {
        // Set loading state
        setSmallLoading(true);
        
        // Update mobile month selection state
        setMobilMesSelect({
          year: selectedMonth.year || 0,
          Month: selectedMonth.month || 0
        });
        
        // Process the data (placeholder)
        setTimeout(() => {
          setSmallLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error('Error in month selection:', error);
      setSmallLoading(false);
    }
  };
  
  // Reload page
  const reload = () => {
    setNombre('');
    setNombre2('');
    setBirthdate('');
    setBirthdate2('');
    setRpinaculo([]);
    setRpinaculo2([]);
    setRpinaculo3([]);
    setPinYear([]);
    setPinYear2([]);
    // setSinastra([]);
    setListMobileM([]);
    setResultados(false);
    setIsVisible(true);
    setIndex(0);
    setIndexMobil(0);
    setIndexSina(0);
  };
  
  // Handle Swiper slide changes
  const slideChange = (swiper) => {
    setIndex(swiper.activeIndex);
  };
  
  const slideChangeMobil = (swiper) => {
    setIndexMobil(swiper.activeIndex);
  };
  
  const slideChangeSina = (swiper) => {
    setIndexSina(swiper.activeIndex);
  };
  console.log(rpinaculo,"chowdeswarirpinaculo data")
  // Handle birthdate input with mask
  const handleBirthdateChange = (e, setPerson) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    
    // Format with slashes
    if (value.length > 0) {
      if (value.length <= 2) {
        setPerson(value);
      } else if (value.length <= 4) {
        setPerson(`${value.slice(0, 2)}/${value.slice(2)}`);
      } else {
        setPerson(`${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`);
      }
    } else {
      setPerson('');
    }
  };
  
  // Render loading animation
  const renderLoading = () => (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
  
  // Render input form
  const renderForm = () => (
    <div 
      className="couple-container" 
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        border: '0px solid #858585', 
        borderRadius: '0px',
        margin: '0px',
        maxWidth: '100%', // updated here
      }}
    >
      <div className="container">
      <div className="couple-content">
        <div className="couple-row couple-resultado2">
          <div className="couple-col-1">
            <img src={leftDecoration} alt="Left decoration" className="couple-lleft" />
          </div>
          <div className="couple-col-8" style={{ textAlign: 'center' }}>
            <img src={logoImage} alt="numeranamx" className="couple-logo" style={{ height: '80px' }} />
            <h1 className="couple-titulo">Numerology | Numerología</h1>
          </div>
          <div className="couple-col-1">
            <img src={rightDecoration} alt="Right decoration" className="couple-lright" />
          </div>
        </div>
        
        <div className="couple-row">
          <div className="couple-col-2"></div>
          <div className="couple-col-3">
            <h2 className="couple-name couple-bold couple-titulo">{nombre}</h2>
          </div>
          <div className="couple-col-1"></div>
          <div className="couple-col-3">
            <h2 className="couple-name couple-bold couple-titulo">{nombre2}</h2>
          </div>
          <div className="couple-col-2"></div>
        </div>
        
        <br />
        
        <div className="couple-row">
          <div className="couple-col-2"></div>
          <div className="couple-col-3" style={{ textAlign: 'center' }}>
            <span className="couple-masc">
              <b className='icon-style'>1</b>
              <i className="bi bi-person-fill couple-iconin"></i>
            </span>
          </div>
          <div className="couple-col-2"></div>
          <div className="couple-col-3" style={{ textAlign: 'center' }}>
            <span className="couple-masc">
              <b className='icon-style'>2</b>
              <i className="bi bi-person-fill couple-iconin"></i>
            </span>
          </div>
          <div className="couple-col-2"></div>
        </div>
        
        <div className="couple-row" id="name">
          <div className="couple-col-2 couple-telefono"></div>
          <div className="couple-col-3" style={{ textAlign: 'center' }}>
            <div className="couple-form-group">
              <label htmlFor="name1"><b style={{color:"#E7E7D6"}}>Name/Nombre</b></label>
              <input 
                type="text" 
                id="name1"
                autoComplete="off" 
                className="couple-form-control couple-nombres" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Name/Nombre" 
              />
            </div>
          </div>
          <div className="couple-col-2"></div>
          <div className="couple-col-3">
            <div className="couple-form-group" style={{ textAlign: 'center' }}>
              <label htmlFor="name2"><b style={{color:"#E7E7D6"}}>Name/Nombre</b></label>
              <input 
                type="text" 
                id="name2"
                autoComplete="off" 
                className="couple-form-control couple-nombres" 
                value={nombre2}
                onChange={(e) => setNombre2(e.target.value)}
                placeholder="Name/Nombre" 
              />
            </div>
          </div>
          <div className="couple-col-2"></div>
        </div>
        
        <div className="couple-row" style={{ textAlign: 'center' }}>
          <div className="couple-col-2 couple-telefono"></div>
          <div className="couple-col-3">
            <div className="couple-form-group">
              <label htmlFor="birth1"><b style={{color:"#E7E7D6"}}>Birthdate/Cumple</b></label>
              <input
                className="couple-form-control couple-nombres"
                id="birth1"
                autoComplete="off"
                placeholder="dd/mm/yyyy"
                type="tel"
                value={birthdate}
                onChange={(e) => handleBirthdateChange(e, setBirthdate)}
                ref={birth1Ref}
              />
            </div>
          </div>
          <div className="couple-col-2"></div>
          <div className="couple-col-3">
            <div className="couple-form-group">
              <label htmlFor="birth2">< b style={{color:"#E7E7D6"}}>Birthdate/Cumple</b></label>
              <input
                className="couple-form-control couple-nombres"
                id="birth2"
                autoComplete="off"
                placeholder="dd/mm/yyyy"
                type="tel"
                value={birthdate2}
                onChange={(e) => handleBirthdateChange(e, setBirthdate2)}
                ref={birth2Ref}
              />
            </div>
          </div>
          <div className="couple-col-2"></div>
        </div>
        
        <div className="couple-row" style={{ marginBottom: '1rem' }}>
          <div className="couple-col-3"></div>
          <div className="couple-col-6">
            <button 
              style={{ marginTop: '1rem' }} 
              type="button" 
              onClick={subm} 
              className="couple-btn couple-btn-primary couple-btn-lg couple-btn-block couple-send"
            >
              <i className="bi bi-play-btn-fill" style={{ zoom: 2, lineHeight: 1 }}></i>
            </button>
          </div>
          <div className="couple-col-3">
            <div className="couple-row">
              <div className="couple-col-3"></div>
              <div className="couple-col-3"></div>
              <div className="couple-col-6"><h2 className="couple-website" style={{ fontSize: '11px' }}>www.numerana.com</h2></div>
            </div>
            <div className="couple-row">
              <div className="couple-col-2"></div>
              <div className="couple-col-2"></div>
              <div className="couple-col-8"><h2 className="couple-website couple-ana" style={{ fontSize: '11px',marginLeft:"50px" }}>By: Ana Dorotea</h2></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );

  // Render monthly chart for desktop view
  const renderMonthlyChart = (month) => {
    if (!month || !month.data) return null;
    
    return (
      <div className="month-forecast">
        <div className="month-detail">
          <div className="forecast-row">
            <div className="forecast-column">
              <p className="month-person">{nombre}</p>
              <div className="month-value">
                {month.data.person1}
              </div>
            </div>
            <div className="forecast-column center">
              <p className="month-combined">Combined</p>
              <div className="month-value combined">
                {month.data.combined}
              </div>
            </div>
            <div className="forecast-column">
              <p className="month-person">{nombre2}</p>
              <div className="month-value">
                {month.data.person2}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render small loading indicator
  const renderSmallLoading = () => (
    <div className="small-loading">
      <div className="spinner-border spinner-border-sm" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  // Render results
  const renderResults = () => (
    <>
    <div 
      className="couple-container" 
      style={{
        opacity: resultados ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        border: '0px solid #858585', 
        borderRadius: '0px',
        margin: '0px',
        maxWidth: '100%', // updated here 
      }}
      ref={myScrollContainerRef}
    >
      <div className="container">
      <div className="couple-row couple-resultado2">
        <div className="couple-col-2">
          <img src={leftDecoration} alt="Left decoration" className="couple-lleft" />
        </div>
        <div className="couple-col-8" style={{ textAlign: 'center' }}>
          <img src={logoImage} alt="numeranamx" className="couple-logo" style={{ height: '80px' }} />
          <h1 className="couple-titulo">Numerology | Numerología</h1>
        </div>
        <div className="couple-col-2">
          <img src={rightDecoration} alt="Right decoration" className="couple-lright" />
        </div>
      </div>
      
      <div className="couple-row">
        <div className="couple-col-2"></div>
        <div className="couple-col-3" style={{ textAlign: 'center' }}>
          <span className="couple-masc">
            <b className='icon-style'>1</b>
            <i className="bi bi-person-fill couple-iconin"></i>
          </span>
        </div>
        <div className="couple-col-2"></div>
        <div className="couple-col-3" style={{ textAlign: 'center' }}>
          <span className="couple-masc">
            <b className='icon-style'>2</b>
            <i className="bi bi-person-fill couple-iconin"></i>
          </span>
        </div>
        <div className="couple-col-2"></div>
      </div>
      
      <div className="couple-row">
        <div className="couple-col-2"></div>
        <div className="couple-col-3">
          <h2 className="couple-name couple-bold couple-titulo" style={{ textAlign: 'center' }}>{nombre}</h2>
        </div>
        <div className="couple-col-1"></div>
        <div className="couple-col-3">
          <h2 className="couple-name couple-bold couple-titulo" style={{ textAlign: 'center' }}>{nombre2}</h2>
        </div>
        <div className="couple-col-2"></div>
      </div>
      
      <div className="couple-row">
        <div className="couple-col-2"></div>
        <div className="couple-col-3">
          <h2 className="couple-name couple-bold couple-titulo" style={{ textAlign: 'center' }}>{birthdate}</h2>
        </div>
        <div className="couple-col-1"></div>
        <div className="couple-col-3">
          <h2 className="couple-name couple-bold couple-titulo" style={{ textAlign: 'center' }}>{birthdate2}</h2>
        </div>
        <div className="couple-col-2"></div>
      </div>
      
      <div className="couple-row" style={{ marginBottom: '1rem' }}>
        <div className="couple-col-3"></div>
        <div className="couple-col-6">
          <button 
            style={{ marginTop: '1rem' }} 
            type="button" 
            onClick={reload} 
            className="couple-btn couple-btn-primary couple-btn-lg couple-btn-block couple-send"
          >
            <i className="bi bi-play-btn-fill" style={{ zoom: 2, lineHeight: 1 }}></i>
          </button>
        </div>
        <div className="couple-col-3">
          <div className="couple-row">
            <div className="couple-col-3"></div>
            <div className="couple-col-3"></div>
            <div className="couple-col-6"><h2 className="couple-website" style={{ fontSize: '11px' }}>www.numerana.com</h2></div>
          </div>
          <div className="couple-row">
            <div className="couple-col-2"></div>
            <div className="couple-col-2"></div>
            <div className="couple-col-8"><h2 className="couple-website couple-ana" style={{ fontSize: '11px'}}>By: Ana Dorotea</h2></div>
          </div>
        </div>
      </div>

      </div>
     </div>
      <div className='content'>
      
      {/* Compatibility Section */}
      <div className="couple-compatibility-section">
        <div style={{ width: "50%" }}>
                          <img
                            src={leftDecoration}
                            className="Lleft"
                            alt="Left decoration"
                          />
                        </div>
                <div >
                  <img src={rightDecoration} className="Lright" alt="Right decoration" />
                </div>
        <h3 className="couple-section-title">Compatibility | Compatibilidad</h3>
        
        <div className="couple-compatibility-charts">
          {getScreenWidth ? (
            // Desktop view
            <div className="couple-charts-desktop">
              <div className="couple-chart-row">
                <div className="couple-chart-column">
                  <h4 className="couple-chart-title">{nombre}</h4>
                  <PinaculoChartComponent pinaculo={rpinaculo.length > 0 ? rpinaculo[0] : null} />
                </div>

                <div className="couple-chart-column">
                  <h4 className="couple-chart-title">{nombre2}</h4>
                  <PinaculoChartComponent pinaculo={rpinaculo2.length > 0 ? rpinaculo2[0] : null} />
                </div>

                <div className="couple-chart-column">
                  <h4 className="couple-chart-title">Combined | Combinado</h4>
                  <PinaculoChartComponent pinaculo={rpinaculo3.length > 0 ? rpinaculo3[0] : null} />
                </div>
              </div>
              
            </div>
          ) : (
            // Mobile view
            <div className="couple-charts-mobile">
              <Swiper
                ref={swiperMbRef}
                {...swiperConfig}
                className="couple-swiper-container-mobile"
                onSlideChange={slideChangeMobil}
              >
                <SwiperSlide className="couple-slide-chart">
                  <h4 className="couple-chart-title">{nombre}</h4>
                  {rpinaculo.length > 0 && (
                    <div className="couple-numerology-diagram">
                      <div className="couple-number-node couple-top">{rpinaculo[0]?.top}</div>
                      <div className="couple-number-node couple-left">{rpinaculo[0]?.A}</div>
                      <div className="couple-number-node couple-right">{rpinaculo[0]?.B}</div>
                      <div className="couple-number-node couple-bottom-left">{rpinaculo[0]?.C}</div>
                      <div className="couple-number-node couple-bottom-right">{rpinaculo[0]?.D}</div>
                    </div>
                  )}
                </SwiperSlide>
                
                <SwiperSlide className="couple-slide-chart">
                  <h4 className="couple-chart-title">{nombre2}</h4>
                  {rpinaculo2.length > 0 && (
                    <div className="couple-numerology-diagram">
                      <div className="couple-number-node couple-top">{rpinaculo2[0]?.top}</div>
                      <div className="couple-number-node couple-left">{rpinaculo2[0]?.A}</div>
                      <div className="couple-number-node couple-right">{rpinaculo2[0]?.B}</div>
                      <div className="couple-number-node couple-bottom-left">{rpinaculo2[0]?.C}</div>
                      <div className="couple-number-node couple-bottom-right">{rpinaculo2[0]?.D}</div>
                    </div>
                  )}
                </SwiperSlide>
                
                <SwiperSlide className="couple-slide-chart">
                  <h4 className="couple-chart-title">Combined | Combinado</h4>
                  {rpinaculo3.length > 0 && (
                    <div className="couple-numerology-diagram">
                      <div className="couple-number-node couple-top">{rpinaculo3[0]?.top}</div>
                      <div className="couple-number-node couple-left">{rpinaculo3[0]?.A}</div>
                      <div className="couple-number-node couple-right">{rpinaculo3[0]?.B}</div>
                      <div className="couple-number-node couple-bottom-left">{rpinaculo3[0]?.C}</div>
                      <div className="couple-number-node couple-bottom-right">{rpinaculo3[0]?.D}</div>
                    </div>
                  )}
                </SwiperSlide>
                
                <SwiperSlide className="couple-slide-chart">
                  <h4 className="couple-chart-title">Compatibility | Compatibilidad</h4>
                  {sinastra.length > 0 && (
                    <div className="couple-compatibility-table-container couple-mobile">
                      <table className="couple-compatibility-table">
                        <thead>
                          <tr>
                            <th>Area</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Emotional</td>
                            <td className={parseInt(sinastra[0]?.A) > 7 ? 'couple-compatibility-excellent' : 'couple-compatibility-average'}>
                              {sinastra[0]?.A}
                            </td>
                          </tr>
                          <tr>
                            <td>Mental</td>
                            <td className={parseInt(sinastra[0]?.B) > 7 ? 'couple-compatibility-excellent' : 'couple-compatibility-average'}>
                              {sinastra[0]?.B}
                            </td>
                          </tr>
                          <tr>
                            <td>Physical</td>
                            <td className={parseInt(sinastra[0]?.C) > 7 ? 'couple-compatibility-excellent' : 'couple-compatibility-average'}>
                              {sinastra[0]?.C}
                            </td>
                          </tr>
                          <tr>
                            <td>Spiritual</td>
                            <td className={parseInt(sinastra[0]?.D) > 7 ? 'couple-compatibility-excellent' : 'couple-compatibility-average'}>
                              {sinastra[0]?.D}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </SwiperSlide>
              </Swiper>
            </div>
          )}
           <div style={{ position: "relative", bottom: "130px" }}>
                            <img
                              src={leftDownDecoration}
                              className="Lleft"
                              alt="Left decoration"
                            />
                          </div>
                  <div style={{ position: "relative", bottom: "130px" }}>
                    <img src={rightDownDecoration} className="Lright" alt="Right decoration" />
                  </div>
        </div>
      </div>

      {/* Year Chart Section */}
      <div className="couple-year-charts-section">
        <div className="couple-year-charts-container">
          <div className="couple-year-charts-row"> {/* Ensure this row has flex display in CSS */}

            {/* --- Person 1 Year Chart Slider --- */}
            <div className="couple-person-year-charts">
              {pinYear.length > 0 ? (
                <Swiper {...yearSliderSettings} className="person-year-swiper">
                  {/*
                    IMPORTANT DATA STRUCTURE ASSUMPTION:
                    calculosUtils.GetYear() currently seems to return ONE object (stored in pinYear[0]).
                    For a multi-year slider, you ideally need data for EACH year separately.
                    The example below simulates sliding between the current year (year) and next year (nxYear)
                    using the SAME data (pinYear[0]) as per your original setup.
                    You SHOULD modify calculosUtils.GetYear or data fetching
                    to provide distinct data for each year if they differ numerically.

                    Example of desired data structure for pinYear:
                    [
                      { year: 2025, data: { ...data specifically calculated for 2025... } },
                      { year: 2026, data: { ...data specifically calculated for 2026... } },
                      // Potentially more years
                    ]
                    If pinYear[0] ALREADY contains all info and YearChartComponent uses the 'year' prop
                    to extract the relevant part, then this structure is fine.
                  */}
                  {[
                    { yearValue: year, dataValue: pinYear[0], isCurrent: true },
                    { yearValue: nxYear, dataValue: pinYear[0], isCurrent: false },
                    // Add more year objects here if calculosUtils.GetYear provides more data
                  ].map((yearData, index) => (
                    <SwiperSlide key={`${nombre}-year-${yearData.yearValue}-${index}`} className="year-chart-slide">
                      <YearChartComponent
                        year={yearData.yearValue}
                        data={yearData.dataValue[0]} // Use the data corresponding to the year
                        isCurrentYear={yearData.isCurrent} // Or better: yearData.yearValue === new Date().getFullYear()
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="no-data-placeholder">No year data for {nombre}.</div>
              )}
            </div>

            {/* --- Person 2 Year Chart Slider --- */}
            <div className="couple-person-year-charts">
               {pinYear2.length > 0 ? (
                <Swiper {...yearSliderSettings} className="person-year-swiper">
                   {/* Same data structure assumption applies to pinYear2 */}
                  {[
                    { yearValue: year, dataValue: pinYear2[0], isCurrent: true },
                    { yearValue: nxYear, dataValue: pinYear2[0], isCurrent: false },
                    // Add more year objects here if calculosUtils.GetYear provides more data
                  ].map((yearData, index) => (
                    <SwiperSlide key={`${nombre2}-year-${yearData.yearValue}-${index}`} className="year-chart-slide">
                      <YearChartComponent
                        year={yearData.yearValue}
                        data={yearData.dataValue[0]} // Use the data corresponding to the year
                        isCurrentYear={yearData.isCurrent} // Or better: yearData.yearValue === new Date().getFullYear()
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="no-data-placeholder">No year data for {nombre2}.</div>
              )}
            </div>


             {/* --- Person 2 Year Chart Slider --- */}
             <div className="couple-person-year-charts">
  {coupleYearData.length > 0 ? (
    <Swiper {...yearSliderSettings} className="person-year-swiper">
      {[
        {
          yearValue: coupleYearData[0].chartYear,
          monthsData: [coupleYearData[0]],
          isCurrentYear: true,
        },
        {
          yearValue: coupleYearData[0].nextYear,
          monthsData: [coupleYearData[0]],
          isCurrentYear: false,
        },
      ].map((yearData, index) => (
        <SwiperSlide
          key={`year-${yearData.yearValue}-${index}`}
          className="year-chart-slide"
        >
          <CoupleYearChart
            monthsData={yearData.monthsData}
            isCurrentYear={yearData.isCurrentYear}
            year={yearData.yearValue}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : null}
</div>


          </div> {/* End of couple-year-charts-row */}
        </div> {/* End of couple-year-charts-container */}
      </div> {/* End of couple-year-charts-section */}

      <div className="couple-monthly-forecast-section">
        
        {listMobileM.length > 0 && (
          <div className="couple-forecast-content">
            {getScreenWidth ? (
              // Desktop view
              <div className="couple-forecast-desktop">
                <DesktopMonthGridComponent birthdate={birthdate} birthdate2={birthdate2} isCouple={true}/>
              </div>
            ) : (
              // Mobile view
              <div className="couple-forecast-mobile">
                {listMobileM.length > 0 && (
                  <div className="couple-mobile-year-month-selector">
                    <div className="couple-year-selector">
                      <button 
                        className={`couple-year-btn ${mobilMesSelect?.year === year ? 'couple-active' : ''}`}
                        onClick={() => setMobilMesSelect(prev => ({ ...prev, year: year }))}
                      >
                        {year}
                      </button>
                      <button 
                        className={`couple-year-btn ${mobilMesSelect?.year === nxYear ? 'couple-active' : ''}`}
                        onClick={() => setMobilMesSelect(prev => ({ ...prev, year: nxYear }))}
                      >
                        {nxYear}
                      </button>
                    </div>
                    
                    <select 
                      className="couple-month-select" 
                      onChange={(e) => callMesMobil(parseInt(e.target.value))}
                      value={indexMobil}
                      aria-label="Select month"
                    >
                      {listMobileM.map((month, idx) => (
                        <option key={idx} value={idx}>
                          {month.name}, {month.year || ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="couple-forecast-card-mobile">
                  {smallLoading ? (
                    renderSmallLoading()
                  ) : (
                    listMobileM.length > 0 && (
                      <div className="couple-mobile-month-details">
                        <h4 className="couple-mobile-month-title">
                          {listMobileM[indexMobil]?.name || ''} {listMobileM[indexMobil]?.year || ''}
                        </h4>
                        
                        {renderMonthlyChart(listMobileM[indexMobil])}
                        
                        <div className="couple-mobile-day-forecast">
                          <h5 className="couple-mobile-day-title">Daily Forecast | Pronóstico Diario</h5>
                          {listMobileM[indexMobil] && (
                            <div className="couple-day-forecast-container">
                              <table className="couple-day-table">
                                <thead>
                                  <tr>
                                    <th>Day | Día</th>
                                    <th>{nombre}</th>
                                    <th>{nombre2}</th>
                                    <th>Combined</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <tr key={i}>
                                      <td>{i + 1}</td>
                                      <td>{newCalculationUtils.reduceNumber(parseInt(rpinaculo[0]?.top) || 0, i + 1)}</td>
                                      <td>{newCalculationUtils.reduceNumber(parseInt(rpinaculo2[0]?.top) || 0, i + 1)}</td>
                                      <td>{newCalculationUtils.reduceNumber(
                                        newCalculationUtils.reduceNumber(parseInt(rpinaculo[0]?.top) || 0, i + 1),
                                        newCalculationUtils.reduceNumber(parseInt(rpinaculo2[0]?.top) || 0, i + 1)
                                      )}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="couple-see-more-days">
                                <button 
                                  className="couple-see-more-btn" 
                                  onClick={() => {
                                    // Handle showing full day view - placeholder
                                    console.log("Show full day view");
                                  }}
                                >
                                  See All Days
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="couple-monthly-forecast-section">
        
        {listMobileM.length > 0 && (
          <div className="couple-forecast-content">
            {getScreenWidth ? (
              // Desktop view
              <div className="couple-forecast-desktop">
                {/* <DesktopDayGridComponent birthdate={birthdate} birthdate2={birthdate2} isCouple={true}/> */}
              </div>
            ) : (
              // Mobile view - second instance
              <div className="couple-forecast-mobile">
                {/* Mobile view content for daily forecast */}
                {/* This content is similar to the monthly forecast mobile view */}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="couple-footer">
        <div className="couple-website">www.numerana.com</div>
        <div className="couple-author">By: Ana Dorotea</div>
      </div>
    </div>
    </>
  );
  
  return (
    <div className="couple-main">
      {/* updated here */}
      {!resultados && renderForm()}
      <div ref={contentRef} className="couple-content">
        {loading && <div className="couple-lds-ripple"><div></div><div></div></div>}
        
        {resultados && (
          <>
            {renderResults()}
          </>
        )}
      </div>
    </div>
  );
};

export default CoupleComponent; 