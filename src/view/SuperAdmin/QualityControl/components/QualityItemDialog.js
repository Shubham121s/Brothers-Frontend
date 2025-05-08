import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FormItem } from "../../../../components/ui";
import { Field } from "formik";

const QualityItemDialog = ({ isOpen, onClose, onSubmit, data = [] }) => {
  const [selectedPONumber, setSelectedPONumber] = useState("");
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");
  const [serialOptions, setSerialOptions] = useState([]);

  const handlePONumberChange = (event, form) => {
    const value = event.target.value;
    setSelectedPONumber(value);
    setSelectedSerialNumber("");

    const matchingSerials = data
      .filter((d) => d.number === value)
      .map((d) => d.serial_number);

    setSerialOptions(matchingSerials);
  };

  const handleSerialChange = (event, form) => {
    const value = event.target.value;
    setSelectedSerialNumber(value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (selectedPONumber && selectedSerialNumber) {
        const selectedItem = data.find(
          (d) =>
            d.number === selectedPONumber &&
            d.serial_number === selectedSerialNumber
        );

        if (selectedItem) {
          const itemToAdd = {
            project_number: selectedItem.project_no,
            po_number: selectedItem.number,
            po_serial_number: selectedItem.serial_number,
            drawing_number: selectedItem.drawing_number,
            quantity: selectedItem.quantity,
          };

          console.log("Submitting item:", itemToAdd); // ✅ Add this log
          onSubmit(itemToAdd);

          setSelectedPONumber("");
          setSelectedSerialNumber("");
          setSerialOptions([]);

          onClose();
        }
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      alert("Something went wrong!");
    }
  };

  const uniquePONumbers = [...new Set(data.map((item) => item.number))];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          mt: "-100px",
          height: "350px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
        Add Item Information
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ mb: 4 }}>
          Section to configure item information
        </Typography>

        <Box display="flex" gap={2}>
          <Box flex={1}>
            <FormControl fullWidth>
              <InputLabel sx={{ fontSize: "0.9rem", color: "#666" }}>
                PO Number
              </InputLabel>
              <Select
                value={selectedPONumber}
                onChange={handlePONumberChange}
                label="PO Number"
                sx={{
                  fontSize: "1rem",
                  color: "#666",
                  height: 50,
                  "& .MuiSelect-select": {
                    padding: "10px 14px",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 150,
                    },
                  },
                }}
              >
                {uniquePONumbers.length > 0 ? (
                  uniquePONumbers.map((po) => (
                    <MenuItem
                      key={po}
                      value={po}
                      sx={{ fontSize: "0.9rem", color: "#666" }}
                    >
                      {po}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem
                    disabled
                    sx={{ fontSize: "0.85rem", color: "#999" }}
                  >
                    No options
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>

          <Box flex={1}>
            <FormControl fullWidth size="medium">
              <InputLabel sx={{ fontSize: "0.9rem", color: "#666" }}>
                PO Serial Number
              </InputLabel>
              <Select
                value={selectedSerialNumber}
                onChange={handleSerialChange}
                label="PO Serial Number"
                sx={{
                  fontSize: "1rem",
                  color: "#666",
                  height: 50,
                  "& .MuiSelect-select": {
                    padding: "10px 14px",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 150,
                    },
                  },
                }}
              >
                {serialOptions.length > 0 ? (
                  serialOptions.map((serial) => (
                    <MenuItem
                      key={serial}
                      value={serial}
                      sx={{ fontSize: "0.9rem", color: "#666" }}
                    >
                      {serial}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem
                    disabled
                    sx={{ fontSize: "0.85rem", color: "#999" }}
                  >
                    No options
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Discard
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: "#4A3AFF" }}
        >
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QualityItemDialog;
