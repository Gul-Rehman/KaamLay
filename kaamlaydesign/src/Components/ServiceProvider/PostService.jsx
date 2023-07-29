import React, { useState } from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ColorConfigs from "../../Configs/ColorConfigs";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PostService() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [images, setImages] = useState([]);

  const showSuccess = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const servicetypesValues = [
    "Plumbing",
    "Car Wash",
    "Painter",
    "Electrician",
    "Sofa Cleaning",
    "Home Appliances",
    "AC Services",
    "Carpenter",
    "Others",
  ];

  const cities = [
    "Islamabad",
    "Ahmed Nager",
    "Ahmadpur East",
    "Ali Khan",
    "Alipur",
    "Arifwala",
    "Attock",
    "Bhera",
    "Bhalwal",
    "Bahawalnagar",
    "Bahawalpur",
    "Bhakkar",
    "Burewala",
    "Chillianwala",
    "Chakwal",
    "Chichawatni",
    "Chiniot",
    "Chishtian",
    "Daska",
    "Darya Khan",
    "Dera Ghazi",
    "Dhaular",
    "Dina",
    "Dinga",
    "Dipalpur",
    "Faisalabad",
    "Fateh Jhang",
    "Ghakhar Mandi",
    "Gojra",
    "Gujranwala",
    "Gujrat",
    "Gujar Khan",
    "Hafizabad",
    "Haroonabad",
    "Hasilpur",
    "Haveli",
    "Lakha",
    "Jalalpur",
    "Jattan",
    "Jampur",
    "Jaranwala",
    "Jhang",
    "Jhelum",
    "Kalabagh",
    "Karor Lal",
    "Kasur",
    "Kamalia",
    "Kamoke",
    "Khanewal",
    "Khanpur",
    "Kharian",
    "Khushab",
    "Kot Adu",
    "Jauharabad",
    "Lahore",
    "Lalamusa",
    "Layyah",
    "Liaquat Pur",
    "Lodhran",
    "Malakwal",
    "Mamoori",
    "Mailsi",
    "Mandi Bahauddin",
    "mian Channu",
    "Mianwali",
    "Multan",
    "Murree",
    "Muridke",
    "Mianwali Bangla",
    "Muzaffargarh",
    "Narowal",
    "Okara",
    "Renala Khurd",
    "Pakpattan",
    "Pattoki",
    "Pir Mahal",
    "Qaimpur",
    "Qila Didar",
    "Rabwah",
    "Raiwind",
    "Rajanpur",
    "Rahim Yar",
    "Rawalpindi",
    "Sadiqabad",
    "Safdarabad",
    "Sahiwal",
    "Sangla Hill",
    "Sarai Alamgir",
    "Sargodha",
    "Shakargarh",
    "Sheikhupura",
    "Sialkot",
    "Sohawa",
    "Soianwala",
    "Siranwali",
    "Talagang",
    "Taxila",
    "Toba Tek",
    "Vehari",
    "Wah Cantonment",
    "Wazirabad",
    "Badin",
    "Bhirkan",
    "Rajo Khanani",
    "Chak",
    "Dadu",
    "Digri",
    "Diplo",
    "Dokri",
    "Ghotki",
    "Haala",
    "Hyderabad",
    "Islamkot",
    "Jacobabad",
    "Jamshoro",
    "Jungshahi",
    "Kandhkot",
    "Kandiaro",
    "Karachi",
    "Kashmore",
    "Keti Bandar",
    "Khairpur",
    "Kotri",
    "Larkana",
    "Matiari",
    "Mehar",
    "Mirpur Khas",
    "Mithani",
    "Mithi",
    "Mehrabpur",
    "Moro",
    "Nagarparkar",
    "Naudero",
    "Naushahro Feroze",
    "Naushara",
    "Nawabshah",
    "Nazimabad",
    "Qambar",
    "Qasimabad",
    "Ranipur",
    "Ratodero",
    "Rohri",
    "Sakrand",
    "Sanghar",
    "Shahbandar",
    "Shahdadkot",
    "Shahdadpur",
    "Shahpur Chakar",
    "Shikarpaur",
    "Sukkur",
    "Tangwani",
    "Tando Adam",
    "Tando Allahyar",
    "Tando Muhammad",
    "Thatta",
    "Umerkot",
    "Warah",
    "Abbottabad",
    "Adezai",
    "Alpuri",
    "Akora Khattak",
    "Ayubia",
    "Banda Daud",
    "Bannu",
    "Batkhela",
    "Battagram",
    "Birote",
    "Chakdara",
    "Charsadda",
    "Chitral",
    "Daggar",
    "Dargai",
    "Darya Khan",
    "dera Ismail",
    "Doaba",
    "Dir",
    "Drosh",
    "Hangu",
    "Haripur",
    "Karak",
    "Kohat",
    "Kulachi",
    "Lakki Marwat",
    "Latamber",
    "Madyan",
    "Mansehra",
    "Mardan",
    "Mastuj",
    "Mingora",
    "Nowshera",
    "Paharpur",
    "Pabbi",
    "Peshawar",
    "Saidu Sharif",
    "Shorkot",
    "Shewa Adda",
    "Swabi",
    "Swat",
    "Tangi",
    "Tank",
    "Thall",
    "Timergara",
    "Tordher",
    "Awaran",
    "Barkhan",
    "Chagai",
    "Dera Bugti",
    "Gwadar",
    "Harnai",
    "Jafarabad",
    "Jhal Magsi",
    "Kacchi",
    "Kalat",
    "Kech",
    "Kharan",
    "Khuzdar",
    "Killa Abdullah",
    "Killa Saifullah",
    "Kohlu",
    "Lasbela",
    "Lehri",
    "Loralai",
    "Mastung",
    "Musakhel",
    "Nasirabad",
    "Nushki",
    "Panjgur",
    "Pishin valley",
    "Quetta",
    "Sherani",
    "Sibi",
    "Sohbatpur",
    "Washuk",
    "Zhob",
    "Ziarat",
  ];

  const [serviceType, setServiceType] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [contactnumber, setContactNumber] = useState("");

  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    console.log("files length" + images.length);

    e.preventDefault();

    const newErrors = {};

    if (!serviceTitle) {
      newErrors.serviceTitle = "Service Title is required";
    }

    if (!serviceDescription) {
      newErrors.serviceDescription = "Service Description is required";
    }

    if (!contactnumber) {
      newErrors.contactnumber = "Contact Number is required";
    } else if (
      !/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/.test(contactnumber)
    ) {
      newErrors.contactnumber = "Invalid Contact Number";
    }

    if (!serviceType) {
      newErrors.serviceType = "Service Type is required";
    }

    if (!servicePrice) {
      newErrors.servicePrice = "Service Charges are required";
    } else if (!/^\d+$/.test(servicePrice)) {
      newErrors.servicePrice = "Invalid Service Charges";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
      }
      formData.append("servicetitle", serviceTitle);
      formData.append("servicecategory", serviceType);
      formData.append("servicedescription", serviceDescription);
      formData.append("contactnumber", contactnumber);
      formData.append("price", servicePrice);

      axios
        .post("http://localhost:5000/api/service", formData, {
          headers: {
            authtoken: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          showSuccess();

          setTimeout(() => {
            navigate("/serviceproviderdashboard");
          }, 2000);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };
  const [previewSources, setPreviewSources] = useState([]);
  const previewFiles = (files) => {
    const fileArray = Array.from(files);
    Promise.all(
      fileArray.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
        });
      })
    )
      .then((results) => {
        setPreviewSources(results);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          mb: 10,
          backgroundImage: "",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Post Service
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="servicetitle"
              label=" Service Title"
              error={!!errors.serviceTitle}
              helperText={errors.serviceTitle}
              name="servicetitle"
              autoComplete="servicetitle"
              autoFocus
              InputProps={{
                inputProps: {
                  maxLength: 45,
                },

                endAdornment: (
                  <span>
                    {serviceTitle.length}/{45}
                  </span>
                ),
              }}
              value={serviceTitle}
              onChange={(event) => {
                setServiceTitle(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              multiline
              rows={4}
              fullWidth
              error={!!errors.serviceDescription}
              helperText={errors.serviceDescription}
              label=" Service Description"
              id="servicedescription"
              name="servicedescription"
              autoComplete="servicedescription"
              InputProps={{
                inputProps: {
                  maxLength: 170,
                },

                endAdornment: (
                  <span>
                    {serviceDescription.length}/{170}
                  </span>
                ),
              }}
              value={serviceDescription}
              onChange={(event) => {
                setServiceDescription(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              error={!!errors.contactnumber}
              helperText={errors.contactnumber}
              id="contactnumber"
              label=" Contact Number"
              name="contactnumber"
              autoComplete="contactnumber"
              value={contactnumber}
              onChange={(event) => {
                setContactNumber(event.target.value);
              }}
            />
            <Box sx={{}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Service Type
                </InputLabel>
                <Select
                  id="servicetype"
                  error={!!errors.serviceType}
                  helperText={errors.serviceType}
                  value={serviceType}
                  label="Service Type"
                  onChange={(event) => {
                    setServiceType(event.target.value);
                  }}
                >
                  {servicetypesValues.map((item) => {
                    return (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <TextField
              margin="normal"
              fullWidth
              error={!!errors.servicePrice}
              helperText={errors.servicePrice}
              id="serviceprice"
              label=" Price"
              name="serviceprice"
              autoComplete="serviceprice"
              value={servicePrice}
              onChange={(event) => {
                setServicePrice(event.target.value);
              }}
            />

            <input
              type="file"
              onChange={(e) => {
                setImages(e.target.files);
                previewFiles(e.target.files);
              }}
              multiple
            />
            {previewSources.length > 0 && (
              <div>
                {previewSources.map((previewSource, index) => (
                  <Box
                    sx={{
                      display: "inline-block",
                      border: "1px solid black",
                      ml: 1,
                    }}
                  >
                    <img
                      key={index}
                      src={previewSource}
                      alt={`Preview ${index + 1}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </Box>
                ))}
              </div>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: `${ColorConfigs.primary}` }}
              type="submit"
            >
              Post Service
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", fontSize: "16pt" }}
        >
          Service Posted Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
