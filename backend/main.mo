import Bool "mo:base/Bool";
import Func "mo:base/Func";
import List "mo:base/List";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor {
  // Define the structure for a shopping list item
  type ShoppingItem = {
    id: Nat;
    text: Text;
    completed: Bool;
  };

  // Initialize a stable variable to store the shopping list
  stable var shoppingList : [ShoppingItem] = [];
  stable var nextId : Nat = 0;

  // Function to add a new item to the shopping list
  public func addItem(text: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem : ShoppingItem = {
      id = id;
      text = text;
      completed = false;
    };
    shoppingList := Array.append(shoppingList, [newItem]);
    id
  };

  // Function to get all items in the shopping list
  public query func getItems() : async [ShoppingItem] {
    shoppingList
  };

  // Function to toggle the completion status of an item
  public func toggleItem(id: Nat) : async Bool {
    shoppingList := Array.map<ShoppingItem, ShoppingItem>(shoppingList, func (item) {
      if (item.id == id) {
        {
          id = item.id;
          text = item.text;
          completed = not item.completed;
        }
      } else {
        item
      }
    });
    true
  };

  // Function to delete an item from the shopping list
  public func deleteItem(id: Nat) : async Bool {
    let oldLen = shoppingList.size();
    shoppingList := Array.filter<ShoppingItem>(shoppingList, func (item) { item.id != id });
    shoppingList.size() != oldLen
  };
}
