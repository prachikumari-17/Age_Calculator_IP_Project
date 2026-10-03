/* ==========================================================================
   Age Calculator & Zodiac Explorer — Imperative JavaScript Logic
   Group Members: Prachi Kumari, Nidhi Rathi, Sanskriti Prasad, Sneha Sahu
   ========================================================================== */

// Execution starts when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initApp();
});

/**
 * Initializes application state, displays current system date, and binds event handlers.
 */
function initApp() {
  displayCurrentSystemDate();

  const form = document.getElementById("ageCalculatorForm");
  const resetBtn = document.getElementById("resetBtn");

  form.addEventListener("submit", handleCalculate);
  resetBtn.addEventListener("click", handleReset);
}

/**
 * Formats and renders the current system date in the header status pill.
 */
function displayCurrentSystemDate() {
  const displayElement = document.getElementById("currentDateDisplay");
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const monthName = getMonthName(month);
  displayElement.textContent = `${monthName} ${day}, ${year}`;
}

/**
 * Checks whether a given year is a leap year using the standard Gregorian rule:
 * A year is a leap year if (year % 400 === 0) OR (year % 4 === 0 && year % 100 !== 0).
 */
function isLeapYear(year) {
  if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
    return true;
  }
  return false;
}

/**
 * Returns the exact number of calendar days in a specified month and year.
 */
function getDaysInMonth(month, year) {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  // April, June, September, November have 30 days
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  }
  // January, March, May, July, August, October, December have 31 days
  return 31;
}

/**
 * Helper function returning the full English name of a month (1 - 12).
 */
function getMonthName(month) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month - 1] || "";
}

/**
 * Validates the user's Date of Birth inputs step-by-step.
 * Rejects and explains:
 * - Empty input
 * - Non-numeric input
 * - Day less than 1 or greater than days in that month
 * - Month less than 1 or greater than 12
 * - Invalid calendar dates (e.g. 31/04/2020, 31/06/2020)
 * - Invalid leap dates (e.g. 29/02/2025)
 * - Future dates relative to current system date
 */
function validateDateOfBirth(dayStr, monthStr, yearStr, refDay, refMonth, refYear) {
  // Step 1: Check for empty input fields
  if (dayStr.trim() === "" || monthStr.trim() === "" || yearStr.trim() === "") {
    return {
      isValid: false,
      message: "Please fill in all three fields: Day (DD), Month (MM), and Year (YYYY)."
    };
  }

  // Step 2: Ensure values are valid numeric integers
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (isNaN(day) || isNaN(month) || isNaN(year) ||
    !Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return {
      isValid: false,
      message: "Day, Month, and Year must be valid whole numbers."
    };
  }

  // Step 3: Check year range
  if (year < 1900) {
    return {
      isValid: false,
      message: "Please enter a realistic birth year (1900 or later)."
    };
  }

  // Step 4: Check month range (1 - 12)
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      message: "Month must be between 1 (January) and 12 (December)."
    };
  }

  // Step 5: Check day range: day must not be less than 1
  if (day < 1) {
    return {
      isValid: false,
      message: "Day must be 1 or greater."
    };
  }

  // Step 6: Check day validity against the specific month and year
  const maxDays = getDaysInMonth(month, year);
  if (day > maxDays) {
    if (month === 2) {
      if (isLeapYear(year)) {
        return {
          isValid: false,
          message: `February ${year} has only 29 days (Leap Year). Day ${day} is invalid.`
        };
      } else {
        return {
          isValid: false,
          message: `${year} is not a leap year. February only has 28 days.`
        };
      }
    }
    return {
      isValid: false,
      message: `${getMonthName(month)} ${year} only has ${maxDays} days. Day ${day} is invalid.`
    };
  }

  // Step 7: Check future date relative to system date
  if (
    year > refYear ||
    (year === refYear && month > refMonth) ||
    (year === refYear && month === refMonth && day > refDay)
  ) {
    return {
      isValid: false,
      message: "Date of birth cannot be in the future relative to today's date."
    };
  }

  // All checks passed successfully
  return {
    isValid: true,
    message: ""
  };
}

/**
 * Calculates exact age in Years, Months, and Days using explicit imperative borrowing.
 * 
 * Imperative Logic:
 * 1. If reference day is smaller than birth day, borrow days from the month
 *    immediately PRECEDING the reference date.
 * 2. If reference month is smaller than birth month, borrow 12 months from reference year.
 * 3. Calculate differences for days, months, and years.
 */
function calculateExactAge(birthDay, birthMonth, birthYear, refDay, refMonth, refYear) {
  let workingDay = refDay;
  let workingMonth = refMonth;
  let workingYear = refYear;

  // Day Borrowing
  if (workingDay < birthDay) {
    workingMonth = workingMonth - 1;
    // Rollover if borrowing across year boundary (January into December of previous year)
    if (workingMonth < 1) {
      workingMonth = 12;
      workingYear = workingYear - 1;
    }
    const daysFromPrecedingMonth = getDaysInMonth(workingMonth, workingYear);
    workingDay = workingDay + daysFromPrecedingMonth;
  }
  const ageDays = workingDay - birthDay;

  // Month Borrowing
  if (workingMonth < birthMonth) {
    workingMonth = workingMonth + 12;
    workingYear = workingYear - 1;
  }
  const ageMonths = workingMonth - birthMonth;

  // Year Difference
  const ageYears = workingYear - birthYear;

  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays
  };
}

/**
 * Determines Zodiac Sign, unicode symbol, date range, and astrological element.
 * Uses explicit conditional logic based on standard astrological date boundaries.
 */
function getZodiacSign(day, month) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { name: "Aries", symbol: "♈", range: "Mar 21 – Apr 19", element: "Fire" };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { name: "Taurus", symbol: "♉", range: "Apr 20 – May 20", element: "Earth" };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { name: "Gemini", symbol: "♊", range: "May 21 – Jun 20", element: "Air" };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { name: "Cancer", symbol: "♋", range: "Jun 21 – Jul 22", element: "Water" };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { name: "Leo", symbol: "♌", range: "Jul 23 – Aug 22", element: "Fire" };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { name: "Virgo", symbol: "♍", range: "Aug 23 – Sep 22", element: "Earth" };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { name: "Libra", symbol: "♎", range: "Sep 23 – Oct 22", element: "Air" };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { name: "Scorpio", symbol: "♏", range: "Oct 23 – Nov 21", element: "Water" };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { name: "Sagittarius", symbol: "♐", range: "Nov 22 – Dec 21", element: "Fire" };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { name: "Capricorn", symbol: "♑", range: "Dec 22 – Jan 19", element: "Earth" };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { name: "Aquarius", symbol: "♒", range: "Jan 20 – Feb 18", element: "Air" };
  } else {
    return { name: "Pisces", symbol: "♓", range: "Feb 19 – Mar 20", element: "Water" };
  }
}

/**
 * Calculates upcoming birthday date, weekday, and countdown in days.
 */
function calculateNextBirthday(birthDay, birthMonth, refDay, refMonth, refYear) {
  // Check if birthday is today
  if (birthDay === refDay && birthMonth === refMonth) {
    return {
      isToday: true,
      formattedDate: `${getMonthName(refMonth)} ${refDay}, ${refYear}`,
      weekday: "Today",
      daysRemaining: 0,
      note: ""
    };
  }

  // Determine if next birthday is later this year or next year
  const isLaterThisYear = (birthMonth > refMonth) ||
    (birthMonth === refMonth && birthDay > refDay);
  let targetYear = isLaterThisYear ? refYear : refYear + 1;
  let targetMonth = birthMonth;
  let targetDay = birthDay;
  let note = "";

  // Handle Feb 29 birthday in non-leap years
  if (birthMonth === 2 && birthDay === 29 && !isLeapYear(targetYear)) {
    targetMonth = 3;
    targetDay = 1;
    note = "Celebrated on March 1 in common years";
  }

  const todayMidnight = new Date(refYear, refMonth - 1, refDay);
  const nextBdayMidnight = new Date(targetYear, targetMonth - 1, targetDay);

  const diffMs = nextBdayMidnight.getTime() - todayMidnight.getTime();
  const daysRemaining = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekday = dayNames[nextBdayMidnight.getDay()];

  return {
    isToday: false,
    formattedDate: `${getMonthName(targetMonth)} ${targetDay}, ${targetYear}`,
    weekday: weekday,
    daysRemaining: daysRemaining,
    note: note
  };
}

/**
 * Main Form Submit Controller.
 */
function handleCalculate(event) {
  event.preventDefault();

  // Obtain fresh system date at the moment of calculation
  const now = new Date();
  const refDay = now.getDate();
  const refMonth = now.getMonth() + 1;
  const refYear = now.getFullYear();

  const dayInput = document.getElementById("inputDay").value;
  const monthInput = document.getElementById("inputMonth").value;
  const yearInput = document.getElementById("inputYear").value;

  // Run full validation
  const validation = validateDateOfBirth(dayInput, monthInput, yearInput, refDay, refMonth, refYear);
  if (!validation.isValid) {
    showError(validation.message);
    hideResults();
    return;
  }

  clearError();

  const birthDay = Number(dayInput);
  const birthMonth = Number(monthInput);
  const birthYear = Number(yearInput);

  // 1. Calculate Exact Age
  const age = calculateExactAge(birthDay, birthMonth, birthYear, refDay, refMonth, refYear);

  // 2. Determine Zodiac Sign
  const zodiac = getZodiacSign(birthDay, birthMonth);

  // 3. Calculate Next Birthday
  const nextBday = calculateNextBirthday(birthDay, birthMonth, refDay, refMonth, refYear);

  // Render to DOM
  renderResults(age, zodiac, nextBday, birthDay, birthMonth, refDay, refMonth);
}

/**
 * Updates DOM elements with calculated data and reveals the results section.
 */
function renderResults(age, zodiac, nextBday, birthDay, birthMonth, refDay, refMonth) {
  // Update Age
  document.getElementById("resultYears").textContent = age.years;
  document.getElementById("resultMonths").textContent = age.months;
  document.getElementById("resultDays").textContent = age.days;

  // Check if today is user's birthday
  const birthdayGreeting = document.getElementById("birthdayGreeting");
  if (birthDay === refDay && birthMonth === refMonth) {
    birthdayGreeting.classList.remove("hidden");
  } else {
    birthdayGreeting.classList.add("hidden");
  }

  // Update Zodiac Sign
  document.getElementById("zodiacSymbol").textContent = zodiac.symbol;
  document.getElementById("zodiacName").textContent = zodiac.name;
  document.getElementById("zodiacRange").textContent = zodiac.range;
  document.getElementById("zodiacElement").textContent = zodiac.element;

  // Update Next Birthday
  document.getElementById("nextBirthdayDate").textContent = nextBday.formattedDate;
  document.getElementById("nextBirthdayDay").textContent = nextBday.weekday;
  document.getElementById("countdownDays").textContent = nextBday.daysRemaining;

  const noteElement = document.getElementById("nextBirthdayNote");
  if (nextBday.note !== "") {
    noteElement.textContent = nextBday.note;
    noteElement.classList.remove("hidden");
  } else {
    noteElement.classList.add("hidden");
  }

  // Reveal results section
  const resultsSection = document.getElementById("resultsSection");
  resultsSection.classList.remove("hidden");
}

/**
 * Handles Form Reset: returns interface completely to initial state.
 */
function handleReset() {
  document.getElementById("inputDay").value = "";
  document.getElementById("inputMonth").value = "";
  document.getElementById("inputYear").value = "";

  clearError();
  hideResults();

  document.getElementById("inputDay").focus();
}

/**
 * Displays error message in the alert banner.
 */
function showError(message) {
  const errorBanner = document.getElementById("errorBanner");
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.textContent = message;
  errorBanner.classList.remove("hidden");
}

/**
 * Clears and hides the error banner.
 */
function clearError() {
  const errorBanner = document.getElementById("errorBanner");
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.textContent = "";
  errorBanner.classList.add("hidden");
}

/**
 * Hides results section.
 */
function hideResults() {
  const resultsSection = document.getElementById("resultsSection");
  resultsSection.classList.add("hidden");
}
