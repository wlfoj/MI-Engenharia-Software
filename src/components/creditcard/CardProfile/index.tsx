'use client'
import React, { useState } from "react";


type Props = {
    cType: any
}


export default function CardProfile({ cType }: Props) {


    const nodeRef = React.useRef(null);
    const [info,setInfo] = useState({
        name: cType?.cartao?.dono_cartao,
        cardNumber: cType?.cartao?.num_cartao,
        date: cType?.cartao?.data_vencimento,
    });

    return (
        <div className="h-full w-full ">
            <div className=" w-full h-full flex justify-center perspective-1000 " >
                <div ref={nodeRef} className="creditcard max-w-md w-full items-center flex ">
                    <div className="front" >
                        <div id="ccsingle"></div>
                        <svg version="1.1" id="cardfront" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px" y="0px" viewBox="0 0 750 471" xmlSpace="preserve">

                            <g id="Front">
                                <g id="CardBackground">
                                    <g id="Page-1_1_">
                                        <g id="amex_1_">
                                            <path id="Rectangle-1_1_" className="lightcolor primarycolor" d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                                C0,17.9,17.9,0,40,0z" />
                                        </g>
                                    </g>
                                    <path className="darkcolor secondarycolor" d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z" />
                                </g>
                                <text transform="matrix(1 0 0 1 60.106 295.0121)" id="svgnumber" className="st2 st3 st4">{info.cardNumber}</text>
                                <text transform="matrix(1 0 0 1 54.1064 428.1723)" id="svgname" className="st2 st5 st6">{info.name}</text>
                                <text transform="matrix(1 0 0 1 54.1074 389.8793)" className="st7 st5 st8">Nome Do Titular</text>
                                <text transform="matrix(1 0 0 1 479.7754 388.8793)" className="st7 st5 st8">Validade</text>
                                <text transform="matrix(1 0 0 1 65.1054 241.5)" className="st7 st5 st8">Número Do Cartão</text>
                                <g>
                                    <text transform="matrix(1 0 0 1 574.4219 433.8095)" id="svgexpire" className="st2 st5 st9">{info.date}</text>
                                    <text transform="matrix(1 0 0 1 479.3848 417.0097)" className="st2 st10 st11">VALIDO</text>
                                    <text transform="matrix(1 0 0 1 479.3848 435.6762)" className="st2 st10 st11">ATÉ</text>
                                    <polygon className="st2" points="554.5,421 540.4,414.2 540.4,427.9 		" />
                                </g>
                                <g id="cchip">
                                    <g>
                                        <path className="st2" d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
                            c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z" />
                                    </g>
                                    <g>
                                        <g>
                                            <rect x="82" y="70" className="st12" width="1.5" height="60" />
                                        </g>
                                        <g>
                                            <rect x="167.4" y="70" className="st12" width="1.5" height="60" />
                                        </g>
                                        <g>
                                            <path className="st12" d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
                                c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
                                C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
                                c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
                                c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z" />
                                        </g>
                                        <g>
                                            <rect x="82.8" y="82.1" className="st12" width="25.8" height="1.5" />
                                        </g>
                                        <g>
                                            <rect x="82.8" y="117.9" className="st12" width="26.1" height="1.5" />
                                        </g>
                                        <g>
                                            <rect x="142.4" y="82.1" className="st12" width="25.8" height="1.5" />
                                        </g>
                                        <g>
                                            <rect x="142" y="117.9" className="st12" width="26.2" height="1.5" />
                                        </g>
                                    </g>
                                </g>
                            </g>
                            <g id="Back">
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>);
}