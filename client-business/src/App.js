import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/page.css';
import './styles/main.css';
import './Fonts/font.css';
import Login from './Page/Auth/LoginPage';
import FindIDPW from './Page/Auth/FindIDPW';
import AdminMenu from './Page/Main/MenuPage';
import Register from './Page/Main/Register';
import ImgUpload from './Page/Main/ImgUpload';
import ReservationManagement from './Page/Main/ReservationManagementPage';
import ReservationDetails from './Page/Main/ReservationDetailPage';
import CustomerManagement from './Page/Main/CustomerManagementPage';
import ReviewManagement from './Page/Main/ReviewManagementPage';
import WriteNotice from './Page/Main/NoticeWritePage';
import CalculationManagement from './Page/Main/CalculationManagementPage';
import { ImageProvider } from './Contexts/ImageContext';
import RegisterInformation from './Page/Main/RegisterInformation';

function App() {
  const [imageFiles, setImageFiles] = useState({
    main: [],
    sub: [],
    album: [],
    review: [],
    pricing: [],
  });

  const handleSetImageFiles = (imageType, files) => {
    setImageFiles((prevFiles) => ({
      ...prevFiles,
      [imageType]: files,
    }));
  };

  return (
    <div className="App">
          <div className="Container">
          <ImageProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register imageFiles={imageFiles} />} />
                <Route path="/imgupload/:imageType" element={<ImgUpload setImageFiles={handleSetImageFiles} />} />
                <Route path="/find-admin-account" element={<FindIDPW />} />
                <Route path="/admin-menu" element={<AdminMenu />} />
                <Route path="/reservation-management" element={<ReservationManagement />} />
                <Route path="/reservation-detail" element={<ReservationDetails />} />
                <Route path="/customer-management" element={<CustomerManagement />} />
                <Route path="/review-management" element={<ReviewManagement />} />
                <Route path="/write-notice" element={<WriteNotice />} />
                <Route path="/calculation-management" element={<CalculationManagement />} />
                {/* 다른 라우트들 추가 */}
                <Route path="/register-information" element={<RegisterInformation />} />

              </Routes>
            </Router>
            </ImageProvider> 
          </div>
        </div>
  );
}

export default App;
