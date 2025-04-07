'use client'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../public/css/filter-villa.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllCategoriesAsync, getAllVillasAsync } from '../store/slices/villas/villasActions';
import Link from 'next/link';

export default function VillaFilter() {
  const dispatch = useAppDispatch();
  const  villas  = useAppSelector((state) => state.villas);
  const [villasf, setVillasf] = useState([]);
  const [categoryf, setCategoryf] = useState([]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [villasPerPage] = useState(5);
  
  // State for filters
  const [filters, setFilters] = useState({
    villaType: [],
    price: [],
    maxPeople: [],
    area: [],
    hasPool: [],
    roomCount: [],
  });

  // Handle filter changes
  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };

      if (updatedFilters[category].includes(value)) {
        // Remove value if already selected
        updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
      } else {
        // Add value if not selected
        updatedFilters[category] = [...updatedFilters[category], value];
      }

      return updatedFilters;
    });
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  // Apply filters to villa list
  const filteredVillas = villasf?.filter(villa => {
    // If no filters are applied in a category, let all pass
    const villaTypeMatch = filters.villaType.length === 0 || filters.villaType.includes(villa.category);

    const priceMatch = filters.price.length === 0 || filters.price.some(range => {
      if (range === "< 5.000.000 VNĐ") return villa.price < 5000000;
      if (range === "5.000.000 - 10.000.000 VNĐ") return villa.price >= 5000000 && villa.price <= 10000000;
      if (range === "10.000.000 - 20.000.000 VNĐ") return villa.price > 10000000 && villa.price <= 20000000;
      if (range === "20.000.000 - 30.000.000 VNĐ") return villa.price > 20000000 && villa.price <= 30000000;
      return false;
    });

    const maxPeopleMatch = filters.maxPeople.length === 0 || filters.maxPeople.some(count => {
      if (count === "5 Người") return villa.maxPeople <= 5;
      if (count === "10 Người") return villa.maxPeople > 5 && villa.maxPeople <= 10;
      if (count === "15 Người") return villa.maxPeople > 10 && villa.maxPeople <= 15;
      return false;
    });
    
    const areaMatch = filters.area.length === 0 || filters.area.some(range => {
      if (range === "< 100 m2") return villa.acreage < 100;
      if (range === "100 - 200 m2") return villa.acreage >= 100 && villa.acreage <= 200;
      if (range === "200 - 300 m2") return villa.acreage > 200 && villa.acreage <= 300;
      return false;
    });

    const hasPoolMatch = filters.hasPool.length === 0 ||
      (filters.hasPool.includes("Có") && villa.pool) ||
      (filters.hasPool.includes("Không") && !villa.pool);

    const roomCountMatch = filters.roomCount.length === 0 || filters.roomCount.some(count => {
      if (count === "2 Phòng") return villa.numberOfRooms === 2;
      if (count === "4 Phòng") return villa.numberOfRooms === 4;
      if (count === "6 Phòng") return villa.numberOfRooms === 6;
      if (count === "8 Phòng") return villa.numberOfRooms === 8;
      return false;
    });

    return villaTypeMatch && priceMatch && maxPeopleMatch && areaMatch && hasPoolMatch && roomCountMatch;
  });

  // Get current villas for pagination
  const indexOfLastVilla = currentPage * villasPerPage;
  const indexOfFirstVilla = indexOfLastVilla - villasPerPage;
  const currentVillas = filteredVillas?.slice(indexOfFirstVilla, indexOfLastVilla);
  
  // Calculate total pages
  const totalPages = Math.ceil((filteredVillas?.length || 0) / villasPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Generate pagination numbers with limit
  const getPaginationNumbers = () => {
    let pages = [];
    const maxButtons = 5; // Maximum number of page buttons to show
    
    if (totalPages <= maxButtons) {
      // If total pages are less than or equal to max buttons, show all pages
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Calculate start and end page numbers
      let startPage, endPage;
      
      if (currentPage <= Math.ceil(maxButtons / 2)) {
        // Current page is near the beginning
        startPage = 1;
        endPage = maxButtons;
      } else if (currentPage + Math.floor(maxButtons / 2) >= totalPages) {
        // Current page is near the end
        startPage = totalPages - maxButtons + 1;
        endPage = totalPages;
      } else {
        // Current page is in the middle
        startPage = currentPage - Math.floor(maxButtons / 2);
        endPage = currentPage + Math.floor(maxButtons / 2);
      }
      
      pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }
    
    return pages;
  };

  useEffect(() => {
    dispatch(getAllVillasAsync());
    dispatch(getAllCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(villas.villas) && Array.isArray(villas.categories)) {
      setVillasf(villas.villas);
      setCategoryf(villas.categories);
    } else {
      setVillasf([]);
      setCategoryf([]);
    }
  }, [villas.villas, villas.categories]);

  return (
    <div className="container mt-5">
      <div className="row mt-3">
        {/* Filter Sidebar */}
        <div className="col-md-3">
          <div className="filter-sidebar p-3 border rounded">
            <h5 className="mb-3 fw-bold">Chọn lọc theo:</h5>

            {/* Villa Type Filter */}
            <div className="filter-section mb-4">
              <h6 className="mb-2 fw-bold">Loại villa:</h6>
              {categoryf.map(type => (
                <div className="form-check" key={`type-${type._id}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`type-${type._id}`}
                    checked={filters.villaType.includes(type._id)}
                    onChange={() => handleFilterChange('villaType', type._id)}
                  />
                  <label className="form-check-label" htmlFor={`type-${type._id}`}>
                    {type.name}
                  </label>
                </div>
              ))}
            </div>

            {/* Price Filter */}
            <div className="filter-section mb-4">
              <h6 className="mb-2 fw-bold">Giá:</h6>
              {[
                "< 5.000.000 VNĐ",
                "5.000.000 - 10.000.000 VNĐ",
                "10.000.000 - 20.000.000 VNĐ",
                "20.000.000 - 30.000.000 VNĐ"
              ].map(range => (
                <div className="form-check" key={`price-${range}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`price-${range}`}
                    checked={filters.price.includes(range)}
                    onChange={() => handleFilterChange('price', range)}
                  />
                  <label className="form-check-label" htmlFor={`price-${range}`}>
                    {range}
                  </label>
                </div>
              ))}
            </div>

            {/* Max People Filter */}
            <div className="filter-section mb-4">
              <h6 className="mb-2 fw-bold">Số người tối đa:</h6>
              {["5 Người", "10 Người", "15 Người"].map(count => (
                <div className="form-check" key={`people-${count}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`people-${count}`}
                    checked={filters.maxPeople.includes(count)}
                    onChange={() => handleFilterChange('maxPeople', count)}
                  />
                  <label className="form-check-label" htmlFor={`people-${count}`}>
                    {count}
                  </label>
                </div>
              ))}
            </div>

            {/* Area Filter */}
            <div className="filter-section mb-4">
              <h6 className="mb-2 fw-bold">Diện tích:</h6>
              {["< 100 m2", "100 - 200 m2", "200 - 300 m2"].map(range => (
                <div className="form-check" key={`area-${range}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`area-${range}`}
                    checked={filters.area.includes(range)}
                    onChange={() => handleFilterChange('area', range)}
                  />
                  <label className="form-check-label" htmlFor={`area-${range}`}>
                    {range}
                  </label>
                </div>
              ))}
            </div>

            {/* Pool Filter */}
            <div className="filter-section mb-4">
              <h6 className="mb-2 fw-bold">Có hồ bơi hay không:</h6>
              {["Có", "Không"].map(option => (
                <div className="form-check" key={`pool-${option}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`pool-${option}`}
                    checked={filters.hasPool.includes(option)}
                    onChange={() => handleFilterChange('hasPool', option)}
                  />
                  <label className="form-check-label" htmlFor={`pool-${option}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>

            {/* Room Count Filter */}
            <div className="filter-section mb-4">
              <h6 className="mb-2 fw-bold">Số lượng phòng:</h6>
              {["2 Phòng", "4 Phòng", "6 Phòng", "8 Phòng"].map(count => (
                <div className="form-check" key={`rooms-${count}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`rooms-${count}`}
                    checked={filters.roomCount.includes(count)}
                    onChange={() => handleFilterChange('roomCount', count)}
                  />
                  <label className="form-check-label" htmlFor={`rooms-${count}`}>
                    {count}
                  </label>
                </div>
              ))}
            </div>

            {/* Clear Filters Button */}
            <button
              className="btn btn-outline-primary w-100 mt-2"
              onClick={() => {
                setFilters({
                  villaType: [],
                  price: [],
                  maxPeople: [],
                  area: [],
                  hasPool: [],
                  roomCount: []
                });
                setCurrentPage(1);
              }}
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>

        {/* Villa Listing */}
        <div className="col-md-9">
          <div className="mb-4">
            <h4 className="mb-3">Kết quả tìm kiếm ({filteredVillas?.length} villa)</h4>

            {currentVillas?.map(villa => (
              <div className="villa-card mb-4 border rounded overflow-hidden" key={villa._id}>
                <div className="row g-0">
                  <div className="col-md-4 villa-img-container">
                    <img
                      src={villa.images}
                      alt={villa.name}
                      className="villa-image"
                    />
                    <button className="favorite-btn">
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>
                  <div className="col-md-8">
                    <div className="row h-100">
                      <div className="col-md-8 p-3">
                        <h5 className="villa-name">
                          {villa.name}
                          {villa.stars && (
                            <span className="stars">
                              {[...Array(villa.stars)].map((_, i) => (
                                <i key={i} className="bi bi-star-fill text-warning"></i>
                              ))}
                            </span>
                          )}
                        </h5>
                        <div className="location mb-2">
                          <a href="#" className="location-link">{villa.location}</a>
                          <a href="#" className="map-link ms-2">Xem trên bản đồ</a>
                          <span className="distance ms-2">Cách trung tâm {villa.distance}</span>
                        </div>
                        <p className="villa-description">{villa.description}</p>
                        <div className="villa-features">
                          <div className="feature-tag">
                            {categoryf.find(category => category._id === villa.category)?.name || "Danh mục không xác định"}
                          </div>
                          <div className="feature-tag">{villa.numberOfRooms} Phòng</div>
                          <div className="feature-tag">{villa.acreage} m²</div>
                          <div className="feature-tag">
                            {villa.hasPool ? "Có hồ bơi" : "Không có hồ bơi"}
                          </div>
                          <div className="feature-tag">Tối đa {villa.maxPeople} người</div>
                        </div>
                      </div>
                      <div className="col-md-4 p-3 d-flex flex-column justify-content-between bg-light">
                        <div className="rating-box text-end">
                          <div className="rating-text">
                            Tuyệt {villa.rating >= 9 ? "hảo" : "vời"}
                          </div>
                          <div className="reviews-count">{villa.reviews} đánh giá</div>
                          <div className="rating-score">{villa.rating}</div>
                        </div>
                        <div className="price-box text-end">
                          <div className="price-value">
                            {new Intl.NumberFormat('vi-VN').format(villa.price)} VNĐ
                          </div>
                          <div className="price-period">/ đêm</div>
                          <Link href={`/villas/${villa._id}`} className="btn btn-primary w-100 mt-2">Xem chi tiết</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredVillas?.length === 0 && (
              <div className="alert alert-info">
                Không tìm thấy villa nào phù hợp với tiêu chí của bạn. Vui lòng thử lại với bộ lọc khác.
              </div>
            )}
            
            {/* Pagination with limited page buttons */}
            {filteredVillas?.length > 0 && (
              <nav aria-label="Phân trang villa">
                <ul className="pagination justify-content-center">
                  {/* Previous button */}
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={prevPage} aria-label="Trang trước">
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  
                  {/* Limited page buttons */}
                  {getPaginationNumbers().map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                  
                  {/* Next button */}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={nextPage} aria-label="Trang sau">
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}