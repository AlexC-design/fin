import React, { useState, useEffect } from "react";
import SimpleBar from "simplebar-react";
import axios from "axios";
import "./css/payment-tab.css";
import FriendCard from "./FriendCard";

const PaymentTab = ({ type }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get(
      "https://randomuser.me/api/?nat=de,au,ca,fr,gb,ie,us&results=20"
    );

    setUsers(response.data.results);

    console.log(response.data.results);
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (users) {
    return (
      <div className="payments-simplebar">
        <SimpleBar style={{ height: `100%`, autoHide: true }}>
          <div className="payment-tab">
            {users.map(user => {
              console.log("test");
              return (
                <FriendCard
                  photo={user.picture.medium}
                  name={`${user.name.first} ${user.name.last}`}
                  phone={user.phone}
                  type={type}
                  direction={
                    type === "recent"
                      ? Math.floor(Math.random() * 2 + 1) === 1
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
    );
  } else {
    return <></>;
  }
};

export default PaymentTab;
