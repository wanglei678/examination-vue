import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function generateArray(table: HTMLElement) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan: number | string | null = cell.getAttribute('colspan');
      var rowspan: number | string | null = cell.getAttribute('rowspan');
      var cellValue: string | number = cell.innerText;
      if (cellValue !== '' && Number(cellValue)) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (
          R >= range.s.r &&
          R <= range.e.r &&
          outRow.length >= range.s.c &&
          outRow.length <= range.e.c
        ) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = Number(rowspan) || 1;
        colspan = Number(colspan) || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      }

      //Handle Value
      outRow.push(cellValue !== '' ? cellValue : null);

      //Handle Colspan
      if (Number(colspan)) for (var k = 0; k < Number(colspan) - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
}

function datenum(v: number, date1904?: boolean) {
  if (date1904) v += 1462;
  var epoch = Date.parse(String(v));
  return (epoch - Number(new Date(Date.UTC(1899, 11, 30)))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data: { [x: string]: any }) {
  var ws: { [x: string]: any } = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell: { [x: string]: any } = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(Number(cell.v));
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function s2ab(s: string) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

export function export_table_to_excel(id: string) {
  var theTable = document.getElementById(id);
  var oo = generateArray(theTable!);
  var ranges = oo[1];

  /* original data */
  var data = oo[0];
  var ws_name = 'SheetJS';

  var wb: { SheetNames: string[]; Sheets: { [k: string]: any } } = {
      SheetNames: [],
      Sheets: {}
    },
    ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }),
    'test.xlsx'
  );
}

// table columns 过滤
export function columns_filter(columns: any[]) {
  return columns.filter((item) => item.label !== '' && item.label !== '#');
}

// excel head 根据table的columns数据处理
export function excel_head(data: any[]) {
  let headlist: any[] = [];
  columns_filter(data).forEach((item: any) => {
    headlist.push(item.label);
  });
  return headlist;
}

// excel data_list 数据处理
export function excel_data_list(columns: any[], data: any[]) {
  let datalist = data.map((item) => {
    let arr: string[] = [];
    columns_filter(columns).forEach((c, i) => {
      arr[i] = item[c.prop];
    });
    return arr;
  });
  return datalist;
}

type IParams = {
  multiHeader?: string[];
  // header: string[];
  header: any[];
  data: any[];
  filename?: string;
  merges?: any[];
  autoWidth?: boolean;
  bookType?: XLSX.BookType;
};

export function export_json_to_excel({
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx'
}: IParams) {
  /* original data */
  filename = filename || 'excel-list';
  // data = [...data];
  // data.unshift(header);
  data = excel_data_list(header, data);
  data.unshift(excel_head(header));

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i]);
  }

  var ws_name = 'SheetJS';
  var wb: { SheetNames: string[]; Sheets: { [k: string]: any } } = {
      SheetNames: [],
      Sheets: {}
    },
    ws = sheet_from_array_of_arrays(data);

  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach((item) => {
      ws['!merges'].push(XLSX.utils.decode_range(item));
    });
  }

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map((row) =>
      row.map((val: any) => {
        /*先判断是否为null/undefined*/
        if (val == null) {
          return {
            wch: 10
          };
        } else if (val.toString().charCodeAt(0) > 255) {
          /*再判断是否为中文*/
          return {
            wch: val.toString().length * 2
          };
        } else {
          return {
            wch: val.toString().length
          };
        }
      })
    );
    /*以第一行为初始值*/
    let result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch'];
        }
      }
    }
    ws['!cols'] = result;
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  });
  saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }),
    `${filename}.${bookType}`
  );
}
