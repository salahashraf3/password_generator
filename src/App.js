import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function generateRandomPassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSpecialChars
) {
  console.log(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecialChars
  );
  let charset = "";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) charset += "0123456789";
  if (includeSpecialChars) charset += "!@#$%^&*()_+[]{}|;:,.<>?";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

function App() {
  const [password, setPassword] = useState("");
  const [length, setlength] = useState(6);
  const [options, setOptions] = useState({
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
  });
  const [error, setError] = useState("");

  const handleGeneratePassword = () => {
    const {
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecialChars,
    } = options;

    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSpecialChars
    ) {
      setError("Please Check atleast one");
      return;
    }

    const newPassword = generateRandomPassword(
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecialChars
    );
    toast.success("Password Generated");
    setPassword(newPassword);
  };

  return (
    <div className="App">
      <Toaster />
      <header className="App-header">
        <div className="img_text_container">
          <img src={logo} className="App-logo" alt="logo" />
          <p style={{ fontFamily: "cursive" }}>Password Generator</p>
        </div>

        <div>
          <div className="generator-container">
            <fieldset style={{ padding: "10px" }}>
              <legend>Type the length of the password</legend>
              <div className="form__group">
                <input
                  type="number"
                  className="inputField"
                  required
                  defaultValue={length}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setlength(e.target.value);
                  }}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend> Options </legend>
              <div className="form__group">
                <input
                  type="checkbox"
                  name="Include Uppercase"
                  checked={options.includeUppercase}
                  onChange={(e) => {
                    setOptions((prevOptions) => ({
                      ...prevOptions,
                      includeUppercase: !prevOptions.includeUppercase,
                    }));
                  }}
                />
                <label> Include Uppercase Letters</label>
              </div>
              <div className="form__group">
                <input
                  type="checkbox"
                  checked={options.includeLowercase}
                  onChange={(e) => {
                    setOptions((prevOptions) => ({
                      ...prevOptions,
                      includeLowercase: !prevOptions.includeLowercase,
                    }));
                  }}
                />
                <label> Include Lowercase Letters</label>
              </div>
              <div className="form__group">
                <input
                  type="checkbox"
                  checked={options.includeNumbers}
                  onChange={(e) => {
                    setOptions((prevOptions) => ({
                      ...prevOptions,
                      includeNumbers: !prevOptions.includeNumbers,
                    }));
                  }}
                />
                <label> Include Numbers</label>
              </div>
              <div className="form__group">
                <input
                  type="checkbox"
                  checked={options.includeSpecialChars}
                  onChange={(e) => {
                    setOptions((prevOptions) => ({
                      ...prevOptions,
                      includeSpecialChars: !prevOptions.includeSpecialChars,
                    }));
                  }}
                />
                <label> Include Special Characters</label>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </fieldset>
            <button
              style={{
                textAlign: "center",
                marginTop: "10px",
                padding: "4px 20px",
                backgroundColor: "#0394fc",
                outline: "none",
                border: "0.5px solid black",
                cursor: "pointer",
              }}
              onClick={handleGeneratePassword}
            >
              Generate
            </button>

            {password && (
              <fieldset>
                <legend>Your Generated Password</legend>
                <div className="form__group display_box">
                  <input
                    type="text"
                    readOnly
                    className="inputField"
                    value={password}
                  />
                  <button
                    style={{
                      marginTop: "6px",
                      padding: "4px 20px",
                      backgroundColor: "#0394fc",
                      outline: "none",
                      border: "0.5px solid black",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigator.clipboard
                        .writeText(password)
                        .then(() => toast.success("Copied"))
                        .catch((err) => console.log(err));
                    }}
                  >
                    Copy
                  </button>
                </div>
              </fieldset>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
