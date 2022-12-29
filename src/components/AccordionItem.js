import { useState } from "react";
import { useRef } from "react";
import Tabs from "./TabComponent/Tabs";

const AccordionItem = ({ faq, tvl, balvault, balwallet, price}) => {

  const [clicked, setClicked] = useState(false);
  const contentEl = useRef();

  const { question, answer } = faq;

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <li className={`accordion_item ${clicked ? "active" : ""}`}>
      <button className="button atil" onClick={handleToggle}>
        {/*question*/}
        {/*<span className="control">{clicked ? "—" : "+"} </span>*/}
        <div className='class45' href="#">
    <div className='class46 me'>
      <div className='class47'>
        <div className='class49'>
            <img alt="Moonbeam" src="https://app.beefy.finance/static/media/moonbeam.aa1c3648.svg" width="24" height="24"></img>
        </div>
        <div className='jss199 class50' datacount="2">
            <img src="https://gmx.io/static/media/ic_glp_custom.11dd75db.svg" alt="" role="presentation" class="jss200" width="48" height="48"></img>
            {/*<img src="https://app.beefy.finance/static/media/xcDOT.71eafc2f.png" alt="" role="presentation" class="jss200" width="48" height="48"></img>*/}
        </div>
        <div className='class51'>
          <div className='class51-l1'>Test GLP Token</div>
          <div className='class51-l2'>
          <div className="jss209">GMX</div>
          <div class="class51-l3">🔥 Maddy Boost</div>
          </div>
        </div>
      </div>
      <div className='class48'>
          <div className='class52'>
              <div className='class53'>
                <div>
                  <div className="jss601">
                    <div className="jss602">WALLET</div>
                  </div>
                  <div>
                    <div className='last54'>{balwallet}</div>
                  </div>
                </div>
              </div>
              <div className='class53'>
                <div>
                <div className="jss601">
                    <div className="jss602">Deposited</div>
                  </div>
                  <div>
                    <div className='last54'>{balvault}</div>
                  </div>
                </div>
              </div>
              <div className='class53'>
                <div>
                <div className="jss601">
                    <div className="jss602">apy</div>
                  </div>
                  <div>
                    <div className='last54'>14%</div>
                  </div>
                </div>
              </div>
              <div className='class53'>
                <div>
                <div className="jss601">
                    <div className="jss602">daily</div>
                  </div>
                  <div>
                    <div className='last54'>0.03%</div>
                  </div>
                </div>
              </div>
              <div className='class53'>
                <div>
                <div className="jss601">
                    <div className="jss602">tvl</div>
                  </div>
                  <div>
                    <div className='last54'>{tvl * 10}</div>
                  </div>
                </div>
              </div>
              <div className='class53'>
                <div>
                <div className="jss601">
                    <div className="jss602">safety</div>
                  </div>
                  <div>
                    <div className='last54'>9.0</div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  </div>
      </button>

      <div
        ref={contentEl}
        className="answer_wrapper"
        style={
          clicked
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="answer">
          {/*answer*/}
          <Tabs isprice={price}/>
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;