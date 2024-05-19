'use client'
import React from "react";
import { CSSTransition } from 'react-transition-group';

import Cardfront from '../Cardfront';
import Cardback from '../Cardback';
import UPayContext from '../../../use/UPayContext';




export default function FlippableCard() {

  const { infoCard, setInfoCard } = UPayContext();

  const nodeRef = React.useRef(null);


  const handleClick = () => {
    setInfoCard({ ...infoCard, fucus: !infoCard.fucus });
  }

  return (
    <div className="h-full w-full ">
      <div className=" w-full h-full flex justify-center perspective-1000 " >
        <CSSTransition in={infoCard.fucus} timeout={3000} classNames="flip" nodeRef={nodeRef}>
          <div ref={nodeRef} onClick={handleClick} className="creditcard max-w-md w-full md:w-[50%] items-center flex ">
            <Cardfront />
            <Cardback />
          </div>
        </CSSTransition>
      </div>
    </div>);
}
