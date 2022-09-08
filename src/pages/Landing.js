import { FaFacebook, FaInstagram, FaReddit, FaTwitter } from "react-icons/fa";

import { HeartIcon } from '@heroicons/react/24/solid'
import { Link } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll'
import computer from "../assets/computer.png"
import graphic1 from "../assets/graphic1.jpg"
import graphic2 from "../assets/graphic2.jpg"
import { useState } from 'react';

const Landing = () => {

    //TODO
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const links = [
        { to: "home", name: "Home"},
        { to: "contact", name: "Contact"},
        { to: "about", name: "About"},
    ]

    return (<>
        <div className='flex flex-col items-center justify-start h-full bg-gradient-to-r from-gray-200 to-gray-300'>
            {/* NAVBAR */}
            <div className="fixed flex items-center justify-between w-full px-3 py-2 bg-gradient-to-r from-gray-200 to-gray-300">
                {/* ICON */}
                <Link to={'/'} className="flex items-center w-1/6 text-4xl font-bold text-red-900">
                    BloodCare
                </Link>
                {/* LINKS */}
                <div className="flex items-center justify-end w-5/6 h-full gap-5 ">
                    {links.map((link, i) => {
                        return <ScrollLink
                            activeClass="active"
                            to={link.to}
                            key={i}
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="flex items-center gap-1 px-3 py-1 text-lg font-medium cursor-pointer hover:bg-red-800 hover:text-white w-fit"
                        >
                            {link.name}
                        </ScrollLink>
                    })}
                    <Link to={'register'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-sm w-fit shadow-black">
                        Register
                    </Link>
                </div>
            </div>
            <div id="home" className='flex w-full h-screen px-24 pt-20 pb-10'>
                <div className="flex flex-col justify-center w-3/5 gap-6">
                    <div className="w-full font-bold tracking-tight text-8xl">
                        SHARE YOUR <br />
                        <span className='text-red-600'>POWER</span>
                    </div>
                    <div className="flex w-full gap-2 px-2 text-4xl font-semibold">
                        Your blood can save lives
                        <HeartIcon width={40} className="text-red-700 "/>
                    </div>
                    <div className="flex w-full gap-2 px-2 text-2xl font-semibold">
                        <Link to={'login'} className="flex items-center px-5 py-3 text-2xl text-white bg-green-800 rounded-full shadow-md w-fit shadow-black">
                            LOGIN
                        </Link>
                        <Link to={'register'} className="flex items-center px-5 py-3 text-2xl text-white bg-red-900 rounded-full shadow-md w-fit shadow-black">
                            REGISTER
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-2/5 ">
                    <img src={graphic2} alt="graphic1" width={"90%"} className="shadow-lg rounded-3xl shadow-slate-900"/>
                </div>
            </div>
            <div id="contact" className='flex flex-col items-center justify-start w-full h-screen gap-16'>
                <div className='px-3 py-2 text-4xl font-bold tracking-tight border-b-4 border-red-700'>Contact Us</div>
                <div className='flex items-center justify-center w-full gap-6 px-24'>
                    <div className="flex flex-col items-center justify-center w-2/5 gap-5">
                        <div className="text-3xl">
                            Get in touch
                        </div>
                        <div className="flex gap-3 text-5xl text-black" >
                            <FaFacebook className="cursor-pointer"/>
                            <FaInstagram className="cursor-pointer"/>
                            <FaTwitter className="cursor-pointer"/>
                            <FaReddit className="cursor-pointer"/>
                        </div>
                        <img src={graphic1} alt="graphic1" width={"90%"} className="shadow-lg rounded-3xl shadow-slate-900"/>
                    </div>
                    <div className='w-3/6 pl-16'>
                        <form className="flex flex-col items-center justify-center gap-3 p-4 bg-red-400 border-2 border-red-900 shadow-lg rounded-3xl shadow-black">
                            <input className="w-full px-3 py-2 border-2 border-gray-700 border-solid rounded-full bg-slate-100" maxLength="50"  value={name} onChange={(e)=> {setName(e.target.value)}} type={"text"} placeholder="Name*" autoComplete="name" required/>
                            <input className="w-full px-3 py-2 border-2 border-gray-700 border-solid rounded-full bg-slate-100" maxLength="35"  value={email} onChange={(e)=> {setEmail(e.target.value)}} type={"email"} placeholder="Email*" autoComplete="email" required/>
                            <input className="w-full px-3 py-2 border-2 border-gray-700 border-solid rounded-full bg-slate-100" maxLength="50" value={subject} onChange={(e)=> {setSubject(e.target.value)}} type={"text"} placeholder="Subject*" autoComplete="subject" required/>
                            <textarea className="w-full px-3 py-1 border-2 border-gray-700 border-solid resize-none rounded-xl bg-slate-100" maxLength="300" rows={6}  value={message} onChange={(e)=> {setMessage(e.target.value)}} placeholder="Message*" autoComplete="message" required />
                            <button type="submit" className="w-full py-2 text-xl font-bold tracking-wide text-gray-200 bg-green-900 rounded-full shadow-md shadow-black">
                                SEND
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div id="about" className='flex flex-col items-center w-full h-screen gap-20'>
                <div className='px-3 py-2 text-4xl font-bold tracking-tight border-b-4 border-red-700'>About Us</div>
                <div id="home" className='flex items-center justify-center w-full px-24 gap-7'>
                    <div className="flex flex-col justify-center w-3/5 gap-3 text-xl font-semibold">
                        <div>
                            <span className="text-2xl"><span className="text-5xl font-bold text-red-700">BloodCare</span> is a Blood Donor Information System.</span> <br/>
                        </div>
                        <div className="leading-10">
                            It is an information system that makes it possible for those who want to give blood and persons searching for available blood donors to connect with one another. This information system is intended for two sorts of users: those who want to give blood and those who need the donated blood.
                        </div>
                        </div>
                    <div className="flex flex-col items-center justify-center w-2/5 ">
                        <img src={computer} alt="computer" width={"100%"} className="bg-red-700 shadow-lg rounded-3xl shadow-slate-900"/>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Landing;