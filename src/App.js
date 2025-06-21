
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import './variables.css';
import HomeIndex from './components/home';
import ProductType from './components/product';
import ProductView from './components/productView';
import ProductCategoryIndex from './components/admin/productCategory';
import ProductIndex from './components/admin/product';
import FieldOptionIndex from './components/admin/fieldOption';
import FieldTypeIndex from './components/admin/fieldType';
import OtpVerification from './components/navbar/otp';
import AllProduct from './components/allProduct';
import AddProductIndex from './components/admin/product/addProduct';
import MyCartIndex from './components/cart';
import PlaceOrderIndex from './components/placeOrder';
import MyOrderIndex from './components/myOrder';
import PageNotFound from './components/notFound';
import EditProductIndex from './components/admin/product/editmodal';
import DashBoardIndex from './components/admin/dashboard';
import ProductTypeIndex from './components/admin/product/productType';
import PopularProducts from './components/popularProduct';
import ScrollToTop from './ScrollToTop';
import MyWishListIndex from './components/MyWishList';
import ReachUs from './components/navbar/reachUs';
import OfferProduct from './components/admin/offerProduct';
import OfferTargets from './components/offerProducts';
import Myqueries from './components/myQueries';
import ReportIndex from './components/admin/report';
import PrivacyPolicy from './components/footer/privacyPolicy';
import SafeShopping from './components/footer/safeShoping';
import AboutGuarante from './components/home/about/guarante';
import TermsIndex from './components/footer/Terms';
import AboutUs from './components/footer/aboutUs';
import MyProfile from './components/myProfile';
import Shipping from './components/footer/Shipping';
import Refund from './components/footer/delivery/delivery';
import DashBoardViewPage from './components/admin/dashboard/dashBoardViewModal';
import PrintoutPage from './components/admin/dashboard/printout';
import ChangestatusPage from './components/admin/dashboard/changestatus';
import 'flatpickr/dist/themes/material_green.css';
import MenuIndex from './components/admin/menuCombo';
import NewsTikerIndex from './components/admin/NewsTiker';
import FqaIndex from './components/admin/product/faq';
import CategoryFaq from './components/admin/productCategory/categoryFaq/CategoryFaq';
import MenuProducts from './components/menuProducts/MenuProducts';
import DescriptionIndex from './components/admin/product/description';
import CustomizeProduct from './components/productView/customizeProduct';



function App() {


  const role = localStorage.getItem('role')


  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        <Route path="/" element={<HomeIndex />} />
        <Route path="/otp/verify" element={<OtpVerification />} />
        <Route path="/products/:id" element={<ProductType />} />
        <Route path="/products" element={<AllProduct />} />
        <Route path="/addProduct" element={<AddProductIndex />} />
        <Route path="/products/viewProduct/:product_url" element={<><ProductView /> </>} />
        <Route path="/products/customizeProduct" element={<><CustomizeProduct /> </>} />
        <Route path="/myCart" element={<MyCartIndex />} />
        <Route path="/placeOrder/:cartId" element={<PlaceOrderIndex />} />
        <Route path="/myOrder" element={<MyOrderIndex />} />
        <Route path="/myQueries" element={<Myqueries />} />
        <Route path="/myWishList" element={<MyWishListIndex />} />
        <Route path="/popularProducts" element={<PopularProducts />} />
        <Route path="/offerProducts" element={<OfferTargets />} />
        <Route path="/reachUs" element={<ReachUs />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/safeShopping" element={<SafeShopping />} />
        <Route path="/shippingPolicy" element={<Shipping />} />
        <Route path="/printonGuarante" element={<AboutGuarante />} />
        <Route path='/refund-return' element={<Refund />} />
        <Route path='/Terms' element={<TermsIndex />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/myProfile' element={<MyProfile />} />
        <Route path='/menuProducts/:id' element={<MenuProducts />} />
        {/* <Route path="/admin/editProduct/id" element={<EditProductIndex />} /> */}
        {/* {role === 'ADMIN' && (
          <> */}
        <Route path="/admin/productCategory" element={<ProductCategoryIndex />} />
        <Route path="/admin/product" element={<ProductIndex />} />
        <Route path="/admin/offerProduct" element={<OfferProduct />} />
        <Route path="/admin/fieldOption" element={<FieldOptionIndex />} />
        <Route path="/admin/fieldType" element={<FieldTypeIndex />} />
        <Route path="/admin/editProduct/:id" element={<EditProductIndex />} />
        <Route path="/admin/dashboard" element={<DashBoardIndex />} />
        <Route path="/admin/productType/:id" element={<ProductTypeIndex />} />
        <Route path='/admin/report' element={<ReportIndex />} />
        <Route path='/admin/dashboardViewData/:id' element={<DashBoardViewPage />} />
        <Route path='/admin/dashboard/Printout' element={<PrintoutPage />} />
        <Route path='/admin/changestatus' element={<ChangestatusPage />} />
        <Route path='/admin/menu' element={<MenuIndex />} />
        <Route path="/admin/newstiker" element={<NewsTikerIndex />} />
        <Route path="/admin/product/faq/:id" element={<FqaIndex />} />
        <Route path="/admin/productCategory/faq/:id" element={<CategoryFaq />} />
        <Route path="/admin/product-description/:id" element={<DescriptionIndex />} />
        {/* </>
        )} */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
