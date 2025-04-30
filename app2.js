document.addEventListener("DOMContentLoaded",function(){
    let fadeElements=document.querySelectorAll(".fade-in");

    let fadeCallback=function(ent){
       ent.forEach(element => {
      if(element.isIntersecting){
        element.target.style.opacity=1;
      }
       });
    }

    let fadeObserver=new IntersectionObserver(fadeCallback);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });


let ctx=document.querySelector("#comparisonChart").getContext('2d');
let comparisonChart=new Chart(ctx,{
    type:'bar',
    data:{
        labels:['Food Delivery', 'E-commerce', 'Semiconductors', 'Space Tech', 'AI/ML', 'Quantum Computing'],
        datasets:[{
            label: 'Market Value ($ Billions)',
                data: [25, 50, 550, 450, 150, 65],
                backgroundColor: [
                    'rgba(255, 107, 53, 0.7)',
                    'rgba(207, 67, 24, 0.7)',
                    'rgba(105, 198, 238, 0.7)',
                    'rgba(19, 100, 135, 0.7)',
                    'rgba(87, 144, 169, 0.7)',
                    'rgba(29, 178, 243, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 107, 53, 1)',
                    'rgba(255, 107, 53, 1)',
                    'rgba(46, 134, 171, 1)',
                    'rgba(46, 134, 171, 1)',
                    'rgba(46, 134, 171, 1)',
                    'rgba(46, 134, 171, 1)'
                ],
                borderWidth: 1.2
        }]
    },
    options:{
        scales:{
            y:{
                beginAtZero:true
            }
        } ,
        responsive:true
    }

    
});

function updateChart(label,data){
    comparisonChart.data.datasets[0].label=label;
    comparisonChart.data.datasets[0].data=data;
    comparisonChart.update();
}

document.querySelector("#valueBtn").addEventListener("click",function(){
    updateChart('Market Value ($ Billions)', [25, 50, 550, 450, 150, 65]);
    setActiveButton(this);
})

document.querySelector("#jobsBtn").addEventListener("click",function(){
    updateChart('Job Creation (Millions)', [0.5, 1.2, 5, 2, 8, 1.5]);
    setActiveButton(this);
})

document.querySelector("#impactBtn").addEventListener("click",function(){
    updateChart('Global Impact Score (1-10)', [3, 4, 9, 8, 9, 10]);
    setActiveButton(this);
})

function setActiveButton(activeBtn) {
    const buttons = document.querySelectorAll('.btn-group .btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}


const counterElements=document.querySelectorAll(".counter");
const counterValues=[12,5.2,34]

const counterCallback = function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            let currentValue = 0;
            const targetValue = counterValues[index];
            const duration = 2000; 
            const stepTime = 50;
            const totalSteps = duration / stepTime;
            const stepValue = targetValue / totalSteps;
            
            const timer = setInterval(() => {
                currentValue += stepValue;
                if (currentValue >= targetValue) {
                    entry.target.textContent = targetValue;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = currentValue.toFixed(1);
                }
            }, stepTime);
        }
    });
};

const counterObserver=new IntersectionObserver(counterCallback);

counterElements.forEach(ele=>{
    counterObserver.observe(ele);
});

let sectorButtons=document.querySelectorAll(".sector-btn");

sectorButtons.forEach(element => {
    element.addEventListener("click",function(){
        let sector=this.getAttribute("data-sector");
        let details=document.getElementById(`${sector}-details`);

        if(details.style.display==="block"){
            details.style.display='none';
        }
        else{
         document.querySelectorAll(".sector-details").forEach(ent=>{
            ent.style.display='none';
         })
            details.style.display="block";
        }
    })
});
document.getElementById('pledgeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for joining the movement! In a real implementation, your signature would be recorded.');
    this.reset();
});
const form = document.getElementById('impactForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const technology = document.getElementById('technology').value;
    const investment = parseFloat(document.getElementById('investment').value);

    if (!technology || isNaN(investment) || investment <= 0) {
        alert("Please fill all fields correctly!");
        return;
    }

    const impactMultipliers = {
        AI: 1.8,
        Space: 2.5,
        EV: 1.5,
        Quantum: 3.0,
        Semiconductor: 2.0
    };

    const multiplier = impactMultipliers[technology];
    
    const impactScore = Math.min(100, Math.round(multiplier * investment / 10));
    const jobsCreated = Math.round(multiplier * investment * 2);
    const timeToMarket = (technology === "Quantum") ? 5 : 2;
    const potentialValue = (investment * multiplier * 10) / 100;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ;

    resultDiv.innerHTML = `
        <h3>Impact Results</h3>
        <p><strong>Impact Score:</strong> ${impactScore}/100</p>
        <p><strong>Estimated Jobs Created:</strong> ${jobsCreated}</p>
        <p><strong>Time to Market:</strong> ${timeToMarket} years</p>
        <p><strong>Potential Economic Value:</strong> ₹${potentialValue.toLocaleString()} cores</p>
    `;
    resultDiv.style.display = 'block';
});
document.querySelectorAll('.learn-more').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.flip-card');
      card.classList.add('flipped');
    });
  });
  
  document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.flip-card');
      card.classList.remove('flipped');
    });
  });
  

});