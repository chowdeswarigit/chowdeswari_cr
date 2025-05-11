
function isMasterNumber(num) {
    const masterNumbers = [11, 22, 33, 44, 55, 66, 77, 88, 99];
    return masterNumbers.includes(num);
}

// for time charts, highest master number is 22

function isMasterNumberTime(num) {
    const masterNumbers = [11, 22];
    return masterNumbers.includes(num);
}


function reduceNumber(num) {
    if (isMasterNumber(num)) return num;
    while (num >= 10 && !isMasterNumber(num)) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
}

// for time charts, highest master number is 22, hence calling isMasterNumberTime() in this

function reduceNumberTime(num) {
    if (isMasterNumberTime(num)) return num;
    while (num >= 10 && !isMasterNumberTime(num)) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
}

//reduceMasterNumber() helps in formatting any master number to its lower frequency

function reduceMasterNumber(num) {
    while (num >= 10) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
}

//isNumberKarmic() returns a K if the number is Karmic before or during reduction. Used only for centeral line on Personality charts

function isNumberKarmic(num) { 
    const karmicNumbers = [12, 13, 14, 16, 19]; 
 
    // Keep reducing until a single digit or karmic number is found
    while (num > 9 && !karmicNumbers.includes(num)) { 
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    if (karmicNumbers.includes(num)) {
        return "K";
    } else {
        return "";
    }
}

//formatNumber() formats numbers to string. If the number is a master number makes a string of its lower and higher frequency

function formatNumber(num) {
    return isMasterNumber(num) ? `${num}/${reduceMasterNumber(num)}` : num.toString();
}

//generateCentralLine() is for calculating central line for team charts

function generateCentralLine(month, day, year) {
    let A = reduceNumber(month);
    let B = reduceNumber(day);
    let C = reduceNumber(year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0));
    let D = reduceNumber(month.toString() + day.toString() + year.toString());
    
    const arr=[]; 
    
    arr.push(formatNumber(A));
    arr.push(formatNumber(B));
    arr.push(formatNumber(C));
    arr.push(formatNumber(D));
    
    return arr;

}

// buildCycle() is used to create numerological cycle


function buildCycle(startAge) {
    const maxAge = 109; // One after 100
    const phases = [];
    let phaseStart = 0;
    let phaseEnd = 36 - startAge;
    while (phaseEnd < maxAge) {
        phases.push(phaseStart + " to " + phaseEnd);
        phaseStart = phaseEnd;
        phaseEnd = phaseEnd + 9;
    }
    return phases;
}


// getDaysInMonth() is used to create the Daily Chart

function getDaysInMonth(month, year) {
    // month: 1 = January, ..., 12 = December
    return new Date(year, month, 0).getDate();
}


//unformattedPersonalityPinaculo is written to create an unformatted chart so that two charts can be added when generating couple pinaculo

function unformattedPersonalityPinaculo(month, day, year) {
    let A = reduceNumber(month);
    let B = reduceNumber(day);
    let C = reduceNumber(year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0));
    let D = reduceNumber(month.toString() + day.toString() + year.toString());
    
    let E = reduceNumber(A + B);
    let F = reduceNumber(B + C);
    let G = reduceNumber(E + F);
    let H = reduceNumber(E + F + G);
    let I = reduceNumber(A + C);
    let J = reduceNumber(I + D);

    let K = reduceNumber(Math.abs(reduceMasterNumber(A) - reduceMasterNumber(B)));
    let L = reduceNumber(Math.abs(reduceMasterNumber(B) - reduceMasterNumber(C)));
    let M = reduceNumber(Math.abs(K - L));
    let N = isMasterNumber(K + L + M) ? K + L + M : reduceNumber(K + L + M);
    let O = reduceNumber(Math.abs(reduceMasterNumber(A) - reduceMasterNumber(C)));
    const arr=[]; 
    arr.push(A);
    arr.push(B);
    arr.push(C);
    arr.push(D);
    arr.push(E);
    arr.push(F);
    arr.push(G);
    arr.push(H);
    arr.push(I);
    arr.push(J);
    arr.push(K);
    arr.push(L);
    arr.push(M);
    arr.push(N);
    arr.push(O);

    return arr;

}

 function calculatePersonalityPinaculo(formattedDate) {
    // Split the formatted date (DD/MM/YYYY) into day, month, and year
    const [day, month, year] = formattedDate.split('/').map((part) => parseInt(part));

    // Validate the extracted values
    if (
        isNaN(day) ||
        isNaN(month) ||
        isNaN(year) ||
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12 ||
        year < 1000 ||
        year > 9999
    ) {
        throw new Error("Invalid formatted date. Please provide a valid DD/MM/YYYY format.");
    }

    // Perform calculations
    let A = reduceNumber(month);
    let B = reduceNumber(day);
    let C = reduceNumber(year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0));
    let D = reduceNumber(month.toString() + day.toString() + year.toString());

    let P1 = reduceNumber(A + B);
    let P2 = reduceNumber(B + C);
    let P3 = reduceNumber(P1 + P2);
    let P4 = reduceNumber(P1 + P2 + P3);
    let top = reduceNumber(A + C);
    let P5 = reduceNumber(top + D);

    let N1 = reduceNumber(Math.abs(reduceMasterNumber(A) - reduceMasterNumber(B)));
    let N2 = reduceNumber(Math.abs(reduceMasterNumber(B) - reduceMasterNumber(C)));
    let N3 = reduceNumber(Math.abs(N1 - N2));
    let N4 = isMasterNumber(N1 + N2 + N3) ? N1 + N2 + N3 : reduceNumber(N1 + N2 + N3);
    let bottom = reduceNumber(Math.abs(reduceMasterNumber(A) - reduceMasterNumber(C)));

    // Return the result in the required format
    return [
        {
            A: formatNumber(A),
            B: formatNumber(B),
            C: formatNumber(C),
            D: formatNumber(D),
            P1: formatNumber(P1),
            P2: formatNumber(P2),
            P3: formatNumber(P3),
            P4: formatNumber(P4),
            top: formatNumber(top),
            P5: formatNumber(P5),
            N1: N1,
            N2: N2,
            N3: N3,
            N4: formatNumber(N4),
            bottom: bottom,
        },
    ];
}
function generateNumerologicalCycles(month,day,year) {
    const cycles = [];
   let lifePathNumber = reduceNumber(month.toString() + day.toString() + year.toString())

    if (isMasterNumber(lifePathNumber)) {
        const highFreqStart = lifePathNumber;
        const lowFreqStart = reduceMasterNumber(lifePathNumber);

        cycles.push({
            type: 'Cycle 1',
            phases: buildCycle(highFreqStart)
        });

        cycles.push({
            type: 'Cycle 2',
            phases: buildCycle(lowFreqStart)
        });
    } else {
        cycles.push({
            type: 'Cycle',
            phases: buildCycle(lifePathNumber)
        });
    }
    console.log(lifePathNumber);

    return cycles;
}

function generateAnnualChart(month, day, year, chartYear) {
    // Validate inputs
    if (!month || !day || !year || !chartYear) {
        throw new Error("Invalid arguments: month, day, year, and chartYear are required.");
    }

    // Universal Year calculation
    const universalYear = reduceNumberTime(chartYear);
    const nextUniversalYear = reduceNumberTime(chartYear + 1);

    // Personal Year calculation
    const personalYear = reduceNumberTime(month.toString() + day.toString() + chartYear.toString());
    const nextPersonalYear = reduceNumberTime(month.toString() + day.toString() + (chartYear + 1).toString());

    // Current age calculation
    const currentAge = chartYear - year;
    // const nextAge = currentAge + 1;
  
    // Pinnacles for the current year
    const P1 = reduceNumberTime(universalYear + personalYear);
    const P2 = reduceNumberTime(personalYear + currentAge);
    const P3 = reduceNumberTime(P1 + P2);
    const Pb = reduceNumberTime(universalYear + currentAge);
    const Pc = reduceNumberTime(P1 + P2 + P3);
    const Cage = reduceNumberTime(currentAge);
    const nextAge = reduceNumberTime(currentAge + 1);
    // Pinnacles for the next year
    const NxP1 = reduceNumberTime(nextUniversalYear + nextPersonalYear);
    const NxP2 = reduceNumberTime(nextPersonalYear + nextAge);
    const NxP3 = reduceNumberTime(NxP1 + NxP2);
    const NxPb = reduceNumberTime(nextUniversalYear + nextAge);
    const NxPc = reduceNumberTime(NxP1 + NxP2 + NxP3);

    // Return the result in the required format
    return [
        {
            Cage: Cage,
            NextPY: nextPersonalYear,
            NextUY: nextUniversalYear,
            NxAge: nextAge,
            NxP1: NxP1,
            NxP2: NxP2,
            NxP3: NxP3,
            NxPb: NxPb,
            NxPc: NxPc,
            P1: P1,
            P2: P2,
            P3: P3,
            Pb: Pb,
            Pc: Pc,
            PerY: personalYear,
            UniYear: universalYear,
        },
    ];
}

// function generateMonthlyChart(month,day,year,chartYear,chartMonth) {
//     const today = new Date();

//     // const currentDay = today.getDate();           // Day of the month (1-31)
//     // const currentMonth = today.getMonth() + 1;    // Month (0-11, so add 1)
//     // const currentYear = today.getFullYear();      // Full year (e.g., 2025)
    
//     let A = reduceNumberTime(chartYear.toString()+chartMonth.toString());
//     let B = reduceNumberTime(month.toString() + day.toString() + chartYear.toString()+ chartMonth.toString());
//     let C = reduceNumberTime(A+B);
//     let D = reduceNumberTime(A+C);
//     let E = reduceNumberTime(B+C);
    
//     const arr=[]; 
//     arr.push(A);
//     arr.push(B);
//     arr.push(C);
//     arr.push(D);
//     arr.push(E);

//     return arr;
    
// }
function generateMonthlyChart(birthdate, chartYear, monthNames) {
    if (!birthdate || !chartYear) {
        throw new Error("Invalid arguments: birthdate and chartYear are required.");
    }
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthdate)) {
        throw new Error("Invalid birthdate format. Please use MM/DD/YYYY.");
    }
    const [month, day, year] = birthdate.split('/').map((part) => parseInt(part, 10));
    const universalYear = reduceMasterNumber(chartYear);
    const nextUniversalYear = reduceMasterNumber(chartYear + 1);
    const sumD = reduceMasterNumber(day);
    const sumM = reduceMasterNumber(month);
    const personalYear = reduceMasterNumber(sumD + sumM + universalYear);
    const nextPersonalYear = reduceMasterNumber(sumD + sumM + nextUniversalYear);
    const currentYearData = [];
    const nextYearData = [];
    for (let i = 0; i < 12; i++) {
        const chartMonth = i + 1; 
        const monthName = monthNames[i]; 
        const MU = reduceMasterNumber(universalYear + chartMonth);
        const MP = reduceMasterNumber(personalYear + chartMonth);
        const PT = reduceMasterNumber(MU + MP);
        const PL = reduceMasterNumber(MU + PT);
        const PR = reduceMasterNumber(MP + PT);

        currentYearData.push({
            Mon: monthName,
            Yea: chartYear,
            MU: MU,
            MP: MP,
            PT: PT,
            PL: PL,
            PR: PR,
        });
        const NMU = reduceMasterNumber(nextUniversalYear + chartMonth);
        const NMP = reduceMasterNumber(nextPersonalYear + chartMonth);
        const NPT = reduceMasterNumber(NMU + NMP);
        const NPL = reduceMasterNumber(NMU + NPT);
        const NPR = reduceMasterNumber(NMP + NPT);
        nextYearData.push({
            Mon: monthName,
            Yea: chartYear + 1,
            MU: NMU,
            MP: NMP,
            PT: NPT,
            PL: NPL,
            PR: NPR,
        });
    }
    return [currentYearData, nextYearData];
}

// function generateDailyChart(month,day,year,chartMonth,chartYear) {

//     const arr=[];

//     for (let i = 1; i <= getDaysInMonth(chartMonth, chartYear); i++) {
//         let A = i;
//         let B = reduceNumberTime(chartYear.toString() + chartMonth.toString() + i.toString());
//         let C = reduceNumberTime(year.toString() + chartMonth.toString() + i.toString());
//         arr.push({A, B, C});
//     }
        
//     return arr;
    
// }
function generateDailyChart(birthdate) {
    // Validate the birthdate format
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthdate)) {
        throw new Error("Invalid birthdate format. Please use DD/MM/YYYY.");
    }

    // Parse the birthdate into day, month, and year
    const [day, month, year] = birthdate.split('/').map((part) => parseInt(part, 10));

    const currentYear = new Date().getFullYear();
    const allMonthsData = [];

    // Loop through all 12 months of the current year
    for (let chartMonth = 1; chartMonth <= 12; chartMonth++) {
        const daysInMonth = getDaysInMonth(chartMonth, currentYear);
        const monthlyData = [];

        // Generate data for each day in the current month
        for (let i = 1; i <= daysInMonth; i++) {
            const universal = reduceNumberTime(currentYear.toString() + chartMonth.toString() + i.toString());
            const personal = reduceNumberTime(year.toString() + chartMonth.toString() + i.toString());

            monthlyData.push({
                day: i,
                universal: universal,
                personal: personal,
            });
        }

        // Add the monthly data to the result
        allMonthsData.push({
            year: currentYear,
            month: formatMonthName(chartMonth),
            days: monthlyData,
        });
    }

    // Return the result in the required format
    return allMonthsData;
}
function generateCoupleYearlyChart(birthdate1,birthdate2, chartYear)   {
// Helper function to format month names
const [day1, month1, year1] = birthdate1.split('/').map((part) => parseInt(part));
const [day2, month2, year2] = birthdate2.split('/').map((part) => parseInt(part));
const universalYear = reduceNumberTime(chartYear);
    const nextUniversalYear = reduceNumberTime(universalYear + 1);
    // return universalYear
    let coupleMonth= reduceNumberTime(reduceNumberTime(month1)+ reduceNumberTime(month2));
    let coupleDay= reduceNumberTime(reduceNumberTime(day1)+ reduceNumberTime(day2)); 
    
    let B1 = reduceNumber(coupleMonth.toString() + coupleDay.toString() + nextUniversalYear.toString());
    let B =  reduceNumber(coupleMonth.toString() + coupleDay.toString() + chartYear.toString());
    let coupletopC=reduceNumberTime(universalYear+B)
    let coupletopC1=reduceNumberTime(nextUniversalYear+B1)
    let C =reduceNumberTime(coupletopC)
    let C1 =reduceNumberTime(coupletopC1)
    let coupleLeft = reduceNumberTime(C+universalYear)
    let coupleLeft1 = reduceNumberTime(C1+nextUniversalYear)
    let D1 = reduceNumberTime(coupleLeft1)
    let D = reduceNumberTime(coupleLeft)
    let coupleRight1 = reduceNumberTime(C+B1)
    let coupleRight = reduceNumberTime(C+B)
    let E = reduceNumberTime(coupleRight)
    let E1 = reduceNumberTime(coupleRight1)
    
    return [{
        universalYear: universalYear,
        nextUniversalYear:nextUniversalYear,
        chartYear: chartYear,
        nextYear:chartYear+1,       // <-- Included current year
        B:B,
        C:C,
        D:D,
        E:E,
        NXB:B1,
        NXC:C1,
        NXD:D1,
        NXE:E1,
    }]
}
const vv =   generateCoupleYearlyChart("11/11/1984","11/11/1999","2025")
console.log(vv,"yearly");
function formatMonthName(month) {
    const monthNames = [
        "JAN/ENE", "FEB", "MAR", "APR/ABR", "MAY", "JUN",
        "JUL", "AUG/AGO", "SEP", "OCT", "NOV", "DEC/DIC",
    ];
    return monthNames[month - 1];
}


function calculateCouplePinaculo1(month1, day1, year1,month2,day2,year2) {
    
    const p1=unformattedPersonalityPinaculo(month1,day1, year1);
    const p2=unformattedPersonalityPinaculo(month2,day2, year2);

    
    let A = reduceNumber(p1[0]+p2[0]);
    let B = reduceNumber(p1[1]+p2[1]);
    let C = reduceNumber(p1[2]+p2[2]);
    let D = reduceNumber(p1[3]+p2[3]);
    
    let E = reduceNumber(A + B);
    let F = reduceNumber(B + C);
    let G = reduceNumber(E + F);
    let H = reduceNumber(E + F + G);
    let I = reduceNumber(A + C);
    let J = reduceNumber(I + D);

    let K = reduceNumber(Math.abs(reduceMasterNumber(A) - reduceMasterNumber(B)));
    let L = reduceNumber(Math.abs(reduceMasterNumber(B) - reduceMasterNumber(C)));
    let M = reduceNumber(Math.abs(K - L));
    let N = isMasterNumber(K + L + M) ? K + L + M : reduceNumber(K + L + M);
    let O = reduceNumber(Math.abs(reduceMasterNumber(A) - reduceMasterNumber(C)));
    const arr=[]; 
    arr.push(formatNumber(A));
    arr.push(formatNumber(B));
    arr.push(formatNumber(C));
    arr.push(formatNumber(D));
    arr.push(formatNumber(E));
    arr.push(formatNumber(F));
    arr.push(formatNumber(G));
    arr.push(formatNumber(H));
    arr.push(formatNumber(I));
    arr.push(formatNumber(J));
    arr.push(formatNumber(K));
    arr.push(formatNumber(L));
    arr.push(formatNumber(M));
    arr.push(formatNumber(N));
    arr.push(formatNumber(O));

    return arr;

}
const va = calculateCouplePinaculo1(11,11,1994,11,1,1999)

// };
 function calculateCouplePinaculo(birthdate1, birthdate2, isCouple) {
    // Validate the birthdates
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthdate1) || !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthdate2)) {
        throw new Error("Invalid birthdate format. Please use DD/MM/YYYY.");
    }

    // Parse the birthdates into day, month, and year
    const [day1, month1, year1] = birthdate1.split('/').map((part) => parseInt(part, 10));
    const [day2, month2, year2] = birthdate2.split('/').map((part) => parseInt(part, 10));

    // Helper function to format month names
    const formatMonthName = (month) => {
        const monthNames = [
            "JAN/ENE", "FEB", "MAR", "APR/ABR", "MAY", "JUN",
            "JUL", "AUG/AGO", "SEP", "OCT", "NOV", "DEC/DIC",
        ];
        return monthNames[month - 1];
    };

    //  function to calculate monthly data
   

    // Helper function to calculate monthly data
    const calculateCoupleMonthlyData = (month, year, person1, person2) => {
        const MU = reduceNumberTime(`${year}${month}`); // Universal month
        const coupleDay = reduceNumberTime(person1.day+person2.day);
        const coupleMonth = reduceNumberTime(person1.month+person2.month);
        const MP = reduceNumberTime(`${coupleDay}${coupleMonth}${year}${month}`); // Personal month for person 1
        const coupleTop = reduceNumberTime(MU+MP);
        const PT = reduceNumberTime(coupleTop); // Personal month for person 2
        const coupleLeft = reduceNumberTime(MU+PT);
        const PL = reduceNumberTime(coupleLeft); // Left point
        const coupleRight = reduceNumberTime(MP+PT);
        const PR = reduceNumberTime(coupleRight); // Right point

        return {
            Mon: formatMonthName(month),
            Yea: year,
            MU,
            MP,
            PT,
            PL,
            PR,
        };
    };

    // Generate data for both years (current and next)
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    const person1 = { day: day1, month: month1, year: year1 };
    const person2 = { day: day2, month: month2, year: year2 };

    const currentYearData = [];
    const nextYearData = [];

    // Calculate data for all 12 months of the current year
    for (let month = 1; month <= 12; month++) {
        currentYearData.push(calculateCoupleMonthlyData(month, currentYear, person1, person2));
    }

    // Calculate data for all 12 months of the next year
    for (let month = 1; month <= 12; month++) {
        nextYearData.push(calculateCoupleMonthlyData(month, nextYear, person1, person2));
    }

    // Return the result as an array of two arrays (current year and next year)
    return [currentYearData, nextYearData];
}
function calculateTeamChart(...dobs) {
    console.log(dobs,"Chowdeswari");
    const p = [];
    const arr = [0, 0, 0, 0]; // To hold the sum of A, B, C, D values

    for (let i = 0; i < dobs.length; i++) {
        // Generate central line for each DOB
        p[i] = generateCentralLine(dobs[i].month, dobs[i].day, dobs[i].year);

        // Sum up each of the four values (A, B, C, D)
        for (let j = 0; j < 4; j++) {
            arr[j] += parseInt(p[i][j]); // Assuming formatNumber returns a string
        }
    }

    arr[0]=formatNumber(reduceNumber(arr[0]));
    arr[1]=formatNumber(reduceNumber(arr[1]));
    arr[2]=formatNumber(reduceNumber(arr[2]));
    arr[3]=formatNumber(reduceNumber(arr[3]));

    return arr; // Returns the total of A, B, C, D across all DOBs
}

const dob1 = { day: 5, month: 3, year: 1995 };  // March 5, 1995
const dob2 = { day: 22, month: 7, year: 1988 }; // July 22, 1988
const dob3 = { day: 14, month: 11, year: 2002 }; // November 14, 2002
const v = calculateTeamChart(dob1, dob2, dob3);
console.log(v);
export {
    isMasterNumber,
    isMasterNumberTime,
    reduceNumber,
    reduceNumberTime,
    reduceMasterNumber,
    isNumberKarmic,
    formatNumber,
    generateCentralLine,
    buildCycle,
    getDaysInMonth,
    unformattedPersonalityPinaculo,
    calculatePersonalityPinaculo,
    generateMonthlyChart,
    generateDailyChart,
    generateAnnualChart,
    generateNumerologicalCycles,
    calculateCouplePinaculo, 
    calculateTeamChart,
    generateCoupleYearlyChart
};

