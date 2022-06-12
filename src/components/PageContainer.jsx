import '../Global.css'
import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Courses from "../pages/Courses"
import Placement from "../pages/Placement"
import Student from "../pages/Student"
import Professor from "../pages/Professor"
import Contact from "../pages/Contact"
import About from '../pages/About';

/**
 * Sets up page routes, renders the targetted page
 */
export default function PageContainer(props) {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (hash === '') {
            let scrollablePage = document.getElementById('AppBody');
            scrollablePage.scrollTop = 0;
        } else {
            setTimeout(() => {
                let scrollablePage = document.getElementById('AppBody');
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    scrollablePage.scrollTop = 0;
                    scrollablePage.scrollTop = element.getBoundingClientRect().top - 30;
                }
            }, 0);
        }
    }, [pathname, hash, key]);
    
    return (
        <div className='PageContainer'>
            <Routes>
                {/* set up routes to all pages */}
                <Route path="/home" element={<Home />}></Route>
                <Route path="/courses" element={<Courses />}></Route>
                <Route path="/placement" element={<Placement />}></Route>
                <Route path="/students" element={<Student />}></Route>
                <Route path="/professors" element={<Professor />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/about" element={<About />}></Route>
                {/* root redirects to home page */}
                <Route path="/" element={<Navigate to='/home' replace />}></Route>
                {/* to all the invalid routes, redirect to home */}
                <Route path="*" element={<Navigate to='/home' replace />}></Route>
            </Routes>
        </div>
    );
}