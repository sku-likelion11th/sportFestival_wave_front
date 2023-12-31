import { Link } from "react-router-dom";
import { images } from "../utils/images";
import { SlHome } from "react-icons/sl"
import { useEffect, useState } from "react";
import '../css/navbar.css'
import { useNavbar } from "../utils/navbar-context";
import { getToken } from "../utils/Auth";

const ShowNav = () => {
    const { setIsOpen } = useNavbar();
    const ACCESS_TOKEN = getToken();
    const closeNav = () => {
        setIsOpen(false)
    }
    const Login = () => {
        localStorage.setItem('last', window.location.href)
        window.location.href = 'https://wave-renew.sku-sku.com:8000/login';
    }
    const LogOut = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div className="Navbar min-h-screen overflow-y-auto main-background">
            <div className="relative chineseFont flex justify-center pt-14">
                <p className="absolute text-stroke text-transparent text-8xl">&#27874;:&#21205;</p>
                <p className="absolute text-7xl pt-3">&#27874;:&#21205;</p>
            </div>
            <div className="flex flex-col items-center justify-center pt-36">
                <ul className="NanumSquareEB flex flex-col items-center justify-center gap-y-6 text-2xl">
                    <li className="bg-[#0F2949] rounded-2xl px-7 py-3 w-full text-center"><Link to="/timetable" onClick={closeNav}>타임테이블</Link></li>
                    <li className="bg-[#0F2949] rounded-2xl px-7 py-3 w-full text-center"><Link to="/boothlocation" onClick={closeNav}>부스 배치도</Link></li>
                    <li className="bg-[#0F2949] rounded-2xl px-7 py-3 w-full text-center"><Link to="/sportmenu" onClick={closeNav}>결승전 대진표</Link></li>
                    <li className="bg-[#0F2949] rounded-2xl px-7 py-3 w-full text-center"><Link to="/about" onClick={closeNav}>만든이들</Link></li>
                    {ACCESS_TOKEN ?
                        <>
                            <li className="bg-[#0F2949] rounded-2xl px-7 py-3 w-full text-center"><Link to="/mypage" onClick={closeNav}>정보수정</Link></li>
                            <li className="bg-[#0F2949] rounded-2xl px-7 py-3 w-full text-center"><Link onClick={LogOut}>로그아웃</Link></li>
                        </> :
                        <li className="bg-[#0F2949] rounded-2xl px-7 py-3 w-full text-center"><Link onClick={Login}>로그인</Link></li>
                    }
                    <img className="w-[156px] md:max-w-[375px] mt-20 pb-10" src={images.seven_rings} alt="칠륜기" />

                </ul>

            </div>
        </div>
    )
}

const Navbar = () => {
    const { isOpen, setIsOpen } = useNavbar();
    const [scrolling, setScrolling] = useState(false)

    const onTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        // 스크롤 이벤트 핸들러를 추가
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
        window.addEventListener("scroll", handleScroll);

        // 언마운트될 때 스크롤 이벤트 리스너 제거
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <>
            <div className={`Navbar fixed top-0 flex justify-between items-center px-3 py-5 z-10 ${scrolling && !isOpen ? 'nav-bg-scrolled' : ''}`}>
                <div>
                    <Link to='/' onClick={() => { onTop() }}>
                        <img className={`w-[80px] md:max-w-[375px] transition duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`} src={images.seven_rings} alt="칠륜기" />
                    </Link>
                </div>
                <div className={`chineseFont text-2xl transition duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to='/' onClick={() => { onTop() }}>&#27874;&#21205;</Link></div>
                <div className={`off-screen-menu ${isOpen ? 'open slideInDown fixed' : 'hidden'} flex justify-center tracking-[1px] bg-transparent`}>
                    {isOpen && (
                        <ShowNav />
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <Link to='/' className={`transition duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`} onClick={() => { onTop() }}><SlHome size={25} /></Link>
                    <div className={`mr-1 hamburger-menu ${isOpen ? 'active' : ''} cursor-pointer z-20`} onClick={() => setIsOpen(!isOpen)}>
                        <div className="ham-bar bar-top bg-white" />
                        <div className="ham-bar bar-mid bg-white" />
                        <div className="ham-bar bar-bottom bg-white" />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Navbar;
