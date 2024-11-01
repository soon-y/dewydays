export default function Rain({daytime}){
  return(
    <>
      <img src="/weather/cloud.png" alt="cloud" className="cloud" style={{
        position: "absolute",
        left: '50%',
        transform: 'translate(-50%, 0%)',
        width: '100%',
        margin: 'auto',
        zIndex: 1,
        display: daytime? 'block' : 'none'
      }} />

      <img src="/weather/rain.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '20%',
        width: '10%',
        transform: 'translateX(-50%)',
        display: daytime? 'block' : 'none'
      }} />

      <img src="/weather/rain.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '50%',
        width: '16%',
        transform: 'translateX(-50%)',
        display: daytime? 'block' : 'none'
      }} />

      <img src="/weather/rain.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '80%',
        width: '8%',
        transform: 'translateX(-50%)',
        display: daytime? 'block' : 'none'
      }} />

<img src="/weather/cloudNight.png" alt="cloud" className="cloud" style={{
        position: "absolute",
        left: '50%',
        transform: 'translate(-50%, 0%)',
        width: '100%',
        margin: 'auto',
        zIndex: 1,
        display: daytime? 'none' : 'block'
      }} />

      <img src="/weather/rainNight.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '20%',
        width: '10%',
        transform: 'translateX(-50%)',
        display: daytime? 'none' : 'block'
      }} />

      <img src="/weather/rainNight.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '50%',
        width: '16%',
        transform: 'translateX(-50%)',
        display: daytime? 'none' : 'block'
      }} />

      <img src="/weather/rainNight.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '80%',
        width: '8%',
        transform: 'translateX(-50%)',
        display: daytime? 'none' : 'block'
      }} />
      
    </>
  )
}