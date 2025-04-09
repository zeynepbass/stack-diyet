import React,{useEffect} from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import useStore from '../useStore';
const Index = ({ open, setOpen }) => {

    const {usersData,fetchUsers } = useStore();

  useEffect(() => {
    fetchUsers();
}, []);
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="flex w-full">

                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    {usersData &&

                                        <>

                                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                Soru Soran Kullanıcılar
                                                <hr />
                                            </DialogTitle>
                                            <div className="mt-2 h-60  overflow-y-auto">

                                                <ul>
                                                 
                                                        {usersData && usersData.map((user, index) => (
                                                            <strong>
                                                                <li className="size-13" key={index}>@{user.firstName} {user.lastName}</li>
                                                            </strong>
                                                        )) }

                                                </ul>

                                            </div>
                                        </>
}




                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">


                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default Index
