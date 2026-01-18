import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CallToAction() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto mx-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to transform your restaurant?
            </h2>

            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Join hundreds of restaurants using RestoHub to delight customers and streamline operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-primary hover:bg-white/90">
                <Link href="/signup" className="flex items-center gap-2">
                  Start Your Free Trial <ArrowRight size={20} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>

            <p className="text-white/70 text-sm mt-8">
              No credit card required. Full access to all features for 14 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
