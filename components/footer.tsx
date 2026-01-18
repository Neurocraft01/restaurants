import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-serif font-bold">ℝ</span>
              </div>
              <span className="font-serif font-bold text-primary">RestoHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium restaurant management platform trusted by thousands worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="hover:text-primary transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-primary transition">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-primary transition">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-primary transition">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary transition">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2026 RestoHub. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary transition text-sm">
              Twitter
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition text-sm">
              LinkedIn
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition text-sm">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
