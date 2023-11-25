import React, { useState } from "react";
import "./Sidebar.css";

import "animate.css";

export default function SkewedNavbar(props) {
  const {
    setShowChart,
    setIsContactFormVisible,
    setShowHabitForm,
    setIsRegistrationVisible,
    setCompletedHabitsData,
    setShowCompletedHabits,
    setShowUnfinished,
  } = props;

  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isBlackBackground, setIsBlackBackground] = useState(false);

  const handleBackgroundClick = () => {
    setIsBlackBackground((prev) => !prev);
  };

  const handleRegisterClick = () => {
    setIsRegistrationVisible(true);
    setIsContactFormVisible(false);
    setShowHabitForm(false);
    setShowChart(false);
    setShowCompletedHabits(false);
    setShowUnfinished(false);
  };

  const handleCompletedClick = () => {
    setShowCompletedHabits(true);
    setShowChart(true);
    setShowUnfinished(false);
    setIsRegistrationVisible(false);
    setIsContactFormVisible(false);
    setShowHabitForm(false);
    

  };

  const handleCategoriesClick = () => {
    setShowCategoriesDropdown(!showCategoriesDropdown);
    props.onCategoriesClick();
    setIsContactFormVisible(false);
    setShowHabitForm(false);
    setIsRegistrationVisible(false);
    setShowChart(false);
    setShowCompletedHabits(false);
  };

  const handleThemeClick = () => {
    setTheme(!theme);
    props.onThemeClick();
  };
  const handleContactUsClick = () => {
    setIsContactFormVisible(true);
    setShowHabitForm(false);
    setIsRegistrationVisible(false);
    setShowChart(false);
    setShowCompletedHabits(false);
    setShowUnfinished(false);
  };

  return (
    <div>
      <ul className='navbar habit-form'>
        <li>
          <button
            className='nav-dark skewed-button habit-form'
            onClick={handleCompletedClick}
          >
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={192}
                height={192}
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <rect width={256} height={256} fill='none' />
                <path
                  d='M224,177.32122V78.67878a8,8,0,0,0-4.07791-6.9726l-88-49.5a8,8,0,0,0-7.84418,0l-88,49.5A8,8,0,0,0,32,78.67878v98.64244a8,8,0,0,0,4.07791,6.9726l88,49.5a8,8,0,0,0,7.84418,0l88-49.5A8,8,0,0,0,224,177.32122Z'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <polyline
                  points='177.022 152.511 177.022 100.511 80 47'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <polyline
                  points='222.897 74.627 128.949 128 33.108 74.617'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='128.94915'
                  y1={128}
                  x2='128.01036'
                  y2='234.82131'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
              </svg>
              History
            </span>
          </button>
        </li>
        <li>
          <button
            className='nav-dark skewed-button habit-form'
            onClick={handleCategoriesClick}
          >
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={192}
                height={192}
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <rect width={256} height={256} fill='none' />
                <rect
                  x={24}
                  y={56}
                  width={208}
                  height={144}
                  rx={8}
                  strokeWidth={16}
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='none'
                />
                <line
                  x1='167.99414'
                  y1={168}
                  x2='199.99414'
                  y2={168}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='119.99414'
                  y1={168}
                  x2='135.99414'
                  y2={168}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='23.99414'
                  y1='96.85228'
                  x2='231.99412'
                  y2='96.85228'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
              </svg>
              Categories
            </span>
          </button>
        </li>
        <li>
          <button
            className='nav-dark skewed-button habit-form'
            onClick={handleRegisterClick}
          >
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={192}
                height={192}
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <rect width={256} height={256} fill='none' />
                <rect
                  x={24}
                  y={56}
                  width={208}
                  height={144}
                  rx={8}
                  strokeWidth={16}
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='none'
                />
                <line
                  x1='167.99414'
                  y1={168}
                  x2='199.99414'
                  y2={168}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='119.99414'
                  y1={168}
                  x2='135.99414'
                  y2={168}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='23.99414'
                  y1='96.85228'
                  x2='231.99412'
                  y2='96.85228'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
              </svg>
              Register
            </span>
          </button>
        </li>
        <li>
          <button
            className='nav-dark skewed-button habit-form'
            onClick={handleContactUsClick}
          >
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={192}
                height={192}
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <rect width={256} height={256} fill='none' />
                <rect
                  x={24}
                  y={56}
                  width={208}
                  height={144}
                  rx={8}
                  strokeWidth={16}
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='none'
                />
                <line
                  x1='167.99414'
                  y1={168}
                  x2='199.99414'
                  y2={168}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='119.99414'
                  y1={168}
                  x2='135.99414'
                  y2={168}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='23.99414'
                  y1='96.85228'
                  x2='231.99412'
                  y2='96.85228'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
              </svg>
              Contact Us
            </span>
          </button>
        </li>
        <li>
          <button
            className={`theme-toggle skewed-button habit-form ${
              theme === "dark" ? "" : "white-background"
            }`}
            onClick={(e) => {
              handleThemeClick(e); // Call the original theme click handler first
              handleBackgroundClick(); // Then toggle background color
            }}
          >
            <span>
              <rect width={256} height={256} fill='none' />
              <rect
                x={24}
                y={56}
                width={208}
                height={144}
                rx={8}
                strokeWidth={16}
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                fill='none'
              />
              <line
                x1='167.99414'
                y1={168}
                x2='199.99414'
                y2={168}
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={16}
              />
              <line
                x1='119.99414'
                y1={168}
                x2='135.99414'
                y2={168}
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={16}
              />
              <line
                x1='23.99414'
                y1='96.85228'
                x2='231.99412'
                y2='96.85228'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={16}
              />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
