export default function SunCloud({daytime}){
  return(
    <>
      <img src="/weather/sunMane.png" alt="sun" className="sunMane" style={{
        position: "absolute",
        height: '80%',
        margin: 'auto',
        display: daytime? 'block' : 'none'
      }} />
      <img src="/weather/moonlight.png" alt="moon" className="moonlightCloud" style={{
        position: "absolute",
        top: '40%',
        left: '40%',
        transform: 'translate(-50%, -50%)',
        margin: 'auto',
        display: daytime? 'none' : 'block'
      }} />
      <img src="/weather/sunFace.png" alt="sun" style={{
        position: "absolute",
        top: '40%',
        left: '40%',
        transform: 'translate(-50%, -50%)',
        height: '50%',
      }} />

      <img src="/weather/cloud.png" alt="cloud" className="cloud" style={{
        position: "absolute",
        top: '45%',
        left: '58%',
        transform: 'translate(-50%, 0)',
        width: '85%',
        margin: 'auto',
        display: daytime? 'block' : 'none'
      }} />

      <img src="/weather/cloudNight.png" alt="cloud" className="cloud" style={{
        position: "absolute",
        top: '45%',
        left: '58%',
        transform: 'translate(-50%, 0)',
        width: '85%',
        margin: 'auto',
        display: daytime? 'none' : 'block'
      }} />
    </>
  )
}