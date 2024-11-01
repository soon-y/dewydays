export default function Tornado({daytime}){
  return(
    <>
      <img src="/weather/tornado0.png" alt="tornado" className="tornado0" style={{
        position: "absolute",
        left: '50%',
        width: '70%',
        margin: 'auto',
        display: daytime? 'block' : 'none'
      }} />

      <img src="/weather/tornado1.png" alt="tornado" className="tornado1" style={{
        position: "absolute",
        left: '50%',
        width: '70%',
        margin: 'auto',
        display: daytime? 'block' : 'none'
      }} />

      <img src="/weather/tornado2.png" alt="tornado" className="tornado2" style={{
        position: "absolute",
        left: '50%',
        width: '70%',
        margin: 'auto',
        display: daytime? 'block' : 'none'
      }} />

      <img src="/weather/tornado3.png" alt="tornado" className="tornado3" style={{
        position: "absolute",
        left: '50%',
        width: '70%',
        margin: 'auto',
        display: daytime? 'block' : 'none'
      }} />

<img src="/weather/tornadoNight0.png" alt="tornado" className="tornado0" style={{
        position: "absolute",
        left: '50%',
        width: '70%',
        margin: 'auto',
        display: daytime? 'none' : 'block'
      }} />

      <img src="/weather/tornadoNight1.png" alt="tornado" className="tornado1" style={{
        position: "absolute",
        left: '50%',
        width: '70%',
        margin: 'auto',
        display: daytime? 'none' : 'block'
      }} />

      <img src="/weather/tornadoNight2.png" alt="tornado" className="tornado2" style={{
        position: "absolute",
        left: '50%',
        width: '70%',
        margin: 'auto',
        display: daytime? 'none' : 'block'
      }} />

      <img src="/weather/tornadoNight3.png" alt="tornado" className="tornado3" style={{
        position: "absolute",
        left: '50%',
        width: '70%',
        margin: 'auto',
        display: daytime? 'none' : 'block'
      }} />

      
    </>
  )
}