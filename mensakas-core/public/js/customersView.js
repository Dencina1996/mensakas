/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/customersView.js":
/*!***************************************!*\
  !*** ./resources/js/customersView.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  tableContent('/api/users/list');
  $('.btn-primary').click(function (event) {
    var params = $('input[name="search"]').val();
    $('tbody').children().not(':first').remove();

    if (!params) {
      tableContent('/api/users/list');
    } else {
      tableContent('/api/users/list/search=' + params);
    }
  });
  $('body').on('hidden.bs.modal', '.modal', function (event) {
    event.preventDefault();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('.modal').remove();
  });
});

function tableContent(url) {
  $.get(url, function (data) {
    $.each(data, function (index, val) {
      // ROW 
      $(document.createElement('tr')).appendTo('table'); // CUSTOMER (ALL DETAILS)

      $(document.createElement('td')).appendTo('tr:last-child');
      $(document.createElement('button')).attr({
        "class": 'btn btn-success fa fa-search',
        onclick: 'alert("DETAILS")'
      }).appendTo('tr:last-child td:last-child'); // CUSTOMER (NAME)

      $(document.createElement('td')).appendTo('tr:last-child');
      $('tr:last-child td:last-child').text(val.first_name + ' ' + val.last_name); // CUSTOMER (EMAIL)

      $(document.createElement('td')).appendTo('tr:last-child');
      $('tr:last-child td:last-child').text(val.email); // CUSTOMER (PHONE)

      $(document.createElement('td')).appendTo('tr:last-child');
      $('tr:last-child td:last-child').text(val.phone); // CUSTOMER (ADDRESS)

      $(document.createElement('td')).appendTo('tr:last-child');
      $('tr:last-child td:last-child').text(val.street + ', ' + val.city); // CUSTOMER (OPTIONS)

      $(document.createElement('td')).appendTo('tr:last-child');
      $(document.createElement('button')).attr({
        "class": 'btn btn-danger',
        onclick: 'showModal(' + val.id + ')'
      }).append($(document.createElement('i')).addClass('fa fa-trash')).append(' Delete').appendTo('tr:last-child td:last-child');
      $(document.createElement('button')).attr({
        "class": 'btn btn-warning',
        onclick: 'alert("EDIT")'
      }).append($(document.createElement('i')).addClass('fa fa-pencil')).append(' Edit').appendTo('tr:last-child td:last-child');
    });
  });
}

function showModal(id) {
  // MODAL 
  $(document.createElement('div')).attr({
    'class': 'modal fade',
    'id': 'userModal',
    'tabindex': '-1',
    'role': 'dialog',
    'aria-labelledby': 'modalLabel',
    'aria-hidden': 'true'
  }).appendTo('body'); // MODAL DIALOG

  $(document.createElement('div')).attr({
    'class': 'modal-dialog',
    'role': 'document'
  }).appendTo('.modal'); // MODAL CONTENT

  $(document.createElement('div')).addClass('modal-content').appendTo('.modal-dialog'); // MODAL HEADER

  $(document.createElement('div')).addClass('modal-header').append($(document.createElement('h5')).attr({
    'class': 'modal-title',
    'id': 'modalLabel'
  }).text('User details')).appendTo('.modal-content'); // MODAL BODY

  $(document.createElement('div')).addClass('modal-body').appendTo('.modal-content');
  $(document.createElement('div')).addClass('form-group').appendTo('.modal-body'); // INPUTS
  // FIRST NAME INPUT

  $(document.createElement('label')).attr({
    'for': 'user_fname',
    'class': 'col-form-label'
  }).text('First name:').appendTo('.form-group');
  $(document.createElement('input')).attr({
    'type': 'text',
    'class': 'form-control',
    'id': 'user_fname'
  }).appendTo('.form-group'); // LAST NAME INPUT

  $(document.createElement('label')).attr({
    'for': 'user_lname',
    'class': 'col-form-label'
  }).text('Last name:').appendTo('.form-group');
  $(document.createElement('input')).attr({
    'type': 'text',
    'class': 'form-control',
    'id': 'user_lname'
  }).appendTo('.form-group'); // EMAIL INPUT

  $(document.createElement('label')).attr({
    'for': 'user_email',
    'class': 'col-form-label'
  }).text('Email:').appendTo('.form-group');
  $(document.createElement('input')).attr({
    'type': 'email',
    'class': 'form-control',
    'id': 'user_email'
  }).appendTo('.form-group'); // PHONE INPUT

  $(document.createElement('label')).attr({
    'for': 'user_phone',
    'class': 'col-form-label'
  }).text('Phone:').appendTo('.form-group');
  $(document.createElement('input')).attr({
    'type': 'text',
    'class': 'form-control',
    'id': 'user_phone'
  }).appendTo('.form-group'); // CITY INPUT

  $(document.createElement('label')).attr({
    'for': 'user_city',
    'class': 'col-form-label'
  }).text('City:').appendTo('.form-group');
  $(document.createElement('input')).attr({
    'type': 'text',
    'class': 'form-control',
    'id': 'user_city'
  }).appendTo('.form-group'); // ZIP CODE INPUT

  $(document.createElement('label')).attr({
    'for': 'user_zipcode',
    'class': 'col-form-label'
  }).text('Zip Code:').appendTo('.form-group');
  $(document.createElement('input')).attr({
    'type': 'text',
    'class': 'form-control',
    'id': 'user_zipcode'
  }).appendTo('.form-group'); // ADDRESS INPUT

  $(document.createElement('label')).attr({
    'for': 'user_address',
    'class': 'col-form-label'
  }).text('Address:').appendTo('.form-group');
  $(document.createElement('input')).attr({
    'type': 'text',
    'class': 'form-control',
    'id': 'user_address'
  }).appendTo('.form-group'); // NUMBER INPUT

  $(document.createElement('label')).attr({
    'for': 'user_number',
    'class': 'col-form-label'
  }).text('Number:').appendTo('.form-group');
  $(document.createElement('input')).attr({
    'type': 'text',
    'class': 'form-control',
    'id': 'user_number'
  }).appendTo('.form-group'); // DOOR INPUT

  $(document.createElement('label')).attr({
    'for': 'user_door',
    'class': 'col-form-label'
  }).text('Door:').appendTo('.form-group');
  $(document.createElement('input')).attr({
    'type': 'text',
    'class': 'form-control',
    'id': 'user_door'
  }).appendTo('.form-group'); // MODAL FOOTER

  $(document.createElement('div')).addClass('modal-footer').appendTo('.modal-content');
  $(document.createElement('button')).attr({
    'type': 'button',
    'class': 'btn btn-secondary',
    'data-dismiss': 'modal'
  }).append('Close').appendTo('.modal-footer');
  $(document.createElement('button')).attr({
    'type': 'button',
    'class': 'btn btn-primary'
  }).append('Update').appendTo('.modal-footer');
  $('.modal').modal(); // CALL MODAL

  $.get('api/users/' + id, function (data) {
    $('#user_fname').val(data.first_name);
    $('#user_lname').val(data.last_name);
    $('#user_email').val(data.email);
    $('#user_phone').val(data.phone);
    $('#user_city').val(data.city);
    $('#user_zipcode').val(data.zip_code);
    $('#user_address').val(data.street);
    $('#user_number').val(data.number);
    $('#user_door').val(data.house_number);
  });
}

/***/ }),

/***/ 3:
/*!*********************************************!*\
  !*** multi ./resources/js/customersView.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\david\Mensakas_AJAX\mensakas\mensakas-core\resources\js\customersView.js */"./resources/js/customersView.js");


/***/ })

/******/ });