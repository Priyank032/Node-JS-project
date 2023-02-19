import React, { useState, useEffect } from "react";
import axios from "axios";
import Company from "./Company";
import "./table.css";
export default function Stocks() {
  const [com, setCom] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("https://test.praedicofinance.com/api/stock/getallstockdetails")
      .then((res) => {
        setCom(res.data);
      })
      .catch(() => {
        console.log("rejected 1");
      });
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCom = com.filter((com) =>
    com.companyName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div>
        <h2>Search a company</h2>
        <form>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
          ></input>
        </form>
      </div>

      <table>
        <tbody>
          <tr>
            <th>companyCode</th>
            <th>companyName</th>
            <th>currentPrice</th>
            <th>highPrice</th>
            <th>lowprice</th>
            <th>variance</th>
            <th>stockSignal</th>
          </tr>
          {filteredCom.map((com) => {
            return (
              // <Coin key = {coin.id} nm = {coin.name} image = {coin.image} symbol = {coin.symbol} volume = {coin.market_cap} price = {coin.current_price}></Coin>
              <Company
                key={com.id}
                cd={com.companyCode}
                nm={com.companyName}
                cp={com.currentPrice}
                hp={com.highPrice}
                lp={com.lowPrice}
                vn={com.variance}
                signal={com.stockSignal}
              ></Company>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
