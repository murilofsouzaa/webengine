const carCards = document.querySelectorAll('.card-car');
const arrowBtnsLeft = document.querySelectorAll('.arrow-icon-left');
const arrowBtnsRight = document.querySelectorAll('.arrow-icon-right');

let currentIndexes = [0, 0, 0];
let cars = [];

async function fetchcars(){
    const data = await fetch('./data/vehicles.json'); 
    return data;
}

async function setupCars(){
    const carsList = await fetchcars();
    const carsData = await carsList.json();
    cars = carsData.cars;

    carCards.forEach((cardContainer, containerIndex) => {
        const ul = cardContainer.querySelector('ul');
        
        cars.forEach((car, carIndex) => {
            if(carIndex % carCards.length === containerIndex) {
                const li = document.createElement('li');
                const carImage = document.createElement('img');
                
                carImage.src = car.url;
                carImage.alt = car.description;
                
                li.appendChild(carImage);
                ul.appendChild(li);
            }
        });
    });

    setupSliders();
    updateArrowVisibility();
    return cars;
}

function updateArrowVisibility() {
    currentIndexes.forEach((currentIndex, containerIndex) => {
        const leftBtn = arrowBtnsLeft[containerIndex];
        const rightBtn = arrowBtnsRight[containerIndex];
        
        if (leftBtn && rightBtn) {
            // Esconder botão esquerdo se estiver no início
            if (currentIndex === 0) {
                leftBtn.classList.add('arrow-hidden');
            } else {
                leftBtn.classList.remove('arrow-hidden');
            }
            
            // Esconder botão direito se estiver no final
            // Calculando se chegou ao fim baseado no número de carros por container
            const carsPerContainer = Math.ceil(cars.length / carCards.length);
            const maxIndex = cars.length - 3; // Mostra 3 carros por vez
            
            if (currentIndex >= maxIndex) {
                rightBtn.classList.add('arrow-hidden');
            } else {
                rightBtn.classList.remove('arrow-hidden');
            }
        }
    });
}

function slideToNext(containerIndex) {
    const cardContainer = carCards[containerIndex];
    const ul = cardContainer.querySelector('ul');
    
    if (!ul) return;

    // Verificar se não está no final
    const maxIndex = cars.length - 3;
    if (currentIndexes[containerIndex] >= maxIndex) return;

    ul.style.opacity = '0.3';
    ul.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        ul.innerHTML = '';
        currentIndexes[containerIndex] = Math.min(currentIndexes[containerIndex] + 1, maxIndex);
        
        for (let i = 0; i < 3; i++) {
            const carIndex = (currentIndexes[containerIndex] + i) % cars.length;
            const car = cars[carIndex];
            
            const li = document.createElement('li');
            const carImage = document.createElement('img');
            
            carImage.src = car.url;
            carImage.alt = car.description;
            
            li.appendChild(carImage);
            ul.appendChild(li);
        }
        
        ul.style.opacity = '1';
        ul.style.transform = 'translateX(0)';
        
        updateArrowVisibility();
    }, 200);
}

function slideToPrev(containerIndex) {
    const cardContainer = carCards[containerIndex];
    const ul = cardContainer.querySelector('ul');
    
    if (!ul) return;

    // Verificar se não está no início
    if (currentIndexes[containerIndex] <= 0) return;

    ul.style.opacity = '0.3';
    ul.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        ul.innerHTML = '';
        currentIndexes[containerIndex] = Math.max(currentIndexes[containerIndex] - 1, 0);
        
        for (let i = 0; i < 3; i++) {
            const carIndex = (currentIndexes[containerIndex] + i) % cars.length;
            const car = cars[carIndex];
            
            const li = document.createElement('li');
            const carImage = document.createElement('img');
            
            carImage.src = car.url;
            carImage.alt = car.description;
            
            li.appendChild(carImage);
            ul.appendChild(li);
        }
        
        ul.style.opacity = '1';
        ul.style.transform = 'translateX(0)';
        
        updateArrowVisibility();
    }, 200);
}

function setupSliders() {
    arrowBtnsLeft.forEach((arrowBtn, btnIndex) => {
        arrowBtn.addEventListener('click', () => {
            slideToPrev(btnIndex);
        });
    });

    arrowBtnsRight.forEach((arrowBtn, btnIndex) => {
        arrowBtn.addEventListener('click', () => {
            slideToNext(btnIndex);
        });
    });
}

document.addEventListener('DOMContentLoaded', setupCars);