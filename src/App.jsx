import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import MainLayout from "./layouts/MainLayout";

// Lazy load the pages for faster initial load time
const DetailsPage = lazy(() => import("./pages/DetailsPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-black">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:type/:slug" element={<DetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
