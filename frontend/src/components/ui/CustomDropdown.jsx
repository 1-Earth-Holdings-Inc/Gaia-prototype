"use client";
import { useState, useRef, useEffect } from 'react';

export default function CustomDropdown({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  className = '',
  searchable = false,
  maxHeight = '200px'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) setSearchTerm('');
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Main Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`
          w-full rounded-xl ring-1 px-4 py-4 text-left transition-all duration-200
          ${disabled 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed ring-gray-200' 
            : 'bg-white text-gray-900 cursor-pointer ring-gray-300 hover:ring-emerald-500 focus:ring-2 focus:ring-emerald-500'
          }
          ${required && !value ? 'ring-red-300 focus:ring-red-500' : ''}
          ${value ? 'ring-emerald-300' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className={`${value ? 'text-gray-900' : 'text-gray-500'} ${value ? 'font-medium' : ''}`}>
            {value ? selectedOption?.label || selectedOption?.value || value : placeholder}
          </span>
          <div className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Required Indicator */}
      {required && (
        <span className="pointer-events-none text-red-500 absolute top-2 left-3">*</span>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-2 duration-200"
          style={{ maxHeight }}
        >
          {/* Search Input (if searchable) */}
          {searchable && (
            <div className="p-3 border-b border-gray-100">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                autoFocus
              />
            </div>
          )}

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={option.value || index}
                  onClick={() => handleSelect(option)}
                  className={`
                    w-full px-4 py-3 text-left transition-all duration-150 hover:bg-emerald-50
                    ${option.value === value 
                      ? 'bg-emerald-100 text-emerald-900 font-medium' 
                      : 'text-gray-700 hover:text-emerald-900'
                    }
                    ${option.disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : 'cursor-pointer'}
                  `}
                  disabled={option.disabled}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{option.label || option.value}</span>
                    {option.value === value && (
                      <div className="text-emerald-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
