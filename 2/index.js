const check_button_element = document.querySelector("#check_button");
const palindrome_input_element = document.querySelector("#palindrome");
const info_element = document.querySelector("#info");

check_button_element.addEventListener("click", () => {
  let inputText = palindrome_input_element.value;
  let message;

  if (!inputText) {
    message = `Please enter text.`;
  } else {
    let palindrome = checkIfPalindrome(inputText);

    if (palindrome) message = `"${inputText}" - is a palindrome`;
    else message = `"${inputText}" - is not a palindrome`;
  }

  refreshDisplayedMessage(message);
});

function refreshDisplayedMessage(message) {
  info_element.textContent = message;
}

function checkIfPalindrome(text = "") {
  let chars = text.toLowerCase().match(/[a-zšđžćč]/g).join("");
  let reverseChars = chars.split("").reverse().join("");

  return chars == reverseChars;
}