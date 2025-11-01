export default function MobileCta() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-black/80 backdrop-blur supports-[padding:max(0px)]:pb-[env(safe-area-inset-bottom)]">
      <div className="container py-3">
        <a
          href="#contact-form"
          className="block text-center py-3 rounded-xl border border-white/15 min-h-[44px]"
        >
          Start Your Project
        </a>
      </div>
    </div>
  )
}
