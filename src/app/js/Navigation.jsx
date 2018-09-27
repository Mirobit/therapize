import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Icon, Label, Menu } from "semantic-ui-react";

const Navigation = props => {
  console.log(props.counter);
  return (
    <div className="navigation">
      <div className="container nav-content">
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <img src="/logo3.png" style={{ marginRight: "10px" }} />{" "}
          <span
            style={{ color: "white", fontSize: "20px", fontWeight: "bold", letterSpacing: "3px" }}
          >
            THERAPIZE
          </span>
        </div>

        <div>
          {props.user ? (
            <Menu compact style={{ marginTop: "14px" }}>
              {props.user.role === "User" && (
                <Menu.Item>
                  <NavLink to="/match">
                    <Icon name="search" color="grey" /> Find Therapist
                  </NavLink>
                </Menu.Item>
              )}
              <Menu.Item>
                <NavLink to="/appointments">
                  <Icon name="calendar alternate outline" color="grey" /> Appointments
                </NavLink>
                {/* <Label color="red" floating>
                  2
                </Label> */}
              </Menu.Item>

              <Menu.Item>
                <NavLink to="/messages">
                  <Icon name="mail" color="grey" /> Messages
                </NavLink>
                {props.counter !== 0 ? (
                  <Label color="red" floating>
                    {props.counter}
                  </Label>
                ) : (
                  ""
                )}
              </Menu.Item>

              {props.user.role === "Therapist" && (
                <Menu.Item>
                  <NavLink to="/availability">
                    <Icon name="calendar check outline" color="grey" /> Calendar
                  </NavLink>
                </Menu.Item>
              )}
              <Menu.Item>
                <NavLink to="/profile">
                  <Icon name="user" color="grey" /> Profile
                </NavLink>
              </Menu.Item>

              <NavLink to="/auth/logout">
                <Menu.Item>
                  <Icon name="shutdown" color="grey" />
                </Menu.Item>
              </NavLink>
            </Menu>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
