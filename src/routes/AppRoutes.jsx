import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('../pages/CatalogPage/CatalogPage'));
const CamperDetailsPage = lazy(() => import('../pages/CamperDetailsPage/CamperDetailsPage'));
const FeaturesPage = lazy(() => import('../pages/FeaturesPage/FeaturesPage'));
const ReviewsPage = lazy(() => import('../pages/ReviewsPage/ReviewsPage'));

const AppRoutes = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<CamperDetailsPage />}>
                <Route path="features" element={<FeaturesPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
            </Route>
        </Routes>
    </Suspense>
);

export default AppRoutes;
