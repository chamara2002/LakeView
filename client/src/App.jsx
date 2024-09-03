import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FoodOrderStart from "./pages/foodManagement/FoodOrderStart.jsx";
import FoodPage from "./pages/foodManagement/FoodPage.jsx";
import { CartProvider } from "./pages/foodManagement/context/CartContext.jsx";
import Cart from "./pages/foodManagement/Cart.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import StaffLoginPage from "./pages/StaffLoginPage.jsx";
// import AdminLoginPage from './pages/AdminLogin.jsx';
// import CommonLoginPage from './pages/CommonLoginPage.jsx';
import GameMainPage from "./pages/gamesManagement/gameMainPage.jsx";
import GamesDetails from "./pages/gamesManagement/Dashboards/GamesDetails.jsx";
import CategorizeNav from "./components/core/CategorizeNav.jsx";
import ManageFood from "./pages/foodManagement/ManageFood.jsx";
import UpdateFood from "./pages/foodManagement/UpdateFoodItems.jsx";
import CustomerSupportManagerDashboard from "./pages/customerSupport/CustomerSupportDashboard.jsx";
import CustomerSupport from "./pages/customerSupport/customerSupportpage.jsx";
import FoundForm from "./pages/customerSupport/FoundForm.jsx";
import InquiryForm from "./pages/customerSupport/InqueryPage.jsx";
import CustomerInquiries from "./pages/customerSupport/InqueryTable.jsx";
import TransportPage from "./pages/customerSupport/TransportPage.jsx";
import BillInfo from "./pages/eventManagement/BillInfo.jsx";
import BookingEvent from "./pages/eventManagement/BookingEvent.jsx";
import CardPay from "./pages/eventManagement/CardPay.jsx";
import EventDashboard from "./pages/eventManagement/EventDashboard.jsx";
// import MusicalEvent from './pages/eventManagement/MusicalEvent.jsx';
// import OtherEvent from './pages/eventManagement/OtherEvent.jsx';
import ViewEvent from "./pages/eventManagement/ViewEvent.jsx";
import AddGames from "./pages/gamesManagement/Dashboards/AddGames.jsx";
import AvailableTimes from "./pages/gamesManagement/Dashboards/AvailableTimes.jsx";
import ChangeAvailableTimes from "./pages/gamesManagement/Dashboards/ChangeAvailableTimes.jsx";
import MoviePage from "./pages/movieManagement/MoviePage.jsx";
import AddnewMovie from "./pages/movieManagement/AddnewMovie.jsx";
import MovieManagerDashboard from "./pages/movieManagement/MovieManagerDashboard.jsx";
import ShowtimesPage from "./pages/movieManagement/ShowtimesPage.jsx";
import ResourceManagerDashboard from "./pages/resourceMaintenance/ResourceManagerDashboard.jsx";
import SalaryCalculator from "./pages/staffManagement/CalculateSalary.jsx";
import LeaveRequests from "./pages/staffManagement/LeaveDashboard.jsx";
import Myleaves from "./pages/staffManagement/Myleaves.jsx";
import StaffDashboard from "./pages/staffManagement/StaffDashboard.jsx";
import StaffmemberDash from "./pages/staffManagement/StaffMemberDash.jsx";
import StaffRegistrationForm from "./pages/staffManagement/StafftRegForm.jsx";
import ViewAttendance from "./pages/staffManagement/ViewAttendance.jsx";
import StaffTable from "./pages/staffManagement/ViewStaffDetails.jsx";
import LeaveDetails from "./pages/staffManagement/ViewLeaveDetails.jsx";
import SalaryTable from "./pages/staffManagement/ViewSalaryDetails.jsx";
import LostitemTable from "./pages/customerSupport/LostItemTable.jsx";
import LostItemForm from "./pages/customerSupport/LostForm.jsx";
import ResourcesTable from "./pages/resourceMaintenance/ViewResource.jsx";
import AddResourceForm from "./pages/resourceMaintenance/AddResourceForm.jsx";
import ResourceReport from "./pages/resourceMaintenance/ReportonResource.jsx";
import GameDetails from "./pages/gamesManagement/Gamedetails.jsx";
import { AuthProvider } from "./pages/foodManagement/context/authContext.jsx";
import EditDeleteUpdateTable from "./pages/gamesManagement/MovieTable.jsx";
import LostItemEditForm from "./pages/customerSupport/LostItemEditForm.jsx";
import LostItemsForm from "./pages/customerSupport/LostForm.jsx";
import FoundItemsTable from "./pages/customerSupport/FoundItemTable.jsx";
import FeedbackDetails from "./pages/gamesManagement/Dashboards/FeedbackDetails.jsx";
import Booking1 from "./pages/bookingmanager/Booking1.jsx";
import AddNewMovie from "./pages/movieManagement/AddnewMovie.jsx";
import LeaveRequestForm from "./pages/staffManagement/LeaveReqForm.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import GamesManagementPanel from "./pages/gamesManagement/Dashboards/GamesManagementPanel.jsx";
import EditMovie from "./pages/movieManagement/EditMovie.jsx";
import BookingManagement from "./pages/bookingmanager/BookingManagement.jsx";
import EventManagement from "./pages/eventManagement/EventManagement.jsx";
import EditEvent from "./pages/eventManagement/EditEvent.jsx";
import AddEvent from "./pages/eventManagement/AddEvent.jsx";
import RegistrationForm from "./components/logins/Register.jsx";
import UpdateGame from "./pages/gamesManagement/UpdateGame.jsx";
import AddFood from "./pages/foodManagement/AddFood.jsx";
import FeedbackForm from "./pages/gamesManagement/FeedbackForm.jsx";
import { BookingProvider } from "./pages/foodManagement/context/BookingContext.jsx";
import SeatSelection from "./pages/bookingmanager/SeatSelection.jsx";
import GameBillInfo from "./pages/bookingmanager/gameBillInfo.jsx";
import MovieBillInfo from "./pages/bookingmanager/movieBillinfo.jsx";
import GameBookingForm from "./pages/gamesManagement/GameBookingForm.jsx";
import MovieDetailsPage from "./pages/movieManagement/MovieDetailsPage.jsx";
import MovieBill from "./pages/movieManagement/MovieBill.jsx";
import FoodBill from "./pages/foodManagement/FoodBill.jsx";
import GameBill from "./pages/gamesManagement/GameBill.jsx";
import CardPayV from "./pages/bookingmanager/CardPayV.jsx";
import MovieBookingManagement from "./pages/bookingmanager/MovieBookingManagement.jsx";
import GameBookingManagement from "./pages/bookingmanager/GameBookingManagement.jsx";
import FoodPurchase from "./pages/foodManagement/FoodPurchase.jsx";
import CardPayF from "./pages/foodManagement/CardPayF.jsx";
import FoodOrderManagement from "./pages/foodManagement/FoodOrderManagement.jsx";
import BookingNavigationPage from "./pages/bookingmanager/BookingNavigationPage.jsx";
import StaffManagmentUpdate from "./pages/staffManagement/StaffManagmentUpdate.jsx";

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* General Routes */}
              <Route path="/" element={<Home />} />
              {/*done*/}
              <Route path="/login" element={<LoginPage />} />
              {/*done*/}
              <Route path="/staff/login" element={<StaffLoginPage />} />
              {/*done*/}
              <Route path="/categorize" element={<CategorizeNav />} />
              {/*done*/}
              <Route path="/RegistrationForm" element={<RegistrationForm />} />
              {/* Food Management */}
              <Route path="/food/start" element={<FoodOrderStart />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/food" element={<FoodPage />} /> {/*done*/}
              {/*linked*/}
              <Route path="/cart" element={<Cart />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/manageFoods" element={<ManageFood />} />
              {/*done*/}
              <Route path="/updateFoodItem/:id" element={<UpdateFood />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/addFood" element={<AddFood />} />
              {/*done*/}
              {/* Customer Support */}
              <Route path="/FoodBill" element={<FoodBill />} />


              <Route path="/support" element={<CustomerSupport />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/LostItemsForm" element={<LostItemsForm />} />
              {/*done*/}
              {/*linked*/}
              <Route
                path="/lostNfound/edit/:id"
                element={<LostItemEditForm />}
              />
              {/*done*/}
              <Route path="/FoundItemsTable" element={<FoundItemsTable />} />
              {/*done*/}
              {/*linked*/}
              <Route
                path="/customerSupportManagerDashboard"
                element={<CustomerSupportManagerDashboard />}
              />
              {/*done*/}
              {/*linked*/}
              <Route path="/support" element={<CustomerSupport />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/foundItm/:id" element={<FoundForm />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/inquerypage" element={<InquiryForm />} />
              {/*done*/}
              {/*linked*/}
              <Route
                path="/customerInquiries"
                element={<CustomerInquiries />}
              />
              {/*done*/}
              {/*linked*/}
              <Route path="/transport" element={<TransportPage />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/lostitems" element={<LostitemTable />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/lostitemform" element={<LostItemForm />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/addFoods" element={<AddFood />} />
              {/*done*/}
              {/*linked*/}
              {/* Event Management */}
              <Route path="/billinfo/:id" element={<BillInfo />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/bookingevent/:id" element={<BookingEvent />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/cardpay/:id" element={<CardPay />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/eventdashboard" element={<EventDashboard />} />
              {/*linked*/}
              <Route path="/events/:id" element={<ViewEvent />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/event/edit/:id" element={<EditEvent />} />
              <Route path="/event/add" element={<AddFood />} />
              {/*done*/}
              {/* Games Management */}
              <Route path="/games" element={<GameMainPage />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/games/:id" element={<GamesDetails />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/addgames" element={<AddGames />} />
              {/*done*/}
              <Route path="/availabletimes" element={<AvailableTimes />} />
              {/*done*/}
              <Route
                path="/changeavailabletimes"
                element={<ChangeAvailableTimes />}
              />
              {/*n ui*/}
              <Route path="/GameDetails" element={<GameDetails />} />
              {/*done*/}
              <Route path="/FeedbackDetails" element={<FeedbackDetails />} />
              {/*done*/}
              <Route
                path="/gameManagement"
                element={<GamesManagementPanel />}
              />
              <Route path="/GameBill" element={<GameBill />} />

              {/*done*/}
              <Route path="/game/edit/:id" element={<UpdateGame />} />
              <Route path="/FeedbackForm" element={<FeedbackForm />} />
              {/* Movie Management */}
              <Route path="/movies" element={<MoviePage />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/movies/showtimes" element={<ShowtimesPage />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/movies/addnewmovie" element={<AddnewMovie />} />
              {/*done*/}
              {/*linked*/}
              <Route
                path="/movieManagerDashboard"
                element={<MovieManagerDashboard />}
              />
              {/*done*/}
              <Route
                path="/EditDeleteUpdateTable"
                element={<EditDeleteUpdateTable />}
              />
              {/*done*/}
              {/*linked*/}
              <Route path="/AddNewMovie" element={<AddNewMovie />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/editmovie/:id" element={<EditMovie />} />
              {/*done*/}
              {/*linked*/}
              {/* Resource Management */}
              <Route
                path="/resourceManagerDashboard"
                element={<ResourceManagerDashboard />}
              />
              {/*done*/}
              <Route path="/ResourcesTable" element={<ResourcesTable />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/AddResourceForm" element={<AddResourceForm />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/resource/:id" element={<ResourceReport />} />
              {/*done*/}
              {/*linked*/}
              {/* Staff Management */}
              <Route path="/salarycalculator" element={<SalaryCalculator />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/leaverequests" element={<LeaveRequests />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/myleaves" element={<Myleaves />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/staffdashboard" element={<StaffDashboard />} />
              {/*done*/}
              <Route path="/staffmemberdash" element={<StaffmemberDash />} />
              {/*done*/}
              <Route
                path="/staffregistrationform"
                element={<StaffRegistrationForm />}
              />
              {/*done*/}
              {/*linked*/}
              <Route path="/viewattendance" element={<ViewAttendance />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/leavedetails" element={<LeaveDetails />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/salarytable" element={<SalaryTable />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/stafftable" element={<StaffTable />} />
              {/*done*/}
              {/*linked*/}
              <Route path="/LeaveRequestForm" element={<LeaveRequestForm />} />
              {/*done*/}
              {/*linked*/}
              {/* <Route path='/booking1' element={<Booking1/>} /> */}
              <Route path="/admin-dash" element={<AdminDashboard />} />
              <Route
                path="/bookingManagement"
                element={<BookingManagement />}
              />
              <Route path="/eventManagement" element={<EventManagement />} />
              <Route path="/selectSeats" element={<SeatSelection />} />
              <Route path="/gameBillInfo" element={<GameBillInfo />} />
              <Route path="/movieBillinfo" element={<MovieBillInfo />} />
              <Route path="/foodPurchase" element={<FoodPurchase />} />


          {/* Games Management */}
          <Route path="/games" element={<GameMainPage />} />{/*done*/}{/*linked*/}
          <Route path="/games/:id" element={<GamesDetails />} />{/*done*/}{/*linked*/}
          <Route path="/addgames" element={<AddGames />} />{/*done*/}
          <Route path="/availabletimes" element={<AvailableTimes />} />{/*done*/}
          <Route path="/changeavailabletimes" element={<ChangeAvailableTimes />} />{/*n ui*/}
          <Route path="/GameDetails" element={<GameDetails />} />{/*done*/}
          <Route path="/FeedbackDetails" element={<FeedbackDetails />} />{/*done*/}
          <Route path="/gameManagement" element={<GamesManagementPanel/>}/>{/*done*/}
          <Route path="/game/edit/:id" element={<UpdateGame/>} />
          <Route path="/FeedbackForm" element={<FeedbackForm />} />
          <Route path="/GameBookingForm" element={<GameBookingForm />} />

          {/* Movie Management */}
          <Route path="/movies" element={<MoviePage />} />{/*done*/}{/*linked*/}
          <Route path="/movies/showtimes" element={<ShowtimesPage />} />{/*done*/}{/*linked*/}
          <Route path="/movies/addnewmovie" element={<AddnewMovie />} />{/*done*/}{/*linked*/}
          <Route path="/movieManagerDashboard" element={<MovieManagerDashboard />} />{/*done*/}
          <Route path="/EditDeleteUpdateTable" element={<EditDeleteUpdateTable />} />{/*done*/}{/*linked*/}
          <Route path ="/AddNewMovie" element={<AddNewMovie />} />{/*done*/}{/*linked*/}
          <Route path="/editmovie/:id" element={<EditMovie />} />{/*done*/}{/*linked*/}
          <Route path="/MoviePage/:id" element={<MovieDetailsPage/>}/>
          <Route path="/MovieBill" element ={<MovieBill/>}/>




          {/* Resource Management */}
          <Route path="/resourceManagerDashboard" element={<ResourceManagerDashboard />} />{/*done*/}
          <Route path='/ResourcesTable' element={<ResourcesTable />} />{/*done*/}{/*linked*/}
          <Route path="/AddResourceForm" element={<AddResourceForm />} />{/*done*/}{/*linked*/}
          <Route path="/resource/:id" element={<ResourceReport/>}/>{/*done*/}{/*linked*/}

          {/* Staff Management */}
          <Route path="/salarycalculator" element={<SalaryCalculator />} />{/*done*/}{/*linked*/}
          <Route path="/leaverequests" element={<LeaveRequests />} />{/*done*/}{/*linked*/}
          <Route path="/myleaves" element={<Myleaves />} />{/*done*/}{/*linked*/}
          <Route path="/staffdashboard" element={<StaffDashboard />} />{/*done*/}
          <Route path="/staffmemberdash" element={<StaffmemberDash />} />{/*done*/}
          <Route path="/staffregistrationform" element={<StaffRegistrationForm />} />{/*done*/}{/*linked*/}
          <Route path="/viewattendance" element={<ViewAttendance />} />{/*done*/}{/*linked*/}
          <Route path="/leavedetails" element={<LeaveDetails />} />{/*done*/}{/*linked*/}
          <Route path="/salarytable" element={<SalaryTable />} />{/*done*/}{/*linked*/}
          <Route path="/stafftable" element={<StaffTable />} />{/*done*/}{/*linked*/}
          <Route path ="/LeaveRequestForm" element ={<LeaveRequestForm/>}/>{/*done*/}{/*linked*/}

          {/* <Route path='/booking1' element={<Booking1/>} /> */}

          < Route path="/admin-dash"  element={<AdminDashboard/>} />
          < Route path="/bookingManagement" element={<BookingManagement/>}/>
          < Route path="/eventManagement" element={<EventManagement/>}/>

          < Route path="/PayOnline" element={<CardPayV/>}/>
          < Route path="/manage/MovieBooking" element={<MovieBookingManagement/>}  />
          < Route path="/manage/GameBooking" element={<GameBookingManagement/>}  />
          < Route path="/PayOnlineFood" element={<CardPayF/>}/>
          <Route path="/manage/foodOrder" element={<FoodOrderManagement/>}/>
          <Route path="/BookingNavigationPage" element={<BookingNavigationPage />} />
          <Route path ="/StaffManagmentUpdate/:id" element ={<StaffManagmentUpdate/>}/>


        </Routes>
      </Router>
    </CartProvider>
    </BookingProvider>
    </AuthProvider>
          
    
      
  );
}

export default App;
