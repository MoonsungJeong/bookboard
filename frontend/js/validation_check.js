function _CLASS_CHECK_REMOVE(elementName, className) {
  var bool = elementName.classList.contains(className);
  if (bool) {
    elementName.classList.remove(className);
    return;
  }
}

function _CLASS_CHECK_ADD(elementName, className) {
  var bool = elementName.classList.contains(className);
  if (!bool) {
    elementName.classList.add(className);
    return;
  }
}

function _CLASS_CHANGE_PASS(elementName) {
  _CLASS_CHECK_REMOVE(elementName, "no_pass");
  _CLASS_CHECK_ADD(elementName, "pass");
}

function _CLASS_CHANGE_NO_PASS(elementName) {
  _CLASS_CHECK_REMOVE(elementName, "pass");
  _CLASS_CHECK_ADD(elementName, "no_pass");
}

function _CLASS_INIT(elementName) {
  _CLASS_CHECK_REMOVE(elementName, "no_pass");
  _CLASS_CHECK_REMOVE(elementName, "pass");
}
// Validation check for input element in form
function check(el) {
  let err_box = el.nextElementSibling;
  if (el.id == "deathyear" && el.value == '') {
    _CLASS_INIT(err_box);
    return;
  }

  if (!el.checkValidity()) {
    _CLASS_CHANGE_NO_PASS(err_box);
  } else if (el.checkValidity() && el.value != '') {
    _CLASS_CHANGE_PASS(err_box);
  }
}
// Validation check for select element in form
function option_check(el) {
  let err_box = el.nextElementSibling;
  if (el.selectedIndex == 0) {
    _CLASS_CHANGE_NO_PASS(err_box);
  } else {
    _CLASS_CHANGE_PASS(err_box);
  }
}