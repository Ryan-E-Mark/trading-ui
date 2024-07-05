import { EntityType } from "./entity-type"
import { TradeType } from "./trade-type"

export type OrderType = {
    asset: EntityType
    side: 'BUY' | 'SELL'
    type: TradeType
    quantity: number
    price?: number
    notional: number
}