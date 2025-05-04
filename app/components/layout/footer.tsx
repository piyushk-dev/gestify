import Link from "next/link"

export default function Footer() {
  return (
<footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Gestify</h3>
            <p className="text-gray-400 text-sm">
              AI-powered news aggregation and summarization from trusted sources worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Sections</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/world" className="hover:text-white">
                  World
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-white">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-white">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/science" className="hover:text-white">
                  Science
                </Link>
              </li>
              <li>
                <Link href="/health" className="hover:text-white">
                  Health
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-white">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-white">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date(
).getFullYear()} Gestify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
