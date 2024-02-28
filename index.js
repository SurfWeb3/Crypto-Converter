// Get references to the elements
const fromAmount = document.querySelector(".amount-from")
const fromCurrency = document.querySelector(".currency-from")
const toCurrency = document.querySelector(".currency-to")
const toAmount = document.querySelector(".amount-to")
const resetButton = document.querySelector(".btn-reset")
const convertButton = document.querySelector(".btn-convert")

// Reset
resetButton.addEventListener("click", function () {
    fromAmount.value = "" // Clear user input
    toAmount.value = ""  // Clear converted value
    fromCurrency.value = "usd"  // Reset "from currency" to USD
    toCurrency.value = "bitcoin"  // Reset "to currency" to BTC
})

// Convert functionality
convertButton.addEventListener("click", async function () {
   const fromValue = parseFloat(fromAmount.value)

   if (isNaN(fromValue)) {
    alert("Please enter a valid amount")
    return
   }

  // Convert here
   let convertedValue = await convertCurrency(
    fromValue,
    fromCurrency.value,
    toCurrency.value)

 // Adjust precision
    if(convertedValue < 0.01) {
        toAmount.value = convertedValue.toFixed(8)
    } else {
        toAmount.value = convertedValue.toFixed(4)
    }
 })

  async function convertCurrency(fromValue, fromCurrency, toCurrency) {
// Don't convert if it's the same currency
    if(fromCurrency === toCurrency) { 
        return 1
    }
 
// Fetch rates here
   const fromRate = await fetchRate(fromCurrency)
   const toRate = await fetchRate(toCurrency)
// Calculate & return the converted value
   return (fromValue * fromRate) / toRate
}

// Fetch the rate from the coingecko API 
  async function fetchRate(currency) {

// API url
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`

// Call the API
    const response = await fetch(url)

// Get the data from the response
    const data = await response.json()

// Get the rate from the nested JSON data (and return it)
    return data[currency]["usd"]


  }
