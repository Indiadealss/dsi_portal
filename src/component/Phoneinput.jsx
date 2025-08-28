import React from 'react'

export const Phoneinput = () => {
    return (
        <div>

            <form class="max-w-sm mx-auto">
                <div class="flex items-center">
                    <button id="dropdown-phone-button" data-dropdown-toggle="dropdown-phone" class="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                        <img
                            src="https://flagcdn.com/w40/in.png"
                            alt="India Flag"
                            className='mx-2'
                            width="20"
                            height="20"
                        />
                        +91
                    </button>

                    <label for="phone-input" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Phone number:</label>
                    <div class="relative w-full">

                        <input
                            type="tel"
                            id="phone-input"
                            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 focus:border-s-0 border border-gray-300 focus:border focus:border-gray-300 focus:outline-none focus:ring-0 "
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder="123-456-7890"
                            required
                        />

                    </div>
                </div>
            </form>

        </div>
    )
}
