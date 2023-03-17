import Header from "./components/Header"
import Game from "./components/Game"
import Home from "./components/Home"
import About from "./components/About";
import { Route , Routes } from "react-router-dom"
import { useState ,useEffect } from "react"
import logo from './images/logo.png';
import candy_crush_audio from './audio/candy_crush_intro.ogg';
import volume_off from './images/volume-xmark-solid.svg';
import volume_on from './images/volume-high-solid.svg';



const App = () => {
     
    // Mute and Play Audio 
    const [isMuted, setIsMuted] = useState(false);

    // Plays Audio 

    useEffect(() => {

        const audio = new Audio(candy_crush_audio);

        audio.loop = true;

        const playAudio = () => {

            if (!isMuted) {

                audio.play();
            }
        };

        document.addEventListener('click', playAudio);

        return () => {

            document.removeEventListener('click', playAudio);
            audio.pause();
        };

    }, [isMuted]);

    // Mute and Unmute 
    const toggleMute = () => {

        setIsMuted(!isMuted);
    };

    return (
        <>
            <Header
                logo={logo}
                toggleMute = {toggleMute}
                volume_off = {volume_off}
                volume_on = {volume_on}
                isMuted = {isMuted}
            />

            <Routes>
                
                <Route path="/" element={<Home/>} /> 
                <Route path="/game" element={ <Game/>} /> 
                <Route path="/about" element = {<About/>} />

            </Routes>
       
        </>
        
    )}

export default App
