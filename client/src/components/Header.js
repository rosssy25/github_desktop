import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...");

    // Redirect to the landing page after logout
    navigate("/");
  };

  return (
    <div>
      <AppBar sx={{ backgroundColor: "#232F3D" }} position="sticky">
        <Toolbar>
          <NavLink to="/" style={{ color: "white" }}>
            <Typography>
              <LibraryBooksOutlinedIcon />
            </Typography>
          </NavLink>
          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to="/add" label="Add Book" />
            <Tab LinkComponent={NavLink} to="/books" label="Books" />
            <Tab LinkComponent={NavLink} to="/about" label="About Us" />
            <Tab LinkComponent={NavLink} to="/" label="Logout" onClick={handleLogout} />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
