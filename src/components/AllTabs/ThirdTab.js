import React from "react";
const ThirdTab = ({price}) => {
  return (
    <div className="relative flex flex-col w-full rounded border border-grey3 bg-grey3 h15 mb8">
      <div className="p20">
      <div className="f-span">
        <span>Vault stats</span>
      </div>
      <p>
        Price: {price * 1} GLP
      </p>
      <p>
        strategy contract: <a href="#" className="inherit txt-none">0x000000....</a>
      </p>
      <p>
        Vault contract: <a href="#" className="inherit txt-none">0x000000....</a>
      </p>
      </div>
    </div>
  );
};
export default ThirdTab;