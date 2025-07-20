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
