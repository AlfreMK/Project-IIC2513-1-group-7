

async function getData(url){
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`);
        if (!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await response.json();
        return json.data;
    }
    catch(error) {
        console.error(`Could not get data: ${error}`);
    }
    return null;
  }

function SortObject(obj){
  var arr = [];
  for (var key in obj) {
    arr.push({
      key: key,
      value: obj[key]
    });
  }
  arr.sort(function(a, b) {
    return b.value - a.value;
  });
  return arr;
}

function transformDateFormat(date){
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const months = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  }
  const year = dateObj.getFullYear();
  return `${day} de ${months[month]}, ${year}`;
}

function Round(value) {
  // https://stackoverflow.com/questions/11832914/
  const neat = +(Math.abs(value).toPrecision(15));
  const rounded = Math.round(neat * 100) / 100;
  return rounded * Math.sign(value);
}

export{
    getData,
    SortObject,
    transformDateFormat,
    Round,
}