{
    // Date
    var today = new Date();
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  // Display the date in an HTML element with the id "demo"
  document.getElementById('demo').innerHTML = date;
}

const darkbtn = document.getElementsByClassName('dark')[0];
darkbtn.addEventListener('click',darkfn);
function darkfn(){
    console.log("clicked dark btn");
    document.body.classList.add('bg-dark')
}
const lightbtn = document.getElementsByClassName('light')[0];
lightbtn.addEventListener('click',lightfn); /** dont put darkfn() */
function lightfn(){
    console.log("clicked light btn");
    document.body.classList.remove('bg-dark')
}
// advertisement images back to back
let advertisement = document.getElementsByClassName("advertisement")[0]
let images = [
    "./Images/advertisement.jpg",
    "./Images/pexels-craig-adderley-1563355.jpg",
    "./Images/pexels-tima-miroshnichenko-6169668.jpg",
    "./Images/background.jpg"

];
setInterval(
    function (){
        let random = Math.floor(Math.random() * 3 );
        let src =images[random]
        // console.log(src);
        // console.log(advertisement);
        advertisement.style.backgroundImage = "url(" + src + ")";
    },
2000)

// Form du yalla codes till payment gate way
var selectedBusType;

        function searchBuses() {
            var from = document.getElementById('from').value.toLowerCase();
            var to = document.getElementById('to').value.toLowerCase();
            var dateInput = document.getElementById('date');
            var date = dateInput.value;

            // Validate date
            var currentDate = new Date();
            var selectedDate = new Date(date);
            if (selectedDate < currentDate) {
                document.getElementById('error').innerText = 'Select the right date of journey.';
                dateInput.focus();
                return;
            }

            var availableRoutes = {
                "banglore": {"gulbarga": 750},
                "gulbarga": {"banglore": 800},
                "gulbarga": {"hubli":    350}
            };

            if (availableRoutes[from] && availableRoutes[from][to]) {
                document.getElementById('result').innerHTML = "Available buses for " + from + " to " + to + " on " + date;
                document.getElementById('error').innerText = ''; // Clear error message
                document.getElementById('busOptions').style.display = 'block';
                showBusOptions();
            } else {
                document.getElementById('result').innerHTML = "We regrate to inform you that no bus route found for " + from + " to " + to + " on " + date +"Contact Mallikarjun for privates vehicles";
                document.getElementById('busOptions').style.display = 'none';
            }
        }

        function showBusOptions() {
            document.getElementById('busOptions').innerHTML = `
                <div class="bus-option" onclick="selectBus('Rajahamsa')">Rajahamsa</div>
                <div class="bus-option" onclick="selectBus('KSRTC')">KSRTC</div>
                <div class="bus-option" onclick="selectBus('VRL')">VRL</div>
            `;
        }

        function selectBus(busName) {
            selectedBusType = busName;
            document.getElementById('busOptions').style.display = 'none';
            document.getElementById('bookingForm').style.display = 'block';
            document.getElementById('busTypeSelection').style.display = 'none';
            generateMathQuestion();
            generatePassengerDetails();
            updateTotalCost(getTicketCost(selectedBusType));
        }

        function selectBusType() {
            var busTypeSelect = document.getElementById('busType');
            selectedBusType = busTypeSelect.value;
            document.getElementById('busTypeSelection').style.display = 'none';
            document.getElementById('bookingForm').style.display = 'block';
            generateMathQuestion();
            generatePassengerDetails();
            updateTotalCost(getTicketCost(selectedBusType));
        }

        function generateMathQuestion() {
            var firstNumber = Math.floor(Math.random() * 10) + 1;
            var secondNumber = Math.floor(Math.random() * 10) + 1;
            var operators = ['+', '-'];
            var operator = operators[Math.floor(Math.random() * operators.length)];

            document.getElementById('question').innerText = firstNumber + ' ' + operator + ' ' + secondNumber;
            document.getElementById('answer').setAttribute('data-answer', eval(firstNumber + operator + secondNumber));
        }

        function generatePassengerDetails() {
            var passengersCount = document.getElementById('passengers').value;
            var passengerDetailsDiv = document.getElementById('passengerDetails');
            passengerDetailsDiv.innerHTML = ''; // Clear existing details

            for (var i = 1; i <= passengersCount; i++) {
                var passengerDiv = document.createElement('div');
                passengerDiv.className = 'passenger';
                passengerDiv.innerHTML = `
                    <label for="passengerName${i}">Passenger ${i} Name:</label>
                    <input type="text" id="passengerName${i}" required>

                    <label for="passengerPhone${i}">Passenger ${i} Phone Number:</label>
                    <input type="tel" id="passengerPhone${i}" required>
                `;
                passengerDetailsDiv.appendChild(passengerDiv);
            }
        }

        function getTicketCost(busType) {
            // Replace with actual ticket cost retrieval logic based on the bus type
            if (busType === 'Rajahamsa') {
                return 750;
            } else if (busType === 'KSRTC') {
                return 800;
            } else if (busType === 'VRL') {
                return 850;
            }
        }

        function updateTotalCost(ticketCost) {
            var totalCost = document.getElementById('passengers').value * ticketCost;
            document.getElementById('cost').innerText = totalCost;
            document.getElementById('totalCost').style.display = 'block';
        }

        function resetForm() {
            document.getElementById('from').value = '';
            document.getElementById('to').value = '';
            document.getElementById('date').value = '';
            document.getElementById('passengers').value = '1';
            document.getElementById('result').innerHTML = '';
            document.getElementById('error').innerText = '';
            document.getElementById('busOptions').style.display = 'none';
            document.getElementById('bookingForm').style.display = 'none';
            document.getElementById('paymentForm').style.display = 'none';
            document.getElementById('ticketDisplay').style.display = 'none';
            document.getElementById('busTypeSelection').style.display = 'block';
        }

        function submitBookingForm(event) {
            event.preventDefault();
            var userAnswer = document.getElementById('answer').value;
            var correctAnswer = document.getElementById('answer').getAttribute('data-answer');

            if (userAnswer == correctAnswer) {
                // You can add logic here to process the booking, store data, etc.
                var pnr = generatePNR();
                displayPNR(pnr);

                document.getElementById('bookingForm').style.display = 'none';
                document.getElementById('paymentForm').style.display = 'block';
            } else {
                alert('Incorrect answer. Please try again.');
                generateMathQuestion();
            }
        }

        function generatePNR() {
            // Generate a random PNR number
            return Math.floor(Math.random() * 900000) + 100000;
        }

        function displayPNR(pnr) {
            document.getElementById('pnr').innerText = 'PNR Number: ' + pnr;
        }

        function submitPaymentForm(event) {
            event.preventDefault();

            // Simulate a successful payment
            displayTicketAndMessage();

            // You can redirect to a confirmation page or perform other actions here.
        }

        function displayTicketAndMessage() {
            var passengersCount = document.getElementById('passengers').value;
            var ticketCost = document.getElementById('cost').innerText;

            var confirmationMessage = "Thank you for booking in Mallikarjun transportation. Happy Journey!";
            document.getElementById('confirmationMessage').innerText = confirmationMessage;

            var ticketDetailsDiv = document.getElementById('ticketDetails');
            ticketDetailsDiv.innerHTML = '<h3>Ticket Details</h3>';

            for (var i = 1; i <= passengersCount; i++) {
                var passengerName = document.getElementById('passengerName' + i).value;
                var passengerPhone = document.getElementById('passengerPhone' + i).value;

                ticketDetailsDiv.innerHTML += `
                    <div class="passenger">
                        <p><strong>Passenger ${i}:</strong></p>
                        <p>Name: ${passengerName}</p>
                        <p>Phone: ${passengerPhone}</p>
                    </div>
                `;
            }

            ticketDetailsDiv.innerHTML += `
                <div class="passenger">
                    <p><strong>Total Cost:</strong> Rs. ${ticketCost}</p>
                </div>
            `;

            document.getElementById('paymentForm').style.display = 'none';
            document.getElementById('ticketDisplay').style.display = 'block';
        }
     
        