import React, { useState } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { colors, fonts } from "../../common/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";


const useStyle = makeStyles({
  rootPage: {
    height: "100vh",
  },
  TextFieldRoot: {
    "& .MuiTextField-root": {
      width: "50vh",
      backgroundColor: colors.blackGrey,
      color: colors.white,
      borderRadius: "6px",
      outline: "none",
    },
    "& label.Mui-focused": {
      color: colors.white,
    },
    "& .MuiInputLabel-outlined": {
      color: colors.white,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FBB917"
    }
  },

  TitleTextRoot: {
    textAlign: "center",
    fontSize: fonts.fontSizeTtile,
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.26,
    letterSpacing: "normal",
    color: colors.white,
  },

  ButtonRoot: {
    fontSize: 16,
    border: "3px solid",
    lineHeight: 1.5,
    width: "50vh",
    backgroundColor: "#FBB917",
    borderColor: "#FFFFFF",
    '&:hover': {
      backgroundColor: '#FFFFFF',
      borderColor: '#FBB917',
      boxShadow: 'none',
    }
  },
});

function Login() {
  const [email, setEmail] = useState({
    Email: "",
  });

  const [password, setPassword] = useState({
    Password: "",
  });
  const [redirect, setRedirect] = useState(false)

  const setEma = (event) => {
    setEmail({ email, Email: event.target.value.toString() });
  };

  const setPass = (event) => {
    setPassword({ password, Password: event.target.value.toString() });
  };

  const history = useHistory();
  const classes = useStyle();

  const redirectToRegister = () =>{ 
    let path = `/Register`; 
    history.push(path);
  }

  const submit = async (e) => {
    const data = {
      email: email.Email,
      password: password.Password,
    };
    e.preventDefault();

    await fetch("https://localhost:5001/api/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    setRedirect(true);
  };
  
  if (redirect) {
    return <Redirect to="/" />;
  }
  
  return (
    <Container>
      <Grid
        container
        item
        xs={12}
        className={classes.rootPage}
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid className={classes.TitleTextRoot}>Login</Grid>

        <Grid
          container
          item
          xs={5}
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid className={classes.TextFieldRoot}>
            <span>
              <TextField
                required
                id="outlined-required"
                label="Email"
                variant="outlined"
                onChange={setEma}
                inputProps={{ style: { color: colors.white } }} //Am setat ca scrisul din label sa fie alb
              />
            </span>
          </Grid>
          <Grid className={classes.TextFieldRoot}>
            <span>
              <TextField
                required
                id="outlined-required"
                label="Password"
                variant="outlined"
                onChange={setPass}
                type="password"
                inputProps={{ style: { color: colors.white } }} //Am setat ca scrisul din label sa fie alb
              />
            </span>
          </Grid>
          <Button
            className={classes.ButtonRoot}
            variant="contained"
            onClick={submit}
          >
            Login
          </Button>
          <Button
            className={classes.ButtonRoot}
            variant="contained"
            onClick={redirectToRegister}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
