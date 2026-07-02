"use client"

function MagnifyingGlassIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  )
}

function ArchitectureIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
      <path d="M10 10h4M10 10v4M14 10v4"></path>
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 16.5c-1.5-1.5-2-3.5-2-5.5 0-4 3-7 7-7 2 0 4 .5 5.5 2M19.5 4.5c1.5 1.5 2 3.5 2 5.5 0 4-3 7-7 7-2 0-4-.5-5.5-2"></path>
      <path d="M7 7l10 10"></path>
      <circle cx="7" cy="7" r="2"></circle>
      <circle cx="17" cy="17" r="2"></circle>
    </svg>
  )
}

const steps = [
  {
    number: 1,
    title: "Discovery & AI Audit",
    description: "We don't guess. We measure. We find the exact places AI saves you money.",
    icon: MagnifyingGlassIcon,
  },
  {
    number: 2,
    title: "Strategic Roadmap & Solution Design",
    description: "We build AI systems for YOUR business, not generic templates.",
    icon: ArchitectureIcon,
  },
  {
    number: 3,
    title: "Build, Deploy & Train",
    description: "Our dev team builds it. We train your team. We don't disappear after launch.",
    icon: RocketIcon,
  },
]

export function HowWeWork() {
  return (
    <section className="pt-12 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-6 relative" id="how-we-work">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14 sm:mb-20 space-y-4 opacity-animation">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            How do we <span className="gradient-text">Leverage AI?</span>
          </h2>
          <p className="text-sm sm:text-lg text-foreground/70 max-w-2xl mx-auto">
            Our proven three-phase approach delivers measurable results in 90 days
          </p>
        </div>

        <div className="space-y-8 lg:space-y-0">
          <div className="hidden lg:block">
            <div className="relative">
              <div className="grid grid-cols-3 gap-6 relative">
                {steps.map((step, index) => {
                  const Icon = step.icon

                  return (
                    <div
                      key={step.number}
                      className="opacity-animation"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                      }}
                    >
                      <div className="glass-card p-6 hover:border-accent/40 transition-all group flex flex-col relative z-20">
                        {/* Icon and number */}
                        <div className="flex items-start justify-between mb-5">
                          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
                            <Icon />
                          </div>
                          <div className="w-8 h-8 rounded-full text-black bg-secondary flex items-center justify-center text-sm font-semibold">
                            {step.number}
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm text-foreground/60 flex-grow">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="lg:hidden space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="opacity-animation"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="glass-card overflow-hidden hover:border-accent/40 transition-all relative z-10">
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
                          <Icon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold">{step.title}</h3>
                          <p className="text-xs sm:text-sm text-foreground/60 mt-1">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .opacity-animation {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </section>
  )
}
