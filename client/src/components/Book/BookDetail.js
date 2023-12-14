import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import axios from "axios";

const BookDetail = () => {
  const [inputs, setInputs] = useState();
  const [checked, setChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/books/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.book));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/books/${id}`, {
        name: String(inputs.name),
        author: String(inputs.author),
        description: String(inputs.description),
        price: Number(inputs.price),
        image: String(inputs.image),
        available: Boolean(checked),
      });

      if (response.data && response.data.updatedFields) {
        const updatedFields = Object.keys(response.data.updatedFields);
        const successMessage = `Book details updated successfully: ${updatedFields.join(', ')}`;
        setSuccessMessage(successMessage);
      }

      return response.data;
    } catch (error) {
      console.error('Error updating book details:', error.response?.data?.error || error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => {
      setSuccessMessage("All book details updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        history("/books");
      }, 3000); // Display success message for 3 seconds and then redirect
    });
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            maxWidth={700}
            alignContent={"center"}
            alignSelf="center"
            marginLeft={"auto"}
            marginRight="auto"
            marginTop={10}
          >
            {successMessage && (
              <p style={{ color: "green", marginBottom: "10px" }}>
                {successMessage}
              </p>
            )}
            <FormLabel>Name</FormLabel>
            <TextField
              value={inputs.name}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="name"
            />
            <FormLabel>Author</FormLabel>
            <TextField
              value={inputs.author}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="author"
            />
            <FormLabel>Description</FormLabel>
            <TextField
              value={inputs.description}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="description"
            />
            <FormLabel>Price</FormLabel>
            <TextField
              value={inputs.price}
              onChange={handleChange}
              type="number"
              margin="normal"
              fullWidth
              variant="outlined"
              name="price"
            />
            <FormLabel>Image</FormLabel>
            <TextField
              value={inputs.image}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="image"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              label="Available"
            />

            <Button variant="contained" type="submit">
              Update Book
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BookDetail;
