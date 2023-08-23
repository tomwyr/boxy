import { useState } from "react"
import {
  ItemRarity,
  getItemRarityValue,
} from "../../../../server/models/itemRarity"
import ItemRarityProps from "../../../../client/utils/itemRarityProps"
import { Dropdown } from "../../dropdown"
import { ItemFormInputLabel, ItemFormInputStyle } from "./common"

export interface ItemFormRarityProps {
  initialValue: ItemRarity | undefined
}

export function ItemFormRarity({ initialValue }: ItemFormRarityProps) {
  const [currentValue, setCurrentValue] = useState(initialValue)

  const items = rarities.map((rarity) => ({
    value: rarity,
    inputValue: getItemRarityValue(rarity),
    label: ItemRarityProps(rarity).name,
  }))

  return (
    <>
      <ItemFormInputLabel name="rarity" label="Rarity" />
      <input
        className="hidden"
        type="number"
        name="rarity"
        readOnly={true}
        value={currentValue ?? -1}
      />
      <Dropdown
        className={ItemFormInputStyle}
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
