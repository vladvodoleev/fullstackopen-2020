import React, {useState} from "react";
import SingleCountry from "./SingleCountry";

const InfoButton = ({country}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <button onClick={() => setShowInfo(!showInfo)}>show</button>
      {showInfo ? <SingleCountry country={country} /> : null}
    </>
  )
}

export default InfoButton;