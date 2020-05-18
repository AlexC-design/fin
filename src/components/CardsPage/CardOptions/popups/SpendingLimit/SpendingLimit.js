import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import PopupButton from "../PopupButton/PopupButton";
import {
  setSuccessMessage,
  setPopupType
} from "../../../../../store/state/popup/index";
import "./css/spending-limit.css";

const SpendingLimit = ({ total, setSuccessMessage, setPopupType }) => {
  const [previousLimit, setPreviousLimit] = useState(0);
  const [limit, setLimit] = useState(3600);
  const [newLimit, setNewLimit] = useState("");
  const [stage, setStage] = useState("view");
  const [animateBar, setAnimateBar] = useState(true);
  const [error, setError] = useState("");

  const isNumber = str => {
    return /^\d+$/.test(str);
  };

  const inputRef = useRef(null);

  const editLimit = () => {
    setStage("edit");
    setPreviousLimit(limit);
    setAnimateBar(false);
  };
  const saveLimit = () => {
    if (newLimit && newLimit < total) {
      setError("Limit can't be less than current spendings");
      inputRef.current.focus();
    } else {
      setLimit(newLimit);
      setStage("view");
      setAnimateBar(true);
      setError("");
    }
  };
  const cancelEdit = () => {
    setStage("view");
    setError("");
  };

  const handleInputChange = e => {
    const value = e.target.value;

    if ((value.length <= 5 && isNumber(value)) || value === "") {
      setNewLimit(value);
    }
  };

  const handleSubmit = () => {
    setSuccessMessage("Saved");

    setTimeout(() => {
      setPopupType("success");
    }, 10);

    setTimeout(() => {
      setPopupType(null);
      setSuccessMessage("");
    }, 1500);
  };

  return (
    <div className="spending-limit">
      {!limit && stage === "view" ? (
        <p className="no-limit">No limit set</p>
      ) : (
        <div className="main-container">
          <div className="arc">
            <svg
              width="246"
              height="177"
              viewBox="0 0 246 177"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="linear"
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#131e56" />
                  <stop offset="50%" stopColor="#364496" />
                  <stop offset="75%" stopColor="#FFC01D" />
                  <stop offset="100%" stopColor="#e83508" />
                </linearGradient>
              </defs>

              <style>{`
                  path.fill { stroke-dashoffset: ${
                    total < limit ? (1 - total / limit) * 387 : 0
                  } }
                    
                  path.fill--animation {  animation: fill-in-limit 1s cubic-bezier(0.57, 0.01, 0.49, 1.1)
                    forwards; }

                  @keyframes fill-in-limit {
                      0% { stroke-dashoffset: ${
                        (1 - total / previousLimit) * 387
                      }; }
                      100% { stroke-dashoffset: ${
                        total < limit ? (1 - total / limit) * 387 : 0
                      }; }
                  }

                  path.background {
                    stroke-width: ${(total / limit) * 10 + 1}px;

                    transition: all 1s cubic-bezier(0.57, 0.01, 0.49, 1.1);
                  }
              `}</style>

              <path
                className="background"
                d="M42.1515 157.734C34.4182 144.293 30 128.736 30 112.157C30 61.2599 71.6375 20 123 20C174.362 20 216 61.2599 216 112.157C216 128.736 211.582 144.293 203.848 157.734"
              />
              <path
                className={`fill fill${animateBar ? "--animation" : ""}`}
                d="M42.1515 157.734C34.4182 144.293 30 128.736 30 112.157C30 61.2599 71.6375 20 123 20C174.362 20 216 61.2599 216 112.157C216 128.736 211.582 144.293 203.848 157.734"
                stroke="url(#linear)"
              />
            </svg>
          </div>
          <div className="text-container">
            <div className="numbers-container">
              <div className="spent">{total}£</div>
              <p className="slash">/</p>
              {stage === "view" ? (
                <div className="limit">{limit}£</div>
              ) : (
                <input
                  ref={inputRef}
                  className="limit-input"
                  name="limit"
                  type="text"
                  autoFocus
                  onFocus={e => e.currentTarget.select()}
                  value={newLimit}
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              )}
            </div>
            <div className="text">Spent this month</div>
          </div>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {stage === "view" ? (
        <div className="buttons-container-first">
          <PopupButton action={editLimit} type={"ternary"} text={"Edit"} />
          <PopupButton action={handleSubmit} type={"primary"} text={"Done"} />
        </div>
      ) : (
        <div className="buttons-container-second">
          <PopupButton action={cancelEdit} type={"secondary"} text={"Cancel"} />
          <PopupButton
            action={saveLimit}
            type={"primary"}
            text={"Save"}
            disabled={true ? false : true}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  total: state.mockData.total
});

const mapDispatchToProp = dispatch => ({
  setSuccessMessage: message => dispatch(setSuccessMessage(message)),
  setPopupType: type => dispatch(setPopupType(type))
});

export default connect(mapStateToProps, mapDispatchToProp)(SpendingLimit);
