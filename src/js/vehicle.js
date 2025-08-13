const vehicleCard = document.querySelector('.card-car');

async function fetchVehicles(){
    const data = await fetch('./data/vehicles.json'); 
    return data;
}

async function setupVehicles(){
    const ul = document.querySelector('.card-car > ul');

    const vehiclesList = await fetchVehicles();
    const vehiclesData = await vehiclesList.json();

    const vehicles = vehiclesData.cars;

    vehicles.forEach((car, index) => {
        const li = document.createElement('li');
        const carImage = document.createElement('img');
        const carImageURL = car.url;
        
        carImage.src = carImageURL;

        li.appendChild(carImage);
        ul.appendChild(li);

        vehicleCard.appendChild(ul)
    });

    return vehicles;
}

document.addEventListener('DOMContentLoaded', setupVehicles);