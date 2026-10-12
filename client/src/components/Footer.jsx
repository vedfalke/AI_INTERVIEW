function Footer() {
  return (
    <footer className='bg-[#111827] text-gray-300 border-t border-gray-800 mt-8'>
      <div className='max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4'>
        <div>
          <p className='font-semibold text-white'>AI_INTERVIEW</p>
          <p className='text-sm text-gray-400'>Practice smarter. Perform better.</p>
        </div>

        <div className='text-sm text-gray-400'>
          © {new Date().getFullYear()} AI_INTERVIEW
        </div>
      </div>
    </footer>
  )
}

export default Footer
