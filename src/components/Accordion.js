import React, { Component } from 'react'
import { faqs } from "../data";
import AccordionItem from "./AccordionItem";
import { Deposit } from '../deposit';

const Accordion = ({istvl, isbalvault, isbalwallet, isprice}) => {

  //const { istvl/*, isbalvault, isbalwallet*/} = this.props
  return (
    <ul className="accordion class45">
      <Deposit />
      {faqs.map((faq, index) => (
        <AccordionItem key={index} faq={faq} tvl={istvl} balvault={isbalvault} balwallet={isbalwallet} price={isprice} />
      ))}
    </ul>
  );
};

export default Accordion;