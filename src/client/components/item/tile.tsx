import { Item } from "../../../server/types/item"
import { ItemRarityProps } from "../../utils/itemRarityProps"
import { ListItem } from "../list/item"
import { ItemImage } from "./image"

export interface ItemTileProps {
  item: Item
  selected?: boolean
  bordered?: boolean
  onClick?: () => void
}

export function ItemTile({
  item,
  selected = false,
  bordered = false,
  onClick,
}: ItemTileProps) {
  const rarityProps = ItemRarityProps(item.rarity)
  const rarityName = rarityProps.name
  const rarityTextColor = rarityProps.textColor
  const rarityBgColor = rarityProps.bgColor
  const rarityBorderColor = rarityProps.borderColor

  const bgStyle = `${selected && rarityBgColor} bg-opacity-5`
  const hoverStyle = `${
    onClick && `hover:${rarityBgColor}`
  } hover:bg-opacity-10`
  const borderStyle =
    bordered && `border-2 ${rarityBorderColor} border-opacity-50`

  return (
    <ListItem
      className={`mb-1 ${bgStyle} ${borderStyle} ${hoverStyle}`}
      onClick={onClick}
    >
      <ItemImage url={item.imageUrl} />

      <span className="py-2 px-4 text-center flex-grow">{item.name}</span>

      <span className={`p-2 w-24 flex-shrink-0 text-end ${rarityTextColor}`}>
        {rarityName}
      </span>
    </ListItem>
  )
}
