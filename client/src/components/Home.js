import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import './home.css'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            LinkComponent={Link}
            to="/books"
            className="product-button"
            variant="contained"
          >
            <Typography variant="h3">View All Books</Typography>
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Home;
