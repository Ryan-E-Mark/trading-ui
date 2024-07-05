import { FC, useEffect, useState } from "react";
import { EntityType } from "../types/entity-type";
import { SideType } from "../types/side-type";
import { SideToggle } from "./side-toggle";
import { sendTrade } from "../api/api";
import { TradeType } from "../types/trade-type";
import { OrderResponse } from "../types/order-response-type";

type OrderFormProps = {
  entity: EntityType;
  marketPrice: number;
  logTrades: (trade: OrderResponse) => void
};

export const OrderForm: FC<OrderFormProps> = ({ entity, marketPrice, logTrades }) => {
  const [price, setPrice] = useState(0);
  const [tradeType, setTradeType] = useState<TradeType>("LIMIT");
  const [amount, setAmount] = useState(1);
  const [side, setSide] = useState<SideType>("BUY");
  const [priceErrorMessage, setPriceErrorMessage] = useState("");
  const [amountErrorMessage, setAmountErrorMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const toggleSideValue = (side: SideType) => {
    setSide(side);
  };

  const isLimitOrder = tradeType === "LIMIT";

  const notional = isLimitOrder ? price * amount : marketPrice * amount;
  const hasFormError = !!priceErrorMessage || !!amountErrorMessage;

  useEffect(() => {
    if (isLimitOrder && price <= 0) {
      setPriceErrorMessage("Must specify a price greater than 0.");
    } else {
      setPriceErrorMessage("");
    }
    if (amount <= 0) {
      setAmountErrorMessage("Must specify an amount greater than 1.");
    } else {
      setAmountErrorMessage("");
    }
  }, [price, amount, isLimitOrder]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const params = {
          asset: entity,
          side: side,
          type: tradeType,
          quantity: amount,
          ...isLimitOrder ? {price: price} : {},
          notional: notional,
        }

        const response = await sendTrade(params);
        logTrades(response)
        setConfirmationMessage(
          `You have successfully submitted a ${tradeType.toLocaleLowerCase()} order to ${side.toLocaleLowerCase()} ${amount.toFixed(
            5
          )} ${entity} at $${
            isLimitOrder ? price.toFixed(2) : marketPrice
          } for $${notional.toFixed(2)}`
        );
        setIsPopupOpen(true);
        setTimeout(() => {
          setIsPopupOpen(false);
        }, 3000);
      } catch (err) {
        console.error("Error fetching order book", err);
      } finally {
      }
    };
    fetchData();
  };

  return (
    <div className="rounded-md bg-white h-4/5 w-80">
      <SideToggle side={side} toggleSideValue={toggleSideValue} />
      <form
        onSubmit={handleSubmit}
        className="h-4/5 flex flex-col justify-between items-center gap-4"
      >
        <div className="flex gap-4 pt-2">
          <div className="flex items-center">
            <input
              type="radio"
              checked={isLimitOrder}
              onChange={() => setTradeType('LIMIT')}
              className="w-4 h-4 bg-gray-100 border-gray-300"
            />
            <label className="ms-2 text-sm font-medium">
              Limit
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              checked={!isLimitOrder}
              onChange={() => setTradeType('MARKET')}
              className="w-4 h-4 bg-gray-100 border-gray-300 "
            />
            <label className="ms-2 text-sm font-medium">
              Market
            </label>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col gap-6 pt-2">
            <label className="font-semibold">Price:</label>
            <label className="font-semibold">Amount:</label>
            <label className="font-semibold">Total:</label>
          </div>
          <div className="flex flex-col gap-4 pt-2 w-40">
            {isLimitOrder ? (
              <input
                className="shadow border rounded focus:outline-none focus:border-green-500 py-0.5 px-2"
                type="number"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            ) : (
              <p className="font-semibold pt-0.5 pb-1">${marketPrice}</p>
            )}
            <input
              className="shadow border rounded focus:outline-none focus:border-green-500 py-0.5 px-2"
              type="number"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
            <p className="pt-1">${notional.toFixed(2)}</p>
          </div>
        </div>
        <div className="p-1 text-red-600 font-semibold">
          {priceErrorMessage && <p>{priceErrorMessage}</p>}
          {amountErrorMessage && <p>{amountErrorMessage}</p>}
        </div>
        {!priceErrorMessage && !amountErrorMessage && (
          <div>
            <p className="text-sm font-semibold">
              {side === "BUY" ? "Buying" : "Selling"} {amount.toFixed(5)}{" "}
              {entity === "BTC" ? "Bitcoin" : "Ethereum"} at $
              {isLimitOrder ? price : marketPrice}
            </p>
          </div>
        )}
        <button
          className={`justify-self-end w-1/3 h-auto p-2 border rounded-md font-semibold shadow-md 
          ${
            side === "BUY"
              ? hasFormError
                ? "text-gray-300 cursor-not-allowed"
                : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white active:bg-green-700"
              : hasFormError
              ? "text-gray-300 cursor-not-allowed"
              : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-700"
          }`}
          type="submit"
          disabled={hasFormError}
        >
          {side}
        </button>
      </form>
      {isPopupOpen && (
        <div className="flex gap-4 relative top-10 z-10 rounded bg-green-400 w-full font-xl px-4 py-4 font-bold">
          <button onClick={() => setIsPopupOpen(false)}>X</button>
          <p className="text-white">{confirmationMessage}</p>
        </div>
      )}
    </div>
  );
};
