let events = [];
let totalCost = 0;
var id=0;
 
 
// Done the complete add feature by Saikat.
function addPrice()
{
      let eventId = document.getElementById('eventId').value.trim();
      let name = document.getElementById('eventName').value.trim();
      let price = parseFloat(document.getElementById('eventPrice').value);
 
      // valindating the details for ignoreing the duplicates
      if (!eventId || !name || isNaN(price) || price <= 0)
        {
            alert('Please enter valid event details!');
          return;
        }
         if (events.some(event => event.id === eventId)) {
              alert("Event ID already exists! Please enter a unique Event ID.");
              return;
          }
              // Adding event to an array
             let event = { id: eventId, name: name, price: price, quantity: 1 };
              events.push(event);
 
               // Creating  event row in the table
                let cartBody = document.getElementById('tableBody');
                let row = document.createElement('tr');
                 row.id = `row${eventId}`;
                  row.innerHTML = `
                                <td>${eventId}</td>
                                <td>${name}</td>
                                 <td>₹${price}</td>
                                 <td><input type="number" id="quantity${eventId}" value="1" min="1" oninput="updateTotal('${eventId}')" class="form-control" style="width: 80px;"></td>
                                 <td id="total${eventId}">₹${price}</td>
                                 <td><button class="btn btn-danger btn-sm" onclick="removeEvent('${eventId}')">Remove</button></td>`;
              cartBody.appendChild(row);
              document.getElementById('eventId').value = "";
              document.getElementById('eventName').value = "";
              document.getElementById('eventPrice').value = "";
              updateGrandTotal();
 
};

 
//update function created by veeresh 
function updateTotal(eventId) {
   let quantityInput = document.getElementById(`quantity${eventId}`);
   let quantity = parseInt(quantityInput.value) || 1;
   if (quantity < 1) {
       quantityInput.value = 1; // Prevent negative values
       quantity = 1;
   }
	//search for any event occurred
   let event = events.find(e => e.id === eventId);
   event.quantity = quantity;
	//multiplying the price and quantity and displayed the result.
   document.getElementById(`total${eventId}`).innerText = `₹${event.price * quantity}`;
   updateGrandTotal();
}
function removeEvent(eventId) {
   events = events.filter(event => event.id !== eventId);
   document.getElementById(`row${eventId}`).remove();
   updateGrandTotal();
}
function updateGrandTotal() {
   totalCost = events.reduce((sum, event) => sum + (event.price * event.quantity), 0);
   //Total cost is displayed to web page
	document.getElementById("totalCost").innerText = totalCost;
}
