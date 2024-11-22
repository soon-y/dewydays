export default function MoonOpc({daytime, phase}){
  let day = daytime== 1 ? true : false
  return(
    <>
      <img src="/weather/sunMane.png" alt="sun" className="sunMane" style={{
        position: "absolute",
        height: '100%',
        margin: 'auto',
        display: day? 'block' : 'none'
      }} />
      <img src="/weather/sunFace.png" alt="sun" style={{
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '65%',
        display: day? 'block' : 'none'
      }} />
      <img src="/weather/moonlight.png" alt="moon" className="moonlight" style={{
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: 'auto',
        display: !day && (phase==4)? 'block' : 'none'
      }} />
      <img src="/weather/moonFace.png" alt="moon" className="moon" style={{
        display: !day && (phase==4)? 'block' : 'none'
      }} />
      <img src="/weather/moon1opc.png" alt="moon" className="moon" style={{
        display: !day && (phase==1)? 'block' : 'none'
      }} />
      <img src="/weather/moon2opc.png" alt="moon" className="moon" style={{
        display: !day && (phase==2)? 'block' : 'none'
      }} />
      <img src="/weather/moon3opc.png" alt="moon" className="moon" style={{
        display: !day && (phase==3)? 'block' : 'none'
      }} />
      <img src="/weather/moon5opc.png" alt="moon" className="moon" style={{
        display: !day && (phase==5)? 'block' : 'none'
      }} />
      <img src="/weather/moon6opc.png" alt="moon" className="moon" style={{
        display: !day && (phase==6)? 'block' : 'none'
      }} />
      <img src="/weather/moon7opc.png" alt="moon" className="moon" style={{
        display: !day && (phase==7)? 'block' : 'none'
      }} />
      <img src="/weather/moon0opc.png" alt="moon" className="moon" style={{
        display: !day && (phase==0)? 'block' : 'none'
      }} />
    </>
  )
}