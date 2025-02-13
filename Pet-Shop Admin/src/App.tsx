import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Sidebar from "./layouts/Sidebar";
import PageContainer from "./layouts/PageContainer";
import AnimalsManagePage from "./pages/AnimalsManagePage";
import AnimalsPage from "./pages/AnimalsPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoriesManagePage from "./pages/CategoriesManagePage";
import AnimalsWithCategoriesPage from "./pages/AnimalsWithCategoriesPage";
import AnimalsWithCategoriesManagePage from "./pages/AnimalsWithCategoriesManagePage";
import { ToastContainer } from "react-toastify";
import ErrorPage from "./pages/ErrorPage";
import styled from "styled-components";
import { PAGE } from "./pages/pageConig";

const StyledApp = styled.div`
  display: flex;
`;

function App() {
  return (
    <Provider store={store}>
      <StyledApp>
        <Sidebar />
        <PageContainer>
          <Routes>
            <Route
              path={PAGE.base}
              element={<Navigate to={PAGE.animal} replace />}
            />
            <Route path={PAGE.animal} element={<AnimalsPage />} />
            <Route path={PAGE.animal_manage} element={<AnimalsManagePage />} />
            <Route path={PAGE.category} element={<CategoriesPage />} />
            <Route
              path={PAGE.category_manage}
              element={<CategoriesManagePage />}
            />
            <Route
              path={PAGE.animal_with_category}
              element={<AnimalsWithCategoriesPage />}
            />
            <Route
              path={PAGE.animal_with_category_manage}
              element={<AnimalsWithCategoriesManagePage />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <ToastContainer />
        </PageContainer>
      </StyledApp>
    </Provider>
  );
}

export default App;
