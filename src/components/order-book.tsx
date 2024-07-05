import { FC, useEffect, useMemo, useRef, useState } from "react";
import { EntityType } from "../types/entity-type";
import { getOrderbook } from "../api/api";
import { OrderBookType } from "../types/order-book-type";
import { getNumberRounded } from "../utils/get-number-rounded";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type OrderBookProps = {
  entity: EntityType;
  getMarketprice: (price: number) => void
};

export const OrderBook: FC<OrderBookProps> = ({ entity, getMarketprice }) => {
  const [orderBookValues, setOrderBookValues] = useState<OrderBookType>();
  const [isLoading, setIsLoading] = useState(false);

  const asks = orderBookValues?.asks ?? [];
  const bids = orderBookValues?.bids ?? [];
  // reversing a copy of the asks to have orderbook formatted correctly
  const reversedAsks = [...asks].reverse();

  const askPrice = reversedAsks.length ? Number(reversedAsks[reversedAsks.length - 1][0]) : 0;
  const bidPrice = bids.length ? Number(bids[0][0]) : 0;

  const marketPrice = useMemo(() => {
    return (
      (Math.max(askPrice, bidPrice) + Math.min(askPrice, bidPrice)) /
      2
    );
  }, [askPrice, bidPrice]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getOrderbook(entity);
        setOrderBookValues(response);
      } catch (err) {
        console.error("Error fetching order book", err);
      } finally {
        setIsLoading(false);
        getMarketprice(marketPrice)
      }
    };
    fetchData();
  }, [entity, marketPrice, getMarketprice]);

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  // useEffect to make sure orderbook scrollbar renders in proper position
  useEffect(() => {
    const handleResize = () => {
      if (scrollableDivRef.current) {
        // Calculate and set the scroll position when the component renders or content changes
        const scrollableDiv = scrollableDivRef.current;
        const scrollTop =
          (scrollableDiv.scrollHeight - scrollableDiv.clientHeight) / 2;
        scrollableDiv.scrollTop = scrollTop;
      }
    };

    // Call the handleResize function initially and whenever the content changes
    handleResize();

    // Add event listener for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBookValues]);

  return (
    <div className="w-72 bg-white rounded-md pb-4 p-2">
      <div className="p-1">
        <div className="flex justify-between px-4 pb-2 mb-2 border-b-2 border-b-gray-300">
          <p className="font-bold">Price</p>
          <p className="font-bold">Amount ({entity})</p>
        </div>
        <div ref={scrollableDivRef} className="bg-white h-96 overflow-y-scroll">
          {isLoading ? (
            <Skeleton count={16} />
          ) : (
            <>
              {reversedAsks?.map((ask, idx) => {
                return (
                  <div key={idx} className="flex gap-6 pb-1 px-4 justify-between font-semibold">
                    <p className="text-red-500">
                      {getNumberRounded(ask[0], 2)}
                    </p>
                    <p>{getNumberRounded(ask[1], 5)}</p>
                  </div>
                );
              })}
              <p className="pt-1 pb-2 pl-4 font-semibold">{marketPrice.toFixed(2)}</p>
              {bids.map((bid, idx) => {
                return (
                  <div key={idx} className="flex gap-6 pb-1 px-4 justify-between font-semibold">
                    <p className="text-green-500">
                      {getNumberRounded(bid[0], 2)}
                    </p>
                    <p>{getNumberRounded(bid[1], 5)}</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
