import React from 'react'
import Head from 'next/head'

import NavBarDefault from "../Navigation/NavBar_Default"
import HeaderDefault from "../Navigation/Header_Default"

export default function GuildsListPage ({  }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Windmill Dashboard</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                <link rel="stylesheet" href="./theme-content/assets/css/tailwind.output.css"/>
                <script
                    src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
                    defer
                ></script>
                <script src="./theme-content/assets/js/init-alpine.js"></script>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css"
                />
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
                    defer
                ></script>
                <script src="./theme-content/assets/js/charts-lines.js" defer></script>
                <script src="./theme-content/assets/js/charts-pie.js" defer></script>
            </Head>
            <NavBarDefault/>
            <div className="flex flex-col flex-1">
                <HeaderDefault/>
                <main className="h-full pb-16 overflow-y-auto">
                    <div className="container px-6 mx-auto grid">
                        <h2
                            className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Blank
                        </h2>
                    </div>
                </main>
            </div>
        </>
    )
}