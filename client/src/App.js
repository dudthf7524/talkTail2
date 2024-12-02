import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import NoticePage from "./Notice/NoticePage";
import ReviewPage from "./Notice/ReviewPage";
import ViewDetailsPage from "./Notice/ViewDetailsPage";
import ListPage from "./List/ListPage";
import ListMapPage from "./List/ListMapPage";
import CommunityPage from "./Community/CommunityPage";
import EditUserPage from "./EditUser/EditUserPage";
import EditAdressPage from "./EditUser/EditAddressPage";
import MyPage from "./MyPage/MyPage";
import SavedPage from "./MyPage/SavedPage";
import EventDetailPage from "./List/EventDetailPage";
import LoginPage from "./Login/LoginPage";
import KoginSuccess from "./Login/LoginSuccessPage";
import Redirection from "./Login/Redirection";
import PetListPage from "./Pet/PetListPage";
import PetSelectPage from "./Pet/PetSelectPage";
import PetRegistrationPage from "./Pet/PetRegistrationPage";
import ReservationRequestPage from "./Reservation/ReservationRequestPage";
import SelectDatePage from "./Reservation/SelectDatePage";
import ReservatinConfirm from "./Reservation/ReservationConfirmPage";
import ReservationPage from "./Reservation/ReservationPage";
import CancleReservationPage from "./Reservation/CancleReservationPage";
import UploadPage from "./File/UploadPage";
import PrivacyPolicy from "./PrivacyPolicy/privacyPolicy";
import Landing from "./Landing/landing";
import { useLocation } from "react-router-dom";
import "./App.css";
import './styles/components.css';
import SelectDatePage2 from "./Reservation/SelectDatePage2";
import PetDesigner from "./List/PetDesigner";
import PetDetailPage from "./Pet/PetDetailPage";
import PetEdit from "./Pet/PetEdit";

function App() {
  return (
      <MainApp />
  );
}

function MainApp() {
  const location = useLocation(); // useLocation 호출은 이제 Router 내부에서 안전하게 가능합니다

  return (
    <div className="App">
      {/* landing_container는 항상 렌더링 */}
      <div className="landing_container">
        <Routes>
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </div>

      {/* 현재 경로가 /landing이 아닐 때만 Container 렌더링 */}
      {location.pathname !== "/landing/" && (
        <div className="Container">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/list/:id" element={<ListPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/edit-user" element={<EditUserPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/list-map/:id" element={<ListMapPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/events/:id/review" element={<ReviewPage />} />
            <Route
              path="/events/:id/view-details"
              element={<ViewDetailsPage />}
            />
            <Route path="/pet-select/:id" element={<PetSelectPage />} />
            <Route
              path="/reservation-request/:id" // 예약 페이지
              element={<ReservationRequestPage />}
            />
            <Route path="/select-date" element={<SelectDatePage />} />
            <Route path="/select-date2" element={<SelectDatePage2 />} />
            <Route
              path="/reservation-confirm"
              element={<ReservatinConfirm />}
            />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route
              path="/cancle-reservation"
              element={<CancleReservationPage />}
            />
           
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/auth/*" element={<Redirection />} />
            <Route path="/login-success" element={<KoginSuccess />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/edit-address" element={<EditAdressPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/petDesigner" element={<PetDesigner />} />

            {/* 펫 CRUD */}
            <Route path="/pet-registration" element={<PetRegistrationPage />} />
            <Route path="/pet-list" element={<PetListPage />} />
            <Route path="/pet-detail/:id" element={<PetDetailPage/>} />
            <Route path="/pet-edit/:id" element={<PetEdit/>} />
            {/* 다른 라우트들 추가 */}

            
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;