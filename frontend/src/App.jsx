import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components dan pages
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home.jsx";
import ProductDetail from "./pages/products/ProductDetail.jsx";
import Category from "./pages/category/Category.jsx";
import Cart from "./pages/cart/Cart";
import Payment from "./pages/payment/Payment.jsx";
import PaymentMethod from "./pages/payment/PaymentMethod.jsx";
import PaymentSuccess from "./pages/payment/PaymentSuccess.jsx";
import Catalog from "./pages/catalog/Catalog.jsx";
import Recipe from "./pages/recipe/Recipe.jsx";
import VegetableRecipe from "./pages/recipe/VegetableRecipe.jsx";
import SeafoodRecipe from "./pages/recipe/SeafoodRecipe.jsx";
import BeefRecipe from "./pages/recipe/BeefRecipe.jsx";
import ChickenMeatRecipe from "./pages/recipe/ChickenMeatRecipe.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Account from "./pages/profile/account/Account.jsx";
import Address from "./pages/profile/address/Address.jsx";
import AddAddress from "./pages/profile/address/AddAddress.jsx";
import AddressDetails from "./pages/profile/address/AddressDetails.jsx";
import RecipeDetails from "./pages/recipe/detail/RecipeDetails.jsx";
import Voucher from "./pages/voucher/Voucher.jsx";
import VoucherCheckout from "./pages/voucher/VoucherCheckout.jsx";
import Orders from "./pages/orders/Orders.jsx";
import OrderDetail from "./pages/detail-order/DetailOrder";
import SayurPanenFaq from "./pages/faq/sayur-panen/SayurPanen";
import SayurPoin from "./pages/faq/sayur-poin/SayurPoin";
import KetersediaanProduk from "./pages/faq/ketersediaan-produk/KetersediaanProduk";
import MetodePembayaran from "./pages/faq/metode-pembayaran/MetodePembayaran.jsx";
import Faq from "./pages/faq/Faq.jsx";
import SayurPoinUser from "./pages/sayur-poin/SayurPoinUser.jsx";
import SayurPoinDetail from "./pages/sayur-poin/detail/SayurPoinDetail";
import SayurPoinFaq from "./pages/sayur-poin/faq/SayurPoinFaq";
import SayurPanen from "./pages/sayur-panen/SayurPanen";
import Login from "./pages/auth/login/Login.jsx";
import Register from "./pages/auth/register/Register";
import ProductForm from "./pages/admin/product-form/ProductForm";
import Products from "./pages/admin/products/ProductList";
import OrderListAdmin from "./pages/admin/orders/OrderList";
import OrderDetailAdmin from "./pages/admin/order-detail/OrderDetail";
import AdminLayout from "./components/layout/admin/Layout";
import SpecialLayout from "./components/layout/special/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/product/:slug"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route
          path="/category"
          element={
            <Layout>
              <Category />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />

        <Route
          path="/checkout"
          element={
            <Layout>
              <Payment />
            </Layout>
          }
        />

        <Route
          path="/checkout/:id"
          element={
            <Layout>
              <Payment />
            </Layout>
          }
        />

        <Route
          path="/payment-method"
          element={
            <Layout>
              <PaymentMethod />
            </Layout>
          }
        />

        <Route
          path="/payment-success"
          element={
            <Layout>
              <PaymentSuccess />
            </Layout>
          }
        />

        <Route
          path="/payment-success/:id"
          element={
            <Layout>
              <PaymentSuccess />
            </Layout>
          }
        />

        <Route
          path="/catalog"
          element={
            <Layout>
              <Catalog />
            </Layout>
          }
        />

        <Route
          path="/recipe"
          element={
            <Layout>
              <Recipe />
            </Layout>
          }
        />

        <Route
          path="/vegetable-recipe"
          element={
            <Layout>
              <VegetableRecipe />
            </Layout>
          }
        />

        <Route
          path="/seafood-recipe"
          element={
            <Layout>
              <SeafoodRecipe />
            </Layout>
          }
        />

        <Route
          path="/beef-recipe"
          element={
            <Layout>
              <BeefRecipe />
            </Layout>
          }
        />

        <Route
          path="/chicken-meat-recipe"
          element={
            <Layout>
              <ChickenMeatRecipe />
            </Layout>
          }
        />

        <Route
          path="/recipe/detail"
          element={
            <Layout>
              <RecipeDetails />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/profile/account"
          element={
            <Layout>
              <Account />
            </Layout>
          }
        />

        <Route
          path="/profile/address"
          element={
            <Layout>
              <Address />
            </Layout>
          }
        />

        <Route
          path="/profile/address/add-address"
          element={
            <Layout>
              <AddAddress />
            </Layout>
          }
        />

        <Route
          path="/profile/address/address-details/:id?"
          element={
            <Layout>
              <AddAddress />
            </Layout>
          }
        />

        <Route
          path="/profile/address/address-details"
          element={
            <Layout>
              <AddressDetails />
            </Layout>
          }
        />

        <Route
          path="/voucher"
          element={
            <Layout>
              <Voucher />
            </Layout>
          }
        />

        <Route
          path="/voucher-checkout"
          element={
            <Layout>
              <VoucherCheckout />
            </Layout>
          }
        />

        <Route
          path="/orders"
          element={
            <Layout>
              <Orders />
            </Layout>
          }
        />

        <Route
          path="/order/:id"
          element={
            <Layout>
              <OrderDetail />
            </Layout>
          }
        />

        <Route
          path="/faq/sayur-panen"
          element={
            <SpecialLayout>
              <SayurPanenFaq />
            </SpecialLayout>
          }
        />

        <Route
          path="/faq/sayur-poin"
          element={
            <SpecialLayout>
              <SayurPoin />
            </SpecialLayout>
          }
        />

        <Route
          path="/faq/product-availability"
          element={
            <SpecialLayout>
              <KetersediaanProduk />
            </SpecialLayout>
          }
        />

        <Route
          path="/faq/payment-method"
          element={
            <SpecialLayout>
              <MetodePembayaran />
            </SpecialLayout>
          }
        />

        <Route
          path="/faq"
          element={
            <SpecialLayout>
              <Faq />
            </SpecialLayout>
          }
        />

        <Route
          path="/sayur-poin"
          element={
            <SpecialLayout>
              <SayurPoinUser />
            </SpecialLayout>
          }
        />

        <Route
          path="/sayur-poin/detail"
          element={
            <SpecialLayout>
              <SayurPoinDetail />
            </SpecialLayout>
          }
        />

        <Route
          path="/sayur-poin/faq"
          element={
            <SpecialLayout>
              <SayurPoinFaq />
            </SpecialLayout>
          }
        />

        <Route
          path="/sayur-panen"
          element={
            <SpecialLayout>
              <SayurPanen />
            </SpecialLayout>
          }
        />

        <Route
          path="/admin/product-form"
          element={
            <AdminLayout>
              <ProductForm />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminLayout>
              <Products />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <AdminLayout>
              <OrderDetailAdmin />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminLayout>
              <OrderListAdmin />
            </AdminLayout>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <Layout>
              <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Page not found</p>
                  <a
                    href="/"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
