# Age Calculator & Zodiac Explorer

An interactive, responsive web application built with **HTML5**, **CSS3**, and **Vanilla JavaScript** that calculates a person's exact chronological age in **Years, Months, and Days** relative to the current system date, determines their **Zodiac Sign**, and provides an upcoming **Birthday Countdown**.

This project was developed for **Imperative Programming (IP) — Formative Assessment I**.

---

## Group Members

- **Prachi Kumari**
- **Nidhi Rathi**
- **Sanskriti Prasad**
- **Sneha Sahu**

---

## Project Overview

In computer science education, calendar arithmetic and date calculations serve as classic problems for demonstrating **Imperative Programming** principles. While modern high-level libraries often encapsulate date math behind black-box methods, this application implements the entire validation, calendar verification, borrowing logic, and astrological mapping manually step-by-step.

The application automatically obtains the client's current system date and allows users to input their birth date (Day, Month, Year). It performs thorough validations to catch impossible calendar dates and future dates, executes manual day and month borrowing to compute exact age, reveals the corresponding Zodiac profile, and calculates days remaining until the next birthday.

The visual interface is designed with a dark gothic, atmospheric aesthetic inspired by the *Wednesday* series, utilizing layered CSS mist effects, elegant typography, and responsive layouts.

---

## Project Objectives

1. **Demonstrate Imperative Programming**: Implement clear step-by-step algorithms using variables, conditional branching, functions, and manual arithmetic rather than relying on external libraries.
2. **Accurate Calendar Math**: Handle variations in month lengths (28, 29, 30, and 31 days), leap years, and calendar edge cases.
3. **Robust Input Validation**: Ensure zero incorrect or crashing calculations by validating inputs before executing calculations.
4. **Integrated User Experience**: Present age breakdowns, astrological insights (Zodiac symbol, date range, element), and birthday milestones in a unified, accessible interface.
5. **Distinct Visual Identity**: Deliver a dark gothic design that works smoothly across desktop, tablet, and mobile browsers.

---

## Key Features

- **Exact Chronological Age**:
  - Displays age broken down into **Years**, **Months**, and **Days**.
  - Dynamically calculates relative to today's live system date.
- **Manual Borrowing Algorithm**:
  - Automatically borrows days from the preceding month when the current day is smaller than the birth day.
  - Automatically borrows 12 months when the current month is smaller than the birth month.
- **Accurate Leap Year Handling**:
  - Implements the complete Gregorian leap-year rule.
  - Correctly evaluates February 29 birthdays in both leap years and common years.
- **Comprehensive Input Validation**:
  - Detects empty fields and non-integer inputs.
  - Flags invalid dates such as `31/02/2005`, `31/04/2021`, or `29/02/2025`.
  - Rejects birth dates occurring in the future.
- **Zodiac Explorer**:
  - Automatically determines the user's Zodiac sign based on birth day and month.
  - Displays the astrological sign name, Unicode glyph (`♈` through `♓`), date range, and element (*Fire, Earth, Air, Water*).
- **Next Birthday Countdown**:
  - Shows the date, day of the week, and exact countdown in days until the next birthday.
  - Features celebratory greeting banner if today is the user's birthday.
  - Handles February 29 birthdays in non-leap years by noting celebration on March 1.
- **Clear / Reset Workflow**:
  - Resets all inputs, clears active validation alerts, hides results, and restores focus to the first input.

---

## Technologies Used

- **HTML5**: Semantic document structure (`<header>`, `<main>`, `<section>`, `<form>`, `<label>`, `<input>`, `<footer>`), accessible ARIA attributes (`role="alert"`, `aria-live="polite"`).
- **CSS3 (Vanilla CSS)**:
  - Custom design tokens via CSS custom properties (`:root`).
  - Fluid responsive layouts using CSS Grid and Flexbox.
  - Multi-layered atmospheric background using `radial-gradient` and `linear-gradient` with frosted glass card styling (`backdrop-filter: blur()`).
  - Cross-browser system font stacks (`Palatino`, `Georgia`, `Garamond`, `serif` for editorial titles; modern system sans-serif for inputs and metrics).
  - Mobile-first responsive media queries (`@media (max-width: 768px)` and `@media (max-width: 480px)`).
- **Vanilla JavaScript (ES6+)**:
  - Pure imperative programming logic without any external dependencies, frameworks, or third-party packages.

---

## Imperative Programming Concepts Demonstrated

This project explicitly demonstrates core concepts of the Imperative Programming paradigm:

1. **Variables & State Management**:
   - Explicit mutable working variables (`workingDay`, `workingMonth`, `workingYear`) tracked and transformed sequentially during borrowing.
2. **Conditional Control Flow**:
   - `if`, `else if`, and `else` statements for validation ladders, leap-year checks, borrowing decisions, and zodiac boundary comparisons.
3. **Arithmetic Operations & Modulus**:
   - Modulo operations (`year % 4`, `year % 100`, `year % 400`) for Gregorian leap-year verification.
   - Exact integer subtraction and addition during day/month borrowing.
4. **Modular Functions with Parameters and Return Values**:
   - Dedicated functions with single responsibilities:
     - `isLeapYear(year)`
     - `getDaysInMonth(month, year)`
     - `getMonthName(month)`
     - `validateDateOfBirth(dayStr, monthStr, yearStr, refDay, refMonth, refYear)`
     - `calculateExactAge(birthD, birthM, birthY, refD, refM, refY)`
     - `getZodiacSign(day, month)`
     - `calculateNextBirthday(birthD, birthM, refD, refM, refY)`
5. **Event-Driven Execution & DOM Manipulation**:
   - Event listeners bound to form submission (`submit`) and reset (`click`).
   - Dynamic reading of input values, updating element text content, and toggling visibility utility classes (`hidden`).

---

## Age Calculation Logic & Borrowing Algorithm

Let the Date of Birth be $(B_d, B_m, B_y)$ and the Current Reference Date be $(C_d, C_m, C_y)$.

### 1. The Borrowing Concept

When subtracting dates, direct subtraction $(C_d - B_d)$ or $(C_m - B_m)$ can produce negative values when the current date component is smaller than the birth date component. In imperative programming, this is resolved by **borrowing**:

- **Day Borrowing**:
  If $C_d < B_d$, we decrement the current month counter by 1 ($C_m = C_m - 1$). If the month becomes $0$ (January rollover), we reset $C_m = 12$ and decrement $C_y = C_y - 1$. We then determine how many days were in that borrowed month (`daysFromPrecedingMonth = getDaysInMonth(C_m, C_y)`) and add them to $C_d$:
  $$C_d = C_d + \text{daysFromPrecedingMonth}$$
  $$\text{Age}_{\text{days}} = C_d - B_d$$

- **Month Borrowing**:
  If $C_m < B_m$, we borrow 1 year (12 months) from the current year ($C_y = C_y - 1$) and add 12 to $C_m$:
  $$C_m = C_m + 12$$
  $$\text{Age}_{\text{months}} = C_m - B_m$$

- **Year Difference**:
  $$\text{Age}_{\text{years}} = C_y - B_y$$

### 2. Gregorian Leap-Year Rule

A year is a leap year if and only if:
- It is divisible by $400$, **OR**
- It is divisible by $4$ **AND** not divisible by $100$.

```javascript
function isLeapYear(year) {
  if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
    return true;
  }
  return false;
}
```

### 3. Month Length Resolution

```javascript
function getDaysInMonth(month, year) {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  }
  return 31;
}
```

---

## Input Validation Workflow

Before any arithmetic begins, user inputs pass through a sequential validation pipeline:

1. **Empty Input Check**: Verifies that Day, Month, and Year inputs are not empty or blank.
2. **Numeric & Integer Check**: Verifies that values are valid integers (`Number.isInteger()`), rejecting strings, symbols, and decimals.
3. **Year Range**: Rejects years before 1900 to ensure realistic inputs.
4. **Month Range**: Confirms month is within $1 \le \text{month} \le 12$.
5. **Day Lower Bound**: Confirms day is $\ge 1$.
6. **Month Length Verification**: Compares the day against `getDaysInMonth(month, year)`.
   - Rejects days $> 30$ in April, June, September, and November.
   - Rejects days $> 28$ in February during common years.
   - Rejects days $> 29$ in February during leap years.
7. **Future Date Check**: Compares $(B_y, B_m, B_d)$ against the live $(C_y, C_m, C_d)$ to ensure the date of birth has already occurred.

If any check fails, execution terminates immediately, an explanatory error message is displayed, and the results container is hidden.

---

## Zodiac Sign Explorer

The Zodiac sign is resolved through an explicit conditional ladder comparing day and month against standard tropical astrological boundaries:

| Sign | Symbol | Date Range | Element |
| :--- | :---: | :---: | :---: |
| **Aries** | ♈ | Mar 21 – Apr 19 | Fire |
| **Taurus** | ♉ | Apr 20 – May 20 | Earth |
| **Gemini** | ♊ | May 21 – Jun 20 | Air |
| **Cancer** | ♋ | Jun 21 – Jul 22 | Water |
| **Leo** | ♌ | Jul 23 – Aug 22 | Fire |
| **Virgo** | ♍ | Aug 23 – Sep 22 | Earth |
| **Libra** | ♎ | Sep 23 – Oct 22 | Air |
| **Scorpio** | ♏ | Oct 23 – Nov 21 | Water |
| **Sagittarius** | ♐ | Nov 22 – Dec 21 | Fire |
| **Capricorn** | ♑ | Dec 22 – Jan 19 | Earth |
| **Aquarius** | ♒ | Jan 20 – Feb 18 | Air |
| **Pisces** | ♓ | Feb 19 – Mar 20 | Water |

---

## User Interface & Aesthetic Design

- **Dark Gothic Atmosphere**: Takes general aesthetic inspiration from the dark, moody visual tone of the *Wednesday* series without copying copyrighted assets.
- **Atmospheric Background**: Built using multi-layered CSS gradients:
  - Deep obsidian base (`#08080c`).
  - Soft, cloud-like purple mist rising from the bottom viewport (`rgba(107, 33, 168, 0.28)`).
  - Subtle floating mist pockets on the lower left and right.
  - Restrained upper atmospheric aura behind the title.
- **Card Surfaces**: Frosted slate surfaces (`rgba(20, 20, 29, 0.92)`) with `backdrop-filter: blur(14px)`, subtle borders, and deep drop shadows to ensure clear visual separation and high contrast.
- **Responsive Layout**: Adapts gracefully across desktop monitors, laptops, tablets, and mobile screens.

---

## Project Structure

```text
IP_Age_Calculator/
├── index.html       # Semantic HTML5 layout, input form, and results structure
├── style.css        # Vanilla CSS styling, gothic atmosphere, and responsive layout
├── script.js        # Imperative JavaScript logic (validation, age, zodiac, next birthday)
└── README.md        # Comprehensive project documentation
```

---

## How to Run the Project

Because the project is built entirely with standard web technologies (HTML, CSS, and Vanilla JavaScript), **no installation, build step, package manager, or server setup is required**.

### Method 1: Direct Browser Launch
1. Navigate to the project directory: `IP_Age_Calculator`.
2. Double-click `index.html` (or right-click and choose **Open With** &rarr; your preferred browser, such as Google Chrome, Microsoft Edge, or Mozilla Firefox).

### Method 2: Local HTTP Server (Optional)
If running inside an IDE (such as VS Code or Antigravity):
- Use the **Live Server** extension, or
- Run Python's built-in HTTP server from your terminal:
  ```bash
  python -m http.server 8080
  ```
  Then open `http://localhost:8080` in your web browser.

---

## Testing & Edge Cases Handled

The application has been verified across the following test cases:

| Test Case | Inputs (`DD/MM/YYYY`) | Expected Behavior / Output | Result |
| :--- | :--- | :--- | :---: |
| **Normal Valid Date** | `15 / 06 / 2000` | Calculates exact age, displays Gemini (♊), updates countdown | **PASS** |
| **Day Borrowing** | `25 / 03 / 2004` | Borrows days from preceding month; calculates correct days | **PASS** |
| **Month Borrowing** | `10 / 11 / 2005` | Borrows 12 months from reference year; calculates correct months | **PASS** |
| **Both Day & Month Borrowing** | `28 / 11 / 2002` | Executes both borrowing routines across year/month boundaries | **PASS** |
| **Leap Day in Leap Year** | `29 / 02 / 2004` | Accepted as valid date; exact age calculated; Pisces (♓) | **PASS** |
| **Leap Day in Common Year** | `29 / 02 / 2025` | Rejected: *"2025 is not a leap year. February only has 28 days."* | **PASS** |
| **Non-existent Date (31/04)** | `31 / 04 / 2020` | Rejected: *"April 2020 only has 30 days. Day 31 is invalid."* | **PASS** |
| **Non-existent Date (31/06)** | `31 / 06 / 2020` | Rejected: *"June 2020 only has 30 days. Day 31 is invalid."* | **PASS** |
| **Non-existent Date (31/02)** | `31 / 02 / 2005` | Rejected: *"2005 is not a leap year. February only has 28 days."* | **PASS** |
| **Future Date** | `15 / 12 / 2028` | Rejected: *"Date of birth cannot be in the future relative to today's date."* | **PASS** |
| **Empty Inputs** | `"" / "" / ""` | Rejected: *"Please fill in all three fields: Day (DD), Month (MM), and Year (YYYY)."* | **PASS** |
| **Non-Numeric Characters** | `"abc" / "10" / "2000"` | Rejected: *"Day, Month, and Year must be valid whole numbers."* | **PASS** |
| **Day Less Than 1** | `0 / 05 / 2000` | Rejected: *"Day must be 1 or greater."* | **PASS** |
| **Month Out of Bounds** | `15 / 13 / 2000` | Rejected: *"Month must be between 1 (January) and 12 (December)."* | **PASS** |
| **Born Today** | Today's Date | Returns 0 Years, 0 Months, 0 Days; displays birthday greeting | **PASS** |
| **Zodiac Boundaries** | `20/03` vs `21/03`<br>`22/10` vs `23/10`<br>`21/12` vs `22/12` | Correctly differentiates Pisces/Aries, Libra/Scorpio, Sagittarius/Capricorn | **PASS** |
| **Reset Functionality** | Click Clear/Reset | Clears all fields, removes error banner, hides results, focuses Day field | **PASS** |

---

## Deployment Status

- **Current Deployment Status**: The application is currently configured and verified for **local client-side execution**. All assets (HTML, CSS, JavaScript) are static and self-contained with no backend or external CDN dependencies.
- **Web Deployment Compatibility**: The codebase is production-ready for deployment on any static hosting provider (e.g., **GitHub Pages**, **Vercel**, or **Netlify**) by hosting the root directory without any build configuration.

---

## Future Scope

1. **Time-of-Birth Precision**: Allow optional entry of birth time (hours and minutes) to calculate age down to hours, minutes, and seconds in real-time.
2. **Life Milestones & Fun Statistics**: Calculate total days lived, approximate total heartbeats, total hours of sleep, and total breaths taken.
3. **Planetary Age Calculator**: Calculate how old the user would be on other planets in our solar system (e.g., Mercury, Venus, Mars, Jupiter).
4. **Historical Event Integration**: Provide a curated *"On This Day in History"* note highlighting major world events that occurred on the user's birth date.
5. **Sharable Summary Card**: Generate a downloadable or shareable image summarizing the user's age, zodiac archetype, and birthday milestone.

---

## License

This project is created for academic coursework under the **Department of Computer Applications** for **Imperative Programming (IP)**. Educational use and evaluation are permitted.
