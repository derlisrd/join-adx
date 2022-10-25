export const functions = {
    

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
        return fecha + ' '+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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