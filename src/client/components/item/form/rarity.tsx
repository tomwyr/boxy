import { useState } from "react"
import { ItemRarityProps } from "../../../../client/utils/itemRarityProps"
import { ItemRarity } from "../../../../server/types/itemRarity"
import { Dropdown } from "../../dropdown"
import { ItemFormInputLabel, ItemFormInputStyle } from "./common"

export interface ItemFormRarityProps {
  initialValue: ItemRarity | undefined
}

export function ItemFormRarity({ initialValue }: ItemFormRarityProps) {
  const [currentValue, setCurrentValue] = useState(initialValue)

  const items = ItemRarity.options.map((rarity) => ({
    value: rarity,
    inputValue: rarity,
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
