import React, { useEffect, useState } from 'react';

export const Deposit = (props) =>{
    return(
        <button onClick={props.onClick}>{props.text}</button>
    );
};