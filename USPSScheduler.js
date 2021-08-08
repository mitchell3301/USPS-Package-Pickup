// ==UserScript==
// @name USPS Package Pickup Scheduler
// @description Automatically schedules your USPS package pickups at your address
// @match https://tools.usps.com/schedule-pickup-steps.htm
// @author Mitchell Macijauskas
// ==/UserScript==

(async () => {
  // Set up variables. Input your values between the ''
  var firstName = "John";
  var lastName = "Smith";
  var address = "1600 Pennsylvania Ave";
  var city = "Washington";
  var state = "DC";
  var zipCode = "20001";
  var phoneNumber = "202-555-1234";
  var email = "thepresident@thewhitehouse.gov";
  var hasDog = false; // Put 'Yes' if dog at address, 'No' is no dog
  var packageLocation = "Porch"; // Choose from 'In/At Mailbox', 'Porch', 'Front_Door', 'Back_Door', 'Side_Door'
  var numPackages = 1;
  var packageWeight = 1;

  // Send values to fields
  document.getElementById("firstName").value = firstName;
  document.getElementById("lastName").value = lastName;
  document.getElementById("addressLineOne").value = address;
  document.getElementById("city").value = city;
  document.querySelector("#state").value = state;
  document.getElementById("zipCode").value = zipCode;
  document.getElementById("phoneNumber").value = phoneNumber;
  document.getElementById("emailAddress").value = email;

  document.getElementById("webToolsAddressCheck").click();

  if (hasDog.ignoreCase) {
    document.getElementById("first-radio-verification").click();
  } // If
  else {
    document.getElementById("second-radio-verification").click();
  } // Else If

  document
    .querySelector(
      "body > div.Step_One_Container > div > div.text-indentation-wrapper > div:nth-child(5) > div.hidden-lg.hidden-md.hidden-sm.col-xs-12.validation-continue-btn-container.buttons-holder.mobile-btn > div > a"
    )
    .click();

  document.getElementById("packageLocation").value = packageLocation;

  document
    .querySelector(
      "body > div.Step_Two_Container.current-step > div > div > div.text-indentation-wrapper > div.col-md-6.col-sm-6.col-xs-12.form-group.enter-any-additional-instructions > div.hidden-lg.hidden-md.hidden-sm.col-xs-12.button-wrapper > div > a"
    )
    .click();

  document.querySelector("#pickup-regular-time").click();

  await timeout(500);

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);

  Array.from(document.querySelectorAll(".ui-state-default"))
    .find((elm) => elm.innerText === "" + tomorrow.getDate())
    .click();

  document
    .querySelector(
      "body > div.Step_Three_Container.current-step > div > div > div.text-indentation-wrapper > div.hidden-lg.hidden-md.hidden-sm.col-xs-12.schedule-pickup-choose-time-button.button-wrapper > div > a"
    )
    .click();

  document.getElementById("countPriority").value = numPackages;
  document.getElementById("totalPackageWeight").value = packageWeight;
  document
    .querySelector(
      "body > div.Step_Four_Container.current-step > div > div:nth-child(3) > div > div.col-md-12.col-sm-12.col-xs-12.form-group.terms-condition-wrapper.check-boxes > label > input"
    )
    .click();
})();

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
