import React from 'react'

interface IProps {
  name: string
  size?: number
  className?: string
}

function stringToColor(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const color = `hsl(${hash % 360}, 75%, 60%)`
  return color
}

function getInitials(name: string) {
  const words = name.split(' ')
  const initials = words.map(word => word[0]).join('')
  return initials.substring(0, 2).toUpperCase()
}

export const UserAvatar: React.FC<IProps> = ({ className, name, size }) => {
  const initials = getInitials(name)
  const backgroundColor  = stringToColor(name)

  return (
    <div
      className={`h-9 w-9 flex items-center justify-center rounded-full font-bold uppercase text-white ${className}`}
      style={{
        backgroundColor,
      }}
    >
      {initials}
    </div>
  )
}
