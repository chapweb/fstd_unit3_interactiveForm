// * --------------------
// * FUNTIONS
// * --------------------

function showError(input, errTextElement, isValid, text) {
    showErrorBorder(input, isValid);
    showErrorMessage(errTextElement, isValid, text);
}

/**
 * to show an red border on <input>, if passed in boolean is not correct
 * @param {element} input is <input> element to be modify 
 * @param {boolean} isValid is boolean value to determine if false
 */
function showErrorBorder(input, isValid) {
    if (isValid) {
        input.removeClass("err-border")
    } else {
        input.addClass("err-border")
    }
}

/**
 * to show an error message on <input>, if passed in boolean is not correct
 * @param {element} input is <input> element to be modify 
 * @param {boolean} isValid is boolean value to determine if false
 * @param {string} message is optional conditional message
 */
function showErrorMessage(element, isValid, text) {
    // const message = text || 0;
    if (isValid) {
        element.removeClass("err-text").hide()
    } else {
        element.addClass("err-text").show()
    }

    // if a message is present, change the span text
    if (text) {
        element.text(text);
    }
}

// * --------------------
// * REGEX
// * --------------------

const regexLib = {
    name: /^\w+\s?(\w+)?$/i, //e.g. John Smith
    email: /[^@]+@[^@]+\.(com|net|org)/, // e.g. someone@email.com
    session: /\d{1,2}(am|pm)\s*-\s*\d{1,2}(am|pm)/i, // e.g. 12pm - 16pm
    price: /\d+\.?\d{2}/,
    day: /(sun|mon|tues?|wed(nes)?|thurs?|fri|sat(ur)?)(day)?/i, // Mon | wednesday
    cardNo: /^\d{13,16}$/,
    zip: /^\d{5}$/,
    cvv: /^\d{3}$/
}

//--------------------
// BASIC INFO

const $name = $("#name")
$name.focus();

/** Name validator */
const $nameErrSpan = $('<span class="err-text" style="display: none;">Name Cannot Be Empty</span>')
$name.after($nameErrSpan);
$name.keyup(function () {
    const val = $(this).val();
    const regex = regexLib.name;
    const isValid = regex.test(val);

    showError($(this), $nameErrSpan, isValid);
})


/** Email validator */
const $email = $("#mail");
const $emailErrSpan = $('<span class="err-text" style="display: none;">This is not an Email</span>');
$email.after($emailErrSpan);
$email.keyup(function () {
    const val = $(this).val();
    const regex = regexLib.email;
    const isValid = regex.test(val) || val === "";

    showError($(this), $emailErrSpan, isValid);
})


/** Job Role */

const $titleInput = $("#title");
const $otherTitleInput = $("#other-title");
$otherTitleInput.hide();

$titleInput.change(function (e) {
    if ($(this).val() === "other") {
        $otherTitleInput.slideDown();
    } else {
        $otherTitleInput.slideUp();
    }
})

//--------------------
// T-shirt color

const $deisgn = $("#design");
const $colorDiv = $("#colors-js-puns");
const $colorsArr = $("#color").children();

// hide color selection section intially 
$colorDiv.hide();

$deisgn.change(function () {
    const tshirtCat = $(this).val();
    const mid = $colorsArr.length / 2

    $colorDiv.find("select").val(""); //reset <select> to blank
    $colorsArr.each(function () { //reset all options 
        $(this).show();
    })

    if (tshirtCat === "js puns") {
        $colorDiv.slideDown();
        $colorsArr.each(function (i) {
            if (i >= mid) {
                $(this).hide();
            }
        })
    } else if (tshirtCat === "heart js") {
        $colorDiv.slideDown();
        $colorsArr.each(function (i) {
            if (i < mid) {
                $(this).hide();
            }
        })
    } else {
        $colorDiv.slideUp();
    }
})

//--------------------
// Registry

/**
 * ! Deprecated, jQuery $(this) delegation is not working as I wanted
 */
// const $activities = $(".activities");
// const $activitiesErrSpan = $("<span class='err-text' style='display: none;'>Select at least 1 activities</span>");
// const $priceSpan = $("<p style='display: none;'><b>Total Price: </b><span class='activities-price'>0</span></p>");
// $activities.append($activitiesErrSpan).append($priceSpan)
// const $inputs = $activities.find("input");
// $inputs.each(function () {

//     const labelText = $(this).parent().text();
//     const sessionRegex = /\d{1,2}(am|pm)-\d{1,2}(am|pm)/;
//     const priceRegex = /\d+\.?\d{2}/;

//     if (sessionRegex.test(labelText)){ 
//         const session = sessionRegex.exec(labelText)[0];
//         $(this).attr("data-session", session);
//     }
//     if (priceRegex.test(labelText)) {
//         const price = priceRegex.exec(labelText)[0];
//         $(this).attr("data-price", price)
//     }
// })

// $activities.change("input", function (e) {
//     // * total cost calculator
//     let total = 0;
//     $(".activities input:checked").each(function (){
//         total += parseInt($(this).attr("data-price"));        
//     })
//     if (total) {
//         $priceSpan.find("span").text(total);
//         $priceSpan.slideDown()
//     } else {
//         $priceSpan.slideUp()
//         $priceSpan.delay(1000).find("span").text(0);
//     }

//     // * disable checkbox feature
//     const name = e.target.name;
//     const day = e.target.dataset.day;
//     const session = e.target.dataset.session;

//     console.log()
//     $(`input[data-session='${session}'][data-day='${day}']`).each(function(){
//         if ($(this).attr("name") !== name){
//             $(this).prop("checked", true)
//         }
//     })

// })


const activities = document.querySelector(".activities");
activities.innerHTML += "<span class='err-text' style='display: none;'>Select at least 1 activities</span>";
activities.innerHTML += "<p style='display: none;'><b>Total Price: </b><span class='activities-price'>0</span></p>";
const inputs = Array.from(activities.querySelectorAll("input"));
const priceSpan = activities.querySelector(".activities-price");

inputs.forEach(input => {
    /** add dataset value: session and price, to <input> for conditioning */
    const labelText = input.parentElement.textContent;
    const sessionRegex = regexLib.session;
    const priceRegex = regexLib.price;
    const dayRegex = regexLib.day;

    if (sessionRegex.test(labelText))
        input.dataset.session = sessionRegex.exec(labelText)[0];

    if (priceRegex.test(labelText))
        input.dataset.price = priceRegex.exec(labelText)[0];

    if (dayRegex.test(labelText))
        input.dataset.day = dayRegex.exec(labelText)[0];
})


activities.addEventListener("change", e => {
    const target = e.target;
    const session = target.dataset.session;
    const day = target.dataset.day;

    /**
     * This checks 
     *  1) if user checked an input
     *  2) if true, loop through inputs
     *  3) if an input is not same as target, and session is same as target
     *  4) the input other than target is disabled and strike through
     * 
     *  5) if user unchecked an input 
     *  6) it re-enabled all inputs with same session;
     */

    if (target.checked) {
        inputs.forEach(input => {
            if ((input !== target) && (input.dataset.session === session) && (input.dataset.day === day)) {
                input.disabled = true;
                input.parentElement.style.textDecoration = "line-through";
            }
        })

    } else {
        inputs.forEach(input => {
            if (input.dataset.session === session) {
                input.disabled = false;
                input.parentElement.style.textDecoration = "none";
            }
        })
    }


    /**
     * ! Deprecated
    let total = 0;
    inputs.forEach(input=> {
        if (input.checked) {
            total += parseInt(input.dataset.price);
        }
    })
     */

    /**
     * the following calculate total price
     *   1) filter out activities that are checked
     *   2) accumulate total cost of checked input activities
     *   3) if total > 0, show the span text and show total 
     *   3) if total === 0, hide the span;
     */

    const checkedInputs = inputs.filter(input => input.checked);
    const total = checkedInputs.reduce((total, input) => total + parseInt(input.dataset.price), 0);
    priceSpan.textContent = `$ ${total}`;
    let errTextDisplay = activities.querySelector(".err-text");

    if (total) {
        priceSpan.parentElement.style.display = "block";
        errTextDisplay.style.display = "none";
    } else {
        priceSpan.parentElement.style.display = "none";
        errTextDisplay.style.display = "block";
    }
})


//--------------------
// Payment

const $paymentSelect = $("#payment");
// payment default selected option is "Credit Card"
$paymentSelect.find("[value='credit card']").attr("selected", true);

const $creditCard = $("#credit-card");
const $paypal = $creditCard.next()
const $bitcoin = $creditCard.next().next();

$paypal.hide();
$bitcoin.hide();

$paymentSelect.change(function () {
    const method = $(this).val();
    if (method === "credit card") {
        $creditCard.slideDown();
        $paypal.slideUp();
        $bitcoin.slideUp();
    } else if (method === "paypal") {
        $creditCard.slideUp();
        $paypal.slideDown();
        $bitcoin.slideUp();
    } else if (method === "bitcoin") {
        $creditCard.slideUp();
        $paypal.slideUp();
        $bitcoin.slideDown();
    }
})

// TODO: If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.

const $credErrP = $('<span class="err-text" style="display: none;">error message insert here</span>');
$creditCard.append($credErrP);

const $cardNo = $("#cc-num");
$cardNo.keyup(function () {
    const val = $(this).val();
    const regex = regexLib.cardNo;
    const isValid = regex.test(val);

    // if (isValid) {
    //     $credErrP.removeClass("err-text").hide();
    // } else
    // if (!isValid && val === "") {
    //     $credErrP.text("Please enter a credit card number.")
    //     $credErrP.addClass("err-text").show();
    // } else {
    //     $credErrP.text("Credit Card no must be 13-16 digit long.")
    //     $credErrP.addClass("err-text").show();
    // }
    showError($(this), $credErrP, isValid, "Please enter a number that is between 13 and 16 digits long.");
    if (!isValid && val === "") 
        $credErrP.text("Please enter a credit card number.")
    
})

const $zip = $("#zip");
$zip.keyup(function () {
    const val = $(this).val();
    const regex = regexLib.zip;
    const isValid = regex.test(val);

    showError($(this), $credErrP, isValid, "Please enter a 5 digit zip code.");
})

const $cvv = $("#cvv");
$cvv.keyup(function () {
    const val = $(this).val();
    const regex = regexLib.cvv;
    const isValid = regex.test(val);

    showError($(this), $credErrP, isValid, "Please enter a 3 digit security code.");
})

//--------------------
// SUBMISSION VALIDATION
const $submit = $("[type='submit']");
const $formErr = $('<span class="err-text" style="display: none">There\'s something wrong with the form.</span>');
$submit.after($formErr)

$("form").submit(function (e) {
    e.preventDefault();

    const nameValid = regexLib.name.test($name.val());
    const emailValid = regexLib.email.test($email.val());
    const actValid = $(".activities input:checked").length > 0;

    const isCreditCard = $paymentSelect.val() === "credit card";
    const cardNoValid = regexLib.cardNo.test($cardNo.val());

    const zipValid = regexLib.zip.test($zip.val());

    const cvvValid = regexLib.cvv.test($cvv.val());

    // if use credit card, test if three fields valid ; if use bitcoin/paypal, return true
    const creditCardValid = isCreditCard ? cardNoValid && zipValid && cvvValid : true;

    const formValid = nameValid && emailValid && actValid && creditCardValid;

    if (formValid) {
        $submit.css("backgroundColor", "#22627e");
        $submit.text("Register");
        $formErr.css("display", "none");

        /** resubmit code from https://stackoverflow.com/questions/1164132/how-to-reenable-event-preventdefault/1164177#1164177 */
        $(this).unbind('submit').submit();
    } else {
        $submit.css("backgroundColor", "#c10101");
        $submit.text("Re-submit");
        $formErr.css("display", "block");

        showError($name, $nameErrSpan, nameValid);

        showError($email, $emailErrSpan, emailValid);
        
        showErrorMessage($(".activities .err-text"), actValid);
        
        
        showErrorBorder($cardNo, cardNoValid);
        showErrorBorder($zip, zipValid);
        showErrorBorder($cvv, cvvValid);

        let creditCardErrText = [];
        if (!cardNoValid) {
            creditCardErrText.push("credit card number");
        } 
        if (!zipValid) {
            creditCardErrText.push("zip code");
        }
        if (!cvvValid) {
            creditCardErrText.push("security code");
        }
        
        showErrorMessage($credErrP, creditCardValid, `The following credit card info has error: ${creditCardErrText.toString().replace(",", ", ")}`);
        
    }
})



console.log("Man... I rather use vanilla JavaScript for this project, ")