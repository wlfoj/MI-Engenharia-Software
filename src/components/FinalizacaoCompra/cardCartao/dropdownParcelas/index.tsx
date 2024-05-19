"use client"
import { useEffect, useState } from "react"
import { ChevronDownIcon } from "../../../ClientSide"
import list from "../ParcelasCartao/Parcelas.json"


export default function Dropdown() {

    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")

    return (
        
        <button onClick={() => setIsOpen((prev) => !prev)}
            className="relative flex flex-col justify-center items-center bg-white border focus:outline-none
            shadow text-gray-600 rounded focus:ring ring-gray-200 group">

            <p className="px-4 font-sans justify-between text-[14px] "> Parcelas | v </p>

            {isOpen && <div className="absolute hidden group-focus:block top-4 w-full bg-white shadow-md mt-1 rounded">
                {list.map((item, i) => (
                    <ul className="text-left border rounded">
                        <li className="px-4 text-[14px] font-sans hover:bg-gray-100 border-b">
                            {item.Parcela}X
                        </li>
                    </ul>
                ))}
            </div>}

        </button>



    )
}

/*  

icone chevrodown 

<p className="px-4 font-sans text-[14px] "> Parcelas | v </p>

<span className="border-l p-2 hover:bg-gray-100">

<ChevronDownIcon className="h-2 w-2 text-gray-500" />

</span>

<div className="absolut hidden group-focus:block top-2 w-20 bg-white shadow-md mt-1 rounded">

*/ 