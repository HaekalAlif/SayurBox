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
        <Route
          path="/product-detail"
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
          path="/payment"
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
