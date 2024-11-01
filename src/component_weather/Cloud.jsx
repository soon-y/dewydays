export default function Cloud({daytime}){
  return(
    <>
      <img src="/weather/cloud.png" alt="cloud" className="cloud" style={{
        position: "absolute",
        top: '15%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        width: '100%',
        margin: 'auto',
        display: daytime? 'block' : 'none'
      }} />

      <img src="/weather/cloudNight.png" alt="cloud" className="cloud" style={{
        position: "absolute",
        top: '15%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        width: '100%',
        margin: 'auto',
        display: daytime? 'none' : 'block'
      }} />
    </>
  )
}