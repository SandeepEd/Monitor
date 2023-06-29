import './App.css'
import AudioInputComponent from './components/AudioInput'
import HardwareStatus from './components/HardwareStatus'
import VideoInputComponent from './components/VideoInput'

function App() {

  return (
    <>
      <HardwareStatus />
      <VideoInputComponent />
      <AudioInputComponent />
    </>
  )
}

export default App
