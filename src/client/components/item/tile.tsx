import { Item } from "../../../server/models/item"
import ItemRarityProps from "../../utils/itemRarityProps"
import { ListItem } from "../listItem"
import { ItemImage } from "./image"

export interface ItemTileProps {
  item: Item
  selected?: boolean
  onClick: () => void
}

export function ItemTile({ item, selected = false, onClick }: ItemTileProps) {
  const rarityProps = ItemRarityProps(item.rarity)
  const rarityName = rarityProps.name
  const rarityTextColor = rarityProps.textColor
  const rarityBgColor = rarityProps.bgColor

  const bgColor = selected && rarityBgColor

  return (
    <ListItem
      className={`mb-1 ${bgColor} bg-opacity-5 hover:${rarityBgColor} hover:bg-opacity-10`}
      onClick={onClick}
    >
      <ItemImage url={item.imageUrl} />

      <span className="p-2 px-4 text-center flex-grow">{item.name}</span>

      <span className={`p-2 w-24 flex-shrink-0 text-end ${rarityTextColor}`}>
        {rarityName}
      </span>
    </ListItem>
  )
}