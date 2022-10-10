import { useEffect } from "react";
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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  useTitle("Login");
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("MBGram-user")) navigate("/")
  }, [])

  const userData = {
    username: "",
    password: "",
    isRemember: false,
  };

  const userLogin = async (values: object, props: any) => {
    console.log(values);
    console.log(props);

    interface UserData {
      username?: string;
      password?: string;
    }

    const { username, password }: UserData = values;

    props.resetForm();
    props.setSubmitting(true);

    const {data} = await axios.post("http://localhost:5000/api/auth/login", {
      username,
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
    username: Yup.string().min(2).required("Username required"),
    password: Yup.string().min(4).required("Password required"),
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
          Login
        </Typography>
        <Formik
          initialValues={userData}
          validationSchema={loginValidationSchema}
          onSubmit={userLogin}
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
                Sign in with google
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt="12px"
              >
                <Typography component="span" fontSize="14px">
                  Don't have an Account?
                </Typography>
                <Link to={"/signup"}>
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
                    Sign up
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

export default Login;
