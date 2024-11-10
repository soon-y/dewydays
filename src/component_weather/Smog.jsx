export default function Smog({daytime}){
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

      <img src="/weather/smog.png" alt="smog" className="smogT" style={{
        position: "absolute",
        top: '60%',
        left: '50%',
        width: '80%',
        margin: 'auto',
        transform: 'translateX(-50%)',
        display: daytime? 'block' : 'none'
      }} />

      <img src="/weather/smog.png" alt="smog" className="smogB" style={{
        position: "absolute",
        top: '78%',
        left: '50%',
        width: '80%',
        margin: 'auto',
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

      <img src="/weather/smogNight.png" alt="smog" className="smogT" style={{
        position: "absolute",
        top: '60%',
        left: '50%',
        width: '80%',
        margin: 'auto',
        transform: 'translateX(-50%)',
        display: daytime? 'none' : 'block'
      }} />

      <img src="/weather/smogNight.png" alt="smog" className="smogB" style={{
        position: "absolute",
        top: '78%',
        left: '50%',
        width: '80%',
        margin: 'auto',
        transform: 'translateX(-50%)',
        display: daytime? 'none' : 'block'
      }} />

    </>
  )
}