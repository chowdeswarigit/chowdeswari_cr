const CoupleYearChart = ({ monthsData, isCurrentYear, year }) => {
    if (!monthsData || !Array.isArray(monthsData) || monthsData.length === 0) {
      return <div>No data available</div>;
    }
  
    const data = monthsData[0][0];
  
    const chartData = isCurrentYear
      ? {
          universalYear: data.universalYear,
          B: data.B,
          C: data.C,
          D: data.D,
          E: data.E,
          year: data.chartYear
        }
      : {
          universalYear: data.nextUniversalYear,
          B: data.NXB,
          C: data.NXC,
          D: data.NXD,
          E: data.NXE,
          year: data.nextYear
        };
  
    return (
      <div className="couple-year-chart">
        <h3 className="section-title">{chartData.year}</h3>
        <div className="chart-container">
          <div className="months-container">
            <svg width="350" height="400" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(1.5)">
                <title>{chartData.year}</title>
  
                {/* D (Ellipse) */}
                <ellipse ry="18.5" rx="16.5" cy="76.98" cx="19.52" stroke="#000" fill="#fff" />
                
                {/* C (Ellipse) */}
                <ellipse ry="18.5" rx="16.5" cy="27.98" cx="97.52" stroke="#000" fill="#fff" />
                
                {/* E (Ellipse) */}
                <ellipse ry="18.5" rx="16.5" cy="74.00" cx="179.56" stroke="#000" fill="#fff" />
  
                {/* universalYear (Rect) */}
                <rect x="50" y="100" width="33" height="33" stroke="#000" fill="#fff" />
  
                {/* B (Rect) */}
                <rect x="115" y="100" width="33" height="33" stroke="#000" fill="#fff" />
  
                {/* Connection Lines */}
                <line stroke="#000" y2="65.12" x2="32.72" y1="35.48" x1="82.02" fill="none" />
                <line stroke="#000" y2="67.19" x2="164.40" y1="32.50" x1="113.67" fill="none" />
                <line y2="44.20" x2="89.30" y1="99.45" x1="66.59" stroke="#000" fill="none" />
                <line y2="99.79" x2="127.60" y1="43.18" x1="106.58" stroke="#000" fill="none" />
                <line y2="110.64" x2="51.33" y1="90.64" x1="30.31" stroke="#000" fill="none" />
                <line stroke="#000" y2="106.91" x2="144.89" y1="85.21" x1="166.58" fill="none" />
                <line y2="120.13" x2="115.06" y1="120.13" x1="82.86" stroke="#000" fill="none" />
  
                {/* Chart Values */}
                <text y="76.98" x="19.52" fontSize="22" textAnchor="middle" fill="#000">{chartData.D}</text>
                <text y="122" x="66.5" fontSize="22" textAnchor="middle" fill="#000">{chartData.universalYear}</text>
                <text y="122" x="131.5" fontSize="22" textAnchor="middle" fill="#000">{chartData.B}</text>
                <text y="74.00" x="179.56" fontSize="22" textAnchor="middle" fill="#000">{chartData.E}</text>
                <text y="27.98" x="97.52" fontSize="22" textAnchor="middle" fill="#000">{chartData.C}</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
  export default CoupleYearChart;
  