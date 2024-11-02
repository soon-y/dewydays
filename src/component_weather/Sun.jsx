export default function Sun({daytime}){

  return(
    <>
      <img src="/weather/sunMane.png" alt="sun" className="sunMane" style={{
        position: "absolute",
        height: '100%',
        margin: 'auto',
        display: daytime? 'block' : 'none'
      }} />
      <img src="/weather/moonlight.png" alt="moon" className="moonlight" style={{
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: 'auto',
        display: daytime? 'none' : 'block'
      }} />
      <img src="/weather/sunFace.png" alt="sun" style={{
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '65%',
      }} />
    </>
  )
}