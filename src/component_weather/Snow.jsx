export default function Snow(){
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

      <img src="/weather/snow.png" alt="snowflake" className="snow" style={{
        position: "absolute",
        left: '20%',
        width: '12%',
        transform: 'translateX(-50%)'
      }} />

      <img src="/weather/snow.png" alt="snowflake" className="snow" style={{
        position: "absolute",
        left: '50%',
        width: '20%',
        transform: 'translateX(-50%)'
      }} />

      <img src="/weather/snow.png" alt="snowflake" className="snow" style={{
        position: "absolute",
        left: '80%',
        width: '10%',
        transform: 'translateX(-50%)'
      }} />
    </>
  )
}