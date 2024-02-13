import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Header from '../../components/user/Header'
import { useSelector } from 'react-redux'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const authentication_user = useSelector(state => state.authentication_user)
  // useEffect(() => {
  //   console.log('Authentication user changed:', authentication_user);

  // }, [authentication_user]);

  return (
    <div className="user-home-div bg-white">

      <div className="bg-quote flex items-center justify-center h-screen mx-auto">
      
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Hey {authentication_user.name}...{authentication_user.isvendor}, <br />
              Find Your Best Route <br />
              To Your Best Place
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              This is platform from which you can book or find the timming of your bus.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
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
  <p className="mb-6 text-xl md:text-2xl uppercase">This is a simple parallax effect created by setting the background attachment property to a fixed position. This technique is not meant for non-decorative images, videos, etc. as those require additional HTML and CSS to work properly.</p>
  <p className="mb-4 text-lg">Quae commodi reiciendis dignissimos. Rerum molestiae hic dolores assumenda dolor! Corrupti reiciendis maxime fuga, recusandae obcaecati officia cum temporibus dicta quibusdam praesentium, magni, cumque aperiam iusto sequi illum molestiae non.</p>
  <p className="mb-4 text-lg">In excepturi repellendus eum, qui corrupti rerum perferendis harum adipisci voluptate? Nihil, quidem deleniti libero officia dicta vel asperiores velit molestiae blanditiis, dolore voluptatibus excepturi laudantium at veniam illo. Dolor!</p>
  <p className="mb-4 text-lg">Neque laudantium minus doloremque id quas quod sint velit corporis unde dolore accusantium delectus optio consequuntur voluptatem sapiente odit dolorum minima harum tenetur, dolor provident reprehenderit. Ex eum provident harum?</p>
  <p className="mb-4 text-lg">Mollitia temporibus maxime placeat culpa distinctio possimus, praesentium, assumenda quasi eum voluptate magni aspernatur aperiam. Eius voluptates rem eum, facilis inventore hic provident pariatur nam non! At odit iste cum.</p>
  <p className="mb-4 text-lg">Cumque voluptatibus laboriosam tempore architecto laudantium sint vitae cupiditate voluptate quod tempora saepe odio quasi dolores possimus non totam unde voluptates corrupti, ducimus ipsa enim officiis ipsum maxime eveniet. Aut!</p>
  <p className="mb-4 text-lg">Maxime facere ut natus libero incidunt alias quam consectetur, nisi delectus exercitationem ab qui perferendis dolorem sequi veritatis nobis eius quas dolore ducimus atque vel. Doloribus mollitia non pariatur modi?</p>
  <p className="mb-4 text-lg">Sed in amet a neque, delectus, cupiditate ab assumenda quidem facere molestias vitae itaque soluta reprehenderit dolorem. Deserunt quibusdam, consequatur veniam fugiat ipsam aliquam ea possimus quis officiis enim dolores.</p>
  <p className="mb-4 text-lg">Exercitationem aperiam veniam perspiciatis iure ad nobis necessitatibus cumque cupiditate obcaecati natus. Neque nostrum maxime id veritatis tempore, a voluptate voluptatem et! A ullam id aliquam? Recusandae deleniti odit fugit!</p>
  <p className="mb-4 text-lg">Beatae rerum obcaecati consectetur nostrum eos ipsam, accusamus delectus ex maxime neque sit quod repellendus voluptate sunt dolore hic explicabo ea dolorum vero vel quidem illo! Cupiditate sed voluptatibus ullam?</p>
  <p className="mb-4 text-lg">Modi aliquam facilis adipisci! Soluta eveniet eos omnis, inventore nesciunt, laborum deserunt blanditiis nihil accusamus debitis voluptatibus possimus dolores vero maiores, sed voluptate ut! Facilis possimus vitae consectetur praesentium veritatis.</p>
  <p className="mb-4 text-lg">Tempore, quaerat accusamus ad nostrum maiores numquam, ea nam sed reiciendis, eveniet perspiciatis. Eos nulla vel consectetur quo nesciunt aspernatur sint nemo cumque optio mollitia, veritatis, tenetur quibusdam eum natus.</p>
</div>



    </div>
  )
}
