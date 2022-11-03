export const functions = {
    
    numberFormat: n=> {
        if(isNaN(n) || !n){return "0"}
        return parseFloat(n).toLocaleString("de-DE")
    },
    getMonthString: f=>{
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        const d = new Date(f);
        return monthNames[d.getMonth()];
    },

    fechaDMY: (f) => {
        let inputDate = new Date(f);
        let date, month, year;
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1; 
        year = inputDate.getFullYear();
        date = date.toString().padStart(2, '0');
        month = month.toString().padStart(2, '0');
        return `${date}-${month}-${year}`
    },
    todayDMY : ()=>{
        let inputDate = new Date();
        let date, month, year;
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1; 
        year = inputDate.getFullYear();
        date = date.toString().padStart(2, '0');
        month = month.toString().padStart(2, '0');
        return `${date}-${month}-${year}`
    },
    firstDay: ()=>{
        let inputDate = new Date();
        return new Date(inputDate.getFullYear(),inputDate.getMonth(),1)
    },
    firstdaymonthDMY: ()=>{
        let inputDate = new Date();
        let month, year;
        month = inputDate.getMonth() + 1; 
        year = inputDate.getFullYear();
        month = month.toString().padStart(2, '0');
        return `01-${month}-${year}`
    },
    yesterdayDMY: ()=>{
        let inputDate = new Date();
        inputDate.setDate(inputDate.getDate() - 1)
        let date, month, year;
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1; 
        year = inputDate.getFullYear();
        date = date.toString().padStart(2, '0');
        month = month.toString().padStart(2, '0');
        return `${date}-${month}-${year}`
    },
    lastsevendays: ()=>{
        let inputDate = new Date();
        inputDate.setDate(inputDate.getDate() - 7)
        let date, month, year;
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1; 
        year = inputDate.getFullYear();
        date = date.toString().padStart(2, '0');
        month = month.toString().padStart(2, '0');
        return `${date}-${month}-${year}`
    },
    dateDMY: (date= new Date())=> {
        return [
          (date.getDate()).toString().padStart(2, '0'),
          (date.getMonth() + 1).toString().padStart(2, '0'),
          date.getFullYear(),
        ].join('-');
      },
    datetimeDMYHMS:(date = new Date())=>{
        let fecha =  [
            (date.getDate()).toString().padStart(2, '0'),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getFullYear(),
          ].join('-') 
        return fecha + ' '+date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0');
    },
    getTime:()=>{
        return new Date();
    },
    setTime :cant=>{
        var date = new Date()
        date.setSeconds(cant)
        return date;
    }
    
}