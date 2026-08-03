import { motion } from 'framer-motion'

const Button = ({
  as: Component = 'a',
  variant = 'primary',
  href,
  to,
  onClick,
  children,
  className = '',
  type,
  ...rest
}) => {
  const styles = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 select-none ${
    variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  } ${className}`

  const Tag = Component
  const props = { ...rest }
  if (Tag === 'a') props.href = href ?? to
  if (Tag === 'button') props.type = type ?? 'button'

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className="inline-flex"
    >
      <Tag className={styles} {...props} onClick={onClick}>
        {children}
      </Tag>
    </motion.div>
  )
}

export default Button
