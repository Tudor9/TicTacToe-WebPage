import { useState, useEffect } from "react";
//Acesta este hook-ul. Aici se declara variabilele care verifica ulterior conditiile
export const useValidations = ({firstPassword = "", secondPassword = "", requiredLengthMin = 6,requiredLengthMax = 20, Email = ""}) => {
const [validLength, setValidLength] = useState(false);
const [hasNumber, setHasNumber] = useState(false);
const [upperCase, setUpperCase] = useState(false);
const [lowerCase, setLowerCase] = useState(false);
const [specialChar, setSpecialChar] = useState(false);
const [repeatChar, setRepeatChar] = useState(true);
const [match, setMatch] = useState(false);
const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
  //Aici se verifica conditiile.
    setValidLength(firstPassword.length >= requiredLengthMin && firstPassword.length <= requiredLengthMax ? true : false);
    setUpperCase(new RegExp("^(?=.*[A-Z])").test(firstPassword));
    setLowerCase(new RegExp("^(?=.*[a-z])").test(firstPassword));
    setHasNumber(new RegExp("^(?=.*[0-9])").test(firstPassword));
    setSpecialChar(new RegExp("^(?=.*[!@#$%^&*_,.])").test(firstPassword)); //Am introdus toate caracterele posibile de la tastatura obisnuita
    setRepeatChar(new RegExp(/(.)\1\1/).test(firstPassword)) //Aici se verifica daca exista 3 caractere identice una dupa alta
    setMatch(firstPassword && firstPassword === secondPassword);
    setValidEmail(new RegExp(/\S+@\S+\.\S+/).test(Email))

    }, [firstPassword, secondPassword, requiredLengthMin,requiredLengthMax, Email]);

return [validLength, hasNumber, upperCase, lowerCase, specialChar, repeatChar, match, validEmail];
}