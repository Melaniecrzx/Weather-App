import { useState } from "react"
import { Outlet, Link } from 'react-router-dom';
import Header from "../components/Header/Header"

export default function Main() {

   
    return(
        <div className="bg-neutral-900 min-h-screen w-full px-4 pt-4 pb-22 md:px-6 md:pt-6 md:pb-20 lg:px-28 lg:pt-12 flex flex-col gap-12 lg:gap-16">
            <Header />
            <Outlet />
       
        </div>
    )
}