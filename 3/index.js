const list_input_element = document.querySelector("#list");
const number_input_element = document.querySelector("#number");
const info_element = document.querySelector("#info");
const search_button_element = document.querySelector("#search_button");

search_button_element.addEventListener("click", () => {
  let list = list_input_element.value.match(/\d+/g);
  let number = number_input_element.value.match(/\d+/g);
  let lowestCombinationCount;
  let message = "";

  if (list === null) {
    message += " please enter a list of numbers";
  } else if (number === null || number.length > 1) {
    message += " please enter a valid searched for number";
  } else {
    list = list.sort( (a, b) => a-b).map(Number);
    lowestCombinationCount = findLowestCombinationCount(list, parseInt(number[0]));

    if(lowestCombinationCount > 0){
      message = `Lowest combination count is ${lowestCombinationCount}!`
    }else if(lowestCombinationCount<0){
      message = "No possible combinations found. Returned -1"
    }else{
      message = lowestCombinationCount;
    }
  }

  updateMessage(message);
});

function updateMessage(message) {
  info_element.textContent = message;
}

//as params takes sorted array and a look for number
function findLowestCombinationCount(array = [], numLookingFor = 0) {
  let combinations = 0;

  //finds lowest combination count, goes from 1 combination count upwords until a valid combination is found for that amount of combined numbers
  while (true) {
    try {
      if (combinations === 0) {
        //test if a valid combination exists in a given array
        if (!__findLowestCombinationCount(array.slice(), numLookingFor)) return -1;
      } else {
        let combinationFound = __findLowestCombinationCount(array.slice(), numLookingFor, combinations);
        
        if (combinationFound) return combinations;
      }

      combinations++;
    } catch {
      //stack overflow
      return "please choose a lower number";
    }
  }

  function __findLowestCombinationCount(
    array = [],
    number = 0,
    maxCombinations = 0,
    currentCombinations = 0
  ) {
    if (number == 0) return true;

    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] <= number) {

        //exception so we can test if combining is even possible
        if (maxCombinations != 0) {
          if (currentCombinations + 1 > maxCombinations) return false;
          //quick check if solution is possible
          if (number - array[i] * (maxCombinations - currentCombinations) > 0) break;
        }

        let resCombinations = __findLowestCombinationCount(
          array.slice(0, i + 1),
          number - array[i],
          maxCombinations,
          currentCombinations + 1
        );

        if (resCombinations === true) return true;
      }
    }

    return false;
  }
}