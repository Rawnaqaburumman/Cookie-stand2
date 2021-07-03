'use strict';


const hours = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];

let randomcustomerhour = [];

// Glabal array 
let sitearray = [];
// Global function
function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}
// function contruction 
let shopsarray = [];

function Site(thesite, mincust, maxcust, avg) {
    this.thesite = thesite
    this.mincust = mincust
    this.maxcust = maxcust
    this.avg = avg
    // empty array to hold the random number of custors each hour
    this.randomcust1 = [];
    //empty array to hold the cookies sales 
    this.total = 0;
    this.cookiesnumber1 = [];
    sitearray.push(this);
}
// proto function calculate random number of customers
Site.prototype.randomcust = function () {
    for (let j = 0; j < 14; j++) {
        this.randomcust1.push(getRandomArbitrary(this.mincust, this.maxcust))

    }
}
// proto function calculate cookies number per hour 
Site.prototype.cookiesnumber = function () {
    let t = [];
    for (let i = 0; i < 14; i++) {
        let num = Math.floor(this.randomcust1[i] * this.avg)

        this.cookiesnumber1.push(num);
        this.total += this.cookiesnumber1[i];

    }
    console.log(this.total);

}





let Seattle = new Site('Seattle', 23, 65, 6.3);
let Paris = new Site('Paris', 20, 38, 2.3);
let Tokyo = new Site('Tokyo', 3, 24, 1.2);
let Lima = new Site('Lima', 2, 16, 1.6);
let Dubai = new Site('Dubai', 11, 38, 3.7);
console.log(sitearray);



// Render function

let parent = document.getElementById('begin');
let thetable = document.createElement('table');
parent.appendChild(thetable);

function buildingheader() {
    let headerrow = document.createElement('tr');
    thetable.appendChild(headerrow);


    let firstth = document.createElement('th');
    headerrow.appendChild(firstth);
    firstth.textContent = 'Name';

    for (let i = 0; i < hours.length; i++) {
        let thelements = document.createElement('th');
        headerrow.appendChild(thelements);
        if (i < 7 ){
        thelements.textContent = hours[i] + ':00 am';}
else {
    thelements.textContent = hours[i] + ':00 pm';}
}
    

    let lastth = document.createElement('th');
    headerrow.appendChild(lastth);
    lastth.textContent = 'Daily location total';
}
buildingheader();




Site.prototype.render = function () {
    let dataraw = document.createElement('tr');
    thetable.appendChild(dataraw);
    let namedata = document.createElement('td');
    dataraw.appendChild(namedata);
    namedata.textContent = this.thesite

    for (let i = 0; i < hours.length; i++) {
        let tde = document.createElement('td');
        dataraw.appendChild(tde);
        tde.textContent = this.cookiesnumber1[i];

    }

    // Daily total 
    let totalpersite = document.createElement('td')
    dataraw.appendChild(totalpersite);
    totalpersite.textContent = this.total


}

for (let i = 0; i < sitearray.length; i++) {
    sitearray[i].randomcust();
    sitearray[i].cookiesnumber();
    sitearray[i].render();

}


function footerpart() {
    let footrow = document.createElement('tr')
    thetable.appendChild(footrow);
    let footerth = document.createElement('th');
    footrow.appendChild(footerth);
    footerth.textContent = 'totals';



    let megataotal = 0;
    for (let i = 0; i < hours.length; i++) {
        let totaleachhour = 0;
        for (let j = 0; j < sitearray.length; j++) {


            totaleachhour += sitearray[j].cookiesnumber1[i];
            megataotal += sitearray[j].cookiesnumber1[i];
        }
        let footerdata = document.createElement('td');
        footrow.appendChild(footerdata);
        footerdata.textContent = totaleachhour;
    }

    let finldata = document.createElement('td');
    footrow.appendChild(finldata);
    finldata.textContent = (megataotal);

}
footerpart();


let theform = document.getElementById('form');
theform.addEventListener('submit', handlesumbit);


function handlesumbit(event) {
 
    event.preventDefault();
    let newsitename = event.target.name.value;
    let newmax = parseInt(event.target.max.value);
    let newmin = parseInt(event.target.min.value);
    let newavg = parseFloat(event.target.avg.value);

    let newsite = new Site(newsitename, newmax, newmin, newavg);
    //alert(newmax);
    console.log(newsite);
    newsite.randomcust();
    newsite.cookiesnumber();

   
    let deleated = thetable.rows.length-1
    thetable.deleteRow(deleated);


    newsite.render()

    footerpart();
}


//buildingheader();
//footerpart();