var columnDefs = [
  {
    field: 'athlete',
    editable: true,
  },
  { field: 'date', editable: true, cellEditor: 'datePicker' },
  { field: 'country' },
  { field: 'year', maxWidth: 120 },
  { field: 'sport', editable: true },
];

var gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    cellRenderer: function (params) {
      if (params.colDef.editable) {
        return `<span style="
          display: flex;
          align-items: center;
          "><span style="
          flex-basis:80%;
          overflow: hidden;
          text-overflow: ellipsis;
          ">
          ${params.value}
          </span>
            <span style="
            flex-basis:20%
            " class="iconify" data-icon="akar-icons:edit" data-inline="false">
            </span>
          </span>`;
      }

      return params.value;
    },
  },
  components: {
    datePicker: getDatePicker(),
  },
};

function getDatePicker() {
  // function to act as a class
  function Datepicker() {}

  // gets called once before the renderer is used
  Datepicker.prototype.init = function (params) {
    // create the cell
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;
    this.eInput.classList.add('ag-input');
    this.eInput.style.height = '100%';

    // https://jqueryui.com/datepicker/
    $(this.eInput).datepicker({
      dateFormat: 'dd/mm/yy',
    });
  };

  // gets called once when grid ready to insert the element
  Datepicker.prototype.getGui = function () {
    return this.eInput;
  };

  // focus and select can be done after the gui is attached
  Datepicker.prototype.afterGuiAttached = function () {
    this.eInput.focus();
    this.eInput.select();
  };

  // returns the new value after editing
  Datepicker.prototype.getValue = function () {
    return this.eInput.value;
  };

  // any cleanup we need to be done here
  Datepicker.prototype.destroy = function () {
    // but this example is simple, no cleanup, we could
    // even leave this method out as it's optional
  };

  // if true, then this editor will appear in a popup
  Datepicker.prototype.isPopup = function () {
    // and we could leave this method out also, false is the default
    return false;
  };

  return Datepicker;
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  agGrid
    .simpleHttpRequest({
      url: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
    })
    .then(function (data) {
      gridOptions.api.setRowData(data);
    });
});
