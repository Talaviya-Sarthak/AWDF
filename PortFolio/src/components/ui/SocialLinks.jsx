import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { Mail } from 'lucide-react'
import { socials } from '../../utils/data'

const icons = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  LeetCode: SiLeetcode,
  Email: Mail,
}

const SocialLinks = ({ className = '', size = 'md' }) => {
  const iconClass = size === 'lg' ? 'size-5' : 'size-4.5'
  const pad = size === 'lg' ? 'p-3' : 'p-2.5'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((social) => {
        const Icon = icons[social.label] ?? FiGithub
        return (
          <a
            key={social.label}
            href={social.href}
            target={social.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            aria-label={social.label}
            title={social.label}
            className={`btn-secondary inline-flex ${pad} items-center justify-center rounded-xl transition-all duration-200 hover:-translate-y-0.5`}
          >
            <Icon className={iconClass} />
          </a>
        )
      })}
    </div>
  )
}

export default SocialLinks
