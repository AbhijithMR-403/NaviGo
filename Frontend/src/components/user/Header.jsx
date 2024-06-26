import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthAxios } from '../api/api_instance'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Map', href: '/map' },
  // { name: 'Features', href: '#' },
  { name: 'Buses', href: '/bus' },
  { name: 'Order', href: '/order' },
  { name: 'profile', href: '/profile' },
]


function Header({scrollWheel}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('access');
  const refresh_token = localStorage.getItem('refresh');
  console.log(scrollWheel);
  const logout = async () => {
    await AuthAxios.post('/logout', { refresh_token: refresh_token }, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    ).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err);
    })
    localStorage.removeItem("access");
    window.location.reload();
  }

  const authentication_user = useSelector(state => state.authentication_user)


  return (
    <div>
      <header className="user-header-div fixed inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">

          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} onClick={() => navigate(`${item.href}`)} className="cursor-pointer hover:underline underline-offset-4 decoration-2 text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {!authentication_user.isAuthenticated ? (
              <>
                <Link to={'/login'} className="text-sm font-semibold leading-6 text-gray-900 mr-7" onClick={logout}>
                  Sign in
                </Link>
                <Link to={'signup'} className="text-sm font-semibold leading-6 text-gray-900" onClick={logout}>
                  Register
                </Link>
              </>)
              :
              (<a className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer" onClick={logout}>
                Log out <span aria-hidden="true">&rarr;</span>
              </a>)}
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a className="-m-1.5 p-1.5">
                <span className="sr-only">My Logo</span>
                <img
                  className="h-8 w-auto"
                  src="/assets/Logo/navigo-logo-black-transparent.png"
                  alt="Logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">

                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {!authentication_user.isAuthenticated ? (
                    <>
                      <div
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      // onClick={logout}
                      >
                        <Link to={'/login'}>
                          Sign in
                        </Link>
                      </div>
                      <div
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        <Link to={'/signup'}>
                          Register
                        </Link>
                      </div>
                    </>) :
                    (<a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                      onClick={logout}
                    >
                      Log out
                    </a>)}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  )
}

export default Header