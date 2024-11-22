export default function CloudPlus({daytime, plus}){

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

      <img src="/weather/cloudNight.png" alt="cloud" className="cloud" style={{
        position: "absolute",
        left: '50%',
        transform: 'translate(-50%, 0%)',
        width: '100%',
        margin: 'auto',
        zIndex: 1,
        display: daytime? 'none' : 'block'
      }} />

      {/************** Rain **************/}
      <img src="/weather/rain.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '20%',
        width: '10%',
        transform: 'translateX(-50%)',
        display: daytime&&((plus == 'rain') || (plus == 'thunder'))? 'block' : 'none'
      }} />

      <img src="/weather/rain.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '50%',
        width: '16%',
        transform: 'translateX(-50%)',
        display: daytime&&(plus == 'rain')? 'block' : 'none'
      }} />

      <img src="/weather/rain.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '80%',
        width: '10%',
        transform: 'translateX(-50%)',
        display: daytime&&((plus == 'rain') || (plus == 'thunder'))? 'block' : 'none'
      }} />

      <img src="/weather/rainNight.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '20%',
        width: '10%',
        transform: 'translateX(-50%)',
        display: !daytime&&((plus == 'rain') || (plus == 'thunder'))? 'block' : 'none'
      }} />

      <img src="/weather/rainNight.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '50%',
        width: '16%',
        transform: 'translateX(-50%)',
        display: !daytime&&(plus == 'rain')? 'block' : 'none'
      }} />

      <img src="/weather/rainNight.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '80%',
        width: '10%',
        transform: 'translateX(-50%)',
        display: !daytime&&((plus == 'rain') || (plus == 'thunder'))? 'block' : 'none'
      }} />

      {/************** Thunder **************/}

      <img src="/weather/lightning.png" alt="raindrop" className="lightning" style={{
        position: "absolute",
        left: '50%',
        width: '30%',
        transform: 'translateX(-50%)',
        display: (plus == 'thunder')? 'block' : 'none'
      }} />

      {/************** Drizzle **************/}

      <img src="/weather/rain.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '20%',
        width: '5%',
        transform: 'translateX(-50%)',
        display: daytime&&(plus == 'drizzle')? 'block' : 'none'
      }} />

      <img src="/weather/rain.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '50%',
        width: '7%',
        transform: 'translateX(-50%)',
        display: daytime&&(plus == 'drizzle')? 'block' : 'none'
      }} />

      <img src="/weather/rain.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '80%',
        width: '5%',
        transform: 'translateX(-50%)',
        display: daytime&&(plus == 'drizzle')? 'block' : 'none'
      }} />

      <img src="/weather/rainNight.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '20%',
        width: '5%',
        transform: 'translateX(-50%)',
        display: !daytime&&(plus == 'drizzle')? 'block' : 'none'
      }} />

      <img src="/weather/rainNight.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '50%',
        width: '7%',
        transform: 'translateX(-50%)',
        display: !daytime&&(plus == 'drizzle')? 'block' : 'none'
      }} />

      <img src="/weather/rainNight.png" alt="raindrop" className="rain" style={{
        position: "absolute",
        left: '80%',
        width: '5%',
        transform: 'translateX(-50%)',
        display: !daytime&&(plus == 'drizzle')? 'block' : 'none'
      }} />

      {/************** Smog **************/}

      <img src="/weather/smog.png" alt="smog" className="smogT" style={{
        position: "absolute",
        top: '60%',
        left: '50%',
        width: '80%',
        margin: 'auto',
        transform: 'translateX(-50%)',
        display: daytime&&(plus == 'smog')? 'block' : 'none'
      }} />

      <img src="/weather/smog.png" alt="smog" className="smogB" style={{
        position: "absolute",
        top: '78%',
        left: '50%',
        width: '80%',
        margin: 'auto',
        transform: 'translateX(-50%)',
        display: daytime&&(plus == 'smog')? 'block' : 'none'
      }} />

      <img src="/weather/smogNight.png" alt="smog" className="smogT" style={{
        position: "absolute",
        top: '60%',
        left: '50%',
        width: '80%',
        margin: 'auto',
        transform: 'translateX(-50%)',
        display: !daytime&&(plus == 'smog')? 'block' : 'none'
      }} />

      <img src="/weather/smogNight.png" alt="smog" className="smogB" style={{
        position: "absolute",
        top: '78%',
        left: '50%',
        width: '80%',
        margin: 'auto',
        transform: 'translateX(-50%)',
        display: !daytime&&(plus == 'smog')? 'block' : 'none'
      }} />

      {/************** Snow **************/}

      <img src="/weather/snow.png" alt="snowflake" className="snow" style={{
        position: "absolute",
        left: '20%',
        width: '12%',
        transform: 'translateX(-50%)',
        display: daytime&&(plus == 'snow')? 'block' : 'none'
      }} />

      <img src="/weather/snow.png" alt="snowflake" className="snow" style={{
        position: "absolute",
        left: '50%',
        width: '20%',
        transform: 'translateX(-50%)',
        display: daytime&&(plus == 'snow')? 'block' : 'none'
      }} />

      <img src="/weather/snow.png" alt="snowflake" className="snow" style={{
        position: "absolute",
        left: '80%',
        width: '10%',
        transform: 'translateX(-50%)',
        display: daytime&&(plus == 'snow')? 'block' : 'none'
      }} />

      <img src="/weather/snowNight.png" alt="snowflake" className="snow" style={{
        position: "absolute",
        left: '20%',
        width: '12%',
        transform: 'translateX(-50%)',
        display: !daytime&&(plus == 'snow')? 'block' : 'none'
      }} />

      <img src="/weather/snowNight.png" alt="snowflake" className="snow" style={{
        position: "absolute",
        left: '50%',
        width: '20%',
        transform: 'translateX(-50%)',
        display: !daytime&&(plus == 'snow')? 'block' : 'none'
      }} />

      <img src="/weather/snowNight.png" alt="snowflake" className="snow" style={{
        position: "absolute",
        left: '80%',
        width: '10%',
        transform: 'translateX(-50%)',
        display: !daytime&&(plus == 'snow')? 'block' : 'none'
      }} />
      
    </>
  )
}