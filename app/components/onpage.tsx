// components/OnPageNavigation.tsx
"use client";

import { useState, useEffect } from 'react';

interface OnPageNavigationProps {
  sections: string[]; // List of section titles to display
}

// Helper function (can be shared with page.tsx if placed in a utils file)
const getSectionId = (title: string): string =>
  title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

export default function OnPageNavigation({ sections }: OnPageNavigationProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed top navigation bar
      const topNavHeight = document.querySelector('nav.main-nav')?.clientHeight || 0;
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - topNavHeight - 20; // -20px buffer

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      window.history.pushState(null, "", `#${id}`);
      setActiveSectionId(id); // Set active immediately on click
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const topNavHeight = document.querySelector('nav.main-nav')?.clientHeight || 0;

      // Find the section currently in view or slightly above
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = getSectionId(sections[i]);
        const element = document.getElementById(sectionId);
        if (element) {
          const sectionTop = element.getBoundingClientRect().top + scrollY;
          // Consider a section active if its top is near or above the top of the viewport
          if (sectionTop <= scrollY + topNavHeight + 50) { // +50px buffer
            setActiveSectionId(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount to set initial active section

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);


  if (sections.length === 0) {
    return null; // Don't render if no sections
  }

  return (
    <aside className="sticky top-24 w-64 pl-8 pt-4 pb-8 pr-4 max-lg:hidden"> {/* Sticky sidebar, hidden on small screens */}
      <h3 className="text-lg font-bold text-gray-900 mb-4">On this page</h3>
      <ul className="space-y-2 text-sm">
        {sections.map((sectionTitle) => {
          const id = getSectionId(sectionTitle);
          const isActive = activeSectionId === id;
          return (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left py-1.5 px-3 rounded-md transition-colors duration-200
                  ${isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600 -ml-3 pl-2.5' // Active state
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50' // Default state
                  }
                `}
              >
                {sectionTitle.replace("sports/", "")}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}