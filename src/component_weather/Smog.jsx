export default function Smog(){
  return(
    <>
      <img src="/weather/cloud.png" alt="cloud" className="cloud" style={{
        position: "absolute",
        left: '50%',
        transform: 'translate(-50%, 0%)',
        width: '100%',
        margin: 'auto',
        zIndex: 1,
      }} />

      <img src="/weather/smog.png" alt="smog" className="smogT" style={{
        position: "absolute",
        top: '64%',
        left: '50%',
        width: '80%',
        margin: 'auto',
        transform: 'translateX(-50%)',
      }} />

      <img src="/weather/smog.png" alt="smog" className="smogB" style={{
        position: "absolute",
        top: '82%',
        left: '50%',
        width: '80%',
        margin: 'auto',
        transform: 'translateX(-50%)',
      }} />

    </>
  )
}