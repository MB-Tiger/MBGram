import {useEffect} from "react"
import useTitle from "../hooks/useTitle";
import {
  Box,
  Container,
  Button,
  Typography,
  Paper,
  TextField,
  Checkbox,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import firebase from "firebase/compat/app";
import { auth } from "../firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  useTitle("Sign up");
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("MBGram-user")) navigate("/")
  }, [])

  const userData = {
    username: "",
    email: "",
    password: "",
    isRemember: false,
  };

  const userSignup = async (values: object, props: any) => {
    console.log(values);
    console.log(props);

    interface UserData {
      username?: string;
      email?: string;
      password?: string;
    }

    const { username, email, password }: UserData = values;

    props.resetForm();
    props.setSubmitting(true);

    const {data} = await axios.post("http://localhost:5000/api/auth/register", {
      username,
      email,
      password,
    });

    console.log(data)
    if (data.status === false) return alert(data.msg)

    if (data.status) {
      localStorage.setItem("MBGram-user", JSON.stringify(data.user))
      navigate("/")
    }
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email required"),
    password: Yup.string().min(4).required("Password required"),
    username: Yup.string().min(2).required("Username required"),
  });

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: "75px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "320px",
          minHeight: "320px",
          padding: "16px",
          borderRadius: "6px",
        }}
      >
        <Typography variant="h5" mb="15px" fontWeight="600">
          Sign up
        </Typography>
        <Formik
          initialValues={userData}
          validationSchema={loginValidationSchema}
          onSubmit={userSignup}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                required
                name="username"
                label="Username"
                variant="standard"
                placeholder="Enter username"
                sx={{ mb: "20px" }}
                helperText={
                  <ErrorMessage
                    name="username"
                    render={(msg) => (
                      <Typography
                        component="span"
                        fontWeight="400"
                        fontSize="0.75rem"
                        color="red"
                      >
                        {msg}
                      </Typography>
                    )}
                  />
                }
              />
              <Field
                as={TextField}
                fullWidth
                required
                type="email"
                name="email"
                label="Email"
                variant="standard"
                placeholder="Enter email"
                sx={{ mb: "20px" }}
                helperText={
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <Typography
                        component="span"
                        fontWeight="400"
                        fontSize="0.75rem"
                        color="red"
                      >
                        {msg}
                      </Typography>
                    )}
                  />
                }
              />
              <Field
                as={TextField}
                fullWidth
                required
                type="password"
                name="password"
                label="Password"
                variant="standard"
                placeholder="Enter password"
                sx={{ mb: "20px" }}
                helperText={
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <Typography
                        component="span"
                        fontWeight="400"
                        fontSize="0.75rem"
                        color="red"
                      >
                        {msg}
                      </Typography>
                    )}
                  />
                }
              />
              <Box display="flex" alignItems="center" mb="32px">
                <Field
                  as={Checkbox}
                  size="small"
                  sx={{ pl: "0" }}
                  name="isRemember"
                />
                <Typography fontSize="14px">Remember me</Typography>
              </Box>
              <Button
                size="small"
                variant="text"
                color="primary"
                startIcon={<GoogleIcon />}
                sx={{ mb: "10px" }}
                onClick={() =>
                  auth.signInWithRedirect(
                    new firebase.auth.GoogleAuthProvider()
                  )
                }
              >
                Sign up with google
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign up
              </Button>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt="12px"
              >
                <Typography component="span" fontSize="14px">
                  Already have an Account?
                </Typography>
                <Link to={"/login"}>
                  <Button
                    variant="text"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#4e0eff",
                        color: "white",
                        transitionDuration: "0.3s",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Signup;
