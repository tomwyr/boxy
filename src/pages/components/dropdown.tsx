import { MutableRefObject, useEffect, useRef, useState } from "react"

export interface DropdownItem<T> {
  value: T
  inputValue: string
  label: string
}

export interface DropdownParams<T> {
  className: string
  initialValue: T
  items: DropdownItem<T>[]
  onSelect: (value: T) => void
}

export function Dropdown<T>({
  className,
  initialValue,
  items,
  onSelect,
}: DropdownParams<T>) {
  const initialItem = items.find(
    (item) => item.value == initialValue,
  ) as DropdownItem<T>

  const menuRef = useRef<any>()
  const [selectedItem, setSelectedItem] = useState(initialItem)
  const [menuOpen, setMenuOpen] = useState(false)

  useOutsideMenuClickListener(menuRef, menuOpen, () => setMenuOpen(false))

  const onMenuItemClick = (item: DropdownItem<T>) => {
    setSelectedItem(item)
    setMenuOpen(false)
    onSelect(item.value)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div ref={menuRef}>
      <button
        className={className}
        type="button"
        role="button"
        onClick={toggleMenu}
      >
        {selectedItem?.label}
      </button>

      {menuOpen && (
        <ul className="absolute bg-white py-2 rounded-md shadow-md">
          {items.map((item) => (
            <DropdownMenuItem
              key={`${item.value}`}
              label={item.label}
              onClick={() => onMenuItemClick(item)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

interface DropdownMenuItemProps {
  label: string
  onClick: () => void
}

function DropdownMenuItem({ label, onClick }: DropdownMenuItemProps) {
  return (
    <li
      className="list-none hover:bg-slate-50 px-2 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </li>
  )
}

function useOutsideMenuClickListener(
  menuRef: MutableRefObject<any>,
  menuOpen: boolean,
  listener: () => void,
) {
  useEffect(() => {
    const handleOutsideClicks = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        listener()
      }
    }

    document.addEventListener("mousedown", handleOutsideClicks)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClicks)
    }
  }, [menuOpen, listener, menuRef])
}
