import './App.css'
import AudioInputComponent from './components/AudioInput'
import HardwareStatus from './components/HardwareStatus'
import NavBar from './components/Navbar'
import VideoInputComponent from './components/VideoInput'

function App() {

  return (
    <>
    <NavBar />
      <HardwareStatus />
      <VideoInputComponent />
      <AudioInputComponent />
    </>
  )
}

export default App
