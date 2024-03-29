import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const authentication_user = useSelector(state => state.authentication_user)
  
  return (
    <div className="user-home-div bg-white">

      <div className="bg-quote flex items-center justify-center h-screen mx-auto">
      
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>
          <div className="text-center">
            <h1 className="text-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Hey {authentication_user.name}...{authentication_user.isvendor}, <br />
              Find Your Best Route <br />
              To Your Best Place
            </h1>
            <p className="mt-6 text-lg leading-8">
              This is platform from which you can book or find the timing of your bus.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={'/bus'}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      
<div className="font-serif leading-normal mx-auto py-12 px-4 max-w-lg">
  <p className="mb-6 text-xl md:text-2xl uppercase">How's the site????😀</p>
  <p className="mb-4 text-lg"></p>
  <p className="mb-4 text-lg">You might not have explore it well🫠</p>
  <p className="mb-6 text-xl md:text-2xl">I'm here to help you out,</p>
  <p className="mb-4 text-lg"></p>
  <p className="mb-4 text-lg"><Link to={'/vendor'}>Click here</Link> and view the vendor page</p>
  <p className="mb-4 text-lg"></p>
  <p className="mb-4 text-lg">Even you can get to the admin page by linking <Link to={'/admin'}>here</Link></p>
  <p className="mb-4 text-lg">But for that you needs to have the email and password</p>
  <p className="mb-4 text-lg">If you are too excited mail be</p>
  <p className="mb-4 text-lg">abhijithmr581@gmail.com</p>
  <p className="mb-4 text-lg">We can met there</p>
  <p className="mb-4 text-lg"></p>
  <p className="mb-4 text-lg"></p>
</div>



    </div>
  )
}
