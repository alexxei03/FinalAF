import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpinnerProvider } from './context/SpinnerContext';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./context/AuthContext";
import RedirectIfAuthenticated from './authcomponents/RedirectIfAuthenticated';
import PrivateRoute from "./authcomponents/PrivateRoute";

import LandingPage from './pages/Landing/LandingPage';
import MentorPage from './pages/Landing/MentorPage';
import LoginPage from './pages/Landing/LoginPage';
import RegisterPage from './pages/Landing/RegisterPage';
import ProfilePage from './pages/Profile/ProfilePage'
import CreateCoursePage from './pages/Courses/CreateCoursePage'
import CourseListPage from './pages/Courses/CourseListPage'
import CertificatesPage from './pages/Courses/CertificatesPage'
import HomePage from './pages/Courses/HomePage'
import CoursePage from './pages/Courses/CoursePage';

function App() {
  return (
    <HelmetProvider>
      <Router>

        <AuthProvider>

          <main>
            <Routes>

              <Route path="/" element={
                <SpinnerProvider>
                  <LandingPage />
                </SpinnerProvider>
              } />

              <Route path="/mentor" element={
                <SpinnerProvider>
                  <MentorPage />
                </SpinnerProvider>
              } />

              <Route element={<RedirectIfAuthenticated />}>
                <Route path="/login" element={
                  <SpinnerProvider>
                    <LoginPage />
                  </SpinnerProvider>
                } />

                <Route path="/register" element={
                  <SpinnerProvider>
                    <RegisterPage />
                  </SpinnerProvider>
                } />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="/home"
                  element={
                    <HomePage />
                  }
                />

                <Route path="/profile"
                  element={
                    <ProfilePage />
                  }
                />

                <Route path="/certificates"
                  element={
                    <CertificatesPage />
                  }
                />

                <Route path="/course/create"
                  element={
                    <CreateCoursePage />
                  }
                />

                <Route path="/courses"
                  element={
                    <CourseListPage />
                  }
                />

                <Route path="/courses/:id"
                  element={
                    <CoursePage />
                  }
                />

              </Route>

            </Routes>
          </main>
        </AuthProvider>
      </Router>

    </HelmetProvider>
  );
}

export default App;
