export const functions = {
    

    todayDMY : ()=>{
        let inputDate = new Date();
        let date, month, year;
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1; 
        year = inputDate.getFullYear();
        date = date
        .toString()
        .padStart(2, '0');

        month = month
        .toString()
        .padStart(2, '0');

        return `${date}-${month}-${year}`
    },
    firstdaymonthDMY: ()=>{
        let inputDate = new Date();
        let month, year;
        month = inputDate.getMonth() + 1; 
        year = inputDate.getFullYear();
        month = month
        .toString()
        .padStart(2, '0');

        return `01-${month}-${year}`
    }
}