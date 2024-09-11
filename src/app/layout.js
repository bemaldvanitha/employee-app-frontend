'use client';
import { Provider } from 'react-redux';

import CustomNavbar from "@/components/common/custom-navbar/CustomNavbar";
import store from "@/store";

import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <CustomNavbar/>
                    {children}
                </Provider>
            </body>
        </html>
    );
}