import Link from 'next/link'

const Footer = () => {
  return (
    <div className='showcase bg-secondary text-white'>
      <div className="section_container flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm md:text-base">
          <Link href="/privacy" target='_blank' className="hover:underline hover:text-primary">Privacy & Terms</Link>
          <Link href="/contact" target='_blank' className="hover:underline hover:text-primary">Contact</Link>
          <Link href="/faq" target='_blank' className="hover:underline hover:text-primary">FAQs</Link>
        </div>

        {/* Made with love */}
        <div className="text-sm text-gray-300">
          Made with ❤️ © 2025
        </div>
      </div>
    </div>
  )
}

export default Footer
