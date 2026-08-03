import { useEffect, useState } from 'react'

const useScrollSpy = (ids, offset = 120) => {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + offset
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) {
          current = id
        }
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return activeId
}

export default useScrollSpy
