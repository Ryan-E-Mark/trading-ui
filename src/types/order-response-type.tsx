import { EntityType } from "./entity-type";
import { SideType } from "./side-type";
import { TradeType } from "./trade-type";

export type OrderResponse = {
  asset: EntityType;
  id: string;
  notional: number;
  price: number;
  quantity: number;
  side: SideType;
  timestamp: number;
  type: TradeType;
};
