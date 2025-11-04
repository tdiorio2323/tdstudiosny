"use client"

export function ShareButton() {
  const handleShare = () => {
    if (!navigator.share) {
      return
    }

    const sharePayload: ShareData = {
      title: document.title,
      url: window.location.href,
    }

    void navigator.share(sharePayload)
  }

  return (
    <button
      onClick={handleShare}
      aria-label="Share this page"
      className="inline-flex items-center justify-center px-4 py-2 min-h-[44px] rounded-lg transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" x2="12" y1="2" y2="15" />
      </svg>
      Share
    </button>
  )
}
