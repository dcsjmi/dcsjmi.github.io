import '../Global.css'
import '../stylesheets/GlobalHeader.css'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import navOpenIco from '../images/core/navOpen.png'
import navCloseIco from '../images/core/navClose.png'

export default function GlobalHeader(props) {
    const DrawerRef = useRef(null);
    const NavRef = useRef(null);
    const HiddenAreaRef = useRef(null);
    const windowLocation = useLocation();
    const [activeTab, setActiveTab] = useState(0);
    let isDrawerOpen = false;

    const PageRoutes = {
        'Home': '/home',
        'Courses':'/courses',
        'Placement' : '/placement',
        'Students' : '/students',
        'Professors' : '/professors',
        'Contact Us': '/contact',
        'About': '/about'
    }

    useEffect(() => {
        setActiveTab(windowLocation.pathname);
    }, [windowLocation]);

    useEffect(()=>{
        
    }, [props.shouldCollapse]);

    

    const ToogleNav = (event) => {
        if (!isDrawerOpen) {
            DrawerRef.current.src = navCloseIco;
            HiddenAreaRef.current.style.display = 'block';
            NavRef.current.className = 'NavBar HeaderChild openDrawer';
            isDrawerOpen = true;
        } else {
            DrawerRef.current.src = navOpenIco;
            HiddenAreaRef.current.style.display = 'none';
            NavRef.current.className = 'NavBar HeaderChild';
            isDrawerOpen = false;
        }
    }

    const PageRouteButtons = [];
    for (let pageLink in PageRoutes) {
        PageRouteButtons.push(
            <Link to={PageRoutes[pageLink]} key={pageLink} className='NavLink' onClick={ToogleNav} aria-selected={PageRoutes[pageLink].match(activeTab) ? true : false}>
                {pageLink}
            </Link>
        );
    }
    
    return (
        <div className="Header">
            <div className={props.shouldCollapse ? "HeaderBody CollapseHeader" : "HeaderBody"}>
                <div className='DrawerLogoContainer' onClick={ToogleNav}><img src={navOpenIco} alt="Open Drawer" ref={DrawerRef} /></div>
                <Link to='/home' className='HeaderChild'>
                    <div className='HeaderLogo'></div>
                    <div className='HeaderText'>Department of <br /> Computer Science</div>
                </Link>
                <div className="hideNav" ref={HiddenAreaRef} onClick={ToogleNav}></div>
                <div className='NavBar HeaderChild' ref={NavRef}>
                    {PageRouteButtons}
                    <div className='pill'></div>
                </div>
            </div>
        </div>
    );
}