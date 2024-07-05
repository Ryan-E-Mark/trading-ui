import React, { useState } from "react";
import "./App.css";
import { EntityType } from "./types/entity-type";
import { EntityToggle } from "./components/entity-toggle";
import { OrderBook } from "./components/order-book";
import { OrderForm } from "./components/order-form";
import { TradeList } from "./components/trade-list";
import { OrderResponse } from "./types/order-response-type";

const App = () => {
  const [entity, setEntity] = useState<EntityType>("BTC");
  const [marketPrice, setMarketPrice] = useState(0)
  const [tradeList, setTradeList] = useState<OrderResponse[]>([])

  const toggleEntityValue = (entity: EntityType) => {
    setEntity(entity);
  };

  const getMarketPrice = (price: number) => {
    setMarketPrice(price)
  }

  const logTrades = (trade: OrderResponse) => {
    setTradeList([...tradeList, trade])
  }

  return (
    <div className="flex justify-center items-center bg-zinc-800 h-screen">
      <div className="sm:h-3/5 md:h-3/4 sm:w-full md:w-4/5 rounded-lg shadow-lg bg-gray-300 flex flex-col justify-start items-center gap-10 pb-6">
        <EntityToggle entity={entity} toggleEntityValue={toggleEntityValue} />
        <div className="flex sm:gap-4 md:gap-10">
          <OrderBook entity={entity} getMarketprice={getMarketPrice}/>
          <OrderForm entity={entity} marketPrice={marketPrice} logTrades={logTrades} />
        </div>
        <TradeList marketPrice={marketPrice} tradeList={tradeList}/>
      </div>
    </div>
  );
};

export default App;
