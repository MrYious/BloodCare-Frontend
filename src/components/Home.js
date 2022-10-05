import Home1 from '../assets/home1.jpg'
import Home2 from '../assets/home2.jpg'
import Home3 from '../assets/home3.jpg'
import Home4 from '../assets/home4.jpg'

const Home = () => {

    return (<>
        <div className="flex w-full h-full gap-5 px-4 py-6 ">
            <div className="flex w-full gap-1 p-1 bg-gray-200 border-2 border-red-900 shadow-sm x shadow-black">
                <div className='flex flex-col w-1/3 h-full gap-1'>
                    <pre className='flex items-center justify-center h-full text-5xl font-bold bg-red-300 '>
                        BE THE <br />
                        REASON <br />
                        FOR <br />
                        S❤MEONE'S <br />
                        HEARTBEAT <br />
                    </pre>
                    <img className="w-fit" src={Home3} alt="Home3" />
                </div>
                <img className="h-[100%] w-1/3" src={Home2} alt="Home2" />
                <div className='flex flex-col w-1/3 gap-1'>
                    <img className="h-[50%] w-fit" src={Home4} alt="Home3" />
                    <div className='flex items-center justify-center w-full h-full px-5 text-xl font-semibold text-right bg-red-300'>
                        The Blood You Donate Gives<br />
                        Someone Another Chance At Life. One Day That Someone May Be A Close Relative, A Friend, <br />
                        A Loved One— Or Even You <br /><br />
                        - Redcrossblood.org
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Home;