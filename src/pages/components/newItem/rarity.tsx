import { useState } from "react"
import {
  ItemRarity,
  getItemRarityValue,
} from "../../../server/models/itemRarity"
import ItemRarityProps from "../../utils/itemRarityProps"
import { Dropdown } from "../dropdown"
import { NewItemInputLabel, NewItemInputStyle } from "./input"

export function NewItemRarity() {
  const initialValue = ItemRarity.common
  const [currentValue, setCurrentValue] = useState(initialValue)

  const items = rarities.map((rarity) => ({
    value: rarity,
    inputValue: getItemRarityValue(rarity),
    label: ItemRarityProps(rarity).name,
  }))

  return (
    <>
      <NewItemInputLabel name="rarity" label="Rarity" />
      <input
        className="hidden"
        type="number"
        name="rarity"
        readOnly={true}
        value={currentValue}
      />
      <Dropdown
        className={NewItemInputStyle}
        initialValue={initialValue}
        items={items}
        onSelect={setCurrentValue}
      />
    </>
  )
}

const rarities = [
  ItemRarity.common,
  ItemRarity.rare,
  ItemRarity.unique,
  ItemRarity.epic,
  ItemRarity.legendary,
]
