import React from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const Index = ({ open, setOpen }) => {

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
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        #ara, #arama
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p>Veya tam listemizden arama yapın:</p>

                                        <form className="w-full flex space-x-4"> {/* Use flex layout to place items next to each other */}
                                            <div className="relative w-full">  {/* This div takes full width */}
                                                <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="search"
                                                    id="default-search"
                                                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Arama..."
                                                    required
                                                />
                                            </div>

                                            {/* Button next to the input */}
                                            <button
                                                type="submit"
                                                className="w-auto px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-500 focus:ring-2 focus:ring-purple-300"
                                            >
                                                Ara
                                            </button>
                                        </form>


                                    </div>


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
