export default function Sun({ display }){

  return(
    <>
      <img src="/weather/sunMane.png" alt="sun" className="sunMane" style={{
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '100%',
        margin: 'auto',
        display: display,
      }} />
      <img src="/weather/sunFace.png" alt="sun" style={{
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '65%',
        display: display
      }} />
    </>
  )
}