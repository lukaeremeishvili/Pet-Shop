import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
// import Sidebar from "./layouts/Sidebar";
import PageContainer from "./layouts/PageContainer";
import AnimalsManagePage from "./pages/AnimalsManagePage";
import AnimalsPage from "./pages/AnimalsPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoriesManagePage from "./pages/CategoriesManagePage";
import AnimalsWithCategoriesPage from "./pages/AnimalsWithCategoriesPage";
import AnimalsWithCategoriesManagePage from "./pages/AnimalsWithCategoriesManagePage";
import { ToastContainer } from "react-toastify";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Provider store={store}>
      {/* <Sidebar /> */}
      <PageContainer>
        <Routes>
          <Route path="/" element={<Navigate to="/animals" replace />} />
          <Route path="/animals" element={<AnimalsPage />} />
          <Route path="/animals/manage" element={<AnimalsManagePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/manage" element={<CategoriesManagePage />} />
          <Route
            path="/animals-with-categories"
            element={<AnimalsWithCategoriesPage />}
          />
          <Route
            path="/animals-with-categories/manage"
            element={<AnimalsWithCategoriesManagePage />}
          />
          <Route  path="*" element={<ErrorPage/>} />
        </Routes>
        <ToastContainer />
      </PageContainer>
    </Provider>
  );
}

export default App;
