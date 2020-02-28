import {ReplenishmentCollectionList} from "./ReplenishmentCollectionListView";
import {ReplenishmentCollectionEdit} from "./ReplenishmentCollectionEdit";
import {ReplenishmentCollectionCreate} from "./ReplenishmentCollectionCreate";

export interface Replenishment {
    id?: number;
    amount: number;
    product_id: number;
    total_price: number
}

export interface ReplenishmentCollection {
    id?: number;
    timestamp: string|null;
    comment: string|null;
    seller_id: number|null;
    replenishments: Replenishment[];
}

export {ReplenishmentCollectionList, ReplenishmentCollectionCreate, ReplenishmentCollectionEdit};
