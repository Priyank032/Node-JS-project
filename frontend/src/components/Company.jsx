import React from "react";

const Company = (props) => {
  let color;
  function findcolor() {
    if (props.signal == "sell") color = "brown";
    else if (props.signal == "strong sell") color = "red";
    else if (props.signal == "buy") color = "lightgreen";
    else if (props.signal == "strong buy") color = "green";
    else color = "blue";
  }
  return (
    // <tr>
    //     <td><img src = {image} width = "50" height = "50"alt = 'crypto'></img></td>
    //     <td><h3>{nm}</h3></td>
    //     <td>{symbol}</td>
    //     <td>INR {price}</td>
    //     <td>INR {volume.toLocaleString()}</td>
    // </tr>

    <tr>
      <td>{props.cd}</td>
      <td>{props.nm}</td>
      <td>{props.cp}</td>
      <td>{props.hp}</td>
      <td>{props.lp}</td>
      <td>{props.vn}</td>
      {findcolor()}
      <td style={{ backgroundColor: color }}>{props.signal}</td>
    </tr>
  );
};

// {nm},{cp},{hp},{lp},{signal}
export default Company;
