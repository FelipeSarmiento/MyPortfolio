import {Inter} from "next/font/google";
import {NavBar} from "@/app/components/NavBar";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "My Portfolio",
    description: "My Portfolio App",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className + " bg-gradient-to-br from-gray-900 to-indigo-900 min-h-screen from-30% [::-webkit-scrollbar{display:none;}] shrink-0 overflow-x-hidden"}>
            <NavBar/>
            {children}
        </body>
        </html>
    );
}
