import React, { useState, useEffect } from "react";
import SimpleBar from "simplebar-react";
import axios from "axios";
import "./css/payment-tab.css";
import FriendCard from "./FriendCard";

const PaymentTab = ({ type, active, setActive }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {});

  const getUsers = async () => {
    const response = await axios.get(
      "https://randomuser.me/api/?nat=au,ca,gb,ie,us&results=20"
    );

    setUsers(response.data.results);
  };

  const setFriendsActive = () => {
    setActive("friends");
  };
  const setPaymentsActive = () => {
    setActive("payments");
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (users) {
    return (
      <>
        <div className="buttons-container-payments">
          <button
            className={`friends ${active === "friends" ? "--active" : ""} ${
              type === "payments" ? "--hidden" : ""
            }`}
            onClick={setFriendsActive}
          >
            Friends
          </button>
          <button
            className={`payments ${active === "payments" ? "--active" : ""} ${
              type === "friends" ? "--hidden" : ""
            }`}
            onClick={setPaymentsActive}
          >
            Payments
          </button>
        </div>
        <div className="payments-simplebar">
          <SimpleBar style={{ height: `100%`, autoHide: true }}>
            <div className="payment-tab">
              {users.map((user, index) => {
                return (
                  <FriendCard
                    photo={user.picture.medium}
                    name={`${user.name.first} ${user.name.last}`}
                    phone={user.phone}
                    type={type}
                    key={`key-${user.phone}`}
                    direction={
                      type === "payments"
                        ? index % 3 && index % 2
                          ? "in"
                          : "out"
                        : null
                    }
                  />
                );
              })}
            </div>
          </SimpleBar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default PaymentTab;
