"use client"

const pillars = [
  {
    icon: "🎯",
    title: "Data-Driven Strategy",
    description: "Every decision backed by comprehensive data analysis and measurable KPIs",
  },
  {
    icon: "🔧",
    title: "Process Engineering",
    description: "Redesigned workflows eliminating bottlenecks and manual handoffs",
  },
  {
    icon: "⚙️",
    title: "Technology Integration",
    description: "Modern tech stack that connects disparate systems seamlessly",
  },
  {
    icon: "👥",
    title: "Change Management",
    description: "Comprehensive training and support ensuring adoption and success",
  },
  {
    icon: "📊",
    title: "Continuous Optimization",
    description: "Ongoing monitoring and refinement to maximize sustained results",
  },
]

export function OurApproach() {
  return (
    <section className="py-24 px-6" id="approach">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4 animate-in fade-in zoom-in-95 duration-700">
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            Our <span className="gradient-text">Five-Pillar Approach</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A holistic framework combining strategy, technology, and execution
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="glass-card p-8 group hover:border-accent/40 transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{pillar.icon}</div>
              <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
              <p className="text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
