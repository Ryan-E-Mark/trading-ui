import { FC } from "react";
import { OrderResponse } from "../types/order-response-type";

type TradeListProps = {
  marketPrice: number;
  tradeList: OrderResponse[];
};

export const TradeList: FC<TradeListProps> = ({ tradeList, marketPrice }) => {
  return (
    <div className="bg-white rounded-md min-h-60 max-h-60 w-11/12 m-4">
      <div className="flex justify-between p-2 font-bold">
        <div className="flex justify-center min-w-24">
          <p>Trade</p>
        </div>
        <div className="flex justify-center min-w-24">
          <p>Order Type</p>
        </div>
        <div className="flex justify-center min-w-24">
          <p>Asset</p>
        </div>
        <div className="flex justify-center min-w-24">
          <p>Amount</p>
        </div>
        <div className="flex justify-center min-w-24">
          <p>Price</p>
        </div>
        <div className="flex justify-center min-w-24">
          <p>Total</p>
        </div>
      </div>
      <div className="overflow-y-scroll h-4/5 pb-2">
        {!tradeList.length && (
          <div className="flex justify-center items-center h-full">
            <p className="font-semibold">No Trades</p>
          </div>
        )}
        {tradeList.map((trade, idx) => {
          return (
            <div
              key={idx}
              className="flex justify-between p-2 text-sm font-semibold"
            >
              <div className="flex justify-center min-w-24">
                <p
                  className={` ${
                    trade.side === "BUY" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {trade.side}
                </p>
              </div>
              <div className="flex justify-center min-w-24">
                <p>{trade.type}</p>
              </div>
              <div className="flex justify-center min-w-24">
                <p>{trade.asset}</p>
              </div>
              <div className="flex justify-center min-w-24">
                <p>{trade.quantity}</p>
              </div>
              <div className="flex justify-center min-w-24">
                <p>${trade.type === "LIMIT" ? trade.price : marketPrice}</p>
              </div>
              <div className="flex justify-center min-w-24">
                <p>${trade.notional}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
