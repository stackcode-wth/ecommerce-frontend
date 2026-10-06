function PolicyPage({ title, intro, sections }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{intro}</p>

      <div className="mt-8 space-y-6">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {section.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default PolicyPage;