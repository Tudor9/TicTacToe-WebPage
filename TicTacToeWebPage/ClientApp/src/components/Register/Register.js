import { colors, fonts } from "../../common/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, TextField } from "@material-ui/core";
import { useValidations } from "../../common/Validations";
import { useState } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import React from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router";

//Aici avem styles-urile pentru containere si obiecte
const useStyle = makeStyles({
  registerRoot: {
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
  ColorErrorRoot: {
    color: colors.red,
    lineHeight: 2,
    fontStyle: "italic",
  },
  ColorValidRoot: {
    color: colors.green,
    lineHeight: 2,
    fontStyle: "italic",
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

function Register() {
  //Vom folosi hooks in loc de clase.
  //Acesta este input-ul de la parola
  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: "",
  });

  const [username, setUsername] = useState({
    Username: "",
  });

  const [email, setEmail] = useState({
    Email: "",
  })

  const [redirect, setRedirect] = useState(false)

  const [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    specialChar,
    repeatChar,
    match,
    validEmail,
  ] = useValidations({
    Email: email.Email,
    firstPassword: password.firstPassword,
    secondPassword: password.secondPassword, //Aici am plasat parola mai departe la hook
  });

  const setFirstPass = (event) => {
    setPassword({ ...password, firstPassword: event.target.value.toString() });
  };
  const setSecondPass = (event) => {
    setPassword({ ...password, secondPassword: event.target.value.toString() });
  };

  const setUsern = (event) => {
    setUsername({username, Username: event.target.value.toString()})
  }
  const setEma = (event) => {
    setEmail({email, Email: event.target.value.toString()})
  }


  function changeColor(object) {
    //Aceasta este o functie de a schimba culorile textului de la conditii
    let color;
    if (object === true) {
      color = classes.ColorValidRoot;
    } else {
      color = classes.ColorErrorRoot;
    }
    return color;
  }

  function checkValidations() {
    /*Aici se verifica toate conditiile la un loc si se returneaza true sau flase.
      Functia a fost creata pentru ca sa mentionam cand parola este weak sau strong
    */
    return !!(validLength &&
        hasNumber &&
        upperCase &&
        lowerCase &&
        specialChar &&
        !repeatChar &&
        match &&
        validEmail);
  }

  const classes = useStyle();

  const submit = async (e) => {
    const data = {
      username: username.Username,
      email: email.Email,
      password: password.firstPassword,
    };
    e.preventDefault();
    if (checkValidations() && validEmail) {
      await fetch("https://localhost:5001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setRedirect(true);
    } else {
      console.log("error");
    }
    
  }
  if (redirect) {
    return <Redirect to="/Login"/>;
  }

  

  return (
    <Container>
      <Grid
        className={classes.registerRoot}
        item
        xs={12}
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid className={classes.TitleTextRoot}>Register</Grid>

        <Grid className={classes.TextFieldRoot}>
          <span>
            <TextField
              required
              id="outlined-required"
              label="Username"
              variant="outlined"
              onChange={setUsern}
              inputProps={{ style: { color: colors.white } }} //Am setat ca scrisul din label sa fie alb
            />
          </span>
        </Grid>

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
              password
              id="outlined-required"
              label="Password"
              variant="outlined"
              onChange={setFirstPass} //se apeleaza metoda unde avem event.
              type="password"
              inputProps={{ style: { color: colors.white } }}
            />
          </span>
        </Grid>

        <Grid className={classes.TextFieldRoot}>
          <span>
            <TextField
              required
              password
              id="outlined-required"
              label="Password"
              variant="outlined"
              onChange={setSecondPass} //se apeleaza metoda unde avem event.
              type="password"
              inputProps={{ style: { color: colors.white } }}
            />
          </span>
        </Grid>
        
        <Grid
          container
          justify="space-evenly" /*container pentru conditiile afisate ca text*/
        >
          <ul>
            <Grid
              className={changeColor(validLength)}
              container
              alignItems="center"
            >
              Password's length should be between 6 and 20 characters.
              {validLength ? <CheckCircleIcon /> : <ErrorIcon />}
            </Grid>
            <Grid
              className={changeColor(hasNumber)}
              container
              alignItems="center"
            >
              Password should contain at least one number.
              {hasNumber ? <CheckCircleIcon /> : <ErrorIcon />}
            </Grid>
            <Grid
              className={changeColor(upperCase)}
              container
              alignItems="center"
            >
              Password should contain at least one upper case letter.
              {upperCase ? <CheckCircleIcon /> : <ErrorIcon />}
            </Grid>
            <Grid
              className={changeColor(lowerCase)}
              container
              alignItems="center"
            >
              Password should contain at least one lower case letter.
              {lowerCase ? <CheckCircleIcon /> : <ErrorIcon />}
            </Grid>
            <Grid
              className={changeColor(specialChar)}
              container
              alignItems="center"
            >
              Password should contain at least one special character.
              {specialChar ? <CheckCircleIcon /> : <ErrorIcon />}
            </Grid>
            <Grid
              className={changeColor(!repeatChar)}
              container
              alignItems="center"
            >
              Password should not contain three repeating characters.
              {!repeatChar ? <CheckCircleIcon /> : <ErrorIcon />}
            </Grid>
            <Grid className={changeColor(match)} container alignItems="center">
              Passwords match!
              {match ? <CheckCircleIcon /> : <ErrorIcon />}
            </Grid>
            <Grid
              className={changeColor(validEmail)}
              container
              alignItems="center"
            >
              Email is valid!
              {validEmail ? <CheckCircleIcon /> : <ErrorIcon />}
            </Grid>
          </ul>
        </Grid>
        <Button variant="contained"
          onClick={submit}
          className={classes.ButtonRoot}
        >
          Submit
        </Button>
      </Grid>
    </Container>
  );
}

export default Register;
