export default function Footer({ className = "" }) {
  return (
    <footer className='w-full py-6 text-center text-sm text-gray-500'>
      <span>{new Date().getFullYear()} Ma collection de vinyle - <a href="https://virgil-brandel.fr">Mon portfolio</a></span>
    </footer>
  )
}


