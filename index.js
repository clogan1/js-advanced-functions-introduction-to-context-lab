// let sampleEmps =  [
// ["Thor", "Odinsson", "Electrical Engineer", 45],
// ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
// ["Natalia", "Romanov", "CEO", 150],
// ["Darcey", "Lewis", "Intern", 15],
// ["Jarvis", "Stark", "CIO", 125],
// ["Anthony", "Stark", "Angel Investor", 300],
// ["Byron", "Poodle", "Mascot", 3],
// ["Julius", "Caesar", "General", 27],
// ["Rafiki", "", "Aide", 10],
// ["Simba", "", "King", 100]
// ]

// let empRecords = sampleEmps.forEach(emp => {return createEmployeeRecord(emp)})

// //console.log(empRecords)



function createEmployeeRecord(empArr){
    let newEmpObj = {
        firstName: empArr[0],
        familyName: empArr[1],
        title: empArr[2],
        payPerHour: empArr[3] ,
        timeInEvents: [],
        timeOutEvents: []
    }
    console.log(newEmpObj)
    return newEmpObj
}

function createEmployeeRecords(arr){
    //console.log(arr)
    return arr.map(createEmployeeRecord)
}


function createTimeInEvent(empRecord, timestamp){
    let timeInArr = empRecord.timeInEvents
    let hourInt = timestamp.slice(11)
    hourInt = parseInt(hourInt)
    let timeObj = {
        type: "TimeIn" ,
        hour: hourInt,
        date: timestamp.slice(0, 10) 
        }
    console.log(timeObj)
    timeInArr.push(timeObj)

    return empRecord
}

function createTimeOutEvent(empRecord, timestamp){
    let timeOutArr = empRecord.timeOutEvents
    let hourInt = timestamp.slice(11)
    hourInt = parseInt(hourInt)
    let timeObj = {
        type: "TimeOut" ,
        hour: hourInt,
        date: timestamp.slice(0, 10) 
        }
    console.log(timeObj)
    timeOutArr.push(timeObj)
    return empRecord
}

function hoursWorkedOnDate(empRecord, workDate){
    let timeIn = empRecord.timeInEvents
    .filter((element) => element.date === workDate)
    .map((element) => element.hour);

    let timeOut = empRecord.timeOutEvents
    .filter((element) => element.date === workDate)
    .map((element) => element.hour);

    return (timeOut - timeIn) / 100;
}


function wagesEarnedOnDate(empRecord, workDate){
    return empRecord.payPerHour * hoursWorkedOnDate(empRecord, workDate)
}

function allWagesFor(empRecord){
    let wages = [];
    const allDates = empRecord.timeInEvents.map((element) => (element = element.date));
    for (let element of allDates){
        wages.push(wagesEarnedOnDate(empRecord, element))
    }
    return wages.reduce((a,b) => a + b, 0)
}

function calculatePayroll(empArr) {
    return empArr.map(empRecord => allWagesFor(empRecord))
    .reduce((a, b) => (a = a + b), 0);
}

function findEmployeeByFirstName(empArr, name) {
    return empArr.find((empRecord) => empRecord.firstName === name);
  }