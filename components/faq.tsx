"use client"

import { useState, useRef, useEffect } from "react"

function PlusIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}

const faqs = [
  {
    question: "How long does a typical engagement take?",
    answer:
      "90 days from audit to live system. Discovery takes 2-3 weeks. Build and implementation takes 6-8 weeks. Training and optimization happens in the final month. You start seeing time savings within 30 days.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "Any business where people do repetitive work. Real estate, healthcare, finance, manufacturing, professional services, SaaS companies. If your team has processes, we can optimize them. Industry knowledge helps, but operational inefficiency is universal.",
  },
  {
    question: "How do you measure success?",
    answer:
      "Time saved. Money saved. Revenue increased. That's it. We track hours recovered, process cycle times, error rates, and employee satisfaction. Every metric ties back to your P&L. If it doesn't impact the bottom line, we don't measure it.",
  },
  {
    question: "Do you provide ongoing support after implementation?",
    answer:
      "Yes. Because systems need maintenance. Month 1-3 is intensive: we're fixing bugs, optimizing workflows, answering questions. After that, you can choose monthly support packages or project-based help when you need to scale.",
  },
  {
    question: "How much does this typically cost?",
    answer:
      "We charge based on the value we create, not arbitrary project fees. Here's how it works: We calculate the exact ROI our AI systems will generate in year one, time saved, costs eliminated, revenue unlocked. Then we charge a fraction of that value.",
  },
]

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 relative" id="faq" ref={sectionRef}>
      <div className="relative z-10 max-w-3xl mx-auto">
        <div
          className={`text-center mb-14 sm:mb-20 space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-border transition-all ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: inView ? `${index * 0.06}s` : "0s",
                transitionDuration: "0.6s",
              }}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full py-5 sm:py-6 flex items-start justify-between hover:opacity-80 transition-opacity text-left"
              >
                <h3 className="text-sm sm:text-base font-medium pr-4">{faq.question}</h3>
                <div className="ml-3 mt-0.5 flex-shrink-0 text-foreground/40">
                  {expandedIndex === index ? <MinusIcon /> : <PlusIcon />}
                </div>
              </button>

              {expandedIndex === index && (
                <div className="pb-5 sm:pb-6 opacity-animation">
                  <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .opacity-animation {
          animation: fadeInUp 0.4s ease-out;
        }
      `}</style>
    </section>
  )
}
