import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ShoppingItem {
  'id' : bigint,
  'text' : string,
  'completed' : boolean,
  'quantity' : bigint,
}
export interface _SERVICE {
  'addItem' : ActorMethod<[string, bigint], bigint>,
  'deleteItem' : ActorMethod<[bigint], boolean>,
  'getItems' : ActorMethod<[], Array<ShoppingItem>>,
  'toggleItem' : ActorMethod<[bigint], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
