import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-datepicker/dist/react-datepicker.css";
import '../public/css/searchbar.css';
import { useAppDispatch } from 'store/hooks';
const SearchForm = () => {

   const dispatch = useAppDispatch();
  
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [guests, setGuests] = useState(2);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  const datePickerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Mock function to simulate searching villas
  const searchVillas = (query) => {
    // Mock data - in real application, this would be an API call
    const mockVillas = [
      { id: 1, name: 'Villa Paradise', address: '123 Bãi biển Đà Nẵng, Việt Nam' },
      { id: 2, name: 'Villa Ocean View', address: '456 Vũng Tàu, Việt Nam' },
      { id: 3, name: 'Villa Mountain Retreat', address: '789 Đà Lạt, Việt Nam' },
      { id: 4, name: 'Villa Riverside', address: '101 Hội An, Việt Nam' },
      { id: 5, name: 'Villa Luxury Escape', address: '202 Phú Quốc, Việt Nam' },
    ];

    return mockVillas.filter(villa => 
      villa.name.toLowerCase().includes(query.toLowerCase()) || 
      villa.address.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    if (destination.length > 0) {
      const results = searchVillas(destination);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [destination]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectLocation = (villa) => {
    setDestination(villa.name);
    setShowResults(false);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    
    if (start && end) {
      setTimeout(() => {
        setShowDatePicker(false);
      }, 500);
    }
  };

  const increaseGuests = () => {
    setGuests(prev => prev + 1);
  };

  const decreaseGuests = () => {
    setGuests(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      destination,
      checkIn: startDate,
      checkOut: endDate,
      guests
    });
    
    // Here you would typically call an API or navigate to results page
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString('vi-VN')} - ${endDate.toLocaleDateString('vi-VN')}`;
    }
    return "Ngày nhận - Ngày trả";
  };

  return (
    <div className="search-form-container container">
      <form onSubmit={handleSubmit} className="search-form">
        {/* Destination Search */}
        <div className="search-item destination-container" ref={searchInputRef}>
          <div className="input-wrapper">
            <i className="bi bi-house"></i>
            <div className="input-content">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Nhập địa điểm"
              />
            </div>
          </div>
          
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.slice(0, 5).map(villa => (
                <div 
                  key={villa.id} 
                  className="result-item"
                  onClick={() => selectLocation(villa)}
                >
                  <i className="bi bi-geo-alt"></i>
                  <div className="villa-info">
                    <div className="villa-name">{villa.name}</div>
                    <div className="villa-address">{villa.address}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date Picker */}
        <div className="search-item date-picker-container text-dark d-flex justify-content-center" ref={datePickerRef}>
          <div 
            className="date-display"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <i className="bi bi-calendar"></i>
            <span>{formatDateRange()}</span>
          </div>
          
          {showDatePicker && (
            <div className="date-picker-dropdown">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                monthsShown={2}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          )}
        </div>

        <div className="search-item guest-counter d-flex justify-content-center">
          <i className="bi bi-person"></i>
          <div className="guest-selector ">
            <button 
              type="button" 
              className="guest-btn decrease d-flex justify-content-center"
              onClick={decreaseGuests}
            >
              <i className="bi bi-dash"></i>
            </button>
            <span className="guest-count text-dark">{guests} người</span>
            <button 
              type="button" 
              className="guest-btn increase"
              onClick={increaseGuests}
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button type="submit" className="search-button" >
          Tìm
        </button>
      </form>
    </div>
  );
};

export default SearchForm;