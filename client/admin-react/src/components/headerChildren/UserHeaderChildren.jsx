import {useState} from 'react'
import {Dialog, DialogPanel} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import DropdownWithIcon from "../dropdownMenu/DropdownWithIcon.jsx";
import {useSelector} from "react-redux";

const navigation = [
    {name: 'Home', href: '/api/user'},
    {name: 'Features', href: '#'},
    {name: 'Company', href: '#'},
]


function UserHeaderChildren() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {data} = useSelector(state => state.authUserReducer);

    return (
        <header className="bg-gray-200 w-full shadow-gray-800 shadow-md">
            <nav aria-label="Global" className="mx-auto flex max-w-8xl items-center justify-between p-2 lg:px-3">


                <div className="flex flex-1">
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900 hover:bg-gray-500 p-1 rounded-md hover:text-slate-300">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6"/>
                        </button>
                    </div>
                </div>


                <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                        alt=""
                        src="/src/assets/images/logo.png"
                        className="h-14 w-auto"
                    />
                </a>

                {/*region ✅ profile image and name and drop menu */}
                <div className="flex flex-1 justify-end">
                    <div className="flex justify-center items-center">
                        <p className="mr-2 font-mono sm:text-sm max-sm:hidden">{data.username || ""}</p>
                    <img src={data.profileImg || "https://cdn-icons-png.flaticon.com/512/8608/8608769.png"} className="w-12 h-12 rounded-full" alt=""/>
                    <DropdownWithIcon/>
                    </div>
                </div>
                {/*endregion*/}


            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10"/>
                <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6"/>
                            </button>
                        </div>
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <div className="flex flex-1 justify-end">
                            <a href="#" className="text-sm/6 font-semibold text-gray-900">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="mt-6 space-y-2">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export default UserHeaderChildren
