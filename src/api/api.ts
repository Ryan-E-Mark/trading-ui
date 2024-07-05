import { EntityType } from "../types/entity-type";
import { OrderType } from "../types/order-type";

// Orderbook API
export const getOrderbook = async (entity: EntityType) => {
  try {
    const response = await fetch(`/orderbook/${entity}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching order book:", error);
    return null;
  }
};

// Trade API
export const sendTrade = async (order: OrderType) => {
    try {
        const response = await fetch(`/trade`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
          });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error executing trade:", error);
        return null;
      }
};
